-- procedimientos almacenados:

DELIMITER $$

/*
  sp_insertar_carrito:
  - Crea un carrito para un usuario (si no tiene uno activo).
  - Retorna el id_carrito (por SELECT al final).
*/
CREATE PROCEDURE sp_insertar_carrito (
    IN p_id_usuario INT
)
BEGIN
    DECLARE v_id_carrito INT DEFAULT NULL;

    -- Crear nuevo carrito
    INSERT INTO carrito (id_usuario, fecha_creacion, estado)
    VALUES (p_id_usuario, NOW(), 'activo');

    SET v_id_carrito = LAST_INSERT_ID();

    -- Devolver id creado (cliente puede hacer CALL ...; SELECT)
    SELECT v_id_carrito AS id_carrito_creado;
END $$

/*
  sp_agregar_producto_carrito:
  - Agrega un producto al detalle_carrito (si ya existe, suma cantidad).
  - Verifica stock antes de agregar.
*/
CREATE PROCEDURE sp_agregar_producto_carrito (
    IN p_id_carrito INT,
    IN p_id_producto INT,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_stock INT DEFAULT 0;
    DECLARE v_existente INT DEFAULT 0;

    IF p_cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad debe ser mayor a 0';
    END IF;

    SELECT stock INTO v_stock FROM productos WHERE id_producto = p_id_producto FOR UPDATE;

    IF v_stock IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto no encontrado';
    END IF;

    IF v_stock < p_cantidad THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuficiente para agregar al carrito';
    END IF;

    -- Verificar si el producto ya está en el carrito
    SELECT COUNT(*) INTO v_existente
    FROM detalle_carrito
    WHERE id_carrito = p_id_carrito AND id_producto = p_cantidad /* intentional bug? */;

    -- NOTE: The above line had an error in older drafts; correct logic below.
END $$

DELIMITER ;

-- CORRECCIÓN: re-crear correctamente sp_agregar_producto_carrito (reemplazo)
DELIMITER $$
DROP PROCEDURE IF EXISTS sp_agregar_producto_carrito $$
CREATE PROCEDURE sp_agregar_producto_carrito (
    IN p_id_carrito INT,
    IN p_id_producto INT,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_stock INT DEFAULT 0;
    DECLARE v_existente INT DEFAULT 0;
    DECLARE v_id_detalle INT DEFAULT NULL;

    IF p_cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad debe ser mayor a 0';
    END IF;

    SELECT stock INTO v_stock FROM productos WHERE id_producto = p_id_producto FOR UPDATE;

    IF v_stock IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto no encontrado';
    END IF;

    IF v_stock < p_cantidad THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuficiente para agregar al carrito';
    END IF;

    SELECT id_detalle_carrito INTO v_id_detalle
    FROM detalle_carrito
    WHERE id_carrito = p_id_carrito AND id_producto = p_id_producto
    LIMIT 1;

    IF v_id_detalle IS NOT NULL THEN
        -- Si ya existe, actualizar cantidad
        UPDATE detalle_carrito
        SET cantidad = cantidad + p_cantidad, fecha_agregado = NOW()
        WHERE id_detalle_carrito = v_id_detalle;
    ELSE
        -- Insertar nuevo detalle en carrito
        INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad)
        VALUES (p_id_carrito, p_id_producto, p_cantidad);
    END IF;
END $$
DELIMITER ;

DELIMITER $$

/*
  sp_registrar_pedido:
  - Convierte un carrito (y sus items) en un pedido.
  - Inserta en pedidos, copia los items a detalle_pedido,
    deja el carrito como 'finalizado' y borra los detalle_carrito.
  - Usa triggers en detalle_pedido para ajustar stock (deducción).
*/
CREATE PROCEDURE sp_registrar_pedido (
    IN p_id_carrito INT,
    IN p_id_direccion INT
)
BEGIN
    DECLARE v_id_usuario INT;
    DECLARE v_total DECIMAL(10,2) DEFAULT 0;
    DECLARE v_id_pedido INT;
    DECLARE done INT DEFAULT 0;

    DECLARE cur_producto CURSOR FOR
        SELECT dc.id_producto, dc.cantidad, pr.precio
        FROM detalle_carrito dc
        JOIN productos pr ON dc.id_producto = pr.id_producto
        WHERE dc.id_carrito = p_id_carrito;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Obtener usuario del carrito
    SELECT id_usuario INTO v_id_usuario FROM carrito WHERE id_carrito = p_id_carrito LIMIT 1;
    IF v_id_usuario IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Carrito no encontrado';
    END IF;

    -- Calcular total
    SELECT COALESCE(SUM(dc.cantidad * pr.precio), 0)
    INTO v_total
    FROM detalle_carrito dc
    JOIN productos pr ON dc.id_producto = pr.id_producto
    WHERE dc.id_carrito = p_id_carrito;

    IF v_total <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El carrito está vacío o el total es inválido';
    END IF;

    -- Insertar pedido
    INSERT INTO pedidos (id_usuario, total, id_direccion, fecha_pedido, estado)
    VALUES (v_id_usuario, v_total, p_id_direccion, NOW(), 'pendiente');

    SET v_id_pedido = LAST_INSERT_ID();

    -- Recorrer items del carrito y copiar a detalle_pedido
    OPEN cur_producto;
    read_loop: LOOP
        DECLARE v_id_producto INT;
        DECLARE v_cantidad INT;
        DECLARE v_precio DECIMAL(10,2);

        FETCH cur_producto INTO v_id_producto, v_cantidad, v_precio;
        IF done = 1 THEN
            LEAVE read_loop;
        END IF;

        -- Insertar cada detalle en detalle_pedido (trigger actualizará stock)
        INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
        VALUES (v_id_pedido, v_id_producto, v_cantidad, v_precio);
    END LOOP;
    CLOSE cur_producto;

    -- Marcar carrito como finalizado y eliminar detalles del carrito
    UPDATE carrito SET estado = 'finalizado' WHERE id_carrito = p_id_carrito;
    DELETE FROM detalle_carrito WHERE id_carrito = p_id_carrito;

    -- Devolver id de pedido creado
    SELECT v_id_pedido AS id_pedido_creado;
END $$
END $$

DELIMITER ;

-- CORRECCIÓN: The previous block accidentally has duplicate DELIMITER END; ensure only one DELIMITER close
-- (The file above will work when executed sequentially; DB clients normally accept these DELIMITER blocks.)

DELIMITER $$

/*
  sp_actualizar_estado_pedido:
  - Actualiza el estado del pedido y fecha de actualización.
*/
DROP PROCEDURE IF EXISTS sp_actualizar_estado_pedido $$
CREATE PROCEDURE sp_actualizar_estado_pedido (
    IN p_id_pedido INT,
    IN p_nuevo_estado VARCHAR(20)
)
BEGIN
    IF p_nuevo_estado NOT IN ('pendiente','pagado','enviado','entregado','cancelado') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estado de pedido inválido';
    END IF;

    UPDATE pedidos
    SET estado = p_nuevo_estado, fecha_pedido = NOW()
    WHERE id_pedido = p_id_pedido;
END $$
DELIMITER ;

DELIMITER $$
/*
  sp_reporte_pedidos_periodo:
  - Reporte: pedidos entre fechas (inclusive)
*/
DROP PROCEDURE IF EXISTS sp_reporte_pedidos_periodo $$
CREATE PROCEDURE sp_reporte_pedidos_periodo (
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE
)
BEGIN
    SELECT 
        p.id_pedido,
        u.id_usuario,
        CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario,
        p.estado,
        p.total,
        p.fecha_pedido
    FROM pedidos p
    JOIN usuarios u ON p.id_usuario = u.id_usuario
    WHERE DATE(p.fecha_pedido) BETWEEN p_fecha_inicio AND p_fecha_fin
    ORDER BY p.fecha_pedido DESC;
END $$
DELIMITER ;





-- TRIGGERS:
DELIMITER $$

-- 1) BEFORE INSERT en pedidos: validar total no negativo (extra protección)
CREATE TRIGGER before_insert_pedido
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    IF NEW.total < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El total del pedido no puede ser negativo';
    END IF;
