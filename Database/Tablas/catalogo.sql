CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    descripcion TEXT,

    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_categoria_slug (slug),
    INDEX idx_categoria_activo (activo),
    INDEX idx_categoria_nombre (nombre_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(100) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,

    descripcion TEXT,
    logo_url VARCHAR(500),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_marca_slug (slug),
    INDEX idx_marca_activo (activo),
    INDEX idx_marca_nombre (nombre_marca)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    slug VARCHAR(250) NOT NULL UNIQUE,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    id_categoria INT NOT NULL,
    id_marca INT NOT NULL,
    imagen_url VARCHAR(500),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    galeria_imagenes JSON, -- para múltiples imágenes
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca) ON DELETE RESTRICT ON UPDATE CASCADE,
    
    INDEX idx_producto_slug (slug),
    INDEX idx_producto_categoria (id_categoria),
    INDEX idx_producto_marca (id_marca),
    INDEX idx_producto_activo (activo),
    INDEX idx_producto_precio (precio),
    INDEX idx_producto_stock (stock),
    INDEX idx_producto_nombre (nombre),
    INDEX idx_producto_categoria_activo (id_categoria, activo),
    INDEX idx_producto_marca_activo (id_marca, activo),

    CONSTRAINT chk_precio_positivo CHECK (precio >= 0),
    CONSTRAINT chk_stock_no_negativo CHECK (stock >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ofertas (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    precio_original DECIMAL(10,2) NOT NULL,
    precio_oferta DECIMAL(10,2) NOT NULL,
    descuento_porcentaje DECIMAL(5,2),
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE CASCADE,
    
    INDEX idx_oferta_producto (id_producto),
    INDEX idx_oferta_activo (activo),
    INDEX idx_oferta_fechas (fecha_inicio, fecha_fin),
    INDEX idx_oferta_vigente (activo, fecha_inicio, fecha_fin),
    
    CONSTRAINT chk_precio_oferta_menor CHECK (precio_oferta < precio_original),
    CONSTRAINT chk_porcentaje_valido CHECK (descuento_porcentaje >= 0 AND descuento_porcentaje <= 100),
    CONSTRAINT chk_fechas_validas CHECK (fecha_fin > fecha_inicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TRIGGERS

-- se ejecuta después de actualizar un producto, detecta cuando el stock de un producto pasa de tener unidades disponibles a agotarse completamente, cuando esto ocurre, desactiva automáticamente el producto cambiando su campo activo a FALSE, evitando que aparezca en el catálogo público sin stock disponible.
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

-- se ejecuta antes de insertar una nueva oferta. si no se proporciona el porcentaje de descuent, lo calcula automáticamente usando la fórmula: ((precio_original - precio_oferta) / precio_original) * 100
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

-- trigger para generar slug automáticamente en categorias si no se proporciona uno, se usa el nombre convertido a minúsculas y con espacios reemplazados por guiones
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

-- trigger para generar slug automáticamente en marcas si no se proporciona uno, se usa el nombre convertido a minúsculas y con espacios reemplazados por guiones
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

-- trigger para generar slug automáticamente en productos si no se proporciona uno, se usa el nombre convertido a minúsculas y con espacios reemplazados por guiones
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

-- STORED PROCEDURES

-- sp_crear_producto: Inserta un nuevo producto en la base de datos con todos sus atributos y retorna el ID del producto recién creado
DELIMITER //
CREATE PROCEDURE sp_crear_producto(
    IN p_nombre VARCHAR(200),
    IN p_slug VARCHAR(250),
    IN p_descripcion TEXT,
    IN p_precio DECIMAL(10,2),
    IN p_stock INT,
    IN p_id_categoria INT,
    IN p_id_marca INT,
    IN p_imagen_url VARCHAR(500),
    IN p_galeria_imagenes JSON,
    OUT p_id_producto INT
)
BEGIN
    INSERT INTO productos (
        nombre,
        slug,
        descripcion,
        precio,
        stock,
        id_categoria,
        id_marca,
        imagen_url,
        galeria_imagenes,
        activo
    ) VALUES (
        p_nombre,
        p_slug,
        p_descripcion,
        p_precio,
        p_stock,
        p_id_categoria,
        p_id_marca,
        p_imagen_url,
        p_galeria_imagenes,
        TRUE
    );
    
    SET p_id_producto = LAST_INSERT_ID();
END//
DELIMITER ;

-- sp_actualizar_producto: Modifica los datos de un producto existente identificado por su ID, se actualiza solo los campos que reciben valores no nulos, manteniendo los valores anteriores para los parámetros que vengan como NULL
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
    IN p_activo BOOLEAN
)
BEGIN
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
END//
DELIMITER ;

-- sp_eliminar_producto: No elimina "físicamente" el registro de la base de datos, sino que cambia su campo activo a FALSE
DELIMITER //
CREATE PROCEDURE sp_eliminar_producto(
    IN p_id_producto INT
)
BEGIN
    UPDATE productos
    SET activo = FALSE
    WHERE id_producto = p_id_producto;
END//
DELIMITER ;

-- sp_crear_oferta_segura: crea una oferta con validaciones de negocio previas, verifica que el producto esté activo, tenga stock disponible y que el precio de oferta sea menor al precio actual. Si todas las validaciones pasan, inserta la oferta y retorna su ID. Si falla alguna validación, retorna NULL en el ID y un mensaje descriptivo del error. Registra automáticamente el precio original del producto al momento de crear la oferta.
DELIMITER //
CREATE PROCEDURE sp_crear_oferta_segura(
    IN p_id_producto INT,
    IN p_precio_oferta DECIMAL(10,2),
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME,
    OUT p_id_oferta INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_precio_actual DECIMAL(10,2);
    DECLARE v_stock_actual INT;
    DECLARE v_producto_activo BOOLEAN;
    
    SELECT precio, stock, activo 
    INTO v_precio_actual, v_stock_actual, v_producto_activo
    FROM productos
    WHERE id_producto = p_id_producto;
    
    IF v_producto_activo = FALSE THEN
        SET p_mensaje = 'El producto no está activo';
        SET p_id_oferta = NULL;
    ELSEIF v_stock_actual <= 0 THEN
        SET p_mensaje = 'El producto no tiene stock disponible';
        SET p_id_oferta = NULL;
    ELSEIF p_precio_oferta >= v_precio_actual THEN
        SET p_mensaje = 'El precio de oferta debe ser menor al precio actual';
        SET p_id_oferta = NULL;
    ELSE
        INSERT INTO ofertas (
            id_producto,
            precio_original,
            precio_oferta,
            fecha_inicio,
            fecha_fin,
            activo
        ) VALUES (
            p_id_producto,
            v_precio_actual,
            p_precio_oferta,
            p_fecha_inicio,
            p_fecha_fin,
            TRUE
        );
        
        SET p_id_oferta = LAST_INSERT_ID();
        SET p_mensaje = 'Oferta creada exitosamente';
    END IF;
END//
DELIMITER ;

-- obtiene una lista paginada de productos filtrados por categoría. Permite filtrar opcionalmente por estado activo/inactivo. Retorna información completa del producto junto con el nombre de su categoría y marca. Ordena los resultados por fecha de creación descendente (más recientes primero) y soporta paginación mediante LIMIT y OFFSET
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

-- procedimiento para búsqueda de productos, solo retorna productos activos de categorías y marcas activas. Los resultados se ordenan alfabéticamente por nombre y soporta paginación.
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

-- VISTAS

-- Vista administrativa que muestra información completa de todos los productos (activos e inactivos) con datos relacionados de categorías y marcas; incluye todos los campos del producto más información detallada de categoría (ID, nombre, slug) y marca (ID, nombre, slug, logo)
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

-- Vista pública optimizada para mostrar el catálogo de productos disponibles para la venta
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

-- vw_ofertas_vigentes: muestra ofertas actualmente válidas con información completa del producto asociado, filtra automáticamente ofertas activas cuya fecha actual esté dentro del rango fecha_inicio y fecha_fin. Solo incluye productos activos con stock disponible, calcula los días restantes de la oferta mediante DATEDIFF, incluye toda la información necesaria para mostrar ofertas en el sitio web: precios, descuentos, datos del producto, categoría y marca.

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