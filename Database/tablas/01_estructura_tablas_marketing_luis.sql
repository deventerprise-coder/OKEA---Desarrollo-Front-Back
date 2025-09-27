-- =====================================================
-- OKEA E-COMMERCE - ESTRUCTURA DE TABLAS
-- Base de datos: okea_marketing
-- Fecha: 2025-09-26
-- Descripción: Creación de todas las tablas del sistema
-- =====================================================

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS okea_marketing
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE okea_marketing;

-- =====================================================
-- LIMPIAR TABLAS EXISTENTES (OPCIONAL)
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
DROP TABLE IF EXISTS auditoria_seguridad;

-- Reactivar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- CREACIÓN DE TABLAS
-- =====================================================

-- Tabla de auditoría de seguridad
CREATE TABLE auditoria_seguridad (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    tabla_afectada VARCHAR(50) NOT NULL,
    operacion ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    id_registro INT,
    usuario VARCHAR(100) DEFAULT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    datos_anteriores JSON DEFAULT NULL,
    datos_nuevos JSON DEFAULT NULL,
    fecha_operacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT DEFAULT NULL,

    KEY idx_tabla_fecha (tabla_afectada, fecha_operacion),
    KEY idx_usuario (usuario),
    KEY idx_operacion (operacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    usuario_creacion VARCHAR(100) DEFAULT NULL,
    usuario_modificacion VARCHAR(100) DEFAULT NULL,

    KEY idx_seccion_orden (seccion, orden),
    KEY idx_activo (activo),
    KEY idx_vigencia (fecha_inicio, fecha_fin, activo),
    KEY idx_usuario_creacion (usuario_creacion)
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
    usuario_creacion VARCHAR(100) DEFAULT NULL,
    usuario_modificacion VARCHAR(100) DEFAULT NULL,

    KEY idx_codigo (codigo),
    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo),
    KEY idx_usuario_creacion (usuario_creacion),

    CONSTRAINT chk_valor_descuento CHECK (valor_descuento > 0),
    CONSTRAINT chk_porcentaje_maximo CHECK (
        tipo_descuento != 'porcentaje' OR valor_descuento <= 100
    )
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
    motivo_baja TEXT DEFAULT NULL,
    ip_suscripcion VARCHAR(45) DEFAULT NULL,

    KEY idx_email (email),
    KEY idx_estado (estado),
    KEY idx_fecha_suscripcion (fecha_suscripcion),
    KEY idx_token (token_confirmacion)
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
    usuario_creacion VARCHAR(100) DEFAULT NULL,
    usuario_modificacion VARCHAR(100) DEFAULT NULL,

    KEY idx_producto (id_producto),
    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo),
    KEY idx_vigente (fecha_inicio, fecha_fin, activo),
    KEY idx_usuario_creacion (usuario_creacion),

    CONSTRAINT chk_descuento_porcentaje CHECK (descuento_porcentaje > 0 AND descuento_porcentaje <= 100),
    CONSTRAINT chk_precio_oferta CHECK (precio_oferta > 0),
    CONSTRAINT chk_fechas_oferta CHECK (fecha_fin > fecha_inicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de favoritos
CREATE TABLE favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    email_usuario VARCHAR(255) DEFAULT NULL,
    nombre_producto VARCHAR(255) DEFAULT NULL,
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_usuario VARCHAR(45) DEFAULT NULL,

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
    ip_usuario VARCHAR(45) DEFAULT NULL,
    detalles_uso JSON DEFAULT NULL,

    FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon) ON DELETE CASCADE ON UPDATE CASCADE,

    KEY idx_cupon (id_cupon),
    KEY idx_usuario (id_usuario),
    KEY idx_pedido (id_pedido),
    KEY idx_fecha (fecha_uso),
    KEY idx_email (email_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- CONFIGURACIÓN DE SEGURIDAD
-- =====================================================

-- Activar logs binarios para auditoría
SET GLOBAL log_bin_trust_function_creators = 1;

-- Mensaje de confirmación
SELECT 'Estructura de base de datos OKEA Marketing creada exitosamente!' as mensaje;
SELECT 'Tablas creadas: auditoria_seguridad, banners, cupones, newsletter, ofertas, favoritos, cupones_uso' as detalles;
