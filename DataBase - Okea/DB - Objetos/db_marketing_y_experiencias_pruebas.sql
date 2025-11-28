-- =====================================================
-- OKEA E-COMMERCE - PRUEBAS
-- Módulo: Marketing y Experiencia
-- Motor: MySQL 8.0
-- Autor: Luis Lagos
-- Fecha: 2025-01-24
-- =====================================================

USE ecommerce_db_okea;

-- =====================================================
-- PREPARACIÓN DE DATOS DE PRUEBA
-- =====================================================

-- Limpiar datos de prueba anteriores (opcional)
-- DELETE FROM cupones_uso WHERE id_usuario IN (SELECT id_usuario FROM usuarios WHERE email LIKE 'prueba%');
-- DELETE FROM favoritos WHERE id_usuario IN (SELECT id_usuario FROM usuarios WHERE email LIKE 'prueba%');
-- DELETE FROM newsletter WHERE email LIKE 'prueba%';
-- DELETE FROM cupones WHERE codigo LIKE 'TEST%';

-- Insertar usuarios de prueba
INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, email_verificado, activo) VALUES
('Carlos', 'Pérez', 'prueba.carlos@okea.com', '$2y$10$abcdefghijklmnopqrstuv', '987654321', 1, 1),
('María', 'García', 'prueba.maria@okea.com', '$2y$10$abcdefghijklmnopqrstuv', '987654322', 1, 1),
('Juan', 'López', 'prueba.juan@okea.com', '$2y$10$abcdefghijklmnopqrstuv', '987654323', 1, 1),
('Ana', 'Martínez', 'prueba.ana@okea.com', '$2y$10$abcdefghijklmnopqrstuv', '987654324', 1, 1);

-- Insertar categorías y marcas de prueba
INSERT INTO categorias (nombre_categoria, slug, descripcion, activo) VALUES
('Electrónica', 'electronica', 'Productos electrónicos', 1),
('Hogar', 'hogar', 'Productos para el hogar', 1);

INSERT INTO marcas (nombre_marca, slug, descripcion, activo) VALUES
('Samsung', 'samsung', 'Marca Samsung', 1),
('LG', 'lg', 'Marca LG', 1);

-- Insertar productos de prueba
INSERT INTO productos (nombre, slug, sku, precio, stock, id_categoria, id_marca, descripcion, activo) VALUES
('Smartphone Galaxy S21', 'smartphone-galaxy-s21', 'SKU001', 2999.00, 50, 1, 1, 'Teléfono Samsung', 1),
('Smart TV LG 55"', 'smart-tv-lg-55', 'SKU002', 1999.00, 30, 1, 2, 'Televisor LG', 1),
('Refrigeradora LG', 'refrigeradora-lg', 'SKU003', 3500.00, 20, 2, 2, 'Refrigeradora LG', 1);

-- Insertar cupones de prueba
INSERT INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, monto_minimo, usos_maximos, fecha_inicio, fecha_fin, activo) VALUES
('TEST10', 'Cupón de prueba 10% descuento', 'porcentaje', 10.00, 100.00, 100, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1),
('TEST50', 'Cupón de prueba 50 soles descuento', 'monto_fijo', 50.00, 200.00, 50, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1),
('TESTEXP', 'Cupón expirado', 'porcentaje', 15.00, 50.00, 10, DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), 1),
('TESTNEXT', 'Cupón futuro', 'porcentaje', 20.00, 300.00, 20, DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 35 DAY), 1),
('TEST5DIAS', 'Cupón por vencer en 5 días', 'porcentaje', 25.00, 150.00, 30, NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), 1);


-- =====================================================
-- PRUEBAS DE STORED PROCEDURES
-- =====================================================

-- =====================================================
-- Prueba 1: sp_aplicar_cupon_seguro - Caso exitoso
-- =====================================================
SELECT '=== PRUEBA 1: Aplicar cupón válido ===' AS prueba;

-- Primero crear un pedido de prueba
SET @id_usuario_prueba = (SELECT id_usuario FROM usuarios WHERE email = 'prueba.carlos@okea.com');
SET @id_producto_prueba = (SELECT id_producto FROM productos WHERE sku = 'SKU001');

-- Crear dirección de prueba
INSERT INTO direcciones (id_usuario, calle, ciudad, provincia, codigo_postal, pais, tipo, telefono)
VALUES (@id_usuario_prueba, 'Av. Test 123', 'Lima', 'Lima', '15001', 'Perú', 'envio', '987654321');

SET @id_direccion_prueba = LAST_INSERT_ID();

