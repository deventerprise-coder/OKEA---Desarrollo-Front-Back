-- TRIGGERS 

-- ===========================================================
-- TRIGGER: trg_after_insert_usuario
-- OBJETIVO: Registrar en logs cuando se crea un nuevo usuario
-- AUTOR: Aaron
-- FECHA: 2025-10-10
-- NOTAS: Usa logs para auditoría del bloque Usuarios y Seguridad
-- ===========================================================

DELIMITER //

CREATE TRIGGER trg_after_insert_usuario
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion)
  VALUES (NEW.id_usuario, 'CREACIÓN', CONCAT('Se creó el usuario ', NEW.email));
END //

DELIMITER ;

---------------------------------------------------------------------------------------

-- Stored Procedures 

-- ===========================================================
-- STORED PROCEDURE: sp_crear_producto
-- OBJETIVO: Inserta un producto nuevo validando que no exista el mismo SKU
-- AUTOR: Aaron
-- FECHA: 2025-10-10
-- ===========================================================

DELIMITER //

CREATE PROCEDURE sp_crear_producto (
  IN p_nombre VARCHAR(255),
  IN p_sku VARCHAR(100),
  IN p_precio DECIMAL(10,2),
  IN p_stock INT,
  IN p_id_categoria INT
)
BEGIN
  DECLARE v_existe INT DEFAULT 0;

  SELECT COUNT(*) INTO v_existe FROM productos WHERE sku = p_sku;

  IF v_existe = 0 THEN
    START TRANSACTION;

    INSERT INTO productos (nombre, sku, precio, stock, id_categoria, activo)
    VALUES (p_nombre, p_sku, p_precio, p_stock, p_id_categoria, 1);

    COMMIT;
  ELSE
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El SKU ya existe.';
  END IF;
END //

DELIMITER ;


---------------------------------------------------------------------------------------

-- Vistas 

-- ===========================================================
-- VISTA: vw_resumen_ventas
-- OBJETIVO: Mostrar resumen de ventas agrupado por fecha y estado
-- AUTOR: Aaron
-- FECHA: 2025-10-10
-- ===========================================================

CREATE OR REPLACE VIEW vw_resumen_ventas AS
SELECT 
  DATE(p.fecha_pedido) AS fecha,
  COUNT(p.id_pedido) AS total_pedidos,
  SUM(p.total) AS total_ventas,
  SUM(CASE WHEN p.estado = 'completado' THEN p.total ELSE 0 END) AS total_completado
FROM pedidos p
GROUP BY DATE(p.fecha_pedido)
ORDER BY fecha DESC;
