-- ¡Hola! Este es el script para la parte de pagos y dashboard de OKEA
-- Lo hice pensando en que sea fácil de entender y mantener
-- Si algo no queda claro, me pueden preguntar :)
-- Última actualización: 25/09/2025

-- Configuración inicial para evitar problemas con versiones viejas de MySQL
SET @OLD_SQL_MODE = @@SQL_MODE;
SET SQL_MODE = '';
SET time_zone = "+00:00";

-- Primero limpiamos todo para empezar desde cero
-- (siempre es mejor empezar con la casa limpia)
DROP DATABASE IF EXISTS okea_pagos_test;
CREATE DATABASE okea_pagos_test;
USE okea_pagos_test;

-- --------------------------------------------------------
-- Estructura principal
-- --------------------------------------------------------
-- Estas son las tablas de apoyo que necesitamos para simular el entorno real
-- En producción, estas tablas vendrían del sistema principal
CREATE TABLE `usuarios_test` (
    `id_usuario` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pedidos_test` (
    `id_pedido` INT PRIMARY KEY AUTO_INCREMENT,
    `id_usuario` INT NOT NULL,
    -- El estado por defecto es 'pendiente' hasta que se complete el pago
    `estado` VARCHAR(50) DEFAULT 'pendiente',
    `total` DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_test` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Esta es la tabla principal de pagos
-- Aquí guardamos toda la info importante de cada transacción
CREATE TABLE `pagos` (
    `id_pago` INT PRIMARY KEY AUTO_INCREMENT,
    `id_pedido` INT NOT NULL,
    `id_usuario` INT NOT NULL,
    -- El método puede ser tarjeta, paypal, etc.
    `metodo` VARCHAR(50) NOT NULL,
    -- Los estados posibles son: pendiente, completado, fallido o reembolsado
    `estado` ENUM('pendiente', 'completado', 'fallido', 'reembolsado') DEFAULT 'pendiente',
    -- La referencia es útil para rastrear el pago en el sistema del procesador
    `referencia` VARCHAR(100) NOT NULL,
    `monto` DECIMAL(10,2) NOT NULL,
    -- Guardamos la fecha automáticamente
    `fecha_pago` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Índices para hacer las búsquedas más rápidas
    INDEX `idx_pagos_estado` (`estado`),
    INDEX `idx_pagos_fecha` (`fecha_pago`),
    -- Conexiones con las otras tablas
    CONSTRAINT `fk_pagos_pedidos` FOREIGN KEY (`id_pedido`)
        REFERENCES `pedidos_test` (`id_pedido`) ON DELETE RESTRICT,
    CONSTRAINT `fk_pagos_usuarios` FOREIGN KEY (`id_usuario`)
        REFERENCES `usuarios_test` (`id_usuario`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla para guardar un registro de todo lo que pasa
-- (siempre es bueno tener un historial)
CREATE TABLE `logs` (
    `id_log` INT PRIMARY KEY AUTO_INCREMENT,
    `id_usuario` INT,
    `accion` VARCHAR(50),
    `descripcion` TEXT,
    `fecha_log` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Automatización de procesos
-- --------------------------------------------------------
-- Este trigger se dispara cuando un pago se marca como completado
-- Actualiza el estado del pedido y guarda un registro en los logs
DELIMITER //

DROP TRIGGER IF EXISTS `after_pago_completado`//

CREATE TRIGGER `after_pago_completado`
AFTER UPDATE ON `pagos`
FOR EACH ROW
BEGIN
    IF NEW.estado = 'completado' AND OLD.estado != 'completado' THEN
        -- Actualizar el pedido a pagado
        UPDATE pedidos_test SET estado = 'pagado'
        WHERE id_pedido = NEW.id_pedido;

        -- Guardar en el historial
        INSERT INTO logs (id_usuario, accion, descripcion)
        VALUES (NEW.id_usuario, 'PAGO_COMPLETADO',
                CONCAT('Pago completado para pedido: ', NEW.id_pedido));
    END IF;
END//

DELIMITER ;

-- --------------------------------------------------------
-- Vista para el Dashboard
-- --------------------------------------------------------
-- Esta vista nos da un resumen rápido de los pagos
-- Agrupa por fecha, método y estado para ver tendencias
CREATE OR REPLACE VIEW `vista_resumen_pagos` AS
SELECT
    DATE(fecha_pago) as fecha,
    metodo,
    COUNT(*) as total_transacciones,
    SUM(monto) as monto_total,
    estado
FROM
    pagos
GROUP BY
    DATE(fecha_pago),
    metodo,
    estado;

-- --------------------------------------------------------
-- Reportes personalizados
-- --------------------------------------------------------
-- Este procedimiento nos permite generar reportes por período
-- Útil para ver el rendimiento en rangos de fechas específicos
DELIMITER //

DROP PROCEDURE IF EXISTS `sp_reporte_pagos_periodo`//

CREATE PROCEDURE `sp_reporte_pagos_periodo`(
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    SELECT
        DATE(fecha_pago) as fecha,
        metodo,
        COUNT(*) as total_transacciones,
        SUM(monto) as monto_total,
        estado
    FROM
        pagos
    WHERE
        DATE(fecha_pago) BETWEEN fecha_inicio AND fecha_fin
    GROUP BY
        DATE(fecha_pago),
        metodo,
        estado
    ORDER BY
        fecha;
END//

DELIMITER ;

-- --------------------------------------------------------
-- Datos de ejemplo para pruebas
-- --------------------------------------------------------
-- Metemos algunos datos de prueba para ver cómo funciona todo
INSERT INTO `usuarios_test` (`nombre`, `email`) VALUES
('Usuario Test 1', 'test1@example.com'),
('Usuario Test 2', 'test2@example.com');

INSERT INTO `pedidos_test` (`id_usuario`, `estado`, `total`) VALUES
(1, 'pendiente', 150.00),
(2, 'pendiente', 299.99);

INSERT INTO `pagos` (`id_pedido`, `id_usuario`, `metodo`, `estado`, `referencia`, `monto`) VALUES
(1, 1, 'tarjeta', 'pendiente', 'REF-001', 150.00),
(2, 2, 'paypal', 'pendiente', 'REF-002', 299.99);

-- --------------------------------------------------------
-- ¡Hora de probar todo!
-- --------------------------------------------------------
-- Veamos cómo se ve el resumen en el dashboard
SELECT * FROM vista_resumen_pagos;

-- Probamos el reporte del primer semestre
CALL sp_reporte_pagos_periodo('2025-01-01', '2025-12-31');

-- Simulamos un pago completado
UPDATE pagos SET estado = 'completado' WHERE id_pago = 1;

-- Verificamos que todo se actualizó correctamente
SELECT * FROM pagos;
SELECT * FROM pedidos_test;
SELECT * FROM logs;

-- Restauramos la configuración de MySQL
SET SQL_MODE = @OLD_SQL_MODE;

-- ¡Listo! Si todo salió bien, ya tenemos nuestro sistema de pagos funcionando
-- Cualquier duda o problema, me avisan ;)
