-- ============================================================================
-- 04_PRUEBAS_MARKETING.SQL - Dataset de Prueba y Validación
-- ============================================================================
-- Propósito: Datos de prueba y casos de validación para SP, Triggers y Vistas
-- ============================================================================

USE ecommerce_db_okea;

-- ============================================================================
-- LIMPIEZA PREVIA (SOLO PARA PRUEBAS)
-- ============================================================================

-- Deshabilitar temporalmente los triggers para insertar datos de prueba limpios
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET foreign_key_checks = 0;

-- Limpiar datos de prueba previos (solo afecta registros de test)
DELETE FROM cupones_uso WHERE email_usuario LIKE '%@test.%';
DELETE FROM cupones WHERE codigo LIKE 'TEST%';
DELETE FROM newsletter WHERE email LIKE '%@test.%';
DELETE FROM favoritos WHERE ip_usuario = '192.168.1.100';

SET foreign_key_checks = 1;

-- ============================================================================
-- DATASET DE PRUEBA - USUARIOS
-- ============================================================================

INSERT IGNORE INTO usuarios (id_usuario, nombre, apellido, email, password_hash, activo) VALUES
(9001, 'Juan', 'Perez', 'juan.perez@test.com', 'hash123', 1),
(9002, 'Maria', 'Garcia', 'maria.garcia@test.com', 'hash456', 1),
(9003, 'Carlos', 'Rodriguez', 'carlos.rodriguez@test.com', 'hash789', 1),
(9004, 'Ana', 'Martinez', 'ana.martinez@test.com', 'hash000', 0), -- Usuario inactivo
(9005, 'Pedro', 'Lopez', 'pedro.lopez@test.com', 'hash111', 1);

-- ============================================================================
-- DATASET DE PRUEBA - PRODUCTOS
-- ============================================================================

-- Insertar categorías y marcas de prueba si no existen
INSERT IGNORE INTO categorias (id_categoria, nombre_categoria, slug, activo) VALUES
(901, 'Electrónicos Test', 'electronicos-test', 1),
(902, 'Hogar Test', 'hogar-test', 1);

INSERT IGNORE INTO marcas (id_marca, nombre_marca, slug, activo) VALUES
(901, 'Samsung Test', 'samsung-test', 1),
(902, 'LG Test', 'lg-test', 1);

INSERT IGNORE INTO productos (id_producto, nombre, slug, sku, precio, stock, id_categoria, id_marca, activo) VALUES
(9001, 'Smartphone Test', 'smartphone-test', 'TEST-PHONE-001', 500.00, 10, 901, 901, 1),
(9002, 'Tablet Test', 'tablet-test', 'TEST-TAB-001', 300.00, 5, 901, 901, 1),
(9003, 'Refrigerador Test', 'refrigerador-test', 'TEST-REF-001', 800.00, 0, 902, 902, 1), -- Sin stock
(9004, 'Producto Inactivo', 'producto-inactivo', 'TEST-INACT-001', 100.00, 5, 901, 901, 0); -- Inactivo

-- ============================================================================
-- DATASET DE PRUEBA - CUPONES
-- ============================================================================

INSERT INTO cupones (
    id_cupon, id_usuario_creacion, codigo, descripcion, tipo_descuento,
    valor_descuento, monto_minimo, usos_maximos, usos_actuales,
    fecha_inicio, fecha_fin, activo
) VALUES
-- Cupón válido para pruebas normales
(9001, 9001, 'TEST10', 'Cupón de prueba 10%', 'porcentaje', 10.00, 100.00, 10, 0,
 DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), 1),

-- Cupón de monto fijo
(9002, 9001, 'TEST20', 'Cupón de prueba $20', 'monto_fijo', 20.00, 50.00, 5, 0,
 DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 15 DAY), 1),

-- Cupón expirado (para probar validaciones)
(9003, 9001, 'TESTEXP', 'Cupón expirado', 'porcentaje', 15.00, 0.00, NULL, 0,
 DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY), 1),

-- Cupón aún no vigente
(9004, 9001, 'TESTFUT', 'Cupón futuro', 'porcentaje', 25.00, 200.00, 3, 0,
 DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 15 DAY), 1),

-- Cupón inactivo
(9005, 9001, 'TESTINACT', 'Cupón inactivo', 'porcentaje', 5.00, 0.00, NULL, 0,
 DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), 0),

-- Cupón para pruebas de fraude
(9006, 9001, 'TESTFRAUD', 'Cupón para detectar fraude', 'monto_fijo', 50.00, 100.00, 100, 0,
 DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), 1);

-- ============================================================================
-- PRUEBAS DE STORED PROCEDURES
-- ============================================================================

