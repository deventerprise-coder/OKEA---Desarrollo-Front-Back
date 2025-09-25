-- =====================================================
-- OKEA E-COMMERCE - BACKEND 3: MARKETING Y EXPERIENCIA
-- Desarrollador: Luis
-- Fecha: 2025-01-25
-- Descripción: Tablas para gestión de ofertas, banners y favoritos
-- =====================================================

-- Tabla de ofertas
-- Gestiona descuentos y promociones de productos
CREATE TABLE ofertas (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    descuento_porcentaje DECIMAL(5,2) NOT NULL,
    precio_oferta DECIMAL(10,2) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Claves foráneas
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE CASCADE,

    -- Índices para optimización
    KEY idx_producto (id_producto),
    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo),
    KEY idx_vigente (fecha_inicio, fecha_fin, activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- Tabla de banners
-- Gestiona banners promocionales del sitio web
CREATE TABLE banners (
    id_banner INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255) DEFAULT NULL,
    imagen_url VARCHAR(500) NOT NULL,
    enlace_url VARCHAR(500) DEFAULT NULL,
    seccion ENUM('home_principal', 'home_secundario', 'categoria', 'producto', 'ofertas', 'footer') NOT NULL DEFAULT 'home_principal',
    orden INT DEFAULT 0,
    activo TINYINT(1) DEFAULT 1,
    fecha_inicio DATETIME DEFAULT NULL,
    fecha_fin DATETIME DEFAULT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Índices para optimización
    KEY idx_seccion_orden (seccion, orden),
    KEY idx_activo (activo),
    KEY idx_vigencia (fecha_inicio, fecha_fin, activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- Tabla de favoritos
-- Gestiona productos favoritos de los usuarios
CREATE TABLE favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Claves foráneas
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE CASCADE,

    -- Restricción única para evitar duplicados
    UNIQUE KEY unique_favorito (id_usuario, id_producto),

    -- Índices para optimización
    KEY idx_usuario (id_usuario),
    KEY idx_producto (id_producto),
    KEY idx_fecha (creado_el)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- Tabla de cupones de descuento
-- Gestiona códigos promocionales
CREATE TABLE cupones (
    id_cupon INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    tipo_descuento ENUM('porcentaje', 'monto_fijo') NOT NULL,
    valor_descuento DECIMAL(10,2) NOT NULL,
    monto_minimo DECIMAL(10,2) DEFAULT 0,
    usos_maximos INT DEFAULT NULL,
    usos_actuales INT DEFAULT 0,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Índices para optimización
    KEY idx_codigo (codigo),
    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- Tabla de uso de cupones
-- Registra el uso de cupones por usuario
CREATE TABLE cupones_uso (
    id_uso INT AUTO_INCREMENT PRIMARY KEY,
    id_cupon INT NOT NULL,
    id_usuario INT NOT NULL,
    id_pedido INT DEFAULT NULL,
    fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Claves foráneas
    FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE SET NULL ON UPDATE CASCADE,

    -- Índices para optimización
    KEY idx_cupon (id_cupon),
    KEY idx_usuario (id_usuario),
    KEY idx_pedido (id_pedido),
    KEY idx_fecha (fecha_uso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- Tabla de newsletter/suscripciones
-- Gestiona suscripciones al newsletter
CREATE TABLE newsletter (
    id_suscripcion INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(100) DEFAULT NULL,
    estado ENUM('activo', 'inactivo', 'bloqueado') DEFAULT 'activo',
    fecha_suscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_confirmacion TIMESTAMP NULL DEFAULT NULL,
    token_confirmacion VARCHAR(100) DEFAULT NULL,
    fecha_baja TIMESTAMP NULL DEFAULT NULL,

    -- Índices para optimización
    KEY idx_email (email),
    KEY idx_estado (estado),
    KEY idx_fecha_suscripcion (fecha_suscripcion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- TRIGGERS PARA MARKETING Y EXPERIENCIA
-- =====================================================

-- Trigger para actualizar usos_actuales en cupones
DELIMITER $$
CREATE TRIGGER tr_cupones_uso_insert
    AFTER INSERT ON cupones_uso
    FOR EACH ROW
BEGIN
    UPDATE cupones
    SET usos_actuales = usos_actuales + 1
    WHERE id_cupon = NEW.id_cupon;
END$$
DELIMITER ;

-- Trigger para validar fechas de ofertas
DELIMITER $$
CREATE TRIGGER tr_ofertas_before_insert
    BEFORE INSERT ON ofertas
    FOR EACH ROW
BEGIN
    IF NEW.fecha_fin <= NEW.fecha_inicio THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de fin debe ser posterior a la fecha de inicio';
    END IF;

    IF NEW.descuento_porcentaje < 0 OR NEW.descuento_porcentaje > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El descuento debe estar entre 0 y 100%';
    END IF;

    IF NEW.precio_oferta < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El precio de oferta debe ser mayor a 0';
    END IF;

    IF NEW.valor_descuento IS NOT NULL AND NEW.valor_descuento <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El valor de descuento debe ser mayor a 0';
    END IF;
END$$
DELIMITER ;

-- Trigger para validar cupones antes de insertar
DELIMITER $$
CREATE TRIGGER tr_cupones_before_insert
    BEFORE INSERT ON cupones
    FOR EACH ROW
BEGIN
    IF NEW.fecha_fin <= NEW.fecha_inicio THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de fin debe ser posterior a la fecha de inicio';
    END IF;

    IF NEW.usos_actuales > COALESCE(NEW.usos_maximos, NEW.usos_actuales + 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Los usos actuales no pueden superar los usos máximos';
    END IF;
END$$
DELIMITER ;

-- =====================================================

-- VISTAS PARA MARKETING Y EXPERIENCIA
-- =====================================================

-- Vista de ofertas activas
CREATE VIEW v_ofertas_activas AS
SELECT
    o.id_oferta,
    o.id_producto,
    p.nombre as nombre_producto,
    p.precio as precio_original,
    o.descuento_porcentaje,
    o.precio_oferta,
    o.fecha_inicio,
    o.fecha_fin,
    DATEDIFF(o.fecha_fin, NOW()) as dias_restantes
FROM ofertas o
INNER JOIN productos p ON o.id_producto = p.id_producto
WHERE o.activo = 1
  AND NOW() BETWEEN o.fecha_inicio AND o.fecha_fin
  AND p.activo = 1;

-- Vista de banners activos por sección
CREATE VIEW v_banners_activos AS
SELECT
    id_banner,
    titulo,
    subtitulo,
    imagen_url,
    enlace_url,
    seccion,
    orden
FROM banners
WHERE activo = 1
  AND (fecha_inicio IS NULL OR NOW() >= fecha_inicio)
  AND (fecha_fin IS NULL OR NOW() <= fecha_fin)
ORDER BY seccion, orden;

-- Vista de productos más favoritos
CREATE VIEW v_productos_favoritos AS
SELECT
    p.id_producto,
    p.nombre,
    p.imagen_url,
    COUNT(f.id_favorito) as total_favoritos
FROM productos p
INNER JOIN favoritos f ON p.id_producto = f.id_producto
WHERE p.activo = 1
GROUP BY p.id_producto, p.nombre, p.imagen_url
ORDER BY total_favoritos DESC;

-- Vista de cupones válidos
CREATE VIEW v_cupones_validos AS
SELECT
    id_cupon,
    codigo,
    descripcion,
    tipo_descuento,
    valor_descuento,
    monto_minimo,
    usos_maximos,
    usos_actuales,
    fecha_inicio,
    fecha_fin
FROM cupones
WHERE activo = 1
  AND NOW() BETWEEN fecha_inicio AND fecha_fin
  AND (usos_maximos IS NULL OR usos_actuales < usos_maximos);

-- =====================================================

-- STORED PROCEDURES PARA MARKETING Y EXPERIENCIA
-- =====================================================

-- Procedure para aplicar oferta a producto
DELIMITER $$
CREATE PROCEDURE sp_crear_oferta(
    IN p_id_producto INT,
    IN p_descuento_porcentaje DECIMAL(5,2),
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME
)
BEGIN
    DECLARE v_precio_original DECIMAL(10,2);
    DECLARE v_precio_oferta DECIMAL(10,2);
    DECLARE v_error_msg VARCHAR(255);

    -- Validar parámetros
    IF p_descuento_porcentaje < 0 OR p_descuento_porcentaje > 100 THEN
        SET v_error_msg = 'El descuento debe estar entre 0 y 100%';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    IF p_fecha_fin <= p_fecha_inicio THEN
        SET v_error_msg = 'La fecha de fin debe ser posterior a la fecha de inicio';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    -- Obtener precio original del producto
    SELECT precio INTO v_precio_original
    FROM productos
    WHERE id_producto = p_id_producto AND activo = 1;

    IF v_precio_original IS NULL THEN
        SET v_error_msg = 'Producto no encontrado o inactivo';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END IF;

    -- Calcular precio con oferta
    SET v_precio_oferta = v_precio_original * (1 - p_descuento_porcentaje / 100);

    -- Insertar oferta
    INSERT INTO ofertas (id_producto, descuento_porcentaje, precio_oferta, fecha_inicio, fecha_fin)
    VALUES (p_id_producto, p_descuento_porcentaje, v_precio_oferta, p_fecha_inicio, p_fecha_fin);

    SELECT LAST_INSERT_ID() as id_oferta_creada, v_precio_oferta as precio_final;
END$$
DELIMITER ;

-- Procedure para validar cupón
DELIMITER $$
CREATE PROCEDURE sp_validar_cupon(
    IN p_codigo VARCHAR(50),
    IN p_id_usuario INT,
    IN p_monto_pedido DECIMAL(10,2)
)
BEGIN
    DECLARE v_id_cupon INT DEFAULT NULL;
    DECLARE v_tipo_descuento VARCHAR(20);
    DECLARE v_valor_descuento DECIMAL(10,2);
    DECLARE v_monto_minimo DECIMAL(10,2);
    DECLARE v_usos_maximos INT;
    DECLARE v_usos_actuales INT;

    -- Buscar cupón válido
    SELECT id_cupon, tipo_descuento, valor_descuento, monto_minimo, usos_maximos, usos_actuales
    INTO v_id_cupon, v_tipo_descuento, v_valor_descuento, v_monto_minimo, v_usos_maximos, v_usos_actuales
    FROM cupones
    WHERE codigo = p_codigo
      AND activo = 1
      AND NOW() BETWEEN fecha_inicio AND fecha_fin;

    -- Validaciones
    IF v_id_cupon IS NULL THEN
        SELECT 'ERROR' as status, 'Cupón no válido o expirado' as mensaje, 0 as id_cupon;
    ELSEIF p_monto_pedido < v_monto_minimo THEN
        SELECT 'ERROR' as status, CONCAT('Monto mínimo requerido: $', v_monto_minimo) as mensaje, 0 as id_cupon;
    ELSEIF v_usos_maximos IS NOT NULL AND v_usos_actuales >= v_usos_maximos THEN
        SELECT 'ERROR' as status, 'Cupón agotado' as mensaje, 0 as id_cupon;
    ELSE
        SELECT 'SUCCESS' as status,
               'Cupón válido' as mensaje,
               v_id_cupon as id_cupon,
               v_tipo_descuento as tipo_descuento,
               v_valor_descuento as valor_descuento;
    END IF;
END$$
DELIMITER ;

-- Procedure para obtener estadísticas de marketing
DELIMITER $$
CREATE PROCEDURE sp_estadisticas_marketing()
BEGIN
    SELECT
        'Ofertas Activas' as categoria,
        COUNT(*) as total
    FROM ofertas
    WHERE activo = 1 AND NOW() BETWEEN fecha_inicio AND fecha_fin

    UNION ALL

    SELECT
        'Banners Activos' as categoria,
        COUNT(*) as total
    FROM banners
    WHERE activo = 1

    UNION ALL

    SELECT
        'Total Favoritos' as categoria,
        COUNT(*) as total
    FROM favoritos

    UNION ALL

    SELECT
        'Cupones Válidos' as categoria,
        COUNT(*) as total
    FROM cupones
    WHERE activo = 1 AND NOW() BETWEEN fecha_inicio AND fecha_fin

    UNION ALL

    SELECT
        'Suscriptores Newsletter' as categoria,
        COUNT(*) as total
    FROM newsletter
    WHERE estado = 'activo';
END$$
DELIMITER ;

-- =====================================================

-- DATOS INICIALES PARA TESTING
-- =====================================================

-- Insertar banners de ejemplo
INSERT INTO banners (titulo, subtitulo, imagen_url, seccion, orden, activo) VALUES
('Bienvenido a OKEA', 'Las mejores ofertas te esperan', '/images/banners/banner-principal.jpg', 'home_principal', 1, 1),
('Ofertas de Temporada', 'Hasta 50% de descuento', '/images/banners/banner-ofertas.jpg', 'home_secundario', 1, 1),
('Nueva Colección', 'Descubre lo último en moda', '/images/banners/banner-moda.jpg', 'home_secundario', 2, 1);

-- Insertar cupones de ejemplo
INSERT INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, monto_minimo, usos_maximos, fecha_inicio, fecha_fin, activo) VALUES
('BIENVENIDO10', 'Descuento del 10% para nuevos usuarios', 'porcentaje', 10.00, 50.00, 100, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1),
('ENVIOGRATIS', 'Envío gratis en compras mayores a $100', 'monto_fijo', 15.00, 100.00, NULL, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), 1),
('VERANO2025', 'Descuento especial de verano', 'porcentaje', 25.00, 200.00, 50, NOW(), '2025-03-31 23:59:59', 1);

-- =====================================================
-- FIN DEL ARCHIVO
-- =====================================================
