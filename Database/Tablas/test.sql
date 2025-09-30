USE ecommerce;

-- ================================
-- DATOS DE PRUEBA
-- ================================

-- Usuarios
INSERT INTO usuarios (id_usuario, nombre, correo) VALUES
(1, 'Arnold', 'arnold@example.com'),
(2, 'Jordan', 'jordan@example.com'),
(3, 'Lucía', 'lucia@example.com'),
(4, 'Carlos', 'carlos@example.com'),
(5, 'María', 'maria@example.com');

-- Productos
INSERT INTO productos (id_producto, nombre, precio, stock) VALUES
(1, 'Laptop', 2500.00, 15),
(2, 'Mouse', 50.00, 100),
(3, 'Teclado', 120.00, 50),
(4, 'Monitor 24"', 750.00, 20),
(5, 'Auriculares', 180.00, 60),
(6, 'Impresora', 600.00, 10);

-- Direcciones
INSERT INTO direcciones (id_direccion, id_usuario, direccion) VALUES
(1, 1, 'Av. Siempre Viva 742'),
(2, 2, 'Jr. Las Flores 123'),
(3, 3, 'Calle Central 456'),
(4, 4, 'Pasaje Los Pinos 789'),
(5, 5, 'Av. Primavera 321');

-- ================================
-- CARRITOS DE PRUEBA
-- ================================
CALL sp_insertar_carrito(1, 2, 2); -- Arnold compra 2 Mouse
CALL sp_insertar_carrito(2, 1, 1); -- Jordan compra 1 Laptop
CALL sp_insertar_carrito(3, 3, 4); -- Lucía compra 4 Teclados
CALL sp_insertar_carrito(4, 5, 1); -- Carlos compra 1 Auricular
CALL sp_insertar_carrito(5, 4, 2); -- María compra 2 Monitores

-- ================================
-- PEDIDOS DE PRUEBA
-- ================================
CALL sp_registrar_pedido(1, 100.00, 1);
CALL sp_registrar_pedido(2, 2500.00, 2);
CALL sp_registrar_pedido(3, 480.00, 3);
CALL sp_registrar_pedido(4, 180.00, 4);
CALL sp_registrar_pedido(5, 1500.00, 5);

-- ================================
-- DETALLES DE PEDIDOS
-- ================================
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
VALUES (1, 2, 2, 50.00);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
VALUES (2, 1, 1, 2500.00);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
VALUES (3, 3, 4, 120.00);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
VALUES (4, 5, 1, 180.00);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
VALUES (5, 4, 2, 750.00);

-- ================================
-- CONSULTAS DE VALIDACIÓN
-- ================================

SELECT * FROM usuarios;
SELECT * FROM productos;
SELECT * FROM carrito;
SELECT * FROM detalle_carrito;
SELECT * FROM pedidos;
SELECT * FROM detalle_pedido;

-- Reporte: pedidos con cliente y dirección
SELECT p.id_pedido, u.nombre AS cliente, d.direccion, p.fecha_pedido, p.estado, p.total
FROM pedidos p
JOIN usuarios u ON p.id_usuario = u.id_usuario
JOIN direcciones d ON p.id_direccion = d.id_direccion;

-- Reporte: detalle de pedidos con producto
SELECT dp.id_pedido, pr.nombre AS producto, dp.cantidad, dp.precio_unitario
FROM detalle_pedido dp
JOIN productos pr ON dp.id_producto = pr.id_producto;