SELECT '=== INICIANDO PRUEBAS DE STORED PROCEDURES ===' AS mensaje;

-- Prueba 1: sp_aplicar_cupon_seguro - Caso exitoso
CALL sp_aplicar_cupon_seguro(
    9001, 'TEST10', 150.00,
    JSON_OBJECT('ip_usuario', '192.168.1.100', 'user_agent', 'Mozilla/5.0'),
    @resultado, @mensaje, @descuento, @id_uso
);

SELECT 'Prueba 1 - Aplicar cupón válido:' AS prueba,
       @resultado AS resultado, @mensaje AS mensaje,
       @descuento AS descuento, @id_uso AS id_uso;

-- Expectativa: resultado='OK', descuento=15.00

-- Prueba 2: sp_aplicar_cupon_seguro - Cupón expirado
CALL sp_aplicar_cupon_seguro(
    9001, 'TESTEXP', 150.00,
    JSON_OBJECT('ip_usuario', '192.168.1.101'),
    @resultado2, @mensaje2, @descuento2, @id_uso2
);

SELECT 'Prueba 2 - Cupón expirado:' AS prueba,
       @resultado2 AS resultado, @mensaje2 AS mensaje;

-- Expectativa: resultado='RECHAZADO', mensaje contiene 'expirado'

-- Prueba 3: sp_aplicar_cupon_seguro - Monto insuficiente
CALL sp_aplicar_cupon_seguro(
    9002, 'TEST20', 30.00,
    JSON_OBJECT('ip_usuario', '192.168.1.102'),
    @resultado3, @mensaje3, @descuento3, @id_uso3
);

SELECT 'Prueba 3 - Monto insuficiente:' AS prueba,
       @resultado3 AS resultado, @mensaje3 AS mensaje;

-- Expectativa: resultado='RECHAZADO', mensaje contiene 'monto mínimo'

-- Prueba 4: sp_aplicar_cupon_seguro - Doble uso del mismo usuario
CALL sp_aplicar_cupon_seguro(
    9001, 'TEST10', 200.00,
    JSON_OBJECT('ip_usuario', '192.168.1.103'),
    @resultado4, @mensaje4, @descuento4, @id_uso4
);

SELECT 'Prueba 4 - Doble uso por usuario:' AS prueba,
       @resultado4 AS resultado, @mensaje4 AS mensaje;

-- Expectativa: resultado='RECHAZADO', mensaje contiene 'ya utilizado'

-- Prueba 5: sp_reporte_cupones_usados
SELECT 'Prueba 5 - Reporte de cupones usados:' AS prueba;

CALL sp_reporte_cupones_usados(
    DATE_SUB(CURDATE(), INTERVAL 7 DAY),
    CURDATE(),
    'TEST10'
);

-- Expectativa: Mostrar el uso del cupón TEST10 realizado en prueba 1

-- Prueba 6: sp_limpiar_datos_sensibles
-- Primero agregar algunos datos "antiguos" para limpiar
INSERT INTO newsletter (email, nombre, estado, fecha_suscripcion) VALUES
('viejo1@test.com', 'Usuario Viejo 1', 'inactivo', DATE_SUB(NOW(), INTERVAL 100 DAY)),
('viejo2@test.com', 'Usuario Viejo 2', 'inactivo', DATE_SUB(NOW(), INTERVAL 150 DAY));

CALL sp_limpiar_datos_sensibles(90, 'mask', @registros_afectados, @mensaje_limpieza);

SELECT 'Prueba 6 - Limpieza de datos sensibles:' AS prueba,
       @registros_afectados AS registros_afectados,
       @mensaje_limpieza AS mensaje;

-- ============================================================================
-- PRUEBAS DE TRIGGERS
-- ============================================================================

SELECT '=== INICIANDO PRUEBAS DE TRIGGERS ===' AS mensaje;

-- Preparar datos para pruebas de triggers
DELETE FROM logs WHERE accion IN ('USO_CUPON', 'FAVORITO_AGREGADO', 'SUSCRIPCION_NEWSLETTER');

-- Prueba 7: Trigger after_insert_cupones_uso
SELECT 'Prueba 7 - Trigger de cupones_uso:' AS prueba;

-- Usar otro cupón para no conflictuar con pruebas anteriores
CALL sp_aplicar_cupon_seguro(
    9002, 'TEST20', 100.00,
    JSON_OBJECT('ip_usuario', '192.168.1.200'),
    @resultado7, @mensaje7, @descuento7, @id_uso7
);

-- Verificar que se actualizó el contador
SELECT 'Contador actualizado:' AS verificacion, usos_actuales
FROM cupones WHERE codigo = 'TEST20';

-- Verificar logs generados por el trigger
SELECT 'Logs generados:' AS verificacion, COUNT(*) AS logs_count
FROM logs WHERE accion = 'USO_CUPON' AND descripcion LIKE '%TEST20%';

