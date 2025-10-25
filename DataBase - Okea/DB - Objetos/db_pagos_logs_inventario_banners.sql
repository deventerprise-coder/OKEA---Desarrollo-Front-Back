-- =====================================================
-- OKEA E-COMMERCE - STORED PROCEDURES, TRIGGERS Y VIEWS
-- Módulo: Pagos, Dashboard y Gestión Interna
-- Autor: Manuel Vargas
-- Fecha: 24-10-2025
-- =====================================================

CREATE DATABASE IF NOT EXISTS ecommerce_db_okea 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE ecommerce_db_okea;

-- =============================================
-- ESTRUCTURA DE TABLAS
-- =============================================

-- Tabla de pagos
CREATE TABLE IF NOT EXISTS pagos (
    id_pago INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_usuario INT NOT NULL,
    metodo VARCHAR(50) NOT NULL,
    referencia VARCHAR(100),
    monto DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'completado', 'cancelado', 'rechazado') DEFAULT 'pendiente',
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_pedido (id_pedido),
    INDEX idx_usuario (id_usuario),
    INDEX idx_estado (estado)
);

-- Tabla de logs del sistema
CREATE TABLE IF NOT EXISTS logs (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    operacion VARCHAR(20) NOT NULL,
    accion VARCHAR(50) NOT NULL,
    descripcion TEXT,
    ip VARCHAR(45),
    fecha_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de inventario
CREATE TABLE IF NOT EXISTS inventario (
    id_inventario INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_usuario_movimiento INT NOT NULL,
    stock_actual INT NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida') NOT NULL,
    motivo VARCHAR(255),
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_producto (id_producto)
);

-- Tabla de banners
CREATE TABLE IF NOT EXISTS banners (
    id_banner INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    subtitulo VARCHAR(200),
    imagen_url VARCHAR(255) NOT NULL,
    enlace_url VARCHAR(255),
    seccion VARCHAR(50) NOT NULL,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    id_usuario_creacion INT NOT NULL,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_seccion (seccion),
    INDEX idx_activo (activo)
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    id_categoria INT,
    id_marca INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TRIGGERS
-- =============================================

DELIMITER //

-- Trigger después de insertar un pago
CREATE TRIGGER trg_after_insert_pago
AFTER INSERT ON pagos
FOR EACH ROW
BEGIN
    INSERT INTO logs (id_usuario, operacion, accion, descripcion, fecha_log)
    VALUES (
        NEW.id_usuario,
        'INSERT',
        'NUEVO_PAGO',
        CONCAT('Nuevo pago registrado: ID_Pago=', NEW.id_pago,
               ', Monto=', NEW.monto,
               ', Estado=', NEW.estado),
        NOW()
    );
END//

-- Trigger después de actualizar un pago
CREATE TRIGGER trg_after_update_pago
AFTER UPDATE ON pagos
FOR EACH ROW
BEGIN
    IF OLD.estado != NEW.estado THEN
        INSERT INTO logs (id_usuario, operacion, accion, descripcion, fecha_log)
        VALUES (
            NEW.id_usuario,
            'UPDATE',
            'ACTUALIZACIÓN_PAGO',
            CONCAT('Actualización estado pago: ID_Pago=', NEW.id_pago,
                   ', Estado anterior=', OLD.estado,
                   ', Nuevo estado=', NEW.estado),
            NOW()
        );
    END IF;
END//

-- Trigger después de insertar en inventario
CREATE TRIGGER trg_after_insert_inventario
AFTER INSERT ON inventario
FOR EACH ROW
BEGIN
    INSERT INTO logs (
        id_usuario,
        operacion,
        accion,
        descripcion,
        fecha_log
    )
    VALUES (
        NEW.id_usuario_movimiento,
        'INSERT',
        'MOVIMIENTO_INVENTARIO',
        CONCAT('Nuevo movimiento: Producto=', NEW.id_producto,
               ', Tipo=', NEW.tipo_movimiento,
               ', Stock actual=', NEW.stock_actual),
        NOW()
    );
END//

-- Trigger después de actualizar inventario
CREATE TRIGGER trg_after_update_inventario
AFTER UPDATE ON inventario
FOR EACH ROW
BEGIN
    IF OLD.stock_actual != NEW.stock_actual THEN
        INSERT INTO logs (
            id_usuario,
            operacion,
            accion,
            descripcion,
            fecha_log
        )
        VALUES (
            NEW.id_usuario_movimiento,
            'UPDATE',
            'ACTUALIZACIÓN_INVENTARIO',
            CONCAT('Actualización stock: Producto=', NEW.id_producto,
                   ', Stock anterior=', OLD.stock_actual,
                   ', Nuevo stock=', NEW.stock_actual),
            NOW()
        );
    END IF;
END//

-- Trigger después de insertar banner
CREATE TRIGGER trg_after_insert_banners
AFTER INSERT ON banners
FOR EACH ROW
BEGIN
    INSERT INTO logs (
        id_usuario,
        operacion,
        accion,
        descripcion,
        fecha_log
    )
    VALUES (
        NEW.id_usuario_creacion,
        'INSERT',
        'NUEVO_BANNER',
        CONCAT('Nuevo banner: Título=', NEW.titulo,
               ', Sección=', NEW.seccion),
        NOW()
    );
END//

DELIMITER ;

-- =============================================
-- STORED PROCEDURES
-- =============================================

-- Procedimiento para registrar un pago
CREATE PROCEDURE sp_registrar_pago(
    IN p_id_pedido INT,
    IN p_id_usuario INT,
    IN p_metodo VARCHAR(50),
    IN p_referencia VARCHAR(100),
    IN p_monto DECIMAL(10,2)
)
BEGIN
    -- Validación previa
    IF p_monto <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Monto debe ser mayor que 0';
    END IF;

    -- Insertar pago
    INSERT INTO pagos (id_pedido, id_usuario, metodo, referencia, monto, estado)
    VALUES (p_id_pedido, p_id_usuario, p_metodo, p_referencia, p_monto, 'pendiente');
    
    -- Registro en logs
    INSERT INTO logs (id_usuario, operacion, accion, descripcion, fecha_log)
    VALUES (p_id_usuario, 'INSERT', 'PAGO', CONCAT('Nuevo pago registrado para pedido ', p_id_pedido), NOW());
END//

-- Procedimiento para reporte de pagos por período
CREATE PROCEDURE sp_reporte_pagos_periodo(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT 
        p.id_pago,
        p.id_pedido,
        p.id_usuario as cliente_id,
        p.metodo,
        p.estado,
        p.monto,
        p.fecha_pago
    FROM pagos p
    WHERE DATE(p.fecha_pago) BETWEEN fecha_inicio AND fecha_fin
    ORDER BY p.fecha_pago DESC;
END//

-- Procedimiento para reporte de pagos por estado
CREATE PROCEDURE sp_reporte_pagos_por_estado(
    IN p_estado VARCHAR(20)
)
BEGIN
    SELECT 
        p.id_pago,
        p.id_pedido,
        p.id_usuario,
        p.metodo,
        p.monto,
        p.fecha_pago
    FROM pagos p
    WHERE p.estado = p_estado
    ORDER BY p.fecha_pago DESC;
END//

-- Procedimiento para actualizar inventario
CREATE PROCEDURE sp_actualizar_inventario(
    IN p_id_producto INT,
    IN p_cantidad INT,
    IN p_tipo_movimiento ENUM('entrada', 'salida'),
    IN p_id_usuario INT,
    IN p_motivo VARCHAR(255)
)
BEGIN
    -- Validación de cantidad
    IF p_cantidad <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad debe ser mayor que 0';
    END IF;
    
    -- Actualizar inventario
    INSERT INTO inventario (
        id_producto,
        id_usuario_movimiento,
        stock_actual,
        tipo_movimiento,
        motivo
    ) VALUES (
        p_id_producto,
        p_id_usuario,
        p_cantidad,
        p_tipo_movimiento,
        p_motivo
    );
    
    -- Actualizar stock en productos
    IF p_tipo_movimiento = 'entrada' THEN
        UPDATE productos SET stock = stock + p_cantidad WHERE id_producto = p_id_producto;
    ELSE
        UPDATE productos SET stock = stock - p_cantidad WHERE id_producto = p_id_producto;
    END IF;
END//

-- Procedimiento para reporte de stock bajo
CREATE PROCEDURE sp_reporte_stock_bajo(
    IN umbral_minimo INT
)
BEGIN
    SELECT 
        p.id_producto,
        p.nombre,
        p.sku,
        p.stock
    FROM productos p
    WHERE p.stock <= umbral_minimo
    ORDER BY p.stock ASC;
END//

-- Procedimiento para reporte de ventas por período
CREATE PROCEDURE sp_reporte_ventas_periodo(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT 
        DATE(p.fecha_pago) as fecha,
        COUNT(p.id_pago) as total_pagos,
        SUM(p.monto) as total_monto
    FROM pagos p
    WHERE DATE(p.fecha_pago) BETWEEN fecha_inicio AND fecha_fin
        AND p.estado = 'completado'
    GROUP BY DATE(p.fecha_pago)
    ORDER BY fecha;
END//

-- Procedimiento para top clientes
CREATE PROCEDURE sp_top_clientes(
    IN limite INT
)
BEGIN
    SELECT 
        p.id_usuario,
        COUNT(p.id_pago) as total_pagos,
        SUM(p.monto) as total_gastado
    FROM pagos p
    WHERE p.estado = 'completado'
    GROUP BY p.id_usuario
    ORDER BY total_gastado DESC
    LIMIT limite;
END//

-- Procedimiento para productos más vendidos
CREATE PROCEDURE sp_productos_mas_vendidos(
    IN fecha_inicio DATE,
    IN fecha_fin DATE,
    IN limite INT
)
BEGIN
    SELECT 
        i.id_producto,
        p.nombre,
        p.sku,
        COUNT(i.id_inventario) as total_movimientos,
        SUM(CASE WHEN i.tipo_movimiento = 'salida' THEN i.stock_actual ELSE 0 END) as total_vendido
    FROM inventario i
    JOIN productos p ON i.id_producto = p.id_producto
    WHERE DATE(i.fecha_movimiento) BETWEEN fecha_inicio AND fecha_fin
        AND i.tipo_movimiento = 'salida'
    GROUP BY i.id_producto
    ORDER BY total_vendido DESC
    LIMIT limite;
END//

-- Procedimiento para reporte de ventas
CREATE PROCEDURE sp_reporte_ventas(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT 
        p.id_pago,
        p.id_pedido,
        p.id_usuario as cliente_id,
        p.metodo,
        p.estado,
        p.monto,
        p.fecha_pago,
        p.referencia
    FROM pagos p
    WHERE DATE(p.fecha_pago) BETWEEN fecha_inicio AND fecha_fin
        AND p.estado = 'completado'
    ORDER BY p.fecha_pago DESC;
END//

-- Procedimiento para auditoría general
CREATE PROCEDURE sp_auditoria_general()
BEGIN
    -- Reporte general de pagos
    SELECT 
        p.id_pago,
        p.id_pedido,
        p.id_usuario as cliente_id,
        p.metodo,
        p.estado,
        p.monto,
        p.fecha_pago,
        p.referencia
    FROM pagos p
    ORDER BY p.fecha_pago DESC;

    -- Reporte general de inventario
    SELECT 
        i.id_inventario,
        i.id_producto,
        p.nombre as producto_nombre,
        p.sku,
        i.stock_actual,
        i.tipo_movimiento,
        i.motivo,
        i.id_usuario_movimiento,
        i.fecha_movimiento
    FROM inventario i
    LEFT JOIN productos p ON i.id_producto = p.id_producto
    ORDER BY i.fecha_movimiento DESC;

    -- Reporte de logs del sistema
    SELECT 
        id_log,
        id_usuario,
        operacion,
        accion,
        descripcion,
        ip,
        fecha_log
    FROM logs
    ORDER BY fecha_log DESC;

    -- Reporte de banners activos
    SELECT 
        id_banner,
        titulo,
        subtitulo,
        imagen_url,
        enlace_url,
        seccion,
        orden,
        id_usuario_creacion,
        fecha_inicio,
        fecha_fin
    FROM banners
    WHERE activo = 1
    ORDER BY fecha_creacion DESC;
END//

DELIMITER ;

-- =============================================
-- VISTAS
-- =============================================

-- Vista de resumen de pagos
CREATE OR REPLACE VIEW vw_resumen_pagos AS
SELECT 
    p.id_pago,
    p.id_pedido,
    p.id_usuario as cliente_id,
    p.metodo,
    p.estado,
    p.monto,
    p.fecha_pago,
    p.referencia
FROM pagos p;

-- Vista de inventario detallado
CREATE OR REPLACE VIEW vw_inventario_detallado AS
SELECT 
    i.id_inventario,
    i.id_producto,
    p.nombre as producto_nombre,
    p.sku,
    i.stock_actual,
    i.tipo_movimiento,
    i.motivo,
    i.id_usuario_movimiento,
    i.fecha_movimiento
FROM inventario i
LEFT JOIN productos p ON i.id_producto = p.id_producto;

-- Vista de banners activos
CREATE OR REPLACE VIEW vw_banners_activos AS
SELECT 
    id_banner,
    titulo,
    subtitulo,
    imagen_url,
    enlace_url,
    seccion,
    orden,
    id_usuario_creacion,
    fecha_inicio,
    fecha_fin
FROM banners
WHERE activo = 1
    AND (fecha_inicio IS NULL OR fecha_inicio <= NOW())
    AND (fecha_fin IS NULL OR fecha_fin >= NOW())
ORDER BY seccion, orden;

-- Vista de logs del sistema
CREATE OR REPLACE VIEW vw_logs_sistema AS
SELECT 
    id_log,
    id_usuario,
    operacion,
    accion,
    descripcion,
    ip,
    fecha_log
FROM logs
ORDER BY fecha_log DESC;

-- Vista de ventas por período
CREATE OR REPLACE VIEW vw_resumen_ventas AS
SELECT 
    DATE(p.fecha_pago) as fecha,
    COUNT(p.id_pago) as total_pagos,
    SUM(p.monto) as total_monto
FROM pagos p
WHERE p.estado = 'completado'
GROUP BY DATE(p.fecha_pago);
