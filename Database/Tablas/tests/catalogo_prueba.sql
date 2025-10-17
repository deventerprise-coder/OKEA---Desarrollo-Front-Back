-- categorías de ejemplo
INSERT INTO categorias (nombre_categoria, slug, descripcion) VALUES
('Electrónicos', 'electronicos', 'Dispositivos electrónicos y tecnología'),
('Ropa y Accesorios', 'ropa-y-accesorios', 'Vestimenta y complementos de moda'),
('Hogar y Jardín', 'hogar-y-jardin', 'Artículos para el hogar y jardinería'),
('Deportes', 'deportes', 'Equipamiento y ropa deportiva'),
('Libros', 'libros', 'Literatura, educación y entretenimiento'),
('Juguetes', 'juguetes', 'Juguetes y juegos para todas las edades');

-- marcas de ejemplo
INSERT INTO marcas (nombre_marca, slug, descripcion) VALUES
('Samsung', 'samsung', 'Tecnología innovadora coreana'),
('Apple', 'apple', 'Productos premium de tecnología'),
('Nike', 'nike', 'Marca deportiva líder mundial'),
('Adidas', 'adidas', 'Calzado y ropa deportiva'),
('Sony', 'sony', 'Electrónicos y entretenimiento'),
('LG', 'lg', 'Electrodomésticos y tecnología'),
('Zara', 'zara', 'Moda contemporánea'),
('H&M', 'hm', 'Moda accesible y sostenible');

-- productos de ejemplo
INSERT INTO productos (nombre, slug, descripcion, precio, stock, id_categoria, id_marca, imagen_url, galeria_imagenes) VALUES
('iPhone 15 Pro', 'iphone-15-pro', 'El último smartphone de Apple con chip A17 Pro y cámara avanzada con zoom óptico de 3x y grabación de video en 4K ProRes.', 1199.99, 50, 1, 2, 'url1', '["url1.1", "url1.2", "url1.3"]'),
('Galaxy S24 Ultra', 'galaxy-s24-ultra', 'Smartphone Samsung con S Pen integrado y cámara de 200MP con inteligencia artificial para fotografía profesional.', 1299.99, 30, 1, 1, 'url2', '["url2.1", "url2.2"]'),
('Air Jordan 1', 'air-jordan-1', 'Zapatillas icónicas de basketball Jordan Brand con diseño clásico y tecnología Nike Air para máximo confort.', 170.00, 100, 4, 3, 'url3', '["url3.1", "url3.2"]'),
('Camiseta Deportiva Adidas', 'camiseta-deportiva-adidas', 'Camiseta técnica para entrenamientos con tecnología Climacool que mantiene la piel seca y fresca durante el ejercicio.', 45.00, 200, 4, 4, 'url4', '["url4.1", "url4.2"]');

-- ofertas de ejemplo
INSERT INTO ofertas (id_producto, precio_original, precio_oferta, fecha_inicio, fecha_fin, activo) VALUES
(5, 1199.99, 999.99, '2025-10-01 00:00:00', '2025-10-31 23:59:59', TRUE),
(6, 1299.99, 1099.99, '2025-10-05 00:00:00', '2025-10-25 23:59:59', TRUE),
(7, 170.00, 135.99, '2025-10-01 00:00:00', '2025-10-15 23:59:59', TRUE),
(8, 45.00, 35.99, '2025-10-08 00:00:00', '2025-10-22 23:59:59', TRUE),
(9, 299.99, 249.99, '2025-10-01 00:00:00', '2025-11-30 23:59:59', TRUE),
(5, 1199.99, 899.99, '2025-11-01 00:00:00', '2025-11-30 23:59:59', FALSE),
(10, 199.99, 149.99, '2025-10-10 00:00:00', '2025-10-20 23:59:59', TRUE),
(6, 1299.99, 999.99, '2025-11-15 00:00:00', '2025-12-15 23:59:59', FALSE);

-- tablas
select * from categorias;
select * from marcas;
select id_producto, nombre, slug, precio, stock, id_categoria, id_marca from productos;



