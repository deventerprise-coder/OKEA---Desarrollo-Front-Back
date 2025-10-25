---------------------------------------------------------------------------------------

-- TRIGGERS

-- ===========================================================
-- TRIGGER: tr_productos_stock_before_update
-- OBJETIVO: Desactivar producto cuando stock llega a cero
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Detecta cuando stock pasa de >0 a 0 y desactiva el producto. Se ejecuta después de actualizar un producto, detecta cuando el stock de un producto pasa de tener unidades disponibles a agotarse completamente, cuando esto ocurre, desactiva automáticamente el producto cambiando su campo activo a FALSE, evitando que aparezca en el catálogo público sin stock disponible.
-- ===========================================================

DELIMITER //
CREATE TRIGGER tr_productos_stock_before_update
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
    IF NEW.stock = 0 AND OLD.stock > 0 THEN
        SET NEW.activo = FALSE;
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: tr_ofertas_calcular_descuento_before_insert
-- OBJETIVO: Calcular porcentaje de descuento automáticamente
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Calcula descuento si no se proporciona manualmente. Se ejecuta antes de insertar una nueva oferta. si no se proporciona el porcentaje de descuent, lo calcula automáticamente usando la fórmula: ((precio_original - precio_oferta) / precio_original) * 100
-- ===========================================================

DELIMITER //
CREATE TRIGGER tr_ofertas_calcular_descuento_before_insert
BEFORE INSERT ON ofertas
FOR EACH ROW
BEGIN
    IF NEW.descuento_porcentaje IS NULL THEN
        SET NEW.descuento_porcentaje = ROUND(((NEW.precio_original - NEW.precio_oferta) / NEW.precio_original) * 100, 2);
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: tr_categorias_slug_before_insert
-- OBJETIVO: Generar slug automático para categorías
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Normaliza nombre a slug URL-friendly. Trigger para generar slug automáticamente en categorias si no se proporciona uno, se usa el nombre convertido a minúsculas y con espacios reemplazados por guiones
-- ===========================================================