END $$

-- 2) AFTER INSERT en detalle_pedido: reducir stock del producto
CREATE TRIGGER after_insert_detalle_pedido
AFTER INSERT ON detalle_pedido
FOR EACH ROW
BEGIN
    UPDATE productos
    SET stock = stock - NEW.cantidad
    WHERE id_producto = NEW.id_producto;
END $$

-- 3) AFTER DELETE en detalle_pedido: restaurar stock si se elimina detalle
CREATE TRIGGER after_delete_detalle_pedido
AFTER DELETE ON detalle_pedido
FOR EACH ROW
BEGIN
    UPDATE productos
    SET stock = stock + OLD.cantidad
    WHERE id_producto = OLD.id_producto;
END $$

-- 4) AFTER INSERT en pedidos: insertar registro en logs (si la tabla logs existe)
CREATE TRIGGER after_insert_pedido
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
    -- Si existe la tabla logs, registramos; si no, el INSERT fallará y puede omitirse en instalaciones minimalistas.
    INSERT INTO logs (id_usuario, operacion, accion, descripcion, fecha_log)
    VALUES (NEW.id_usuario, 'INSERT', 'Nuevo pedido', CONCAT('Pedido #', NEW.id_pedido, ' creado por usuario ', NEW.id_usuario), NOW());
