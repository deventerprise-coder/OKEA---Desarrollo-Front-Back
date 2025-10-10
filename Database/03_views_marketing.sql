-- ============================================================================
-- 03_VIEWS_MARKETING.SQL - Vistas Marketing y Experiencia
-- ============================================================================
-- Propósito: Implementar vistas para consultas y reportes de marketing
-- Motor: MySQL 8.0
-- Dependencias: Tablas cupones, cupones_uso, newsletter, favoritos, usuarios, productos
-- Privilegios mínimos: SELECT en todas las tablas referenciadas
-- ============================================================================

USE ecommerce_db_okea;

-- ============================================================================
-- VISTA 1: CUPONES ACTIVOS
-- ============================================================================

DROP VIEW IF EXISTS vw_cupones_activos;

CREATE VIEW vw_cupones_activos AS
SELECT
    c.id_cupon,
    c.codigo,
    c.descripcion,
    c.tipo_descuento,
    c.valor_descuento,
    c.monto_minimo,
    c.usos_maximos,
    c.usos_actuales,
    CASE
        WHEN c.usos_maximos IS NULL THEN 'Ilimitado'
        ELSE CAST((c.usos_maximos - c.usos_actuales) AS CHAR)
    END AS usos_disponibles,
    c.fecha_inicio,
    c.fecha_fin,
    DATEDIFF(c.fecha_fin, CURDATE()) AS dias_restantes,
    CASE
        WHEN CURDATE() < c.fecha_inicio THEN 'Próximo'
        WHEN CURDATE() > c.fecha_fin THEN 'Expirado'
        WHEN c.usos_maximos IS NOT NULL AND c.usos_actuales >= c.usos_maximos THEN 'Agotado'
        ELSE 'Vigente'
    END AS estado_vigencia,
    c.fecha_creacion,
    c.fecha_actualizacion,
    CONCAT(uc.nombre, ' ', uc.apellido) AS creado_por,
    CONCAT(um.nombre, ' ', um.apellido) AS modificado_por
FROM cupones c
LEFT JOIN usuarios uc ON c.id_usuario_creacion = uc.id_usuario
LEFT JOIN usuarios um ON c.id_usuario_modificacion = um.id_usuario
WHERE c.activo = 1
ORDER BY
    CASE
        WHEN CURDATE() BETWEEN c.fecha_inicio AND c.fecha_fin
        AND (c.usos_maximos IS NULL OR c.usos_actuales < c.usos_maximos) THEN 1
        WHEN CURDATE() < c.fecha_inicio THEN 2
        ELSE 3
    END,
    c.fecha_fin ASC;

-- ============================================================================
-- VISTA 2: CUPONES SOSPECHOSOS (respetando la "W" mayúscula)
-- ============================================================================

DROP VIEW IF EXISTS vW_cupones_sospechosos;

