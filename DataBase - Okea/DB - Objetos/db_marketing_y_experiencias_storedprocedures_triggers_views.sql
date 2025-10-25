-- =====================================================
-- OKEA E-COMMERCE - STORED PROCEDURES, TRIGGERS Y VIEWS
-- Módulo: Marketing y Experiencia
-- Motor: MySQL 8.0
-- Autor: Luis Lagos
-- Fecha: 2025-01-24
-- =====================================================

USE ecommerce_db_okea;

-- =====================================================
-- SECCIÓN 1: STORED PROCEDURES
-- =====================================================

-- =====================================================
-- SP: sp_aplicar_cupon_seguro
-- Descripción: Aplica un cupón de manera segura validando
--              todas las condiciones necesarias
-- Parámetros:
--   p_codigo_cupon: Código del cupón a aplicar
--   p_id_usuario: ID del usuario que aplica el cupón
--   p_monto_pedido: Monto total del pedido
--   p_id_pedido: ID del pedido al que se aplica
--   p_ip_usuario: IP del usuario
-- =====================================================
DELIMITER //

DROP PROCEDURE IF EXISTS sp_aplicar_cupon_seguro//

CREATE PROCEDURE sp_aplicar_cupon_seguro(
    IN p_codigo_cupon VARCHAR(50),
    IN p_id_usuario INT,
    IN p_monto_pedido DECIMAL(10,2),
    IN p_id_pedido INT,
    IN p_ip_usuario VARCHAR(45),
    OUT p_resultado VARCHAR(50),
    OUT p_descuento DECIMAL(10,2),
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_id_cupon INT;
    DECLARE v_tipo_descuento ENUM('porcentaje', 'monto_fijo');
    DECLARE v_valor_descuento DECIMAL(10,2);
    DECLARE v_monto_minimo DECIMAL(10,2);
    DECLARE v_usos_maximos INT;
    DECLARE v_usos_actuales INT;
    DECLARE v_fecha_inicio DATETIME;
    DECLARE v_fecha_fin DATETIME;
    DECLARE v_activo TINYINT(1);
    DECLARE v_email_usuario VARCHAR(255);
    DECLARE v_error_occurred INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_error_occurred = 1;
        ROLLBACK;
    END;

    -- Inicializar variables de salida
    SET p_resultado = 'ERROR';
    SET p_descuento = 0;
    SET p_mensaje = '';

    START TRANSACTION;

    -- Validación de parámetros
    IF p_codigo_cupon IS NULL OR TRIM(p_codigo_cupon) = '' THEN
        SET p_mensaje = 'El código del cupón es requerido';
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Código de cupón inválido';
    END IF;

    IF p_monto_pedido <= 0 THEN
        SET p_mensaje = 'El monto del pedido debe ser mayor a 0';
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Monto de pedido inválido';
    END IF;

    -- Obtener datos del cupón
    SELECT id_cupon, tipo_descuento, valor_descuento, monto_minimo,
           usos_maximos, usos_actuales, fecha_inicio, fecha_fin, activo
    INTO v_id_cupon, v_tipo_descuento, v_valor_descuento, v_monto_minimo,
         v_usos_maximos, v_usos_actuales, v_fecha_inicio, v_fecha_fin, v_activo
    FROM cupones
    WHERE codigo = p_codigo_cupon;

    -- Validar que el cupón existe
    IF v_id_cupon IS NULL THEN
        SET p_mensaje = 'El cupón no existe';
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cupón no encontrado';
    END IF;

    -- Validar que el cupón está activo
    IF v_activo = 0 THEN
        SET p_mensaje = 'El cupón no está activo';
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cupón inactivo';
    END IF;

    -- Validar fechas de vigencia
    IF NOW() < v_fecha_inicio THEN
        SET p_mensaje = 'El cupón aún no es válido';
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cupón no vigente';
    END IF;

    IF NOW() > v_fecha_fin THEN
        SET p_mensaje = 'El cupón ha expirado';
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cupón expirado';
    END IF;

    -- Validar monto mínimo
    IF p_monto_pedido < v_monto_minimo THEN
        SET p_mensaje = CONCAT('El monto mínimo requerido es: ', v_monto_minimo);
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Monto mínimo no alcanzado';
    END IF;

    -- Validar usos máximos
    IF v_usos_maximos IS NOT NULL AND v_usos_actuales >= v_usos_maximos THEN
        SET p_mensaje = 'El cupón ha alcanzado su límite de usos';
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Límite de usos alcanzado';
    END IF;

    -- Obtener email del usuario
    SELECT email INTO v_email_usuario
    FROM usuarios
    WHERE id_usuario = p_id_usuario;

    -- Calcular descuento
    IF v_tipo_descuento = 'porcentaje' THEN
        SET p_descuento = ROUND((p_monto_pedido * v_valor_descuento / 100), 2);
    ELSE
        SET p_descuento = v_valor_descuento;
    END IF;

    -- Validar que el descuento no supere el monto del pedido
    IF p_descuento > p_monto_pedido THEN
        SET p_descuento = p_monto_pedido;
    END IF;

    -- Registrar uso del cupón
    INSERT INTO cupones_uso (
        id_cupon,
        id_usuario,
        id_pedido,
        email_usuario,
        monto_pedido,
        ip_usuario,
        estado,
        detalles_uso
    ) VALUES (
        v_id_cupon,
        p_id_usuario,
        p_id_pedido,
        v_email_usuario,
        p_monto_pedido,
        p_ip_usuario,
        'aplicado',
        JSON_OBJECT(
            'descuento_aplicado', p_descuento,
            'tipo_descuento', v_tipo_descuento,
            'valor_descuento', v_valor_descuento
        )
    );

    -- Registrar en logs
    INSERT INTO logs (id_usuario, operacion, accion, descripcion, ip)
    VALUES (
        p_id_usuario,
        'INSERT',
        'APLICAR_CUPON',
        CONCAT('Cupón aplicado: ', p_codigo_cupon, ' - Descuento: ', p_descuento),
        p_ip_usuario
    );

    IF v_error_occurred = 0 THEN
        COMMIT;
        SET p_resultado = 'EXITO';
        SET p_mensaje = 'Cupón aplicado correctamente';
    ELSE
        SET p_mensaje = 'Error al aplicar el cupón';
    END IF;

END//

DELIMITER ;


-- =====================================================
-- SP: sp_reporte_cupones_usados
-- Descripción: Genera un reporte de cupones usados en
--              un rango de fechas
-- Parámetros:
--   p_fecha_inicio: Fecha de inicio del reporte
--   p_fecha_fin: Fecha de fin del reporte
--   p_id_usuario_solicitante: Usuario que solicita el reporte
-- =====================================================
DELIMITER //

DROP PROCEDURE IF EXISTS sp_reporte_cupones_usados//

CREATE PROCEDURE sp_reporte_cupones_usados(
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME,
    IN p_id_usuario_solicitante INT
)
BEGIN
    DECLARE v_error_occurred INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_error_occurred = 1;
    END;

    START TRANSACTION;

    -- Validación de parámetros
    IF p_fecha_inicio IS NULL OR p_fecha_fin IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Las fechas son requeridas';
    END IF;

    IF p_fecha_inicio > p_fecha_fin THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de inicio debe ser menor a la fecha fin';
    END IF;

    -- Generar reporte
    SELECT
        c.id_cupon,
        c.codigo AS codigo_cupon,
        c.descripcion,
        c.tipo_descuento,
        c.valor_descuento,
        COUNT(cu.id_uso) AS total_usos,
        SUM(CASE WHEN cu.estado = 'aplicado' THEN 1 ELSE 0 END) AS usos_aplicados,
        SUM(CASE WHEN cu.estado = 'rechazado' THEN 1 ELSE 0 END) AS usos_rechazados,
        SUM(CASE WHEN cu.estado = 'pendiente' THEN 1 ELSE 0 END) AS usos_pendientes,
        SUM(cu.monto_pedido) AS monto_total_pedidos,
        SUM(
            CASE
                WHEN c.tipo_descuento = 'porcentaje' THEN
                    ROUND((cu.monto_pedido * c.valor_descuento / 100), 2)
                ELSE
                    c.valor_descuento
            END
        ) AS descuento_total_otorgado,
        MIN(cu.fecha_uso) AS primera_vez_usado,
        MAX(cu.fecha_uso) AS ultima_vez_usado
    FROM cupones c
    LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
        AND cu.fecha_uso BETWEEN p_fecha_inicio AND p_fecha_fin
    WHERE c.fecha_creacion <= p_fecha_fin
    GROUP BY c.id_cupon, c.codigo, c.descripcion, c.tipo_descuento, c.valor_descuento
    HAVING total_usos > 0
    ORDER BY total_usos DESC, descuento_total_otorgado DESC;

    -- Registrar en logs
    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (
        p_id_usuario_solicitante,
        'OTHER',
        'REPORTE_CUPONES',
        CONCAT('Reporte generado del ', p_fecha_inicio, ' al ', p_fecha_fin)
    );

    IF v_error_occurred = 0 THEN
        COMMIT;
    ELSE
        ROLLBACK;
    END IF;

END//

DELIMITER ;


-- =====================================================
-- SP: sp_limpiar_datos_sensibles
-- Descripción: Limpia datos sensibles de registros antiguos
--              cumpliendo con políticas de privacidad
-- Parámetros:
--   p_dias_antiguedad: Días de antigüedad para considerar
--   p_id_usuario_ejecutor: Usuario que ejecuta la limpieza
-- =====================================================
DELIMITER //

DROP PROCEDURE IF EXISTS sp_limpiar_datos_sensibles//

CREATE PROCEDURE sp_limpiar_datos_sensibles(
    IN p_dias_antiguedad INT,
    IN p_id_usuario_ejecutor INT,
    OUT p_registros_afectados INT
)
BEGIN
    DECLARE v_registros_newsletter INT DEFAULT 0;
    DECLARE v_registros_cupones INT DEFAULT 0;
    DECLARE v_registros_favoritos INT DEFAULT 0;
    DECLARE v_error_occurred INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET v_error_occurred = 1;
        ROLLBACK;
    END;

    SET p_registros_afectados = 0;

    -- Validación de parámetros
    IF p_dias_antiguedad IS NULL OR p_dias_antiguedad <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Los días de antigüedad deben ser mayor a 0';
    END IF;

    START TRANSACTION;

    -- Limpiar IPs de newsletter inactivos
    UPDATE newsletter
    SET ip_suscripcion = NULL
    WHERE estado = 'inactivo'
        AND fecha_baja IS NOT NULL
        AND DATEDIFF(NOW(), fecha_baja) > p_dias_antiguedad;

    SET v_registros_newsletter = ROW_COUNT();

    -- Limpiar IPs de cupones_uso antiguos
    UPDATE cupones_uso
    SET ip_usuario = NULL
    WHERE DATEDIFF(NOW(), fecha_uso) > p_dias_antiguedad;

    SET v_registros_cupones = ROW_COUNT();

    -- Limpiar IPs de favoritos antiguos
    UPDATE favoritos
    SET ip_usuario = NULL
    WHERE DATEDIFF(NOW(), creado_el) > p_dias_antiguedad;

    SET v_registros_favoritos = ROW_COUNT();

    SET p_registros_afectados = v_registros_newsletter + v_registros_cupones + v_registros_favoritos;

    -- Registrar en logs
    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (
        p_id_usuario_ejecutor,
        'UPDATE',
        'LIMPIAR_DATOS_SENSIBLES',
        CONCAT('Limpieza ejecutada. Registros afectados: ', p_registros_afectados,
               ' (Newsletter: ', v_registros_newsletter,
               ', Cupones: ', v_registros_cupones,
               ', Favoritos: ', v_registros_favoritos, ')')
    );

    IF v_error_occurred = 0 THEN
        COMMIT;
    ELSE
        ROLLBACK;
        SET p_registros_afectados = 0;
    END IF;

END//

DELIMITER ;


-- =====================================================
-- SP: sp_usuarios_mas_activos
-- Descripción: Obtiene los usuarios más activos basado
--              en uso de cupones y favoritos
-- Parámetros:
--   p_limite: Número de usuarios a retornar
--   p_dias_analisis: Días hacia atrás a analizar
-- =====================================================
DELIMITER //

DROP PROCEDURE IF EXISTS sp_usuarios_mas_activos//

CREATE PROCEDURE sp_usuarios_mas_activos(
    IN p_limite INT,
    IN p_dias_analisis INT
)
BEGIN
    DECLARE v_fecha_inicio DATETIME;

    -- Validación de parámetros
    IF p_limite IS NULL OR p_limite <= 0 THEN
        SET p_limite = 10;
    END IF;

    IF p_dias_analisis IS NULL OR p_dias_analisis <= 0 THEN
        SET p_dias_analisis = 30;
    END IF;

    SET v_fecha_inicio = DATE_SUB(NOW(), INTERVAL p_dias_analisis DAY);

    -- Generar reporte de usuarios más activos
    SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.email,
        COUNT(DISTINCT cu.id_uso) AS total_cupones_usados,
        COUNT(DISTINCT f.id_favorito) AS total_favoritos_agregados,
        (COUNT(DISTINCT cu.id_uso) + COUNT(DISTINCT f.id_favorito)) AS puntuacion_actividad,
        MAX(cu.fecha_uso) AS ultimo_uso_cupon,
        MAX(f.creado_el) AS ultimo_favorito_agregado,
        u.ultimo_login
    FROM usuarios u
    LEFT JOIN cupones_uso cu ON u.id_usuario = cu.id_usuario
        AND cu.fecha_uso >= v_fecha_inicio
    LEFT JOIN favoritos f ON u.id_usuario = f.id_usuario
        AND f.creado_el >= v_fecha_inicio
    WHERE u.activo = 1
    GROUP BY u.id_usuario, u.nombre, u.apellido, u.email, u.ultimo_login
    HAVING puntuacion_actividad > 0
    ORDER BY puntuacion_actividad DESC, total_cupones_usados DESC, total_favoritos_agregados DESC
    LIMIT p_limite;

END//

DELIMITER ;


-- =====================================================
-- SECCIÓN 2: TRIGGERS
-- =====================================================

-- =====================================================
-- TRIGGER: trg_after_insert_cupones_uso
-- Descripción: Registra en logs cuando se usa un cupón
-- Tabla: cupones_uso
-- Evento: AFTER INSERT
-- =====================================================
DELIMITER //

DROP TRIGGER IF EXISTS trg_after_insert_cupones_uso//

CREATE TRIGGER trg_after_insert_cupones_uso
AFTER INSERT ON cupones_uso
FOR EACH ROW
BEGIN
    DECLARE v_codigo_cupon VARCHAR(50);

    -- Obtener código del cupón
    SELECT codigo INTO v_codigo_cupon
    FROM cupones
    WHERE id_cupon = NEW.id_cupon;

    -- Registrar en logs
    INSERT INTO logs (id_usuario, operacion, accion, descripcion, ip)
    VALUES (
        NEW.id_usuario,
        'INSERT',
        'CUPON_USADO',
        CONCAT('Cupón usado: ', v_codigo_cupon,
               ' - Estado: ', NEW.estado,
               ' - Monto pedido: ', IFNULL(NEW.monto_pedido, 0)),
        NEW.ip_usuario
    );
END//

DELIMITER ;


-- =====================================================
-- TRIGGER: trg_after_update_cupones_uso
-- Descripción: Registra cambios de estado en cupones_uso
-- Tabla: cupones_uso
-- Evento: AFTER UPDATE
-- =====================================================
DELIMITER //

DROP TRIGGER IF EXISTS trg_after_update_cupones_uso//

CREATE TRIGGER trg_after_update_cupones_uso
AFTER UPDATE ON cupones_uso
FOR EACH ROW
BEGIN
    DECLARE v_codigo_cupon VARCHAR(50);

    -- Solo registrar si cambió el estado
    IF OLD.estado != NEW.estado THEN
        -- Obtener código del cupón
        SELECT codigo INTO v_codigo_cupon
        FROM cupones
        WHERE id_cupon = NEW.id_cupon;

        -- Registrar en logs
        INSERT INTO logs (id_usuario, operacion, accion, descripcion, ip)
        VALUES (
            NEW.id_usuario,
            'UPDATE',
            'CUPON_ESTADO_CAMBIO',
            CONCAT('Cupón: ', v_codigo_cupon,
                   ' - Estado cambió de ', OLD.estado, ' a ', NEW.estado),
            NEW.ip_usuario
        );
    END IF;
END//

DELIMITER ;


-- =====================================================
-- TRIGGER: trg_before_insert_newsletter
-- Descripción: Valida y normaliza datos antes de insertar
--              en newsletter
-- Tabla: newsletter
-- Evento: BEFORE INSERT
-- =====================================================
DELIMITER //

DROP TRIGGER IF EXISTS trg_before_insert_newsletter//

CREATE TRIGGER trg_before_insert_newsletter
BEFORE INSERT ON newsletter
FOR EACH ROW
BEGIN
    -- Normalizar email a minúsculas
    SET NEW.email = LOWER(TRIM(NEW.email));

    -- Validar formato de email
    IF NEW.email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Formato de email inválido';
    END IF;

    -- Normalizar nombre si existe
    IF NEW.nombre IS NOT NULL THEN
        SET NEW.nombre = TRIM(NEW.nombre);
        IF NEW.nombre = '' THEN
            SET NEW.nombre = NULL;
        END IF;
    END IF;

    -- Generar token de confirmación si no existe
    IF NEW.token_confirmacion IS NULL THEN
        SET NEW.token_confirmacion = MD5(CONCAT(NEW.email, NOW(), RAND()));
    END IF;
END//

DELIMITER ;


-- =====================================================
-- TRIGGER: trg_after_insert_favoritos
-- Descripción: Registra cuando un usuario agrega un favorito
-- Tabla: favoritos
-- Evento: AFTER INSERT
-- =====================================================
DELIMITER //

DROP TRIGGER IF EXISTS trg_after_insert_favoritos//

CREATE TRIGGER trg_after_insert_favoritos
AFTER INSERT ON favoritos
FOR EACH ROW
BEGIN
    DECLARE v_nombre_producto VARCHAR(200);

    -- Obtener nombre del producto
    SELECT nombre INTO v_nombre_producto
    FROM productos
    WHERE id_producto = NEW.id_producto;

    -- Registrar en logs
    INSERT INTO logs (id_usuario, operacion, accion, descripcion, ip)
    VALUES (
        NEW.id_usuario,
        'INSERT',
        'FAVORITO_AGREGADO',
        CONCAT('Producto agregado a favoritos: ', v_nombre_producto),
        NEW.ip_usuario
    );
END//

DELIMITER ;


-- =====================================================
-- TRIGGER: trg_actualizar_usos_cupon
-- Descripción: Actualiza el contador de usos del cupón
--              cuando se aplica
-- Tabla: cupones_uso
-- Evento: AFTER INSERT
-- =====================================================
DELIMITER //

DROP TRIGGER IF EXISTS trg_actualizar_usos_cupon//

CREATE TRIGGER trg_actualizar_usos_cupon
AFTER INSERT ON cupones_uso
FOR EACH ROW
BEGIN
    -- Solo incrementar si el estado es 'aplicado'
    IF NEW.estado = 'aplicado' THEN
        UPDATE cupones
        SET usos_actuales = usos_actuales + 1
        WHERE id_cupon = NEW.id_cupon;
    END IF;
END//

DELIMITER ;


-- =====================================================
-- SECCIÓN 3: VISTAS
-- =====================================================

-- =====================================================
-- VISTA: vw_cupones_activos
-- Descripción: Muestra los cupones activos y vigentes
-- =====================================================
DROP VIEW IF EXISTS vw_cupones_activos;

CREATE VIEW vw_cupones_activos AS
SELECT
    c.id_cupon,
    c.codigo,
    c.descripcion,
    c.tipo_descuento,
    c.valor_descuento,
    c.monto_minimo,
    c.usos_maximos,
    c.usos_actuales,
    (c.usos_maximos - c.usos_actuales) AS usos_disponibles,
    c.fecha_inicio,
    c.fecha_fin,
    DATEDIFF(c.fecha_fin, NOW()) AS dias_restantes,
    c.activo,
    CONCAT(u_creacion.nombre, ' ', u_creacion.apellido) AS creado_por,
    c.fecha_creacion,
    CONCAT(u_modificacion.nombre, ' ', u_modificacion.apellido) AS modificado_por,
    c.fecha_actualizacion
FROM cupones c
LEFT JOIN usuarios u_creacion ON c.id_usuario_creacion = u_creacion.id_usuario
LEFT JOIN usuarios u_modificacion ON c.id_usuario_modificacion = u_modificacion.id_usuario
WHERE c.activo = 1
    AND NOW() BETWEEN c.fecha_inicio AND c.fecha_fin
    AND (c.usos_maximos IS NULL OR c.usos_actuales < c.usos_maximos);


-- =====================================================
-- VISTA: vw_estadisticas_cupones
-- Descripción: Estadísticas detalladas de uso de cupones
-- =====================================================
DROP VIEW IF EXISTS vw_estadisticas_cupones;

CREATE VIEW vw_estadisticas_cupones AS
SELECT
    c.id_cupon,
    c.codigo,
    c.descripcion,
    c.tipo_descuento,
    c.valor_descuento,
    c.usos_actuales,
    c.usos_maximos,
    COUNT(cu.id_uso) AS total_intentos_uso,
    SUM(CASE WHEN cu.estado = 'aplicado' THEN 1 ELSE 0 END) AS usos_exitosos,
    SUM(CASE WHEN cu.estado = 'rechazado' THEN 1 ELSE 0 END) AS usos_rechazados,
    SUM(CASE WHEN cu.estado = 'pendiente' THEN 1 ELSE 0 END) AS usos_pendientes,
    ROUND(
        (SUM(CASE WHEN cu.estado = 'aplicado' THEN 1 ELSE 0 END) /
         NULLIF(COUNT(cu.id_uso), 0) * 100), 2
    ) AS tasa_exito_porcentaje,
    SUM(cu.monto_pedido) AS monto_total_pedidos,
    AVG(cu.monto_pedido) AS monto_promedio_pedido,
    SUM(
        CASE
            WHEN c.tipo_descuento = 'porcentaje' AND cu.estado = 'aplicado' THEN
                ROUND((cu.monto_pedido * c.valor_descuento / 100), 2)
            WHEN c.tipo_descuento = 'monto_fijo' AND cu.estado = 'aplicado' THEN
                c.valor_descuento
            ELSE 0
        END
    ) AS descuento_total_otorgado,
    MIN(cu.fecha_uso) AS primera_vez_usado,
    MAX(cu.fecha_uso) AS ultima_vez_usado,
    c.fecha_inicio,
    c.fecha_fin,
    c.activo
FROM cupones c
LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
GROUP BY
    c.id_cupon, c.codigo, c.descripcion, c.tipo_descuento,
    c.valor_descuento, c.usos_actuales, c.usos_maximos,
    c.fecha_inicio, c.fecha_fin, c.activo;


-- =====================================================
-- VISTA: vw_newsletter_activos
-- Descripción: Suscriptores activos del newsletter
-- =====================================================
DROP VIEW IF EXISTS vw_newsletter_activos;

CREATE VIEW vw_newsletter_activos AS
SELECT
    n.id_suscripcion,
    n.email,
    n.nombre,
    n.estado,
    n.fecha_suscripcion,
    n.fecha_confirmacion,
    DATEDIFF(NOW(), n.fecha_suscripcion) AS dias_suscrito,
    CASE
        WHEN n.fecha_confirmacion IS NOT NULL THEN 'Confirmado'
        ELSE 'Pendiente confirmación'
    END AS estado_confirmacion
FROM newsletter n
WHERE n.estado = 'activo';


-- =====================================================
-- VISTA: vw_favoritos_por_producto
-- Descripción: Productos más agregados a favoritos
-- =====================================================
DROP VIEW IF EXISTS vw_favoritos_por_producto;

CREATE VIEW vw_favoritos_por_producto AS
SELECT
    p.id_producto,
    p.nombre AS nombre_producto,
    p.sku,
    p.precio,
    p.stock,
    c.nombre_categoria,
    m.nombre_marca,
    COUNT(f.id_favorito) AS total_favoritos,
    COUNT(DISTINCT f.id_usuario) AS usuarios_unicos,
    MIN(f.creado_el) AS primer_favorito,
    MAX(f.creado_el) AS ultimo_favorito,
    p.activo AS producto_activo
FROM productos p
LEFT JOIN favoritos f ON p.id_producto = f.id_producto
LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
LEFT JOIN marcas m ON p.id_marca = m.id_marca
GROUP BY
    p.id_producto, p.nombre, p.sku, p.precio, p.stock,
    c.nombre_categoria, m.nombre_marca, p.activo
HAVING total_favoritos > 0
ORDER BY total_favoritos DESC;


-- =====================================================
-- VISTA: vw_usuarios_engagement
-- Descripción: Nivel de engagement de usuarios basado
--              en favoritos y cupones
-- =====================================================
DROP VIEW IF EXISTS vw_usuarios_engagement;

CREATE VIEW vw_usuarios_engagement AS
SELECT
    u.id_usuario,
    u.nombre,
    u.apellido,
    u.email,
    COUNT(DISTINCT f.id_favorito) AS total_favoritos,
    COUNT(DISTINCT cu.id_uso) AS total_cupones_usados,
    COUNT(DISTINCT cu.id_pedido) AS pedidos_con_cupon,
    SUM(CASE WHEN cu.estado = 'aplicado' THEN 1 ELSE 0 END) AS cupones_aplicados_exitosos,
    (COUNT(DISTINCT f.id_favorito) + COUNT(DISTINCT cu.id_uso)) AS score_engagement,
    MAX(f.creado_el) AS ultimo_favorito,
    MAX(cu.fecha_uso) AS ultimo_uso_cupon,
    u.fecha_registro,
    u.ultimo_login,
    u.activo
FROM usuarios u
LEFT JOIN favoritos f ON u.id_usuario = f.id_usuario
LEFT JOIN cupones_uso cu ON u.id_usuario = cu.id_usuario
WHERE u.activo = 1
GROUP BY
    u.id_usuario, u.nombre, u.apellido, u.email,
    u.fecha_registro, u.ultimo_login, u.activo
HAVING score_engagement > 0
ORDER BY score_engagement DESC;


-- =====================================================
-- VISTA: vw_cupones_proximos_vencer
-- Descripción: Cupones activos que están próximos a vencer
-- =====================================================
DROP VIEW IF EXISTS vw_cupones_proximos_vencer;

CREATE VIEW vw_cupones_proximos_vencer AS
SELECT
    c.id_cupon,
    c.codigo,
    c.descripcion,
    c.tipo_descuento,
    c.valor_descuento,
    c.monto_minimo,
    c.usos_actuales,
    c.usos_maximos,
    (c.usos_maximos - c.usos_actuales) AS usos_restantes,
    c.fecha_inicio,
    c.fecha_fin,
    DATEDIFF(c.fecha_fin, NOW()) AS dias_para_vencer,
    CASE
        WHEN DATEDIFF(c.fecha_fin, NOW()) <= 3 THEN 'Urgente'
        WHEN DATEDIFF(c.fecha_fin, NOW()) <= 7 THEN 'Alta'
        WHEN DATEDIFF(c.fecha_fin, NOW()) <= 15 THEN 'Media'
        ELSE 'Baja'
    END AS prioridad_alerta
FROM cupones c
WHERE c.activo = 1
    AND NOW() < c.fecha_fin
    AND c.fecha_fin <= DATE_ADD(NOW(), INTERVAL 15 DAY)
    AND (c.usos_maximos IS NULL OR c.usos_actuales < c.usos_maximos)
ORDER BY dias_para_vencer ASC;


-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================

