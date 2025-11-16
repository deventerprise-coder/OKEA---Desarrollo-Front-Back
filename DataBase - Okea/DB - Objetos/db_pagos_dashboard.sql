-- ============================================
-- TABLA PAGOS Y DASHBOARD
-- ============================================

-- Tabla Pagos
CREATE TABLE IF NOT EXISTS pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_usuario INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL CHECK (monto > 0),
    metodo_pago ENUM('tarjeta_credito', 'tarjeta_debito', 'transferencia', 'mercado_pago', 'efectivo', 'yape', 'plin') NOT NULL,
    numero_transaccion VARCHAR(100) NOT NULL UNIQUE,
    referencia_externa VARCHAR(255) DEFAULT NULL,
    estado ENUM('pendiente', 'procesando', 'completado', 'fallido', 'reembolsado') DEFAULT 'pendiente',
    descripcion TEXT,
    fecha_pago TIMESTAMP NULL DEFAULT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_pagos_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_pagos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,

    INDEX idx_pagos_pedido (id_pedido),
    INDEX idx_pagos_usuario (id_usuario),
    INDEX idx_pagos_estado (estado),
    INDEX idx_pagos_metodo (metodo_pago),
    INDEX idx_pagos_fecha (fecha_creacion),
    INDEX idx_pagos_numero_transaccion (numero_transaccion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Historial de Pagos (para auditoría)
CREATE TABLE IF NOT EXISTS historial_pagos (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_pago INT NOT NULL,
    estado_anterior ENUM('pendiente', 'procesando', 'completado', 'fallido', 'reembolsado'),
    estado_nuevo ENUM('pendiente', 'procesando', 'completado', 'fallido', 'reembolsado') NOT NULL,
    comentario TEXT,
    usuario_cambio INT DEFAULT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_historial_pago FOREIGN KEY (id_pago) REFERENCES pagos(id_pago) ON DELETE CASCADE,
    CONSTRAINT fk_historial_usuario FOREIGN KEY (usuario_cambio) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,

    INDEX idx_historial_pago (id_pago),
    INDEX idx_historial_fecha (fecha_cambio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Reembolsos
CREATE TABLE IF NOT EXISTS reembolsos (
    id_reembolso INT AUTO_INCREMENT PRIMARY KEY,
    id_pago INT NOT NULL,
    id_pedido INT NOT NULL,
    monto_reembolso DECIMAL(10,2) NOT NULL CHECK (monto_reembolso > 0),
    razon ENUM('cliente_solicitud', 'producto_defectuoso', 'cambio_de_opinion', 'no_disponible', 'error_pago', 'otro') NOT NULL,
    descripcion TEXT,
    estado ENUM('solicitado', 'aprobado', 'rechazado', 'procesado') DEFAULT 'solicitado',
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_procesamiento TIMESTAMP NULL DEFAULT NULL,
    usuario_aprobacion INT DEFAULT NULL,

    CONSTRAINT fk_reembolso_pago FOREIGN KEY (id_pago) REFERENCES pagos(id_pago) ON DELETE CASCADE,
    CONSTRAINT fk_reembolso_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_reembolso_usuario FOREIGN KEY (usuario_aprobacion) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,

    INDEX idx_reembolso_pago (id_pago),
    INDEX idx_reembolso_pedido (id_pedido),
    INDEX idx_reembolso_estado (estado),
    INDEX idx_reembolso_fecha (fecha_solicitud)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Métricas Dashboard
CREATE TABLE IF NOT EXISTS metricas_dashboard (
    id_metrica INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reporte DATE NOT NULL,
    total_ventas DECIMAL(12,2) DEFAULT 0,
    total_ordenes INT DEFAULT 0,
    ordenes_pagadas INT DEFAULT 0,
    ordenes_pendientes INT DEFAULT 0,
    ordenes_canceladas INT DEFAULT 0,
    promedio_venta DECIMAL(10,2) DEFAULT 0,
    total_clientes INT DEFAULT 0,
    clientes_nuevos INT DEFAULT 0,
    producto_mas_vendido INT DEFAULT NULL,
    cantidad_producto_mas_vendido INT DEFAULT 0,
    metodo_pago_preferido VARCHAR(50) DEFAULT NULL,
    tasa_conversion DECIMAL(5,2) DEFAULT 0,
    tasa_devolucion DECIMAL(5,2) DEFAULT 0,
    reembolsos_procesados INT DEFAULT 0,
    total_reembolsos DECIMAL(12,2) DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_metrica_producto FOREIGN KEY (producto_mas_vendido) REFERENCES productos(id_producto) ON DELETE SET NULL,

    UNIQUE KEY unique_fecha_metrica (fecha_reporte),
    INDEX idx_metrica_fecha (fecha_reporte)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla Auditoría de Transacciones
CREATE TABLE IF NOT EXISTS auditoria_transacciones (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_pago INT DEFAULT NULL,
    id_pedido INT DEFAULT NULL,
    tipo_evento VARCHAR(100) NOT NULL,
    detalles JSON,
    usuario_responsable INT DEFAULT NULL,
    ip_origen VARCHAR(45) DEFAULT NULL,
    fecha_evento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_auditoria_pago FOREIGN KEY (id_pago) REFERENCES pagos(id_pago) ON DELETE SET NULL,
    CONSTRAINT fk_auditoria_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE SET NULL,
    CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_responsable) REFERENCES usuarios(id_usuario) ON DELETE SET NULL,

    INDEX idx_auditoria_pago (id_pago),
    INDEX idx_auditoria_pedido (id_pedido),
    INDEX idx_auditoria_tipo (tipo_evento),
    INDEX idx_auditoria_fecha (fecha_evento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