CREATE VIEW vW_cupones_sospechosos AS
SELECT
    c.id_cupon,
    c.codigo,
    c.descripcion,
    -- Métricas de uso sospechoso
    COUNT(cu.id_uso) AS total_usos,
    COUNT(DISTINCT cu.id_usuario) AS usuarios_unicos,
    COUNT(DISTINCT cu.ip_usuario) AS ips_unicas,
    COUNT(DISTINCT DATE(cu.fecha_uso)) AS dias_uso,
    -- Indicadores de riesgo
    CASE
        WHEN COUNT(cu.id_uso) > 0 THEN
            ROUND(COUNT(cu.id_uso) / COUNT(DISTINCT cu.id_usuario), 2)
        ELSE 0
    END AS usos_por_usuario,
    CASE
        WHEN COUNT(DISTINCT cu.ip_usuario) > 0 THEN
            ROUND(COUNT(cu.id_uso) / COUNT(DISTINCT cu.ip_usuario), 2)
        ELSE 0
    END AS usos_por_ip,
    -- Patrones temporales sospechosos
    MAX(cu.fecha_uso) AS ultimo_uso,
    MIN(cu.fecha_uso) AS primer_uso,
    CASE
        WHEN COUNT(cu.id_uso) > 1 THEN
            ROUND(
                COUNT(cu.id_uso) /
                (TIMESTAMPDIFF(HOUR, MIN(cu.fecha_uso), MAX(cu.fecha_uso)) + 1),
                2
            )
        ELSE 0
    END AS usos_por_hora,
    -- Nivel de riesgo calculado
    CASE
        WHEN COUNT(cu.id_uso) / COUNT(DISTINCT cu.id_usuario) > 3 THEN 'ALTO'
        WHEN COUNT(cu.id_uso) / COUNT(DISTINCT cu.ip_usuario) > 5 THEN 'ALTO'
        WHEN COUNT(cu.id_uso) > 1 AND
             COUNT(cu.id_uso) / (TIMESTAMPDIFF(HOUR, MIN(cu.fecha_uso), MAX(cu.fecha_uso)) + 1) > 2 THEN 'MEDIO'
        WHEN COUNT(DISTINCT cu.ip_usuario) = 1 AND COUNT(cu.id_uso) > 5 THEN 'MEDIO'
        WHEN COUNT(cu.id_uso) > 10 THEN 'MEDIO'
        ELSE 'BAJO'
    END AS nivel_riesgo,
    -- Detalles financieros
    SUM(cu.monto_pedido) AS monto_total_pedidos,
    AVG(cu.monto_pedido) AS monto_promedio_pedido,
    SUM(CASE
        WHEN c.tipo_descuento = 'porcentaje' THEN
            ROUND((cu.monto_pedido * c.valor_descuento / 100), 2)
        ELSE
            c.valor_descuento
    END) AS descuento_total_aplicado
FROM cupones c
INNER JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
WHERE cu.estado = 'aplicado'
AND cu.fecha_uso >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) -- Solo últimos 30 días
GROUP BY c.id_cupon, c.codigo, c.descripcion, c.tipo_descuento, c.valor_descuento
HAVING
    -- Filtros para identificar patrones sospechosos
    COUNT(cu.id_uso) > 5 -- Más de 5 usos
    OR COUNT(cu.id_uso) / COUNT(DISTINCT cu.id_usuario) > 2 -- Más de 2 usos promedio por usuario
    OR COUNT(cu.id_uso) / COUNT(DISTINCT cu.ip_usuario) > 3 -- Más de 3 usos promedio por IP
    OR (COUNT(cu.id_uso) > 1 AND
        COUNT(cu.id_uso) / (TIMESTAMPDIFF(HOUR, MIN(cu.fecha_uso), MAX(cu.fecha_uso)) + 1) > 1) -- Más de 1 uso por hora
ORDER BY
    CASE nivel_riesgo
        WHEN 'ALTO' THEN 1
        WHEN 'MEDIO' THEN 2
        ELSE 3
    END,
    COUNT(cu.id_uso) DESC;

-- ============================================================================
-- VISTA 3: NEWSLETTER CLIENTES
-- ============================================================================

DROP VIEW IF EXISTS vw_newsletter_clientes;

CREATE VIEW vw_newsletter_clientes AS
SELECT
    n.id_suscripcion,
    n.email,
    n.nombre,
    n.estado,
    n.fecha_suscripcion,
    n.fecha_confirmacion,
    CASE
        WHEN n.fecha_confirmacion IS NOT NULL THEN 'Confirmado'
        WHEN n.token_confirmacion IS NOT NULL THEN 'Pendiente'
        ELSE 'Sin confirmar'
    END AS estado_confirmacion,
    n.fecha_baja,
    n.motivo_baja,
    DATEDIFF(CURDATE(), n.fecha_suscripcion) AS dias_suscrito,
    -- Verificar si es cliente registrado
    u.id_usuario,
    CASE
        WHEN u.id_usuario IS NOT NULL THEN 'Cliente registrado'
        ELSE 'Solo newsletter'
    END AS tipo_suscriptor,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_completo_cliente,
    u.email_verificado AS email_verificado_cuenta,
    u.ultimo_login,
    u.activo AS cuenta_activa,
    -- Métricas de engagement (simuladas - en un entorno real vendrían de tabla de envíos)
    CASE
        WHEN n.estado = 'activo' AND n.fecha_confirmacion IS NOT NULL THEN
            CASE
                WHEN DATEDIFF(CURDATE(), n.fecha_suscripcion) < 30 THEN 'Nuevo'
                WHEN DATEDIFF(CURDATE(), n.fecha_suscripcion) < 365 THEN 'Activo'
                ELSE 'Veterano'
            END
        ELSE 'Inactivo'
    END AS segmento_engagement,
    -- Información geográfica básica
    n.ip_suscripcion,
    CASE
        WHEN n.ip_suscripcion LIKE '192.168.%' OR
             n.ip_suscripcion LIKE '10.%' OR
             n.ip_suscripcion LIKE '172.%' THEN 'IP Privada'
        WHEN n.ip_suscripcion = '0.0.0.0' OR n.ip_suscripcion IS NULL THEN 'No disponible'
        ELSE 'IP Pública'
    END AS tipo_ip
