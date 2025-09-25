-- =====================================================
-- OKEA E-COMMERCE - TESTING CONSOLIDADO
-- Desarrollador: Luis
-- Fecha: 2025-09-25
-- Descripción: Script unificado de testing para módulo de marketing
-- =====================================================

-- =====================================================
-- CONFIGURACIÓN INICIAL
-- =====================================================

-- Crear base de datos de testing si no existe
CREATE DATABASE IF NOT EXISTS okea_marketing_test
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE okea_marketing_test;

-- Desactivar verificación de claves foráneas para testing
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- FASE 1: VERIFICACIÓN DE INSTALACIÓN
-- =====================================================

SELECT '=== FASE 1: VERIFICACIÓN DE INSTALACIÓN ===' as TESTING_FASE;

-- Mostrar todas las tablas creadas
SELECT 'TABLAS DISPONIBLES:' as INFO;
SHOW TABLES;

-- Verificar estructura de tablas principales
SELECT 'ESTRUCTURA DE TABLAS:' as INFO;
DESCRIBE banners;
DESCRIBE cupones;
DESCRIBE ofertas;
DESCRIBE favoritos;
DESCRIBE newsletter;
DESCRIBE cupones_uso;

-- =====================================================
-- FASE 2: TESTING DE DATOS DE PRUEBA
-- =====================================================

SELECT '=== FASE 2: VERIFICACIÓN DE DATOS ===' as TESTING_FASE;

-- Conteo de registros por tabla
SELECT 'CONTEO DE REGISTROS:' as INFO;
SELECT 'banners' as tabla, COUNT(*) as total FROM banners
UNION ALL
SELECT 'cupones' as tabla, COUNT(*) as total FROM cupones
UNION ALL
SELECT 'ofertas' as tabla, COUNT(*) as total FROM ofertas
UNION ALL
SELECT 'favoritos' as tabla, COUNT(*) as total FROM favoritos
UNION ALL
SELECT 'newsletter' as tabla, COUNT(*) as total FROM newsletter
UNION ALL
SELECT 'cupones_uso' as tabla, COUNT(*) as total FROM cupones_uso;

-- =====================================================
-- FASE 3: TESTING FUNCIONAL
-- =====================================================

SELECT '=== FASE 3: TESTING FUNCIONAL ===' as TESTING_FASE;

-- Test 1: Banners activos por sección
SELECT 'TEST 1: BANNERS ACTIVOS POR SECCIÓN' as TEST;
SELECT seccion, COUNT(*) as total_banners,
       SUM(CASE WHEN activo = 1 THEN 1 ELSE 0 END) as activos
FROM banners
GROUP BY seccion
ORDER BY seccion;

-- Test 2: Cupones válidos
SELECT 'TEST 2: CUPONES VÁLIDOS' as TEST;
SELECT codigo, tipo_descuento, valor_descuento,
       CASE
           WHEN fecha_inicio <= NOW() AND fecha_fin >= NOW() AND activo = 1 THEN 'VÁLIDO'
           WHEN fecha_fin < NOW() THEN 'EXPIRADO'
           WHEN fecha_inicio > NOW() THEN 'FUTURO'
           ELSE 'INACTIVO'
       END as estado_cupon
FROM cupones;

-- Test 3: Ofertas vigentes
SELECT 'TEST 3: OFERTAS VIGENTES' as TEST;
SELECT id_producto, nombre_producto, descuento_porcentaje, precio_oferta,
       DATEDIFF(fecha_fin, NOW()) as dias_restantes,
       CASE
           WHEN fecha_inicio <= NOW() AND fecha_fin >= NOW() AND activo = 1 THEN 'VIGENTE'
           WHEN fecha_fin < NOW() THEN 'EXPIRADA'
           WHEN fecha_inicio > NOW() THEN 'FUTURA'
           ELSE 'INACTIVA'
       END as estado_oferta
FROM ofertas
ORDER BY dias_restantes;

-- Test 4: Productos más favoritos
SELECT 'TEST 4: PRODUCTOS MÁS FAVORITOS' as TEST;
SELECT id_producto, nombre_producto, COUNT(*) as veces_favorito,
       COUNT(DISTINCT id_usuario) as usuarios_distintos
