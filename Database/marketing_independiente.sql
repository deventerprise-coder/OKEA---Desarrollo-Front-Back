-- =====================================================
-- OKEA E-COMMERCE - BACKEND 3: MARKETING Y EXPERIENCIA (INDEPENDIENTE)
-- Desarrollador: Luis
-- Fecha: 2025-01-25
-- Descripción: Tablas independientes para testing sin dependencias externas
-- =====================================================

-- =====================================================
-- TABLAS PRINCIPALES DE MARKETING (SIN DEPENDENCIAS)
-- =====================================================

-- Tabla de banners (COMPLETAMENTE INDEPENDIENTE)
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

-- Tabla de cupones (COMPLETAMENTE INDEPENDIENTE)
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

-- Tabla de newsletter (COMPLETAMENTE INDEPENDIENTE)
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

-- Tabla de ofertas (CON REFERENCIA FLEXIBLE)
-- Gestiona descuentos y promociones de productos
-- NOTA: Se conectará con productos cuando esté disponible
CREATE TABLE ofertas (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL, -- Referencia que se conectará después
    nombre_producto VARCHAR(255) DEFAULT NULL, -- Temporal para testing
    descuento_porcentaje DECIMAL(5,2) NOT NULL,
    precio_original DECIMAL(10,2) DEFAULT NULL, -- Temporal para testing
    precio_oferta DECIMAL(10,2) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Índices para optimización
    KEY idx_producto (id_producto),
    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo),
    KEY idx_vigente (fecha_inicio, fecha_fin, activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- Tabla de favoritos (CON REFERENCIA FLEXIBLE)
-- Gestiona productos favoritos de los usuarios
-- NOTA: Se conectará con usuarios y productos cuando estén disponibles
CREATE TABLE favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL, -- Referencia que se conectará después
    id_producto INT NOT NULL, -- Referencia que se conectará después
    email_usuario VARCHAR(255) DEFAULT NULL, -- Temporal para testing
    nombre_producto VARCHAR(255) DEFAULT NULL, -- Temporal para testing
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Restricción única temporal
    UNIQUE KEY unique_favorito_temp (id_usuario, id_producto),

    -- Índices para optimización
    KEY idx_usuario (id_usuario),
    KEY idx_producto (id_producto),
    KEY idx_fecha (creado_el),
    KEY idx_email (email_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- Tabla de uso de cupones (CON REFERENCIA FLEXIBLE)
-- Registra el uso de cupones por usuario
-- NOTA: Se conectará con usuarios y pedidos cuando estén disponibles
CREATE TABLE cupones_uso (
    id_uso INT AUTO_INCREMENT PRIMARY KEY,
    id_cupon INT NOT NULL,
    id_usuario INT NOT NULL, -- Referencia que se conectará después
    id_pedido INT DEFAULT NULL, -- Referencia que se conectará después
    email_usuario VARCHAR(255) DEFAULT NULL, -- Temporal para testing
    monto_pedido DECIMAL(10,2) DEFAULT NULL, -- Temporal para testing
    fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Clave foránea solo para cupones (existe en este script)
    FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon) ON DELETE CASCADE ON UPDATE CASCADE,

    -- Índices para optimización
    KEY idx_cupon (id_cupon),
    KEY idx_usuario (id_usuario),
    KEY idx_pedido (id_pedido),
    KEY idx_fecha (fecha_uso),
    KEY idx_email (email_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================

-- TRIGGERS (SOLO PARA TABLAS INDEPENDIENTES)
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

    IF NEW.valor_descuento <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El valor de descuento debe ser mayor a 0';
    END IF;
END$$
DELIMITER ;

-- Trigger para validar ofertas
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
END$$
DELIMITER ;

-- =====================================================

-- VISTAS (SOLO PARA TABLAS INDEPENDIENTES)
-- =====================================================

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
    CASE
        WHEN usos_maximos IS NULL THEN 'ILIMITADO'
        ELSE CAST((usos_maximos - usos_actuales) AS CHAR)
    END as usos_restantes,
    fecha_inicio,
    fecha_fin
FROM cupones
WHERE activo = 1
  AND NOW() BETWEEN fecha_inicio AND fecha_fin
  AND (usos_maximos IS NULL OR usos_actuales < usos_maximos);

-- Vista de ofertas activas (con datos temporales)
CREATE VIEW v_ofertas_activas AS
SELECT
    id_oferta,
    id_producto,
    COALESCE(nombre_producto, CONCAT('Producto ', id_producto)) as nombre_producto,
    precio_original,
    descuento_porcentaje,
    precio_oferta,
    fecha_inicio,
    fecha_fin,
    DATEDIFF(fecha_fin, NOW()) as dias_restantes,
    CASE
        WHEN precio_original IS NOT NULL THEN ROUND(precio_original - precio_oferta, 2)
        ELSE NULL
    END as ahorro_pesos
FROM ofertas
WHERE activo = 1
  AND NOW() BETWEEN fecha_inicio AND fecha_fin;

-- =====================================================

-- STORED PROCEDURES (INDEPENDIENTES)
-- =====================================================

-- Procedure para validar cupón (independiente)
DELIMITER $$
CREATE PROCEDURE sp_validar_cupon_independiente(
    IN p_codigo VARCHAR(50),
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

    -- Validaciones y resultado
    IF v_id_cupon IS NULL THEN
        SELECT 'ERROR' as status, 'Cupón no válido o expirado' as mensaje, 0 as id_cupon, 0 as descuento_calculado;
    ELSEIF p_monto_pedido < v_monto_minimo THEN
        SELECT 'ERROR' as status, CONCAT('Monto mínimo requerido: $', v_monto_minimo) as mensaje, 0 as id_cupon, 0 as descuento_calculado;
    ELSEIF v_usos_maximos IS NOT NULL AND v_usos_actuales >= v_usos_maximos THEN
        SELECT 'ERROR' as status, 'Cupón agotado' as mensaje, 0 as id_cupon, 0 as descuento_calculado;
    ELSE
        -- Calcular descuento
        SET @descuento_final = CASE
            WHEN v_tipo_descuento = 'porcentaje' THEN p_monto_pedido * (v_valor_descuento / 100)
            ELSE v_valor_descuento
        END;

        SELECT 'SUCCESS' as status,
               'Cupón válido' as mensaje,
               v_id_cupon as id_cupon,
               v_tipo_descuento as tipo_descuento,
               v_valor_descuento as valor_descuento,
               @descuento_final as descuento_calculado;
    END IF;
END$$
DELIMITER ;

-- Procedure para estadísticas de marketing
DELIMITER $$
CREATE PROCEDURE sp_estadisticas_marketing_independiente()
BEGIN
    SELECT
        'Banners Activos' as categoria,
        COUNT(*) as total,
        'Totalmente funcional' as estado
    FROM banners
    WHERE activo = 1

    UNION ALL

    SELECT
        'Cupones Válidos' as categoria,
        COUNT(*) as total,
        'Totalmente funcional' as estado
    FROM cupones
    WHERE activo = 1 AND NOW() BETWEEN fecha_inicio AND fecha_fin

    UNION ALL

    SELECT
        'Newsletter Activos' as categoria,
        COUNT(*) as total,
        'Totalmente funcional' as estado
    FROM newsletter
    WHERE estado = 'activo'

    UNION ALL

    SELECT
        'Ofertas (sin productos)' as categoria,
        COUNT(*) as total,
        'Esperando tabla productos' as estado
    FROM ofertas
    WHERE activo = 1

    UNION ALL

    SELECT
        'Favoritos (sin usuarios)' as categoria,
        COUNT(*) as total,
        'Esperando tablas usuarios/productos' as estado
    FROM favoritos;
END$$
DELIMITER ;

-- =====================================================

-- DATOS DE PRUEBA (COMPLETAMENTE FUNCIONALES)
-- =====================================================

-- Banners de prueba
INSERT INTO banners (titulo, subtitulo, imagen_url, seccion, orden, activo) VALUES
('¡Bienvenido a OKEA!', 'Las mejores ofertas del mercado te esperan', '/images/banners/banner-principal.jpg', 'home_principal', 1, 1),
('Ofertas de Enero 2025', 'Hasta 50% de descuento en tecnología', '/images/banners/banner-ofertas.jpg', 'home_secundario', 1, 1),
('Nueva Colección Verano', 'Descubre las últimas tendencias', '/images/banners/banner-moda.jpg', 'home_secundario', 2, 1),
('Envío Gratis', 'En compras superiores a $100', '/images/banners/envio-gratis.jpg', 'footer', 1, 1);

-- Cupones de prueba
INSERT INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, monto_minimo, usos_maximos, fecha_inicio, fecha_fin, activo) VALUES
('BIENVENIDO10', 'Descuento del 10% para nuevos usuarios', 'porcentaje', 10.00, 50.00, 100, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1),
('ENVIOGRATIS', 'Envío gratis en compras mayores a $100', 'monto_fijo', 15.00, 100.00, NULL, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), 1),
('TECH25', 'Descuento especial en tecnología', 'porcentaje', 25.00, 200.00, 50, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), 1),
('PRIMERAVEZ', 'Descuento para primera compra', 'monto_fijo', 20.00, 80.00, 200, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), 1);