-- Prueba 8: Trigger before_insert_newsletter
SELECT 'Prueba 8 - Trigger de newsletter:' AS prueba;

-- Insertar email con formato que necesita normalización
INSERT INTO newsletter (email, nombre, estado) VALUES
('  USUARIO.TEST@EXAMPLE.COM  ', '  Nombre con espacios  ', 'activo');

-- Verificar normalización
SELECT 'Email normalizado:' AS verificacion, email, nombre
FROM newsletter WHERE email = 'usuario.test@example.com';

-- Prueba 9: Trigger de newsletter - duplicado (debe fallar)
SELECT 'Prueba 9 - Newsletter duplicado (debe fallar):' AS prueba;

-- Esto debe generar error por el trigger
SET @error_duplicado = '';
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @error_duplicado = MESSAGE_TEXT;
    END;

    INSERT INTO newsletter (email, estado) VALUES ('usuario.test@example.com', 'activo');
END;

SELECT 'Error esperado de duplicado:' AS verificacion,
       CASE WHEN @error_duplicado != '' THEN 'OK - Error detectado' ELSE 'ERROR - No se detectó duplicado' END AS resultado;

-- Prueba 10: Trigger after_insert_favoritos
SELECT 'Prueba 10 - Trigger de favoritos:' AS prueba;

INSERT INTO favoritos (id_usuario, id_producto, ip_usuario) VALUES
(9001, 9001, '192.168.1.100'),
(9002, 9002, '192.168.1.100');

-- Verificar logs de favoritos
SELECT 'Logs de favoritos:' AS verificacion, COUNT(*) AS logs_count
FROM logs WHERE accion = 'FAVORITO_AGREGADO';

-- ============================================================================
-- PRUEBAS DE VISTAS
-- ============================================================================

SELECT '=== INICIANDO PRUEBAS DE VISTAS ===' AS mensaje;

-- Prueba 11: vw_cupones_activos
SELECT 'Prueba 11 - Vista cupones activos:' AS prueba;

SELECT codigo, estado_vigencia, usos_disponibles, dias_restantes
FROM vw_cupones_activos
WHERE codigo LIKE 'TEST%'
ORDER BY codigo;

-- Expectativa: Mostrar cupones TEST10, TEST20, TESTFUT con estados correctos

-- Prueba 12: vW_cupones_sospechosos (debe estar vacía inicialmente)
SELECT 'Prueba 12 - Vista cupones sospechosos:' AS prueba;

SELECT COUNT(*) AS cupones_sospechosos_count
FROM vW_cupones_sospechosos;

-- Crear patrón sospechoso para la vista
-- Insertar múltiples usos del mismo cupón por diferentes IPs
INSERT INTO cupones_uso (id_cupon, id_usuario, email_usuario, monto_pedido, ip_usuario, estado) VALUES
(9006, 9001, 'juan.perez@test.com', 150.00, '192.168.1.10', 'aplicado'),
(9006, 9002, 'maria.garcia@test.com', 150.00, '192.168.1.10', 'aplicado'),
(9006, 9003, 'carlos.rodriguez@test.com', 150.00, '192.168.1.10', 'aplicado'),
(9006, 9001, 'juan.perez@test.com', 150.00, '192.168.1.11', 'aplicado'),
(9006, 9002, 'maria.garcia@test.com', 150.00, '192.168.1.11', 'aplicado'),
(9006, 9003, 'carlos.rodriguez@test.com', 150.00, '192.168.1.12', 'aplicado');

-- Ahora debería aparecer en cupones sospechosos
SELECT codigo, nivel_riesgo, total_usos, usuarios_unicos, ips_unicas, usos_por_ip
FROM vW_cupones_sospechosos
WHERE codigo = 'TESTFRAUD';

-- Prueba 13: vw_newsletter_clientes
SELECT 'Prueba 13 - Vista newsletter clientes:' AS prueba;

SELECT email, tipo_suscriptor, estado_confirmacion, segmento_engagement
FROM vw_newsletter_clientes
WHERE email LIKE '%@test.%' OR email LIKE '%@example.%'
ORDER BY fecha_suscripcion;

-- Prueba 14: vw_favoritos_usuarios
SELECT 'Prueba 14 - Vista favoritos usuarios:' AS prueba;

SELECT nombre_usuario, nombre_producto, estado_producto, potencial_conversion, antiguedad_favorito
FROM vw_favoritos_usuarios
WHERE email_usuario LIKE '%@test.%'
ORDER BY fecha_favorito;

-- Prueba 15: Vista resumen para dashboard
SELECT 'Prueba 15 - Vista resumen marketing:' AS prueba;