FROM favoritos
GROUP BY id_producto, nombre_producto
ORDER BY veces_favorito DESC;

-- Test 5: Estado del newsletter
SELECT 'TEST 5: ESTADO DEL NEWSLETTER' as TEST;
SELECT estado, COUNT(*) as total_suscriptores,
       COUNT(CASE WHEN fecha_confirmacion IS NOT NULL THEN 1 END) as confirmados
FROM newsletter
GROUP BY estado;

-- Test 6: Uso de cupones
SELECT 'TEST 6: ESTADÍSTICAS DE USO DE CUPONES' as TEST;
SELECT c.codigo, c.usos_maximos, c.usos_actuales,
       COUNT(cu.id_uso) as usos_registrados,
       CASE
           WHEN c.usos_maximos IS NULL THEN 'ILIMITADO'
           WHEN c.usos_actuales >= c.usos_maximos THEN 'AGOTADO'
           ELSE CONCAT(c.usos_maximos - c.usos_actuales, ' restantes')
       END as disponibilidad
FROM cupones c
LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
GROUP BY c.id_cupon, c.codigo, c.usos_maximos, c.usos_actuales;

-- =====================================================
-- FASE 4: TESTING DE RENDIMIENTO E ÍNDICES
-- =====================================================

SELECT '=== FASE 4: TESTING DE RENDIMIENTO ===' as TESTING_FASE;

-- Verificar índices creados
SELECT 'ÍNDICES EN BANNERS:' as INFO;
SHOW INDEX FROM banners;

SELECT 'ÍNDICES EN CUPONES:' as INFO;
SHOW INDEX FROM cupones;

SELECT 'ÍNDICES EN OFERTAS:' as INFO;
SHOW INDEX FROM ofertas;

-- Test de consultas optimizadas con EXPLAIN
SELECT 'ANÁLISIS DE CONSULTAS OPTIMIZADAS:' as INFO;

-- Test de rendimiento: banners por sección
EXPLAIN SELECT * FROM banners
WHERE seccion = 'home_principal' AND activo = 1
ORDER BY orden;

-- Test de rendimiento: ofertas vigentes
EXPLAIN SELECT * FROM ofertas
WHERE fecha_inicio <= NOW() AND fecha_fin >= NOW() AND activo = 1;

-- Test de rendimiento: cupones válidos
EXPLAIN SELECT * FROM cupones
WHERE codigo = 'BIENVENIDO10' AND activo = 1
AND fecha_inicio <= NOW() AND fecha_fin >= NOW();

-- =====================================================
-- FASE 5: TESTING DE INTEGRIDAD Y RESTRICCIONES
-- =====================================================

SELECT '=== FASE 5: TESTING DE INTEGRIDAD ===' as TESTING_FASE;

-- Test de restricción UNIQUE en cupones (debe fallar)
SELECT 'TEST: Intentando insertar cupón duplicado (debe fallar)' as TEST;
INSERT IGNORE INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, fecha_inicio, fecha_fin)
VALUES ('BIENVENIDO10', 'Test duplicado', 'porcentaje', 5.00, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY));

-- Verificar que no se duplicó
SELECT 'Verificación: códigos duplicados' as VERIFICACION;
SELECT codigo, COUNT(*) as duplicados
FROM cupones
GROUP BY codigo
HAVING COUNT(*) > 1;

-- Test de restricción UNIQUE en newsletter
SELECT 'TEST: Intentando insertar email duplicado en newsletter' as TEST;
INSERT IGNORE INTO newsletter (email, nombre)
VALUES ('marketing@okea.com', 'Test Duplicado');

-- Verificar emails únicos
SELECT 'Verificación: emails duplicados en newsletter' as VERIFICACION;
SELECT email, COUNT(*) as duplicados
FROM newsletter
GROUP BY email
HAVING COUNT(*) > 1;

-- =====================================================
-- FASE 6: TESTING DE CONSULTAS DE NEGOCIO
-- =====================================================

SELECT '=== FASE 6: CONSULTAS DE NEGOCIO ===' as TESTING_FASE;