-- Newsletter de prueba
INSERT INTO newsletter (email, nombre, estado) VALUES
('marketing@okea.com', 'Equipo Marketing OKEA', 'activo'),
('luis@okea.com', 'Luis - Backend Marketing', 'activo'),
('test1@ejemplo.com', 'Usuario Test 1', 'activo'),
('test2@ejemplo.com', 'Usuario Test 2', 'inactivo'),
('spam@bloqueado.com', NULL, 'bloqueado');

-- Ofertas de prueba (con datos temporales)
INSERT INTO ofertas (id_producto, nombre_producto, descuento_porcentaje, precio_original, precio_oferta, fecha_inicio, fecha_fin) VALUES
(1, 'iPhone 15 Pro 256GB', 15.00, 1299.99, 1104.99, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),
(2, 'Samsung Galaxy S24 Ultra', 10.00, 1199.99, 1079.99, NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY)),
(3, 'MacBook Air M3', 20.00, 1499.99, 1199.99, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY)),
(4, 'Nike Air Max 270', 25.00, 159.99, 119.99, NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY));

-- Favoritos de prueba (con datos temporales)
INSERT INTO favoritos (id_usuario, id_producto, email_usuario, nombre_producto) VALUES
(1, 1, 'usuario1@test.com', 'iPhone 15 Pro 256GB'),
(1, 3, 'usuario1@test.com', 'MacBook Air M3'),
(2, 2, 'usuario2@test.com', 'Samsung Galaxy S24 Ultra'),
(2, 4, 'usuario2@test.com', 'Nike Air Max 270'),
(3, 1, 'usuario3@test.com', 'iPhone 15 Pro 256GB');

