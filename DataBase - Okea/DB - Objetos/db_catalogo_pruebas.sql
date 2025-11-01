-- =====================================================================
-- INSERTAMOS DATOS DE PRUEBA
-- =====================================================================

-- Usuarios de prueba
INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, email_verificado, activo) VALUES
('Admin', 'Sistema', 'admin@okea.com', '$2y$10$abc123', '987654321', 1, 1),
('Carlos', 'Pérez', 'carlos@email.com', '$2y$10$def456', '987123456', 1, 1),
('María', 'García', 'maria@email.com', '$2y$10$ghi789', '987456789', 1, 1),
('Juan', 'López', 'juan@email.com', '$2y$10$jkl012', '987789123', 0, 1);

-- Roles
INSERT INTO roles (nombre_rol, descripcion) VALUES
('Administrador', 'Control total del sistema'),
('Vendedor', 'Gestión de productos y pedidos'),
('Cliente', 'Usuario cliente del ecommerce');

-- Asignar roles
INSERT INTO usuarios_roles (id_usuario, id_rol) VALUES
(1, 1), -- Admin es Administrador
(2, 2), -- Carlos es Vendedor
(3, 3), -- María es Cliente
(4, 3); -- Juan es Cliente

-- Categorías (TRIGGER: trg_before_insert_categorias genera slug automático)
INSERT INTO categorias (nombre_categoria, descripcion, activo) VALUES
('Electrónica', 'Dispositivos y accesorios electrónicos', 1),
('Ropa y Moda', 'Prendas de vestir y accesorios', 1),
('Hogar y Cocina', 'Artículos para el hogar', 1),
('Deportes', 'Equipamiento deportivo', 1),
('Categoría Inactiva', 'No debe aparecer en catálogo', 0);
SELECT * from categorias;

-- Marcas (TRIGGER: trg_before_insert_marcas genera slug automático)
INSERT INTO marcas (nombre_marca, descripcion, activo) VALUES
('Samsung', 'Tecnología de vanguardia', 1),
('Nike', 'Marca deportiva líder', 1),
('Sony', 'Electrónica de consumo', 1),
('Adidas', 'Equipamiento deportivo', 1),
('Marca Inactiva', 'No debe aparecer', 0);
SELECT * from marcas;

-- Productos (TRIGGER: trg_before_insert_productos genera slug automático)
INSERT INTO productos (nombre, sku, descripcion, precio, stock, id_categoria, id_marca, imagen_url, galeria_imagenes, activo) VALUES
('Smartphone Galaxy S23', 'SAM-S23-001', 'Último modelo de Samsung', 2999.99, 50, 1, 1, '/img/galaxy-s23.jpg', '["img1.jpg","img2.jpg"]', 1),
('Laptop Sony VAIO', 'SONY-VAIO-001', 'Laptop profesional', 4500.00, 20, 1, 3, '/img/vaio.jpg', '["img1.jpg"]', 1),
('Zapatillas Nike Air Max', 'NIKE-AM-001', 'Zapatillas deportivas premium', 450.00, 100, 4, 2, '/img/nike-air.jpg', '["img1.jpg","img2.jpg","img3.jpg"]', 1),
('Camiseta Adidas Original', 'ADIDAS-CAM-001', 'Camiseta deportiva', 89.90, 200, 2, 4, '/img/adidas-cam.jpg', '[]', 1),
('Smart TV Samsung 55"', 'SAM-TV55-001', 'Smart TV 4K', 1899.00, 30, 1, 1, '/img/tv55.jpg', '["img1.jpg"]', 1),
('Producto Sin Stock', 'PROD-NOSTOCK', 'Este producto se quedará sin stock', 199.00, 5, 1, 1, '/img/test.jpg', '[]', 1),
('Producto Categoría Inactiva', 'PROD-CATINACT', 'No debe aparecer', 99.00, 10, 5, 1, '/img/test2.jpg', '[]', 1);
SELECT * from productos;