-- Verificar que los índices se crearon correctamente
SHOW INDEX FROM categorias;
SHOW INDEX FROM marcas;  
SHOW INDEX FROM productos;



-- verificar rendimiento de consultas con indices
EXPLAIN SELECT * FROM productos WHERE slug = 'iphone-15-pro';
EXPLAIN SELECT * FROM productos WHERE id_categoria = 1 AND activo = TRUE;
EXPLAIN SELECT * FROM productos WHERE nombre LIKE '%iPhone%';
EXPLAIN SELECT * FROM productos WHERE nombre LIKE 'iPhone%';
EXPLAIN SELECT * FROM productos WHERE precio BETWEEN 100 AND 500;



--probar restricciones
INSERT INTO productos (nombre, slug, descripcion, precio, stock, id_categoria, id_marca) VALUES ('Test Producto', 'test-producto', 'Descripción test', -10.00, 5, 1, 1); --precio negativo
INSERT INTO productos (nombre, slug, descripcion, precio, stock, id_categoria, id_marca) VALUES ('Test Producto 2', 'test-producto-2', 'Descripción test', 100.00, -5, 1, 1); --stock negativo
INSERT INTO productos (nombre, slug, descripcion, precio, stock, id_categoria, id_marca) VALUES ('Test Producto 3', 'test-producto-3', 'Descripción test', 100.00, 5, 999, 1); --categoria no existe
INSERT INTO productos (nombre, slug, descripcion, precio, stock, id_categoria, id_marca) VALUES ('Test Producto 4', 'iphone-15-pro', 'Descripción test', 100.00, 5, 1, 1); --slug duplicado
DELETE FROM categorias WHERE id_categoria = 1; --categoria con productos asociados



-- Probar triggers
-- generación de slug en categorías
INSERT INTO categorias (nombre_categoria, descripcion) VALUES ('Electrónicos y Gadgets', 'Categoría de prueba con caracteres especiales');
-- generación de slug en marcas
INSERT INTO marcas (nombre_marca, descripcion) VALUES ('Marca Ñoña & Española', 'Marca con caracteres especiales');
-- generación de slug en productos
INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, id_marca) VALUES ('Teléfono Móvil Último Modelo', 'Descripción del teléfono', 299.99, 20, 1, 1);
-- verificar que el trigger no sobrescribe slug manual
INSERT INTO productos (nombre, slug, descripcion, precio, stock, id_categoria, id_marca) VALUES ('Producto con Slug Manual', 'mi-slug-personalizado', 'Descripción', 199.99, 15, 1, 1);
-- se insertara una oferta sin porcentaje_descuento, el trigger debe calcularlo automáticamente
INSERT INTO ofertas (id_producto, precio_original, precio_oferta, porcentaje_descuento, fecha_inicio, fecha_fin, activo) 
VALUES (7, 170.00, 127.50, 25.00, '2025-10-12 00:00:00', '2025-11-12 23:59:59', TRUE);
-- actualizar producto para que el trigger detecte stock 0 y desactive el producto
SELECT id_producto, nombre, stock, activo FROM productos WHERE id_producto = 9;
UPDATE productos SET stock = 0 WHERE id_producto = 9;
SELECT id_producto, nombre, stock, activo FROM productos WHERE id_producto = 9;