-- Consulta 1: Dashboard de marketing
SELECT 'DASHBOARD DE MARKETING:' as CONSULTA;
SELECT
    (SELECT COUNT(*) FROM banners WHERE activo = 1) as banners_activos,
    (SELECT COUNT(*) FROM cupones WHERE activo = 1 AND fecha_inicio <= NOW() AND fecha_fin >= NOW()) as cupones_vigentes,
    (SELECT COUNT(*) FROM ofertas WHERE activo = 1 AND fecha_inicio <= NOW() AND fecha_fin >= NOW()) as ofertas_vigentes,
    (SELECT COUNT(*) FROM newsletter WHERE estado = 'activo') as suscriptores_activos,
    (SELECT COUNT(DISTINCT id_usuario) FROM favoritos) as usuarios_con_favoritos;

-- Consulta 2: Productos en oferta con mayor descuento
SELECT 'TOP 5 OFERTAS CON MAYOR DESCUENTO:' as CONSULTA;
SELECT id_producto, nombre_producto, descuento_porcentaje, precio_original, precio_oferta,
       (precio_original - precio_oferta) as ahorro_pesos
FROM ofertas
WHERE activo = 1 AND fecha_inicio <= NOW() AND fecha_fin >= NOW()
ORDER BY descuento_porcentaje DESC
LIMIT 5;

-- Consulta 3: Cupones más utilizados
SELECT 'CUPONES MÁS UTILIZADOS:' as CONSULTA;
SELECT c.codigo, c.descripcion, c.usos_actuales,
       COUNT(cu.id_uso) as usos_registrados,
       SUM(cu.monto_pedido) as ingresos_generados
FROM cupones c
LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
GROUP BY c.id_cupon, c.codigo, c.descripcion, c.usos_actuales
HAVING usos_registrados > 0
ORDER BY usos_registrados DESC;

-- =====================================================
-- FASE 7: LIMPIEZA Y ESTADÍSTICAS FINALES
-- =====================================================

SELECT '=== FASE 7: ESTADÍSTICAS FINALES ===' as TESTING_FASE;

-- Estadísticas generales
SELECT 'ESTADÍSTICAS GENERALES DEL SISTEMA:' as RESUMEN;
SELECT
    'Tablas creadas' as metrica, '6' as valor
UNION ALL
SELECT 'Banners totales', CAST(COUNT(*) as CHAR) FROM banners
UNION ALL
SELECT 'Cupones totales', CAST(COUNT(*) as CHAR) FROM cupones
UNION ALL
SELECT 'Ofertas totales', CAST(COUNT(*) as CHAR) FROM ofertas
UNION ALL
SELECT 'Favoritos totales', CAST(COUNT(*) as CHAR) FROM favoritos
UNION ALL
SELECT 'Suscriptores newsletter', CAST(COUNT(*) as CHAR) FROM newsletter
UNION ALL
SELECT 'Usos de cupones', CAST(COUNT(*) as CHAR) FROM cupones_uso;

-- Estado de salud del sistema
SELECT 'ESTADO DE SALUD DEL SISTEMA:' as RESUMEN;
SELECT
    CASE
        WHEN (SELECT COUNT(*) FROM banners WHERE activo = 1) > 0 THEN '✅ Banners: OK'
        ELSE '❌ Banners: Sin contenido activo'
    END as banners_status
UNION ALL
SELECT
    CASE
        WHEN (SELECT COUNT(*) FROM cupones WHERE activo = 1 AND fecha_fin >= NOW()) > 0 THEN '✅ Cupones: OK'
        ELSE '❌ Cupones: Sin cupones válidos'
    END as cupones_status
UNION ALL
SELECT
    CASE
        WHEN (SELECT COUNT(*) FROM ofertas WHERE activo = 1 AND fecha_fin >= NOW()) > 0 THEN '✅ Ofertas: OK'
        ELSE '❌ Ofertas: Sin ofertas vigentes'
    END as ofertas_status;

-- Reactivar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

SELECT '🎉 TESTING COMPLETADO EXITOSAMENTE! 🎉' as RESULTADO_FINAL;
SELECT 'Revisa los resultados de cada fase para verificar el funcionamiento correcto.' as INSTRUCCIONES;