DELIMITER //
CREATE TRIGGER tr_categorias_slug_before_insert
BEFORE INSERT ON categorias
FOR EACH ROW
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(REPLACE(NEW.nombre_categoria, ' ', '-'), 'ñ', 'n'), 'á', 'a'));
        SET NEW.slug = REPLACE(REPLACE(REPLACE(REPLACE(NEW.slug, 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u');
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: tr_marcas_slug_before_insert
-- OBJETIVO: Generar slug automático para marcas
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Normaliza nombre a slug URL-friendly. Trigger para generar slug automáticamente en marcas si no se proporciona uno, se usa el nombre convertido a minúsculas y con espacios reemplazados por guiones
-- ===========================================================

DELIMITER //
CREATE TRIGGER tr_marcas_slug_before_insert
BEFORE INSERT ON marcas
FOR EACH ROW
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(REPLACE(NEW.nombre_marca, ' ', '-'), 'ñ', 'n'), 'á', 'a'));
        SET NEW.slug = REPLACE(REPLACE(REPLACE(REPLACE(NEW.slug, 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u');
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: tr_productos_slug_before_insert
-- OBJETIVO: Generar slug automático para productos
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Normaliza nombre a slug URL-friendly. Trigger para generar slug automáticamente en productos si no se proporciona uno, se usa el nombre convertido a minúsculas y con espacios reemplazados por guiones
-- ===========================================================

DELIMITER //
CREATE TRIGGER tr_productos_slug_before_insert
BEFORE INSERT ON productos
FOR EACH ROW
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(REPLACE(NEW.nombre, ' ', '-'), 'ñ', 'n'), 'á', 'a'));
        SET NEW.slug = REPLACE(REPLACE(REPLACE(REPLACE(NEW.slug, 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u');
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: trg_before_insert_categorias
-- OBJETIVO: Generar slug automático y validar nombre duplicado
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: 
--   - Genera el slug URL-friendly si no se proporciona.
--   - Evita duplicados de nombre de categoría activos.
--   - Normaliza tildes y eñes.
-- ===========================================================

DELIMITER //
CREATE TRIGGER trg_before_insert_categorias
BEFORE INSERT ON categorias
FOR EACH ROW
BEGIN
    DECLARE v_count INT;

    -- Validar duplicado de nombre
    SELECT COUNT(*) INTO v_count
    FROM categorias
    WHERE LOWER(nombre_categoria) = LOWER(NEW.nombre_categoria)
      AND activo = TRUE;

    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe una categoría activa con ese nombre';
    END IF;

    -- Generar slug automático si no se proporciona
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(REPLACE(NEW.nombre_categoria, ' ', '-'), 'ñ', 'n'), 'á', 'a'));
        SET NEW.slug = REPLACE(REPLACE(REPLACE(REPLACE(NEW.slug, 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u');
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: trg_before_insert_marcas
-- OBJETIVO: Generar slug automático y validar nombre duplicado
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: 
--   - Genera el slug URL-friendly si no se proporciona.
--   - Evita duplicados de nombre de marca activos.
--   - Normaliza tildes y eñes.
-- ===========================================================

DELIMITER //
CREATE TRIGGER trg_before_insert_marcas
BEFORE INSERT ON marcas
FOR EACH ROW
BEGIN
    DECLARE v_count INT;

    -- Validar duplicado de nombre
    SELECT COUNT(*) INTO v_count
    FROM marcas
    WHERE LOWER(nombre_marca) = LOWER(NEW.nombre_marca)
      AND activo = TRUE;

    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe una marca activa con ese nombre';
    END IF;

    -- Generar slug automático si no se proporciona
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(REPLACE(NEW.nombre_marca, ' ', '-'), 'ñ', 'n'), 'á', 'a'));
        SET NEW.slug = REPLACE(REPLACE(REPLACE(REPLACE(NEW.slug, 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u');
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: trg_before_insert_productos
-- OBJETIVO: Generar slug automático y validar nombre duplicado
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: 
--   - Genera slug si no se proporciona.
--   - Evita duplicados de nombre de producto activos dentro de la misma categoría.
--   - Normaliza caracteres especiales.
-- ===========================================================

DELIMITER //
CREATE TRIGGER trg_before_insert_productos
BEFORE INSERT ON productos
FOR EACH ROW
BEGIN
    DECLARE v_count INT;

    -- Validar duplicado dentro de la misma categoría
    SELECT COUNT(*) INTO v_count
    FROM productos
    WHERE LOWER(nombre) = LOWER(NEW.nombre)
      AND id_categoria = NEW.id_categoria
      AND activo = TRUE;

    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ya existe un producto activo con ese nombre en la misma categoría';
    END IF;

    -- Generar slug automático si no se proporciona
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        SET NEW.slug = LOWER(REPLACE(REPLACE(REPLACE(NEW.nombre, ' ', '-'), 'ñ', 'n'), 'á', 'a'));
        SET NEW.slug = REPLACE(REPLACE(REPLACE(REPLACE(NEW.slug, 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u');
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: trg_after_update_productos
-- OBJETIVO: Registrar cambios importantes en productos (precio, stock, estado)
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: 
--   - Detecta cambios en precio, stock o activo.
--   - Inserta registros de auditoría en la tabla logs.
--   - Permite trazabilidad de modificaciones relevantes.
-- ===========================================================

DELIMITER //
CREATE TRIGGER trg_after_update_productos
AFTER UPDATE ON productos
FOR EACH ROW
BEGIN
    DECLARE v_cambios TEXT DEFAULT '';

    IF OLD.precio <> NEW.precio THEN
        SET v_cambios = CONCAT(v_cambios, 'Precio cambiado de ', OLD.precio, ' a ', NEW.precio, '. ');
    END IF;

    IF OLD.stock <> NEW.stock THEN
        SET v_cambios = CONCAT(v_cambios, 'Stock cambiado de ', OLD.stock, ' a ', NEW.stock, '. ');
    END IF;

    IF OLD.activo <> NEW.activo THEN
        SET v_cambios = CONCAT(v_cambios, 'Estado activo cambiado de ', OLD.activo, ' a ', NEW.activo, '. ');
    END IF;

    -- Solo registrar si hubo cambios relevantes
    IF v_cambios <> '' THEN
        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (NULL, 'UPDATE', 'ACTUALIZAR_PRODUCTO', 
                CONCAT('Producto ID: ', NEW.id_producto, '. ', v_cambios));
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- TRIGGER: trg_after_insert_ofertas
-- OBJETIVO: Registrar creación de ofertas en logs
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Auditoría de ofertas creadas
-- ===========================================================

DELIMITER //
CREATE TRIGGER trg_after_insert_ofertas
AFTER INSERT ON ofertas
FOR EACH ROW
BEGIN
    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (NEW.id_usuario_creacion, 'INSERT', 'CREAR_OFERTA', 
            CONCAT('Oferta creada para producto ID: ', NEW.id_producto, ' - Descuento: ', NEW.descuento_porcentaje, '%'));
END//
DELIMITER ;

---------------------------------------------------------------------------------------

-- STORED PROCEDURES

-- ===========================================================
-- STORED PROCEDURE: sp_crear_producto
-- OBJETIVO: Inserta un nuevo producto validando que no exista el mismo SKU
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Usa transacciones y registra en logs para auditoría
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_crear_producto(
    IN p_nombre VARCHAR(200),
    IN p_slug VARCHAR(250),
    IN p_sku VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_precio DECIMAL(10,2),
    IN p_stock INT,
    IN p_id_categoria INT,
    IN p_id_marca INT,
    IN p_imagen_url VARCHAR(500),
    IN p_galeria_imagenes JSON,
    IN p_usuario INT,
    OUT p_id_producto INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_sku_existe INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_mensaje = 'Error al crear producto';
        SET p_id_producto = NULL;
    END;

    START TRANSACTION;

    IF p_sku IS NOT NULL THEN
        SELECT COUNT(*) INTO v_sku_existe FROM productos WHERE sku = p_sku;
        IF v_sku_existe > 0 THEN
            SET p_mensaje = 'El SKU ya existe';
            SET p_id_producto = NULL;
            ROLLBACK;
        ELSE
            INSERT INTO productos (
                nombre, slug, sku, descripcion, precio, stock,
                id_categoria, id_marca, imagen_url, galeria_imagenes, activo
            ) VALUES (
                p_nombre, p_slug, p_sku, p_descripcion, p_precio, p_stock,
                p_id_categoria, p_id_marca, p_imagen_url, p_galeria_imagenes, TRUE
            );
            
            SET p_id_producto = LAST_INSERT_ID();
            SET p_mensaje = 'Producto creado exitosamente';
            
            INSERT INTO logs (id_usuario, operacion, accion, descripcion)
            VALUES (p_usuario, 'INSERT', 'CREAR_PRODUCTO', CONCAT('Producto creado ID: ', p_id_producto));
            
            COMMIT;
        END IF;
    ELSE
        INSERT INTO productos (
            nombre, slug, descripcion, precio, stock,
            id_categoria, id_marca, imagen_url, galeria_imagenes, activo
        ) VALUES (
            p_nombre, p_slug, p_descripcion, p_precio, p_stock,
            p_id_categoria, p_id_marca, p_imagen_url, p_galeria_imagenes, TRUE
        );
        
        SET p_id_producto = LAST_INSERT_ID();
        SET p_mensaje = 'Producto creado exitosamente';
        
        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (p_usuario, 'INSERT', 'CREAR_PRODUCTO', CONCAT('Producto creado ID: ', p_id_producto));
        
        COMMIT;
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- STORED PROCEDURE: sp_actualizar_producto
-- OBJETIVO: Actualizar datos de un producto existente usando COALESCE
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Solo actualiza campos no nulos, usa transacciones y logs
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_actualizar_producto(
    IN p_id_producto INT,
    IN p_nombre VARCHAR(200),
    IN p_slug VARCHAR(250),
    IN p_descripcion TEXT,
    IN p_precio DECIMAL(10,2),
    IN p_stock INT,
    IN p_id_categoria INT,
    IN p_id_marca INT,
    IN p_imagen_url VARCHAR(500),
    IN p_galeria_imagenes JSON,
    IN p_activo TINYINT,
    IN p_usuario INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE productos
    SET 
        nombre = COALESCE(p_nombre, nombre),
        slug = COALESCE(p_slug, slug),
        descripcion = COALESCE(p_descripcion, descripcion),
        precio = COALESCE(p_precio, precio),
        stock = COALESCE(p_stock, stock),
        id_categoria = COALESCE(p_id_categoria, id_categoria),
        id_marca = COALESCE(p_id_marca, id_marca),
        imagen_url = COALESCE(p_imagen_url, imagen_url),
        galeria_imagenes = COALESCE(p_galeria_imagenes, galeria_imagenes),
        activo = COALESCE(p_activo, activo)
    WHERE id_producto = p_id_producto;

    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (p_usuario, 'UPDATE', 'ACTUALIZAR_PRODUCTO', CONCAT('Producto actualizado ID: ', p_id_producto));

    COMMIT;
END//
DELIMITER ;

-- ===========================================================
-- STORED PROCEDURE: sp_eliminar_producto
-- OBJETIVO: Realizar eliminación lógica (soft delete) de producto
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Desactiva producto sin eliminarlo físicamente, usa transacciones
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_eliminar_producto(
    IN p_id_producto INT,
    IN p_usuario INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE productos
    SET activo = FALSE
    WHERE id_producto = p_id_producto;

    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (p_usuario, 'DELETE', 'ELIMINAR_PRODUCTO', CONCAT('Producto desactivado ID: ', p_id_producto));

    COMMIT;
END//
DELIMITER ;

-- ===========================================================
-- STORED PROCEDURE: sp_crear_oferta_segura
-- OBJETIVO: Crear oferta con validaciones previas de negocio
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Valida producto activo, stock disponible y precio menor al actual
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_crear_oferta_segura(
    IN p_id_producto INT,
    IN p_precio_oferta DECIMAL(10,2),
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME,
    IN p_usuario INT,
    OUT p_id_oferta INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_precio_actual DECIMAL(10,2);
    DECLARE v_stock_actual INT;
    DECLARE v_producto_activo TINYINT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_mensaje = 'Error al crear oferta';
        SET p_id_oferta = NULL;
    END;

    START TRANSACTION;

    SELECT precio, stock, activo 
    INTO v_precio_actual, v_stock_actual, v_producto_activo
    FROM productos
    WHERE id_producto = p_id_producto;
    
    IF v_producto_activo = FALSE THEN
        SET p_mensaje = 'El producto no está activo';
        SET p_id_oferta = NULL;
        ROLLBACK;
    ELSEIF v_stock_actual <= 0 THEN
        SET p_mensaje = 'El producto no tiene stock disponible';
        SET p_id_oferta = NULL;
        ROLLBACK;
    ELSEIF p_precio_oferta >= v_precio_actual THEN
        SET p_mensaje = 'El precio de oferta debe ser menor al precio actual';
        SET p_id_oferta = NULL;
        ROLLBACK;
    ELSE
        INSERT INTO ofertas (
            id_producto, precio_original, precio_oferta,
            fecha_inicio, fecha_fin, id_usuario_creacion, activo
        ) VALUES (
            p_id_producto, v_precio_actual, p_precio_oferta,
            p_fecha_inicio, p_fecha_fin, p_usuario, TRUE
        );
        
        SET p_id_oferta = LAST_INSERT_ID();
        SET p_mensaje = 'Oferta creada exitosamente';

        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (p_usuario, 'INSERT', 'CREAR_OFERTA', CONCAT('Oferta creada ID: ', p_id_oferta));

        COMMIT;
    END IF;
END//
DELIMITER ;

-- ===========================================================
-- STORED PROCEDURE: sp_obtener_productos_por_categoria
-- OBJETIVO: Listar productos filtrados por categoría con paginación
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Permite filtrar por estado activo, ordenados por fecha descendente. Obtiene una lista paginada de productos filtrados por categoría. Permite filtrar opcionalmente por estado activo/inactivo. Retorna información completa del producto junto con el nombre de su categoría y marca. Ordena los resultados por fecha de creación descendente (más recientes primero) y soporta paginación mediante LIMIT y OFFSET
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_obtener_productos_por_categoria(
    IN p_id_categoria INT,
    IN p_activo BOOLEAN,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        p.id_producto,
        p.nombre,
        p.slug,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen_url,
        p.galeria_imagenes,
        c.nombre_categoria,
        m.nombre_marca
    FROM productos p
    INNER JOIN categorias c ON p.id_categoria = c.id_categoria
    INNER JOIN marcas m ON p.id_marca = m.id_marca
    WHERE p.id_categoria = p_id_categoria
    AND (p_activo IS NULL OR p.activo = p_activo)
    ORDER BY p.fecha_creacion DESC
    LIMIT p_limit OFFSET p_offset;
END//
DELIMITER ;

-- ===========================================================
-- STORED PROCEDURE: sp_buscar_productos
-- OBJETIVO: Motor de búsqueda avanzada con múltiples filtros opcionales
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Permite buscar por término, categoría, marca y rango de precios. Solo retorna productos activos de categorías y marcas activas. Los resultados se ordenan alfabéticamente por nombre y soporta paginación.
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_buscar_productos(
    IN p_termino VARCHAR(200),
    IN p_id_categoria INT,
    IN p_id_marca INT,
    IN p_precio_min DECIMAL(10,2),
    IN p_precio_max DECIMAL(10,2),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    -- Declarar variables con collation explícita
    DECLARE termino_busqueda VARCHAR(202) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    
    -- Preparar término de búsqueda si existe
    IF p_termino IS NOT NULL THEN
        SET termino_busqueda = CONCAT('%', p_termino, '%');
    END IF;

    SELECT 
        p.id_producto,
        p.nombre,
        p.slug,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen_url,
        p.galeria_imagenes,
        c.nombre_categoria,
        m.nombre_marca
    FROM productos p
    INNER JOIN categorias c ON p.id_categoria = c.id_categoria
    INNER JOIN marcas m ON p.id_marca = m.id_marca
    WHERE p.activo = TRUE
    AND c.activo = TRUE
    AND m.activo = TRUE
    AND (p_termino IS NULL OR 
         p.nombre LIKE termino_busqueda OR 
         p.descripcion LIKE termino_busqueda)
    AND (p_id_categoria IS NULL OR p.id_categoria = p_id_categoria)
    AND (p_id_marca IS NULL OR p.id_marca = p_id_marca)
    AND (p_precio_min IS NULL OR p.precio >= p_precio_min)
    AND (p_precio_max IS NULL OR p.precio <= p_precio_max)
    ORDER BY p.nombre ASC
    LIMIT p_limit OFFSET p_offset;
END//
DELIMITER ;

-- ===========================================================
-- STORED PROCEDURE: sp_top_productos_vendidos
-- OBJETIVO: Obtener productos más vendidos
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Calcula ventas desde detalle_pedido
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_top_productos_vendidos(
    IN p_limite INT,
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE
)
BEGIN
    SELECT 
        p.id_producto,
        p.nombre,
        p.slug,
        p.precio,
        p.imagen_url,
        c.nombre_categoria,
        m.nombre_marca,
        SUM(dp.cantidad) AS total_vendido,
        SUM(dp.cantidad * dp.precio_unitario) AS ingresos_totales
    FROM productos p
    INNER JOIN detalle_pedido dp ON p.id_producto = dp.id_producto
    INNER JOIN pedidos ped ON dp.id_pedido = ped.id_pedido
    INNER JOIN categorias c ON p.id_categoria = c.id_categoria
    INNER JOIN marcas m ON p.id_marca = m.id_marca
    WHERE ped.estado IN ('pagado', 'enviado', 'entregado')
    AND (p_fecha_inicio IS NULL OR DATE(ped.fecha_pedido) >= p_fecha_inicio)
    AND (p_fecha_fin IS NULL OR DATE(ped.fecha_pedido) <= p_fecha_fin)
    GROUP BY p.id_producto
    ORDER BY total_vendido DESC
    LIMIT p_limite;
END//
DELIMITER ;

-- ===========================================================
-- STORED PROCEDURE: sp_cerrar_ofertas_vencidas
-- OBJETIVO: Desactivar ofertas cuya fecha fin haya pasado
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Se ejecuta periódicamente para mantener ofertas actualizadas
-- ===========================================================

DELIMITER //
CREATE PROCEDURE sp_cerrar_ofertas_vencidas(
    IN p_usuario INT
)
BEGIN
    DECLARE v_ofertas_cerradas INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE ofertas
    SET activo = FALSE
    WHERE activo = TRUE
    AND fecha_fin < NOW();

    SET v_ofertas_cerradas = ROW_COUNT();

    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (p_usuario, 'UPDATE', 'CERRAR_OFERTAS_VENCIDAS', 
            CONCAT('Se cerraron ', v_ofertas_cerradas, ' ofertas vencidas'));

    COMMIT;

    SELECT v_ofertas_cerradas AS ofertas_cerradas;
END//
DELIMITER ;


---------------------------------------------------------------------------------------

-- VISTAS

-- ===========================================================
-- VISTA: vw_productos_completo
-- OBJETIVO: Vista administrativa con información completa de productos
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Incluye productos activos e inactivos. Vista administrativa que muestra información completa de todos los productos (activos e inactivos) con datos relacionados de categorías y marcas; incluye todos los campos del producto más información detallada de categoría (ID, nombre, slug) y marca (ID, nombre, slug, logo)
-- ===========================================================

CREATE VIEW vw_productos_completo AS
SELECT 
    p.id_producto,
    p.nombre,
    p.slug,
    p.descripcion,
    p.precio,
    p.stock,
    p.imagen_url,
    p.galeria_imagenes,
    p.activo,
    p.fecha_creacion,
    p.fecha_modificacion,
    c.id_categoria,
    c.nombre_categoria,
    c.slug AS categoria_slug,
    m.id_marca,
    m.nombre_marca,
    m.slug AS marca_slug,
    m.logo_url AS marca_logo
FROM productos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
INNER JOIN marcas m ON p.id_marca = m.id_marca;

-- ===========================================================
-- VISTA: vw_catalogo_publico
-- OBJETIVO: Catálogo de productos disponibles para venta
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Solo productos activos con stock. Vista pública optimizada para mostrar el catálogo de productos disponibles para la venta
-- ===========================================================

CREATE VIEW vw_catalogo_publico AS
SELECT 
    p.id_producto,
    p.nombre,
    p.slug,
    p.descripcion,
    p.precio,
    p.stock,
    p.imagen_url,
    p.galeria_imagenes,
    c.nombre_categoria,
    c.slug AS categoria_slug,
    m.nombre_marca,
    m.slug AS marca_slug,
    m.logo_url AS marca_logo
FROM productos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
INNER JOIN marcas m ON p.id_marca = m.id_marca
WHERE p.activo = TRUE 
AND c.activo = TRUE 
AND m.activo = TRUE
AND p.stock > 0;

-- ===========================================================
-- VISTA: vw_ofertas_vigentes
-- OBJETIVO: Ofertas actualmente válidas con información completa
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Filtra por fecha actual y calcula días restantes. Muestra ofertas actualmente válidas con información completa del producto asociado, filtra automáticamente ofertas activas cuya fecha actual esté dentro del rango fecha_inicio y fecha_fin. Solo incluye productos activos con stock disponible, calcula los días restantes de la oferta mediante DATEDIFF, incluye toda la información necesaria para mostrar ofertas en el sitio web: precios, descuentos, datos del producto, categoría y marca.
-- ===========================================================

CREATE VIEW vw_ofertas_vigentes AS
SELECT 
    o.id_oferta,
    o.id_producto,
    p.nombre AS producto_nombre,
    p.slug AS producto_slug,
    p.imagen_url,
    o.precio_original,
    o.precio_oferta,
    o.descuento_porcentaje,
    o.fecha_inicio,
    o.fecha_fin,
    c.nombre_categoria,
    m.nombre_marca,
    DATEDIFF(o.fecha_fin, NOW()) AS dias_restantes
FROM ofertas o
INNER JOIN productos p ON o.id_producto = p.id_producto
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
INNER JOIN marcas m ON p.id_marca = m.id_marca
WHERE o.activo = TRUE
AND p.activo = TRUE
AND c.activo = TRUE
AND m.activo = TRUE
AND NOW() BETWEEN o.fecha_inicio AND o.fecha_fin
AND p.stock > 0;

-- ===========================================================
-- VISTA: vw_usuarios_con_cupones
-- OBJETIVO: Usuarios con sus cupones utilizados
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Muestra historial de uso de cupones por usuario
-- ===========================================================

CREATE VIEW vw_usuarios_con_cupones AS
SELECT 
    u.id_usuario,
    u.nombre,
    u.apellido,
    u.email,
    c.codigo AS codigo_cupon,
    c.tipo_descuento,
    c.valor_descuento,
    cu.fecha_uso,
    cu.monto_pedido,
    cu.estado AS estado_uso,
    p.id_pedido
FROM usuarios u
INNER JOIN cupones_uso cu ON u.id_usuario = cu.id_usuario
INNER JOIN cupones c ON cu.id_cupon = c.id_cupon
LEFT JOIN pedidos p ON cu.id_pedido = p.id_pedido
WHERE cu.estado = 'aplicado'
ORDER BY cu.fecha_uso DESC;

-- ===========================================================
-- VISTA: vw_banners_visibles
-- OBJETIVO: Banners activos y vigentes
-- AUTOR: Renzo
-- FECHA: 2025-10-24
-- NOTAS: Filtra por estado activo y fechas de vigencia
-- ===========================================================

CREATE VIEW vw_banners_visibles AS
SELECT 
    b.id_banner,
    b.titulo,
    b.subtitulo,
    b.imagen_url,
    b.enlace_url,
    b.seccion,
    b.orden,
    b.fecha_inicio,
    b.fecha_fin,
    DATEDIFF(b.fecha_fin, NOW()) AS dias_restantes
FROM banners b
WHERE b.activo = TRUE
AND (b.fecha_inicio IS NULL OR NOW() >= b.fecha_inicio)
AND (b.fecha_fin IS NULL OR NOW() <= b.fecha_fin)
ORDER BY b.seccion, b.orden;