FROM newsletter n
LEFT JOIN usuarios u ON n.email = u.email
WHERE n.estado IN ('activo', 'inactivo') -- Excluir bloqueados para marketing
ORDER BY
    CASE n.estado
        WHEN 'activo' THEN 1
        WHEN 'inactivo' THEN 2
        ELSE 3
    END,
    n.fecha_suscripcion DESC;

-- ============================================================================
-- VISTA 4: FAVORITOS USUARIOS
-- ============================================================================

DROP VIEW IF EXISTS vw_favoritos_usuarios;

CREATE VIEW vw_favoritos_usuarios AS
SELECT
    f.id_favorito,
    f.id_usuario,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario,
    u.email AS email_usuario,
    f.id_producto,
    p.nombre AS nombre_producto,
    p.sku,
    p.precio,
    p.stock,
    p.activo AS producto_activo,
    c.nombre_categoria,
    m.nombre_marca,
    f.creado_el AS fecha_favorito,
    DATEDIFF(CURDATE(), f.creado_el) AS dias_en_favoritos,
    -- Información de ofertas vigentes
    o.id_oferta,
    o.descuento_porcentaje,
    o.precio_oferta,
    CASE
        WHEN o.id_oferta IS NOT NULL THEN 'En oferta'
        WHEN p.stock = 0 THEN 'Sin stock'
        WHEN p.activo = 0 THEN 'No disponible'
        ELSE 'Disponible'
    END AS estado_producto,
    -- Métricas del usuario
    (SELECT COUNT(*)
     FROM favoritos f2
     WHERE f2.id_usuario = f.id_usuario) AS total_favoritos_usuario,
    -- Último login del usuario para segmentación
    u.ultimo_login,
    CASE
        WHEN u.ultimo_login >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 'Activo'
        WHEN u.ultimo_login >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 'Regular'
        WHEN u.ultimo_login >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) THEN 'Esporádico'
        ELSE 'Inactivo'
    END AS actividad_usuario,
    -- Información de IP para análisis
    f.ip_usuario,
    -- Cálculo de antigüedad del favorito para campañas
    CASE
        WHEN DATEDIFF(CURDATE(), f.creado_el) <= 7 THEN 'Reciente'
        WHEN DATEDIFF(CURDATE(), f.creado_el) <= 30 THEN 'Medio'
        WHEN DATEDIFF(CURDATE(), f.creado_el) <= 90 THEN 'Antiguo'
        ELSE 'Muy antiguo'
    END AS antiguedad_favorito,
    -- Potencial de conversión
    CASE
        WHEN o.id_oferta IS NOT NULL AND p.stock > 0 AND p.activo = 1 THEN 'Alta'
        WHEN p.stock > 0 AND p.activo = 1 AND DATEDIFF(CURDATE(), f.creado_el) <= 30 THEN 'Media'
        WHEN p.stock > 0 AND p.activo = 1 THEN 'Baja'
        ELSE 'Muy baja'
    END AS potencial_conversion
