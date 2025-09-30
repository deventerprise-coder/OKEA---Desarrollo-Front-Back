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

-- trigger para generar slug automáticamente en categorias
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

-- trigger para generar slug automáticamente en marcas
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

-- trigger para generar slug automáticamente en productos
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

-- procedimiento para obtener productos por categoría
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

-- procedimiento para búsqueda de productos
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

-- vista para productos con información completa
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

-- vista para catálogo público (solo activos)
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