-- Datos de prueba para Backend 5 - Pagos y Dashboard
-- Autor: Alexis
-- Fecha: 2025-09-25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Crear base de datos de prueba
CREATE DATABASE IF NOT EXISTS okea_test DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE okea_test;

-- Crear tablas necesarias para las relaciones
CREATE TABLE IF NOT EXISTS `usuarios` (
    `id_usuario` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    `email` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `pedidos` (
    `id_pedido` INT NOT NULL AUTO_INCREMENT,
    `id_usuario` INT,
    `estado` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    `total` DECIMAL(10,2),
    PRIMARY KEY (`id_pedido`),
    FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar datos de prueba en usuarios
INSERT INTO `usuarios` (`nombre`, `email`) VALUES
('Usuario Prueba 1', 'usuario1@test.com'),
('Usuario Prueba 2', 'usuario2@test.com');

-- Insertar datos de prueba en pedidos
INSERT INTO `pedidos` (`id_usuario`, `estado`, `total`) VALUES
(1, 'pendiente', 150.00),
(2, 'pendiente', 299.99);

-- Ahora podemos ejecutar el script principal de pagos
-- [COPIAR Y PEGAR AQUÍ EL CONTENIDO DE backend5_pagos_dashboard.sql]

CREATE TABLE IF NOT EXISTS `pagos` (
    `id_pago` INT NOT NULL AUTO_INCREMENT,
    `id_pedido` INT,
    `id_usuario` INT,
    `metodo` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    `estado` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    `referencia` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
    `monto` DECIMAL(10,2),
    PRIMARY KEY (`id_pago`),
    FOREIGN KEY (`id_pedido`) REFERENCES `pedidos`(`id_pedido`) ON DELETE CASCADE,
    FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de prueba para pagos
INSERT INTO `pagos` (`id_pedido`, `id_usuario`, `metodo`, `estado`, `referencia`, `monto`) VALUES
(1, 1, 'tarjeta', 'pendiente', 'REF-001', 150.00),
(2, 2, 'paypal', 'pendiente', 'REF-002', 299.99);

COMMIT;