-- Uso de cupones de prueba
INSERT INTO cupones_uso (id_cupon, id_usuario, email_usuario, monto_pedido) VALUES
(1, 1, 'usuario1@test.com', 1299.99),
(2, 2, 'usuario2@test.com', 150.00),
(3, 3, 'usuario3@test.com', 299.99);

-- =====================================================
-- SCRIPT DE PRUEBAS INMEDIATAS
-- =====================================================

/*
-- PRUEBAS QUE PUEDES EJECUTAR AHORA MISMO:

-- 1. Ver todos los banners activos
SELECT 'BANNERS ACTIVOS' as SECCION;
SELECT * FROM v_banners_activos;

-- 2. Ver cupones válidos disponibles
SELECT 'CUPONES DISPONIBLES' as SECCION;
SELECT * FROM v_cupones_validos;

-- 3. Ver ofertas activas
SELECT 'OFERTAS ACTIVAS' as SECCION;
SELECT * FROM v_ofertas_activas;

-- 4. Probar validación de cupón
SELECT 'PRUEBA DE CUPÓN' as SECCION;
CALL sp_validar_cupon_independiente('BIENVENIDO10', 100.00);

-- 5. Ver estadísticas completas
SELECT 'ESTADÍSTICAS DE MARKETING' as SECCION;
CALL sp_estadisticas_marketing_independiente();

-- 6. Ver suscriptores del newsletter
SELECT 'NEWSLETTER' as SECCION;
SELECT estado, COUNT(*) as total FROM newsletter GROUP BY estado;

-- 7. Probar trigger de cupones
SELECT 'ANTES - Usos de TECH25' as PRUEBA;
SELECT codigo, usos_actuales FROM cupones WHERE codigo = 'TECH25';

INSERT INTO cupones_uso (id_cupon, id_usuario, email_usuario, monto_pedido)
VALUES (3, 999, 'nuevo@test.com', 250.00);

SELECT 'DESPUÉS - Usos de TECH25' as PRUEBA;
SELECT codigo, usos_actuales FROM cupones WHERE codigo = 'TECH25';
*/

-- =====================================================
-- NOTAS PARA INTEGRACIÓN FUTURA
-- =====================================================

/*
CUANDO LAS TABLAS DE OTROS BACKENDS ESTÉN DISPONIBLES:

1. AGREGAR FOREIGN KEYS:
   ALTER TABLE ofertas ADD FOREIGN KEY (id_producto) REFERENCES productos(id_producto);
   ALTER TABLE favoritos ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);
   ALTER TABLE favoritos ADD FOREIGN KEY (id_producto) REFERENCES productos(id_producto);
   ALTER TABLE cupones_uso ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);
   ALTER TABLE cupones_uso ADD FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido);

2. ELIMINAR CAMPOS TEMPORALES:
   ALTER TABLE ofertas DROP COLUMN nombre_producto, DROP COLUMN precio_original;
   ALTER TABLE favoritos DROP COLUMN email_usuario, DROP COLUMN nombre_producto;
   ALTER TABLE cupones_uso DROP COLUMN email_usuario, DROP COLUMN monto_pedido;

3. ACTUALIZAR VISTAS PARA USAR JOINS REALES
*/

-- =====================================================
-- FIN DEL ARCHIVO
-- =====================================================
