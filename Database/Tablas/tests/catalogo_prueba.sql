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



-- probar stored procedures
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