-- Ejemplo para probar los stored procedures creados
SHOW PROCEDURE STATUS WHERE db = 'okea'; -- listar procedimientos
-- obtener productos por categoría
CALL sp_obtener_productos_por_categoria(1, TRUE, 10, 0);
-- Procedimiento con paginación
CALL sp_obtener_productos_por_categoria(1, TRUE, 2, 0); -- Primera página
CALL sp_obtener_productos_por_categoria(1, TRUE, 2, 2); -- Segunda página
-- Procedimiento de búsqueda básica
CALL sp_buscar_productos('iPhone', NULL, NULL, NULL, NULL, 10, 0);
-- Búsqueda con filtros de categoría
CALL sp_buscar_productos(NULL, 1, NULL, NULL, NULL, 10, 0);
-- Búsqueda con filtros de precio
CALL sp_buscar_productos(NULL, NULL, NULL, 100.00, 1000.00, 10, 0);
-- Búsqueda combinada con múltiples filtros
CALL sp_buscar_productos('Teléfono', 1, 2, 100.00, 1500.00, 5, 0);
--
CALL sp_crear_producto(
    'MacBook Pro 16"',
    'macbook-pro-16',
    'Laptop profesional Apple con chip M3 Max, pantalla Liquid Retina XDR y hasta 22 horas de batería',
    2499.99,
    25,
    1,
    2,
    'url_macbook',
    '["url_mac1.jpg", "url_mac2.jpg", "url_mac3.jpg"]',
    @nuevo_id
);
SELECT @nuevo_id AS id_producto_creado;
--
CALL sp_actualizar_producto(
    5,
    'iPhone 15 Pro Max',
    'iphone-15-pro-max',
    'El último smartphone de Apple con chip A17 Pro, cámara avanzada con zoom óptico de 5x y grabación de video en 4K ProRes con titanio',
    1299.99,
    55,
    1,
    2,
    'url_iphone_updated',
    '["url1.1", "url1.2", "url1.3", "url1.4"]',
    TRUE
);
SELECT * FROM productos WHERE id_producto = 5;
--
CALL sp_eliminar_producto(10);
SELECT id_producto, nombre, activo FROM productos WHERE id_producto = 10;
--
CALL sp_crear_oferta_segura(
    7,
    119.99,
    '2025-10-15 00:00:00',
    '2025-10-30 23:59:59',
    @id_oferta_creada,
    @mensaje_resultado
);
SELECT @id_oferta_creada AS id_oferta, @mensaje_resultado AS mensaje;
SELECT * FROM ofertas WHERE id_oferta = @id_oferta_creada;
--
CALL sp_crear_oferta_segura(
    7,
    180.00,
    '2025-10-15 00:00:00',
    '2025-10-30 23:59:59',
    @id_oferta_error,
    @mensaje_error
);
SELECT @id_oferta_error AS id_oferta, @mensaje_error AS mensaje;





-- Probar vistas
-- vista productos completo
SELECT * FROM vw_productos_completo;
-- vista productos completo con filtro
SELECT * FROM vw_productos_completo WHERE activo = TRUE;
-- vista catálogo público
SELECT * FROM vw_catalogo_publico;
-- vista catálogo público por categoría
SELECT * FROM vw_catalogo_publico WHERE nombre_categoria = 'Electrónicos';
-- contar productos por categoría usando vistas
SELECT 
    nombre_categoria, 
    COUNT(*) as total_productos 
FROM vw_catalogo_publico 
GROUP BY nombre_categoria;
-- productos más caros usando vistas
SELECT * FROM vw_catalogo_publico ORDER BY precio DESC LIMIT 5;
select * from vw_ofertas_vigentes;





-- pruebas de normalización
-- Verificar 1NF: No hay valores repetidos ni múltiples valores en una celda
SELECT * FROM productos WHERE nombre LIKE '%,%' OR descripcion LIKE '%,%';
-- Verificar 2NF: Dependencias funcionales completas
-- Cada tabla tiene clave primaria y todos los campos dependen de ella
DESCRIBE categorias;
DESCRIBE marcas;
DESCRIBE productos;
-- Verificar 3NF: No hay dependencias transitivas
-- Verificar que los datos de categoría vienen de la tabla categorias
SELECT DISTINCT
    p.id_categoria,
    p.nombre as producto_nombre,
    c.nombre_categoria
FROM productos p
LEFT JOIN categorias c ON p.id_categoria = c.id_categoria;
-- Verificar que los datos de marca vienen de la tabla marcas
SELECT DISTINCT
    p.id_marca,
    p.nombre as producto_nombre,
    m.nombre_marca
FROM productos p  
LEFT JOIN marcas m ON p.id_marca = m.id_marca;
-- buscar posibles datos duplicados
SELECT nombre_categoria, COUNT(*) as duplicados 
FROM categorias 
GROUP BY nombre_categoria 
HAVING COUNT(*) > 1;
SELECT nombre_marca, COUNT(*) as duplicados 
FROM marcas 
GROUP BY nombre_marca 
HAVING COUNT(*) > 1;