-- Crear pedido
INSERT INTO pedidos (id_usuario, estado, total, id_direccion)
VALUES (@id_usuario_prueba, 'pendiente', 2999.00, @id_direccion_prueba);

SET @id_pedido_prueba = LAST_INSERT_ID();

-- Aplicar cupón
CALL sp_aplicar_cupon_seguro(
    'TEST10',                    -- código cupón
    @id_usuario_prueba,          -- id usuario
    2999.00,                     -- monto pedido
    @id_pedido_prueba,           -- id pedido
    '192.168.1.100',             -- ip usuario
    @resultado,                  -- OUT resultado
    @descuento,                  -- OUT descuento
    @mensaje                     -- OUT mensaje
);

SELECT @resultado AS resultado, @descuento AS descuento, @mensaje AS mensaje;
SELECT * FROM cupones_uso WHERE id_pedido = @id_pedido_prueba ORDER BY id_uso DESC LIMIT 1;


-- =====================================================
-- Prueba 2: sp_aplicar_cupon_seguro - Cupón expirado
-- =====================================================
SELECT '=== PRUEBA 2: Intentar aplicar cupón expirado ===' AS prueba;

-- Crear otro pedido
INSERT INTO pedidos (id_usuario, estado, total, id_direccion)
VALUES (@id_usuario_prueba, 'pendiente', 1500.00, @id_direccion_prueba);

SET @id_pedido_prueba2 = LAST_INSERT_ID();

-- Intentar aplicar cupón expirado (debe fallar)
-- Descomenta para probar el error:
-- CALL sp_aplicar_cupon_seguro('TESTEXP', @id_usuario_prueba, 1500.00, @id_pedido_prueba2, '192.168.1.100', @resultado, @descuento, @mensaje);
-- SELECT @resultado AS resultado, @descuento AS descuento, @mensaje AS mensaje;

SELECT 'Cupón TESTEXP está expirado - La prueba debe generar error si se ejecuta' AS nota;


-- =====================================================
-- Prueba 3: sp_aplicar_cupon_seguro - Monto mínimo no alcanzado
-- =====================================================
SELECT '=== PRUEBA 3: Monto mínimo no alcanzado ===' AS prueba;

-- Crear pedido con monto bajo
INSERT INTO pedidos (id_usuario, estado, total, id_direccion)
VALUES (@id_usuario_prueba, 'pendiente', 50.00, @id_direccion_prueba);

SET @id_pedido_prueba3 = LAST_INSERT_ID();

-- Intentar aplicar cupón (monto mínimo es 100)
-- Descomenta para probar el error:
-- CALL sp_aplicar_cupon_seguro('TEST10', @id_usuario_prueba, 50.00, @id_pedido_prueba3, '192.168.1.100', @resultado, @descuento, @mensaje);

SELECT 'Cupón TEST10 requiere monto mínimo de 100 - La prueba debe generar error si se ejecuta' AS nota;


-- =====================================================
-- Prueba 4: sp_reporte_cupones_usados
-- =====================================================
SELECT '=== PRUEBA 4: Generar reporte de cupones usados ===' AS prueba;

-- Agregar más usos de cupones para el reporte
SET @id_usuario_maria = (SELECT id_usuario FROM usuarios WHERE email = 'prueba.maria@okea.com');

INSERT INTO pedidos (id_usuario, estado, total, id_direccion)
VALUES (@id_usuario_maria, 'pendiente', 3500.00, @id_direccion_prueba);

SET @id_pedido_maria = LAST_INSERT_ID();

CALL sp_aplicar_cupon_seguro('TEST10', @id_usuario_maria, 3500.00, @id_pedido_maria, '192.168.1.101', @resultado, @descuento, @mensaje);

-- Generar reporte
CALL sp_reporte_cupones_usados(
    DATE_SUB(NOW(), INTERVAL 7 DAY),
    DATE_ADD(NOW(), INTERVAL 1 DAY),
    @id_usuario_prueba
);


-- =====================================================
-- Prueba 5: sp_limpiar_datos_sensibles
-- =====================================================
SELECT '=== PRUEBA 5: Limpiar datos sensibles ===' AS prueba;

-- Crear datos antiguos de prueba
INSERT INTO newsletter (email, nombre, estado, fecha_suscripcion, fecha_baja, ip_suscripcion)
VALUES
('antiguo1@test.com', 'Usuario Antiguo 1', 'inactivo', DATE_SUB(NOW(), INTERVAL 400 DAY), DATE_SUB(NOW(), INTERVAL 370 DAY), '10.0.0.1'),
('antiguo2@test.com', 'Usuario Antiguo 2', 'inactivo', DATE_SUB(NOW(), INTERVAL 500 DAY), DATE_SUB(NOW(), INTERVAL 400 DAY), '10.0.0.2');