-- Direcciones
INSERT INTO direcciones (id_usuario, calle, telefono, ciudad, provincia, codigo_postal, pais, tipo) VALUES
(3, 'Av. Principal 123', '987456789', 'Lima', 'Lima', '15001', 'Perú', 'envio'),
(3, 'Jr. Secundario 456', '987456789', 'Lima', 'Lima', '15002', 'Perú', 'facturacion'),
(4, 'Calle Comercio 789', '987789123', 'Arequipa', 'Arequipa', '04001', 'Perú', 'envio');

-- Banners
INSERT INTO banners (id_usuario_creacion, titulo, subtitulo, imagen_url, enlace_url, seccion, orden, activo, fecha_inicio, fecha_fin) VALUES
(1, 'Gran Venta de Verano', '50% de descuento', '/img/banner1.jpg', '/ofertas', 'home_principal', 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY)),
(1, 'Nueva Colección Nike', 'Llega pisando fuerte', '/img/banner2.jpg', '/marca/nike', 'home_secundario', 1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY)),
(1, 'Banner Vencido', 'Este no debe aparecer', '/img/banner3.jpg', '/test', 'home_principal', 2, 1, DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_SUB(NOW(), INTERVAL 30 DAY));

-- Cupones
INSERT INTO cupones (id_usuario_creacion, codigo, descripcion, tipo_descuento, valor_descuento, monto_minimo, usos_maximos, fecha_inicio, fecha_fin, activo) VALUES
(1, 'VERANO2024', 'Descuento de verano', 'porcentaje', 15.00, 100.00, 100, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), 1),
(1, 'ENVIOGRATIS', 'Envío gratis en compras mayores', 'monto_fijo', 20.00, 200.00, 50, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), 1),
(1, 'CUPONVENCIDO', 'Este cupón ya expiró', 'porcentaje', 10.00, 50.00, 10, DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_SUB(NOW(), INTERVAL 30 DAY), 1);

-- =====================================================================
-- PROBAMOS TRIGGERS
-- =====================================================================


-- TRIGGER tr_categorias_slug_before_insert
-- Inserta categoría sin slug - debe generarse automáticamente
INSERT INTO categorias (nombre_categoria, descripcion, activo) 
VALUES ('Tecnología Avanzada', 'Categoría con acentos y espacios', 1);
SELECT id_categoria, nombre_categoria, slug FROM categorias WHERE nombre_categoria = 'Tecnología Avanzada';


-- TRIGGER tr_productos_stock_before_update
-- Actualiza stock a 0 - debe desactivar el producto automáticamente
SELECT id_producto, nombre, stock, activo FROM productos WHERE nombre = 'Producto Sin Stock';
UPDATE productos SET stock = 0 WHERE nombre = 'Producto Sin Stock';
SELECT id_producto, nombre, stock, activo FROM productos WHERE nombre = 'Producto Sin Stock';


-- TRIGGER trg_before_insert_categorias (validación duplicados)
-- Intenta insertar categoría duplicada - debe fallar
-- Esta línea debería generar un error
-- INSERT INTO categorias (nombre_categoria, activo) VALUES ('Electrónica', 1);


-- TRIGGER trg_after_update_productos (log de cambios)
UPDATE productos SET precio = 2799.99, stock = 45 WHERE sku = 'SAM-S23-001';
SELECT * FROM logs WHERE accion = 'ACTUALIZAR_PRODUCTO' ORDER BY fecha_log DESC LIMIT 5;


-- =====================================================================
-- PROBAMOS STORED PROCEDURES
-- =====================================================================


-- sp_crear_producto
CALL sp_crear_producto(
    'Auriculares Sony WH-1000XM5',           -- p_nombre
    'auriculares-sony-wh-1000xm5',           -- p_slug
    'SONY-WH1000XM5',                        -- p_sku
    'Auriculares con cancelación de ruido', -- p_descripcion
    899.99,                                   -- p_precio
    25,                                       -- p_stock
    1,                                        -- p_id_categoria
    3,                                        -- p_id_marca
    '/img/sony-auriculares.jpg',            -- p_imagen_url
    '["img1.jpg","img2.jpg"]',              -- p_galeria_imagenes
    1,                                        -- p_usuario
    @nuevo_id_producto,                       -- OUT p_id_producto
    @mensaje_producto                         -- OUT p_mensaje
);
SELECT @nuevo_id_producto AS id_producto_creado, @mensaje_producto AS mensaje;