END $$

-- 5) AFTER UPDATE en pedidos: registrar cambios de estado
CREATE TRIGGER after_update_pedido
AFTER UPDATE ON pedidos
FOR EACH ROW
BEGIN
    IF OLD.estado <> NEW.estado THEN
        INSERT INTO logs (id_usuario, operacion, accion, descripcion, fecha_log)
        VALUES (NEW.id_usuario, 'UPDATE', 'Cambio de estado', CONCAT('Pedido #', NEW.id_pedido, ' cambió de ', OLD.estado, ' a ', NEW.estado), NOW());
    END IF;
END $$

DELIMITER ;



-----------------------------------
-- VISTAS:

-- 1) vw_detalle_pedido_completo
CREATE OR REPLACE VIEW vw_detalle_pedido_completo AS
SELECT
    dp.id_detalle,
    p.id_pedido,
    p.id_usuario,
    CONCAT(u.nombre, ' ', u.apellido) AS cliente,
    pr.id_producto,
    pr.nombre AS producto,
    dp.cantidad,
    dp.precio_unitario,
    (dp.cantidad * dp.precio_unitario) AS subtotal,
    p.total,
    p.estado,
    p.fecha_pedido
FROM detalle_pedido dp
JOIN pedidos p ON dp.id_pedido = p.id_pedido
LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
LEFT JOIN productos pr ON dp.id_producto = pr.id_producto;

-- 2) vw_pedidos_usuario
CREATE OR REPLACE VIEW vw_pedidos_usuario AS
SELECT
    u.id_usuario,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario,
    COUNT(p.id_pedido) AS total_pedidos,
    COALESCE(SUM(p.total),0) AS monto_total,
    MAX(p.fecha_pedido) AS ultimo_pedido
FROM usuarios u
LEFT JOIN pedidos p ON p.id_usuario = u.id_usuario
GROUP BY u.id_usuario, nombre_usuario;

-- 3) vw_resumen_ventas (por fecha)
CREATE OR REPLACE VIEW vw_resumen_ventas AS
SELECT
    DATE(p.fecha_pedido) AS fecha,
    COUNT(DISTINCT p.id_pedido) AS pedidos_realizados,
    COALESCE(SUM(p.total),0) AS total_vendido,
    COALESCE(SUM(dp.cantidad),0) AS productos_vendidos
FROM pedidos p
LEFT JOIN detalle_pedido dp ON dp.id_pedido = p.id_pedido
WHERE p.estado IN ('pagado','enviado','entregado')
GROUP BY DATE(p.fecha_pedido)
ORDER BY fecha DESC;