-- Ver datos antes de limpiar
SELECT 'Datos ANTES de limpiar:' AS estado;
SELECT id_suscripcion, email, estado, ip_suscripcion
FROM newsletter
WHERE email LIKE 'antiguo%';

-- Ejecutar limpieza (365 días de antigüedad)
CALL sp_limpiar_datos_sensibles(365, @id_usuario_prueba, @registros_afectados);

SELECT CONCAT('Registros afectados: ', @registros_afectados) AS resultado;

-- Ver datos después de limpiar
SELECT 'Datos DESPUÉS de limpiar:' AS estado;
SELECT id_suscripcion, email, estado, ip_suscripcion
FROM newsletter
WHERE email LIKE 'antiguo%';


-- =====================================================
-- Prueba 6: sp_usuarios_mas_activos
-- =====================================================
SELECT '=== PRUEBA 6: Usuarios más activos ===' AS prueba;

-- Agregar favoritos de prueba
SET @id_usuario_juan = (SELECT id_usuario FROM usuarios WHERE email = 'prueba.juan@okea.com');
SET @id_usuario_ana = (SELECT id_usuario FROM usuarios WHERE email = 'prueba.ana@okea.com');

INSERT INTO favoritos (id_usuario, id_producto, ip_usuario) VALUES
(@id_usuario_prueba, @id_producto_prueba, '192.168.1.100'),
(@id_usuario_prueba, (SELECT id_producto FROM productos WHERE sku = 'SKU002'), '192.168.1.100'),
(@id_usuario_maria, @id_producto_prueba, '192.168.1.101'),
(@id_usuario_juan, (SELECT id_producto FROM productos WHERE sku = 'SKU003'), '192.168.1.102'),
(@id_usuario_juan, @id_producto_prueba, '192.168.1.102'),
(@id_usuario_juan, (SELECT id_producto FROM productos WHERE sku = 'SKU002'), '192.168.1.102');

-- Obtener top 5 usuarios más activos de los últimos 30 días
CALL sp_usuarios_mas_activos(5, 30);


-- =====================================================
-- PRUEBAS DE TRIGGERS
-- =====================================================

-- =====================================================
-- Prueba 7: trg_before_insert_newsletter
-- =====================================================
SELECT '=== PRUEBA 7: Trigger validación newsletter ===' AS prueba;

-- Insertar newsletter válido
INSERT INTO newsletter (email, nombre, ip_suscripcion)
VALUES ('NUEVO.USUARIO@OKEA.COM', '  Usuario Nuevo  ', '192.168.1.200');

-- Ver que el email se normalizó a minúsculas y el nombre se limpió
SELECT id_suscripcion, email, nombre, token_confirmacion, estado
FROM newsletter
WHERE email = 'nuevo.usuario@okea.com';

-- Intentar insertar email inválido (debe fallar)
-- Descomenta para probar:
-- INSERT INTO newsletter (email, nombre, ip_suscripcion) VALUES ('email-invalido', 'Test', '192.168.1.201');


-- =====================================================
-- Prueba 8: trg_after_insert_favoritos
-- =====================================================
SELECT '=== PRUEBA 8: Trigger after insert favoritos ===' AS prueba;

-- Ver logs antes
SELECT COUNT(*) AS logs_antes FROM logs WHERE accion = 'FAVORITO_AGREGADO';

-- Insertar un favorito
INSERT INTO favoritos (id_usuario, id_producto, ip_usuario)
VALUES (@id_usuario_ana, (SELECT id_producto FROM productos WHERE sku = 'SKU003'), '192.168.1.103');

-- Ver logs después
SELECT COUNT(*) AS logs_despues FROM logs WHERE accion = 'FAVORITO_AGREGADO';

-- Ver último log de favorito
SELECT * FROM logs
WHERE accion = 'FAVORITO_AGREGADO'
ORDER BY fecha_log DESC
LIMIT 1;


-- =====================================================
-- Prueba 9: trg_actualizar_usos_cupon
-- =====================================================
SELECT '=== PRUEBA 9: Trigger actualizar usos cupón ===' AS prueba;

-- Ver usos actuales del cupón TEST50
SELECT codigo, usos_actuales, usos_maximos
FROM cupones
WHERE codigo = 'TEST50';

-- Crear pedido y aplicar cupón
INSERT INTO pedidos (id_usuario, estado, total, id_direccion)
VALUES (@id_usuario_ana, 'pendiente', 500.00, @id_direccion_prueba);