-- sp_actualizar_producto
CALL sp_actualizar_producto(
    @nuevo_id_producto,  -- id del producto recién creado
    'Auriculares Sony WH-1000XM5 - ACTUALIZADO',
    NULL,  -- slug sin cambiar
    NULL,  -- descripción sin cambiar
    849.99,  -- nuevo precio
    30,      -- nuevo stock
    NULL, NULL, NULL, NULL, NULL,
    1  -- usuario
);
SELECT id_producto, nombre, precio, stock FROM productos WHERE id_producto = @nuevo_id_producto;


-- sp_crear_oferta_segura
-- Crear oferta válida
CALL sp_crear_oferta_segura(
    1,                                  -- id_producto (Galaxy S23)
    2499.99,                           -- precio_oferta
    NOW(),                             -- fecha_inicio
    DATE_ADD(NOW(), INTERVAL 15 DAY), -- fecha_fin
    1,                                 -- usuario
    @id_oferta_creada,
    @mensaje_oferta
);
SELECT @id_oferta_creada AS id_oferta, @mensaje_oferta AS mensaje;
-- Intentar crear oferta con precio mayor (debe fallar)
CALL sp_crear_oferta_segura(
    1,                                  -- id_producto
    3500.00,                           -- precio_oferta MAYOR al actual
    NOW(),
    DATE_ADD(NOW(), INTERVAL 15 DAY),
    1,
    @id_oferta_invalida,
    @mensaje_oferta_invalida
);
SELECT @id_oferta_invalida AS id_oferta_invalida, @mensaje_oferta_invalida AS mensaje;


-- TRIGGER tr_ofertas_calcular_descuento_before_insert
-- Insertar oferta sin especificar descuento_porcentaje
INSERT INTO ofertas (id_producto, precio_original, precio_oferta, fecha_inicio, fecha_fin, id_usuario_creacion, activo)
VALUES (2, 4500.00, 3999.00, NOW(), DATE_ADD(NOW(), INTERVAL 20 DAY), 1, 1);
-- Ver el descuento calculado automáticamente
SELECT id_oferta, id_producto, precio_original, precio_oferta, descuento_porcentaje 
FROM ofertas 
WHERE id_producto = 2 
ORDER BY id_oferta DESC LIMIT 1;


-- sp_eliminar_producto (soft delete)
SELECT id_producto, nombre, activo FROM productos WHERE nombre LIKE '%Camiseta Adidas%';
CALL sp_eliminar_producto(4, 1);  -- Eliminar camiseta Adidas
SELECT id_producto, nombre, activo FROM productos WHERE nombre LIKE '%Camiseta Adidas%';


-- sp_obtener_productos_por_categoria
CALL sp_obtener_productos_por_categoria(
    1,      -- id_categoria (Electrónica)
    TRUE,   -- solo activos
    10,     -- límite
    0       -- offset
);


-- sp_buscar_productos
-- Búsqueda por término
CALL sp_buscar_productos(
    'Samsung',  -- término
    NULL,       -- id_categoria
    NULL,       -- id_marca
    NULL,       -- precio_min
    NULL,       -- precio_max
    10,         -- límite
    0           -- offset
);
-- Búsqueda por rango de precios
CALL sp_buscar_productos(
    NULL,
    1,          -- Electrónica
    NULL,
    1000.00,    -- precio_min
    3000.00,    -- precio_max
    10,
    0
);


-- sp_cerrar_ofertas_vencidas // REVISAR
-- Primero verificar ofertas activas
SELECT COUNT(*) AS ofertas_activas_antes FROM ofertas WHERE activo = 1;
-- Ejecutar procedimiento
CALL sp_cerrar_ofertas_vencidas(1);
-- Verificar ofertas cerradas
SELECT COUNT(*) AS ofertas_activas_despues FROM ofertas WHERE activo = 1;