SELECT * FROM vw_resumen_marketing;

-- ============================================================================
-- VERIFICACIONES FINALES Y VALIDACIONES
-- ============================================================================

SELECT '=== VERIFICACIONES FINALES ===' AS mensaje;

-- Verificar integridad de contadores
SELECT 'Verificación contadores cupones:' AS verificacion;

SELECT
    c.codigo,
    c.usos_actuales AS contador_cupon,
    COUNT(cu.id_uso) AS usos_reales,
    CASE
        WHEN c.usos_actuales = COUNT(cu.id_uso) THEN 'OK'
        ELSE 'ERROR - Inconsistencia'
    END AS validacion
FROM cupones c
LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon AND cu.estado = 'aplicado'
WHERE c.codigo LIKE 'TEST%'
GROUP BY c.id_cupon, c.codigo, c.usos_actuales;

-- Verificar logs de auditoría
SELECT 'Verificación logs de auditoría:' AS verificacion;

SELECT
    accion,
    COUNT(*) AS cantidad
FROM logs
WHERE fecha_log >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
AND accion IN ('USO_CUPON', 'FAVORITO_AGREGADO', 'LIMPIEZA_DATOS_SENSIBLES')
GROUP BY accion
ORDER BY accion;

-- Verificar emails normalizados
SELECT 'Verificación normalización emails:' AS verificacion;

SELECT
    email,
    CASE
        WHEN email = LOWER(TRIM(email)) THEN 'OK'
        ELSE 'ERROR - No normalizado'
    END AS validacion
FROM newsletter
WHERE email LIKE '%test%' OR email LIKE '%example%';

-- ============================================================================
-- LIMPIEZA FINAL (OPCIONAL)
-- ============================================================================

/*
-- Descomenta estas líneas si quieres limpiar los datos de prueba al final

DELETE FROM cupones_uso WHERE email_usuario LIKE '%@test.%';
DELETE FROM cupones WHERE codigo LIKE 'TEST%';
DELETE FROM newsletter WHERE email LIKE '%@test.%' OR email LIKE '%@example.%';
DELETE FROM favoritos WHERE ip_usuario = '192.168.1.100';
DELETE FROM productos WHERE id_producto BETWEEN 9001 AND 9004;
DELETE FROM categorias WHERE id_categoria BETWEEN 901 AND 902;
DELETE FROM marcas WHERE id_marca BETWEEN 901 AND 902;
DELETE FROM usuarios WHERE id_usuario BETWEEN 9001 AND 9005;
DELETE FROM logs WHERE descripcion LIKE '%test%' OR descripcion LIKE '%TEST%';
*/

-- Restaurar configuración
SET SQL_MODE=@OLD_SQL_MODE;

-- ============================================================================
-- RESUMEN DE RESULTADOS ESPERADOS
-- ============================================================================

SELECT '=== RESUMEN DE PRUEBAS COMPLETADAS ===' AS mensaje;

/*
RESULTADOS ESPERADOS:

✅ STORED PROCEDURES:
- sp_aplicar_cupon_seguro: Debe aceptar cupones válidos y rechazar inválidos
- sp_reporte_cupones_usados: Debe mostrar reportes filtrados correctamente
- sp_limpiar_datos_sensibles: Debe anonimizar datos antiguos según configuración

✅ TRIGGERS:
- after_insert_cupones_uso: Actualiza contadores y detecta patrones sospechosos
- after_update_cupones_uso: Mantiene consistencia al cambiar estados
- before_insert_newsletter: Normaliza emails y previene duplicados
- after_insert_favoritos: Registra auditoría de wishlist

✅ VISTAS:
- vw_cupones_activos: Lista cupones vigentes con estado y disponibilidad
- vW_cupones_sospechosos: Detecta patrones anómalos de uso
- vw_newsletter_clientes: Integra suscriptores con datos de usuarios
- vw_favoritos_usuarios: Analiza wishlist con potencial de conversión

🔍 VALIDACIONES:
- Contadores de cupones consistentes
- Logs de auditoría generados correctamente
- Emails normalizados automáticamente
- Detección de patrones fraudulentos funcionando

📊 MÉTRICAS DE CALIDAD:
- Todas las transacciones deben ser atómicas
- Triggers deben ejecutarse sin errores
- Vistas deben retornar datos consistentes
- Validaciones de negocio deben funcionar correctamente

Si alguna prueba falla, revisar:
1. Privilegios de usuario en base de datos
2. Existencia de todas las tablas requeridas
3. Ejecución previa de scripts 00, 01, 02, 03
4. Configuración de foreign_key_checks y sql_mode
*/

SELECT 'PRUEBAS COMPLETADAS - Revisar resultados arriba' AS estado_final;