SET @id_pedido_ana = LAST_INSERT_ID();

CALL sp_aplicar_cupon_seguro('TEST50', @id_usuario_ana, 500.00, @id_pedido_ana, '192.168.1.103', @resultado, @descuento, @mensaje);

-- Ver usos actualizados
SELECT codigo, usos_actuales, usos_maximos
FROM cupones
WHERE codigo = 'TEST50';


-- =====================================================
-- PRUEBAS DE VISTAS
-- =====================================================

-- =====================================================
-- Prueba 10: vw_cupones_activos
-- =====================================================
SELECT '=== PRUEBA 10: Vista cupones activos ===' AS prueba;

SELECT
    codigo,
    tipo_descuento,
    valor_descuento,
    usos_disponibles,
    dias_restantes
FROM vw_cupones_activos
ORDER BY dias_restantes ASC;


-- =====================================================
-- Prueba 11: vw_estadisticas_cupones
-- =====================================================
SELECT '=== PRUEBA 11: Vista estadísticas cupones ===' AS prueba;

SELECT
    codigo,
    total_intentos_uso,
    usos_exitosos,
    usos_rechazados,
    tasa_exito_porcentaje,
    descuento_total_otorgado,
    monto_total_pedidos
FROM vw_estadisticas_cupones
WHERE total_intentos_uso > 0
ORDER BY usos_exitosos DESC;


-- =====================================================
-- Prueba 12: vw_newsletter_activos
-- =====================================================
SELECT '=== PRUEBA 12: Vista newsletter activos ===' AS prueba;

SELECT
    email,
    nombre,
    estado_confirmacion,
    dias_suscrito
FROM vw_newsletter_activos
ORDER BY fecha_suscripcion DESC
LIMIT 10;


-- =====================================================
-- Prueba 13: vw_favoritos_por_producto
-- =====================================================
SELECT '=== PRUEBA 13: Vista favoritos por producto ===' AS prueba;

SELECT
    nombre_producto,
    nombre_categoria,
    nombre_marca,
    total_favoritos,
    usuarios_unicos,
    precio
FROM vw_favoritos_por_producto
ORDER BY total_favoritos DESC;


-- =====================================================
-- Prueba 14: vw_usuarios_engagement
-- =====================================================
SELECT '=== PRUEBA 14: Vista usuarios engagement ===' AS prueba;

SELECT
    nombre,
    apellido,
    email,
    total_favoritos,
    total_cupones_usados,
    score_engagement
FROM vw_usuarios_engagement
ORDER BY score_engagement DESC
LIMIT 10;


-- =====================================================
-- Prueba 15: vw_cupones_proximos_vencer
-- =====================================================
SELECT '=== PRUEBA 15: Vista cupones próximos a vencer ===' AS prueba;

SELECT
    codigo,
    descripcion,
    dias_para_vencer,
    prioridad_alerta,
    usos_restantes
FROM vw_cupones_proximos_vencer
ORDER BY dias_para_vencer ASC;


-- =====================================================
-- VERIFICACIÓN DE LOGS
-- =====================================================
SELECT '=== VERIFICACIÓN DE LOGS GENERALES ===' AS prueba;

SELECT
    operacion,
    accion,
    COUNT(*) AS total_registros
FROM logs
WHERE fecha_log >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
GROUP BY operacion, accion
ORDER BY total_registros DESC;

-- Ver últimos 10 logs
SELECT
    id_log,
    id_usuario,
    operacion,
    accion,
    LEFT(descripcion, 50) AS descripcion_corta,
    fecha_log
FROM logs
ORDER BY fecha_log DESC
LIMIT 10;


-- =====================================================
-- RESUMEN DE PRUEBAS
-- =====================================================
SELECT '=== RESUMEN DE PRUEBAS ===' AS prueba;

SELECT 'Total cupones creados' AS metrica, COUNT(*) AS valor FROM cupones
UNION ALL
SELECT 'Total cupones usados', COUNT(*) FROM cupones_uso
UNION ALL
SELECT 'Total favoritos', COUNT(*) FROM favoritos
UNION ALL
SELECT 'Total newsletter activos', COUNT(*) FROM newsletter WHERE estado = 'activo'
UNION ALL
SELECT 'Total logs generados hoy', COUNT(*) FROM logs WHERE DATE(fecha_log) = CURDATE();


-- =====================================================
-- FIN DE PRUEBAS
-- =====================================================
SELECT '=== TODAS LAS PRUEBAS COMPLETADAS ===' AS resultado;

