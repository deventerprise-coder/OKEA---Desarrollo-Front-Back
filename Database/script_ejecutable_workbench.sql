-- =====================================================
-- OKEA E-COMMERCE - SCRIPT EJECUTABLE EN WORKBENCH
-- Base de datos: okea_marketing
-- Fecha: 2025-01-25
-- =====================================================

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS okea_marketing
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE okea_marketing;

-- =====================================================
-- VERIFICAR Y LIMPIAR TABLAS EXISTENTES (OPCIONAL)
-- =====================================================

-- Desactivar verificación de claves foráneas temporalmente
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar tablas si existen (para reinstalación limpia)
DROP TABLE IF EXISTS cupones_uso;
DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS ofertas;
DROP TABLE IF EXISTS newsletter;
DROP TABLE IF EXISTS cupones;
DROP TABLE IF EXISTS banners;

-- Reactivar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- CREAR TODAS LAS TABLAS
-- =====================================================

-- Tabla de banners
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

    KEY idx_seccion_orden (seccion, orden),
    KEY idx_activo (activo),
    KEY idx_vigencia (fecha_inicio, fecha_fin, activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de cupones
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

    KEY idx_codigo (codigo),
    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de newsletter
CREATE TABLE newsletter (
    id_suscripcion INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(100) DEFAULT NULL,
    estado ENUM('activo', 'inactivo', 'bloqueado') DEFAULT 'activo',
    fecha_suscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_confirmacion TIMESTAMP NULL DEFAULT NULL,
    token_confirmacion VARCHAR(100) DEFAULT NULL,
    fecha_baja TIMESTAMP NULL DEFAULT NULL,

    KEY idx_email (email),
    KEY idx_estado (estado),
    KEY idx_fecha_suscripcion (fecha_suscripcion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de ofertas
CREATE TABLE ofertas (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    nombre_producto VARCHAR(255) DEFAULT NULL,
    descuento_porcentaje DECIMAL(5,2) NOT NULL,
    precio_original DECIMAL(10,2) DEFAULT NULL,
    precio_oferta DECIMAL(10,2) NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY idx_producto (id_producto),
    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo),
    KEY idx_vigente (fecha_inicio, fecha_fin, activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de favoritos
CREATE TABLE favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    email_usuario VARCHAR(255) DEFAULT NULL,
    nombre_producto VARCHAR(255) DEFAULT NULL,
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_favorito_temp (id_usuario, id_producto),

    KEY idx_usuario (id_usuario),
    KEY idx_producto (id_producto),
    KEY idx_fecha (creado_el),
    KEY idx_email (email_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de uso de cupones
CREATE TABLE cupones_uso (
    id_uso INT AUTO_INCREMENT PRIMARY KEY,
    id_cupon INT NOT NULL,
    id_usuario INT NOT NULL,
    id_pedido INT DEFAULT NULL,
    email_usuario VARCHAR(255) DEFAULT NULL,
    monto_pedido DECIMAL(10,2) DEFAULT NULL,
    fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon) ON DELETE CASCADE ON UPDATE CASCADE,

    KEY idx_cupon (id_cupon),
    KEY idx_usuario (id_usuario),
    KEY idx_pedido (id_pedido),
    KEY idx_fecha (fecha_uso),
    KEY idx_email (email_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERTAR DATOS DE PRUEBA
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

-- Ofertas de prueba
INSERT INTO ofertas (id_producto, nombre_producto, descuento_porcentaje, precio_original, precio_oferta, fecha_inicio, fecha_fin) VALUES
(1, 'iPhone 15 Pro 256GB', 15.00, 1299.99, 1104.99, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),
(2, 'Samsung Galaxy S24 Ultra', 10.00, 1199.99, 1079.99, NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY)),
(3, 'MacBook Air M3', 20.00, 1499.99, 1199.99, NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY)),
(4, 'Nike Air Max 270', 25.00, 159.99, 119.99, NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY));

-- Favoritos de prueba
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
-- MENSAJE DE ÉXITO
-- =====================================================

SELECT 'Base de datos OKEA Marketing creada exitosamente!' as mensaje;
SELECT 'Tablas creadas: banners, cupones, newsletter, ofertas, favoritos, cupones_uso' as detalles;

-- Mostrar estadísticas
SELECT 'ESTADÍSTICAS DE DATOS INSERTADOS:' as titulo;
SELECT 'Banners' as tabla, COUNT(*) as registros FROM banners
UNION ALL
SELECT 'Cupones' as tabla, COUNT(*) as registros FROM cupones
UNION ALL
SELECT 'Newsletter' as tabla, COUNT(*) as registros FROM newsletter
UNION ALL
SELECT 'Ofertas' as tabla, COUNT(*) as registros FROM ofertas
UNION ALL
SELECT 'Favoritos' as tabla, COUNT(*) as registros FROM favoritos
UNION ALL
SELECT 'Uso Cupones' as tabla, COUNT(*) as registros FROM cupones_uso;