-- CREAMOS PEDIDOS DE PRUEBA PARA sp_top_productos_vendidos
-- Pedido 1
INSERT INTO pedidos (id_usuario, estado, total, id_direccion) 
VALUES (3, 'pagado', 3449.98, 1);
SET @pedido1 = LAST_INSERT_ID();
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(@pedido1, 1, 1, 2999.99),  -- Galaxy S23
(@pedido1, 3, 1, 450.00);   -- Nike Air Max
-- Pedido 2
INSERT INTO pedidos (id_usuario, estado, total, id_direccion) 
VALUES (4, 'entregado', 5399.99, 3);
SET @pedido2 = LAST_INSERT_ID();
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(@pedido2, 2, 1, 4500.00),  -- Laptop Sony
(@pedido2, 3, 2, 450.00);   -- Nike Air Max x2
-- Pedido 3
INSERT INTO pedidos (id_usuario, estado, total, id_direccion) 
VALUES (3, 'enviado', 1899.00, 1);
SET @pedido3 = LAST_INSERT_ID();
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(@pedido3, 5, 1, 1899.00);  -- Smart TV
-- sp_top_productos_vendidos
CALL sp_top_productos_vendidos(
    5,          -- límite
    NULL,       -- fecha_inicio (todas las fechas)
    NULL        -- fecha_fin
);


-- =====================================================================
-- PROBAMOS VISTAS
-- =====================================================================


-- vw_productos_completo
SELECT * FROM vw_productos_completo LIMIT 5;


-- vw_catalogo_publico
SELECT * FROM vw_catalogo_publico;
-- Verificar que NO aparecen:
-- - Productos inactivos
-- - Productos sin stock
-- - Productos de categorías inactivas
-- - Productos de marcas inactivas


-- vw_ofertas_vigentes
SELECT * FROM vw_ofertas_vigentes;


-- vw_banners_visibles
SELECT * FROM vw_banners_visibles;


-- Uso de cupones para vw_usuarios_con_cupones
-- Registrar uso de cupón
INSERT INTO cupones_uso (id_cupon, id_usuario, id_pedido, email_usuario, monto_pedido, estado)
VALUES (1, 3, @pedido1, 'maria@email.com', 3449.98, 'aplicado');
UPDATE cupones SET usos_actuales = usos_actuales + 1 WHERE id_cupon = 1;
-- Ver la vista
SELECT * FROM vw_usuarios_con_cupones;


-- =====================================================================
-- VERIFICAMOS LOGS
-- =====================================================================

SELECT 
    id_log,
    COALESCE(CONCAT(u.nombre, ' ', u.apellido), 'Sistema') AS usuario,
    operacion,
    accion,
    descripcion,
    fecha_log
FROM logs l
LEFT JOIN usuarios u ON l.id_usuario = u.id_usuario
ORDER BY fecha_log DESC
LIMIT 20;

-- =====================================================================
-- RESUMEN DE PRUEBAS
-- =====================================================================

SELECT 
    'Categorías' AS tabla,
    COUNT(*) AS total,
    SUM(activo) AS activos,
    COUNT(*) - SUM(activo) AS inactivos
FROM categorias

UNION ALL

SELECT 
    'Marcas',
    COUNT(*),
    SUM(activo),
    COUNT(*) - SUM(activo)
FROM marcas

UNION ALL

SELECT 
    'Productos',
    COUNT(*),
    SUM(activo),
    COUNT(*) - SUM(activo)
FROM productos

UNION ALL

SELECT 
    'Ofertas',
    COUNT(*),
    SUM(activo),
    COUNT(*) - SUM(activo)
FROM ofertas

UNION ALL

SELECT 
    'Pedidos',
    COUNT(*),
    SUM(estado IN ('pagado', 'enviado', 'entregado')),
    SUM(estado IN ('pendiente', 'cancelado'))
FROM pedidos

UNION ALL

SELECT 
    'Usuarios',
    COUNT(*),
    SUM(activo),
    COUNT(*) - SUM(activo)
FROM usuarios;