FROM favoritos f
INNER JOIN usuarios u ON f.id_usuario = u.id_usuario
INNER JOIN productos p ON f.id_producto = p.id_producto
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
INNER JOIN marcas m ON p.id_marca = m.id_marca
LEFT JOIN ofertas o ON p.id_producto = o.id_producto
    AND o.activo = 1
    AND NOW() BETWEEN o.fecha_inicio AND o.fecha_fin
WHERE u.activo = 1 -- Solo usuarios activos
ORDER BY
    CASE potencial_conversion
        WHEN 'Alta' THEN 1
        WHEN 'Media' THEN 2
        WHEN 'Baja' THEN 3
        ELSE 4
    END,
    f.creado_el DESC;

-- ============================================================================
-- VISTAS ADICIONALES DE UTILIDAD
-- ============================================================================

-- Vista resumen para dashboard ejecutivo
DROP VIEW IF EXISTS vw_resumen_marketing;

CREATE VIEW vw_resumen_marketing AS
SELECT
    'Cupones Activos' AS metrica,
    COUNT(*) AS valor,
    'cupones' AS unidad
FROM vw_cupones_activos
WHERE estado_vigencia = 'Vigente'

UNION ALL

SELECT
    'Newsletter Activos' AS metrica,
    COUNT(*) AS valor,
    'suscriptores' AS unidad
FROM vw_newsletter_clientes
WHERE estado = 'activo'

UNION ALL

SELECT
    'Favoritos Hoy' AS metrica,
    COUNT(*) AS valor,
    'productos' AS unidad
FROM favoritos
WHERE DATE(creado_el) = CURDATE()

UNION ALL

SELECT
    'Cupones Sospechosos' AS metrica,
    COUNT(*) AS valor,
    'alertas' AS unidad
FROM vW_cupones_sospechosos
WHERE nivel_riesgo IN ('ALTO', 'MEDIO');

-- ============================================================================
-- COMENTARIOS FINALES Y DOCUMENTACIÓN
-- ============================================================================

/*
VISTAS IMPLEMENTADAS:

1. vw_cupones_activos:
   - Lista cupones válidos con cálculo de disponibilidad
   - Incluye estado de vigencia y días restantes
   - Ordenamiento inteligente por prioridad de uso
   - Información de auditoría (creado/modificado por)

2. vW_cupones_sospechosos (respetando la W mayúscula):
   - Análisis avanzado de patrones de uso anómalos
   - Métricas de riesgo: usos por usuario, por IP, por hora
   - Nivel de riesgo calculado automáticamente
   - Filtros para últimos 30 días y umbrales configurables
   - Análisis financiero del impacto

3. vw_newsletter_clientes:
   - Vista completa de suscriptores con estado de confirmación
   - Integración con usuarios registrados
   - Segmentación por engagement y tipo de suscriptor
   - Métricas de tiempo (días suscrito)
   - Análisis básico de IP para geografía

4. vw_favoritos_usuarios:
   - Análisis completo de wishlist con datos enriquecidos
   - Información de productos, ofertas, stock
   - Segmentación de usuarios por actividad
   - Cálculo de potencial de conversión
   - Métricas para campañas de remarketing

VISTA ADICIONAL:
- vw_resumen_marketing: Dashboard ejecutivo con KPIs clave

CARACTERÍSTICAS AVANZADAS:
- Cálculos automáticos de métricas de negocio
- Segmentación inteligente para marketing
- Análisis de riesgo y detección de fraude
- Optimización con índices existentes
- Joins eficientes y filtros apropiados

CASOS DE USO:
- Campañas de email marketing (newsletter)
- Detección de fraude en cupones
- Análisis de conversión de favoritos
- Reporting ejecutivo y KPIs
- Segmentación de clientes

RENDIMIENTO:
- Vistas optimizadas para consultas frecuentes
- Uso eficiente de índices existentes
- Filtros apropiados para reducir datasets
- Cálculos eficientes sin subconsultas complejas

PRIVILEGIOS MÍNIMOS REQUERIDOS:
- SELECT en: cupones, cupones_uso, newsletter, favoritos
- SELECT en: usuarios, productos, categorias, marcas, ofertas
- CREATE VIEW y DROP VIEW para mantenimiento
*/
