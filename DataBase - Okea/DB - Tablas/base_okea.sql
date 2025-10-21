CREATE DATABASE IF NOT EXISTS ecommerce_db_okea 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE ecommerce_db_okea;

-- BLOQUE 01 - WEB / E-COMMERCE
-- Tabla Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    razon_social VARCHAR(255) DEFAULT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) DEFAULT NULL,
    email_verificado TINYINT(1) NOT NULL DEFAULT 0,
    ultimo_login TIMESTAMP NULL DEFAULT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    INDEX idx_usuarios_email (email),
    INDEX idx_usuarios_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Roles
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Usuarios_roles
CREATE TABLE IF NOT EXISTS usuarios_roles (
    id_usuario INT NOT NULL,
    id_rol INT NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    CONSTRAINT fk_ur_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ur_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Permisos
CREATE TABLE IF NOT EXISTS permisos (
    id_permiso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Roles_permisos
CREATE TABLE IF NOT EXISTS roles_permisos (
    id_rol INT NOT NULL,
    id_permiso INT NOT NULL,
    PRIMARY KEY (id_rol, id_permiso),
    CONSTRAINT fk_rp_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE,
    CONSTRAINT fk_rp_permiso FOREIGN KEY (id_permiso) REFERENCES permisos(id_permiso) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    descripcion TEXT,

    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_categoria_slug (slug),
    INDEX idx_categoria_activo (activo),
    INDEX idx_categoria_nombre (nombre_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Marcas
CREATE TABLE IF NOT EXISTS marcas (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(100) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,

    descripcion TEXT,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_marca_slug (slug),
    INDEX idx_marca_activo (activo),
    INDEX idx_marca_nombre (nombre_marca)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Productos
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    slug VARCHAR(250) NOT NULL UNIQUE,
    sku VARCHAR(100) DEFAULT NULL UNIQUE,
    peso DECIMAL(10,3) DEFAULT NULL,
    largo DECIMAL(10,2) DEFAULT NULL,
    ancho DECIMAL(10,2) DEFAULT NULL,
    alto DECIMAL(10,2) DEFAULT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    id_categoria INT NOT NULL,
    id_marca INT NOT NULL,
    imagen_url VARCHAR(500),
    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    galeria_imagenes JSON,
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


-- Tabla Ofertas
CREATE TABLE IF NOT EXISTS ofertas (
    id_oferta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_usuario_creacion INT DEFAULT NULL,
    id_usuario_modificacion INT DEFAULT NULL,
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
    KEY idx_vigente (fecha_inicio, fecha_fin, activo),
    

    CONSTRAINT chk_descuento_porcentaje CHECK (descuento_porcentaje > 0 AND descuento_porcentaje <= 100),
    CONSTRAINT chk_precio_oferta CHECK (precio_oferta > 0),
    CONSTRAINT chk_fechas_oferta CHECK (fecha_fin > fecha_inicio),

    CONSTRAINT fk_ofertas_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    CONSTRAINT fk_ofertas_usuario_crea FOREIGN KEY (id_usuario_creacion) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    CONSTRAINT fk_ofertas_usuario_mod FOREIGN KEY (id_usuario_modificacion) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Carrito
CREATE TABLE IF NOT EXISTS carrito (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo','finalizado','cancelado') DEFAULT 'activo',
    CONSTRAINT fk_carrito_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente','pagado','enviado','entregado','cancelado') DEFAULT 'pendiente',
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    id_direccion INT,
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_pedidos_direccion FOREIGN KEY (id_direccion) REFERENCES direcciones(id_direccion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Direcciones
CREATE TABLE IF NOT EXISTS direcciones (
  id_direccion INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  calle VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) DEFAULT NULL,
  ciudad VARCHAR(100) NOT NULL,
  provincia VARCHAR(100) NULL,
  codigo_postal VARCHAR(20) NULL,
  pais VARCHAR(100) NULL,
  tipo ENUM('envio','facturacion') NOT NULL DEFAULT 'envio',
  CONSTRAINT fk_direcciones_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,

  INDEX idx_dir_usuario (id_usuario),
  INDEX idx_dir_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Detalle_pedido
CREATE TABLE IF NOT EXISTS detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_pedido_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Favoritos
CREATE TABLE IF NOT EXISTS favoritos (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_usuario VARCHAR(45) DEFAULT NULL,

    UNIQUE KEY unique_favorito_temp (id_usuario, id_producto),

    CONSTRAINT fk_favoritos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_favoritos_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    
    KEY idx_usuario (id_usuario),
    KEY idx_producto (id_producto),
    KEY idx_fecha (creado_el),
    KEY idx_email (email_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Banners
CREATE TABLE IF NOT EXISTS banners (
    id_banner INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_creacion INT DEFAULT NULL,
    id_usuario_modificacion INT DEFAULT NULL,
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
    KEY idx_vigencia (fecha_inicio, fecha_fin, activo),

    CONSTRAINT fk_banners_usuario_crea FOREIGN KEY (id_usuario_creacion) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    CONSTRAINT fk_banners_usuario_mod FOREIGN KEY (id_usuario_modificacion) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Cupones
CREATE TABLE IF NOT EXISTS cupones (
    id_cupon INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_creacion INT DEFAULT NULL,
    id_usuario_modificacion INT DEFAULT NULL,
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

    KEY idx_fechas (fecha_inicio, fecha_fin),
    KEY idx_activo (activo),

    CONSTRAINT chk_valor_descuento CHECK (valor_descuento > 0),
    CONSTRAINT chk_porcentaje_maximo CHECK (tipo_descuento != 'porcentaje' OR valor_descuento <= 100),
    
    CONSTRAINT fk_cupones_usuario_crea FOREIGN KEY (id_usuario_creacion) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    CONSTRAINT fk_cupones_usuario_mod FOREIGN KEY (id_usuario_modificacion) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Newsletter
CREATE TABLE IF NOT EXISTS newsletter (
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


-- Tabla Cupones_uso
CREATE TABLE IF NOT EXISTS cupones_uso (
    id_uso INT AUTO_INCREMENT PRIMARY KEY,
    id_cupon INT NOT NULL,
    id_usuario INT DEFAULT NULL,
    id_pedido INT DEFAULT NULL,
    email_usuario VARCHAR(255) DEFAULT NULL,
    monto_pedido DECIMAL(10,2) DEFAULT NULL,
    fecha_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_usuario VARCHAR(45) DEFAULT NULL,
    detalles_uso JSON DEFAULT NULL,
    estado ENUM('aplicado','rechazado','pendiente') NOT NULL DEFAULT 'aplicado',

    CONSTRAINT fk_cuponesuso_cupon FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_cuponesuso_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    CONSTRAINT fk_cuponesuso_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE SET NULL,

    KEY idx_cupon (id_cupon),
    KEY idx_usuario (id_usuario),
    KEY idx_pedido (id_pedido),
    KEY idx_fecha (fecha_uso),
    KEY idx_email (email_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Pagos
CREATE TABLE IF NOT EXISTS pagos (
    id_pago INT NOT NULL AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_usuario INT NOT NULL,
    metodo VARCHAR(50) NOT NULL,
    estado ENUM('pendiente', 'completado', 'fallido', 'reembolsado') DEFAULT 'pendiente',
    referencia VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_pago),
    INDEX idx_pagos_estado (estado),
    INDEX idx_pagos_fecha (fecha_pago),
    CONSTRAINT fk_pagos_pedidos FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_pagos_usuarios FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- BLOQUE 02 - ADMIN / GESTIÓN INTERNA
-- Tabla Logs (Admin)
CREATE TABLE IF NOT EXISTS logs (
    id_log BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NULL,
    user_agent VARCHAR(255) DEFAULT NULL,
    operacion ENUM('INSERT', 'UPDATE', 'DELETE', 'OTHER') NOT NULL DEFAULT 'OTHER',
    accion VARCHAR(255) NOT NULL,
    descripcion TEXT NULL,
    ip VARCHAR(45) NULL,
    fecha_log TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_logs_usuario (id_usuario),
    INDEX idx_logs_operacion (operacion),
    INDEX idx_logs_fecha (fecha_log),
    CONSTRAINT fk_logs_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuarios(id_usuario) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Inventario
CREATE TABLE IF NOT EXISTS inventario (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_usuario_movimiento INT DEFAULT NULL,
    stock_actual INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 0,
    tipo_movimiento ENUM('entrada', 'salida') NOT NULL,
    motivo VARCHAR(255) DEFAULT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_inventario_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    CONSTRAINT fk_inventario_usuario FOREIGN KEY (id_usuario_movimiento) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,

    INDEX idx_inventario_producto (id_producto),
    INDEX idx_inventario_fecha (fecha_movimiento),
    INDEX idx_inventario_tipo (tipo_movimiento),

    CONSTRAINT chk_stock_no_negativo CHECK (stock_actual >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO logs (id_usuario, accion, descripcion)
VALUES (p_usuario, 'EXEC SP', CONCAT('Se ejecutó ', 'sp_registrar_pago'));
