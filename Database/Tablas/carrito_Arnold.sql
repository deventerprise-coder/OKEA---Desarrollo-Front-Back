CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- ================================
-- TABLAS DE ARNOLD (CARRITO Y PEDIDOS)
-- ================================

-- Carrito
CREATE TABLE carrito (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carrito_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Detalle del carrito
CREATE TABLE detalle_carrito (
    id_detalle_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    CONSTRAINT fk_detalle_carrito_carrito FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_carrito_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pedidos
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente','pagado','enviado','entregado','cancelado') DEFAULT 'pendiente',
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    id_direccion INT,
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_pedidos_direccion FOREIGN KEY (id_direccion) REFERENCES direcciones(id_direccion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Detalle de pedidos
CREATE TABLE detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_pedido_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================
-- STORED PROCEDURES
-- ================================

DELIMITER $$

-- Insertar carrito con detalle
CREATE PROCEDURE sp_insertar_carrito (
    IN p_id_usuario INT,
    IN p_id_producto INT,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_id_carrito INT;

    -- Crear el carrito
    INSERT INTO carrito (id_usuario) VALUES (p_id_usuario);
    SET v_id_carrito = LAST_INSERT_ID();

    -- Insertar detalle del carrito
    INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad)
    VALUES (v_id_carrito, p_id_producto, p_cantidad);
END $$

-- Registrar pedido
CREATE PROCEDURE sp_registrar_pedido (
    IN p_id_usuario INT,
    IN p_total DECIMAL(10,2),
    IN p_id_direccion INT
)
BEGIN
    INSERT INTO pedidos (id_usuario, total, id_direccion)
    VALUES (p_id_usuario, p_total, p_id_direccion);
END $$

DELIMITER ;

-- ================================
-- TRIGGERS
-- ================================

DELIMITER $$

-- Actualizar stock cuando se inserta un pedido
CREATE TRIGGER trg_actualizar_stock_pedido
AFTER INSERT ON detalle_pedido
FOR EACH ROW
BEGIN
    UPDATE productos
    SET stock = stock - NEW.cantidad
    WHERE id_producto = NEW.id_producto;
END $$

-- Validar total de pedido >= 0
CREATE TRIGGER trg_validar_total_pedido
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    IF NEW.total < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El total del pedido no puede ser negativo';
    END IF;
END $$

DELIMITER ;
