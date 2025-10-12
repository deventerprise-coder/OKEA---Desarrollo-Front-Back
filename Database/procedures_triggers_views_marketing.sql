-- ============================================================================
-- 01_PROCEDURES_MARKETING.SQL - Stored Procedures Marketing y Experiencia
-- ============================================================================

-- ============================================================================

USE ecommerce_db_okea;

-- ============================================================================
-- SP 1: APLICAR CUPÓN DE FORMA SEGURA Y ATÓMICA
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_aplicar_cupon_seguro;

DELIMITER $$

CREATE PROCEDURE sp_aplicar_cupon_seguro(
    IN p_usuario_id INT,
    IN p_codigo VARCHAR(50),
    IN p_monto DECIMAL(10,2),
    IN p_contexto JSON,
    OUT p_resultado VARCHAR(20),
    OUT p_mensaje VARCHAR(500),
    OUT p_descuento DECIMAL(10,2),
    OUT p_id_uso INT
)
    COMMENT 'Aplica un cupón de forma atómica y segura validando todas las reglas de negocio'
BEGIN
    -- Variables de control
    DECLARE v_id_cupon INT DEFAULT NULL;
    DECLARE v_tipo_descuento VARCHAR(20);
    DECLARE v_valor_descuento DECIMAL(10,2);
    DECLARE v_monto_minimo DECIMAL(10,2);
    DECLARE v_usos_maximos INT;
    DECLARE v_usos_actuales INT;
    DECLARE v_fecha_inicio DATETIME;
    DECLARE v_fecha_fin DATETIME;
    DECLARE v_activo TINYINT(1);
    DECLARE v_usos_usuario INT DEFAULT 0;
    DECLARE v_error_occurred BOOLEAN DEFAULT FALSE;

    -- Manejador de errores
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
BEGIN
        SET v_error_occurred = TRUE;
GET DIAGNOSTICS CONDITION 1
    p_mensaje = MESSAGE_TEXT;
ROLLBACK;
END;

    -- Inicializar valores de salida
    SET p_resultado = 'RECHAZADO';
    SET p_mensaje = '';
    SET p_descuento = 0.00;
    SET p_id_uso = NULL;

    -- Validar parámetros de entrada
    IF p_usuario_id IS NULL OR p_usuario_id <= 0 THEN
        SET p_mensaje = 'Error: ID de usuario inválido';
        LEAVE sp_aplicar_cupon_seguro;
END IF;

    IF p_codigo IS NULL OR TRIM(p_codigo) = '' THEN
        SET p_mensaje = 'Error: Código de cupón requerido';
        LEAVE sp_aplicar_cupon_seguro;
END IF;

    IF p_monto IS NULL OR p_monto <= 0 THEN
        SET p_mensaje = 'Error: Monto debe ser mayor a 0';
        LEAVE sp_aplicar_cupon_seguro;
END IF;

    -- Normalizar código de cupón
    SET p_codigo = UPPER(TRIM(p_codigo));

START TRANSACTION;

-- Buscar y bloquear el cupón para evitar condiciones de carrera
SELECT
    id_cupon, tipo_descuento, valor_descuento, monto_minimo,
    usos_maximos, usos_actuales, fecha_inicio, fecha_fin, activo
INTO
    v_id_cupon, v_tipo_descuento, v_valor_descuento, v_monto_minimo,
    v_usos_maximos, v_usos_actuales, v_fecha_inicio, v_fecha_fin, v_activo
FROM cupones
WHERE codigo = p_codigo
    FOR UPDATE; -- Bloqueo para escritura

-- Verificar si el cupón existe
IF v_id_cupon IS NULL THEN
        SET p_mensaje = 'Error: Cupón no existe';
ROLLBACK;
LEAVE sp_aplicar_cupon_seguro;
END IF;

    -- Verificar si el cupón está activo
    IF v_activo = 0 THEN
        SET p_mensaje = 'Error: Cupón desactivado';
ROLLBACK;
LEAVE sp_aplicar_cupon_seguro;
END IF;

    -- Verificar vigencia del cupón
    IF NOW() < v_fecha_inicio THEN
        SET p_mensaje = 'Error: Cupón aún no vigente';
ROLLBACK;
LEAVE sp_aplicar_cupon_seguro;
END IF;

    IF NOW() > v_fecha_fin THEN
        SET p_mensaje = 'Error: Cupón expirado';
ROLLBACK;
LEAVE sp_aplicar_cupon_seguro;
END IF;

    -- Verificar monto mínimo
    IF p_monto < v_monto_minimo THEN
        SET p_mensaje = CONCAT('Error: Monto mínimo requerido: ', v_monto_minimo);
ROLLBACK;
LEAVE sp_aplicar_cupon_seguro;
END IF;

    -- Verificar límite global de usos
    IF v_usos_maximos IS NOT NULL AND v_usos_actuales >= v_usos_maximos THEN
        SET p_mensaje = 'Error: Cupón agotado (límite global alcanzado)';
ROLLBACK;
LEAVE sp_aplicar_cupon_seguro;
END IF;

    -- Verificar usos previos del usuario (evitar doble uso por usuario)
SELECT COUNT(*) INTO v_usos_usuario
FROM cupones_uso
WHERE id_cupon = v_id_cupon
  AND id_usuario = p_usuario_id
  AND estado = 'aplicado';

IF v_usos_usuario > 0 THEN
        SET p_mensaje = 'Error: Cupón ya utilizado por este usuario';
ROLLBACK;
LEAVE sp_aplicar_cupon_seguro;
END IF;

    -- Calcular descuento
    IF v_tipo_descuento = 'porcentaje' THEN
        SET p_descuento = ROUND((p_monto * v_valor_descuento / 100), 2);
ELSE -- monto_fijo
        SET p_descuento = v_valor_descuento;
END IF;

    -- Asegurar que el descuento no exceda el monto
    IF p_descuento > p_monto THEN
        SET p_descuento = p_monto;
END IF;

    -- Registrar uso del cupón
INSERT INTO cupones_uso (
    id_cupon,
    id_usuario,
    email_usuario,
    monto_pedido,
    fecha_uso,
    ip_usuario,
    detalles_uso,
    estado
) VALUES (
             v_id_cupon,
             p_usuario_id,
             (SELECT email FROM usuarios WHERE id_usuario = p_usuario_id),
             p_monto,
             NOW(),
             JSON_UNQUOTE(JSON_EXTRACT(p_contexto, '$.ip_usuario')),
             p_contexto,
             'aplicado'
         );

SET p_id_uso = LAST_INSERT_ID();

    -- Actualizar contador de usos del cupón
UPDATE cupones
SET usos_actuales = usos_actuales + 1,
    fecha_actualizacion = NOW()
WHERE id_cupon = v_id_cupon;

-- Verificar si ocurrió algún error
IF v_error_occurred THEN
        SET p_resultado = 'ERROR';
        -- El mensaje ya se estableció en el handler
        LEAVE sp_aplicar_cupon_seguro;
END IF;

COMMIT;

-- Éxito
SET p_resultado = 'OK';
    SET p_mensaje = CONCAT('Cupón aplicado exitosamente. Descuento: ', p_descuento);

END$$

DELIMITER ;

-- ============================================================================
-- SP 2: REPORTE DE CUPONES USADOS
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_reporte_cupones_usados;

DELIMITER $$

CREATE PROCEDURE sp_reporte_cupones_usados(
    IN p_fecha_desde DATE,
    IN p_fecha_hasta DATE,
    IN p_codigo VARCHAR(50)
)
    COMMENT 'Genera reporte detallado de usos de cupones con filtros opcionales'
BEGIN
    -- Validar parámetros
    IF p_fecha_desde IS NULL THEN
        SET p_fecha_desde = DATE_SUB(CURDATE(), INTERVAL 30 DAY);
END IF;

    IF p_fecha_hasta IS NULL THEN
        SET p_fecha_hasta = CURDATE();
END IF;

    -- Normalizar código si se proporciona
    IF p_codigo IS NOT NULL THEN
        SET p_codigo = UPPER(TRIM(p_codigo));
END IF;

    -- Reporte detallado
SELECT
    cu.id_uso AS 'ID_Uso',
        c.codigo AS 'Codigo_Cupon',
        c.descripcion AS 'Descripcion_Cupon',
        c.tipo_descuento AS 'Tipo_Descuento',
        c.valor_descuento AS 'Valor_Descuento',
        CONCAT(u.nombre, ' ', u.apellido) AS 'Usuario',
        cu.email_usuario AS 'Email_Usuario',
        cu.monto_pedido AS 'Monto_Pedido',
        CASE
            WHEN c.tipo_descuento = 'porcentaje' THEN
                ROUND((cu.monto_pedido * c.valor_descuento / 100), 2)
            ELSE
                c.valor_descuento
            END AS 'Descuento_Aplicado',
        cu.fecha_uso AS 'Fecha_Uso',
        cu.estado AS 'Estado',
        cu.ip_usuario AS 'IP_Usuario',
        cu.id_pedido AS 'ID_Pedido'
FROM cupones_uso cu
         INNER JOIN cupones c ON cu.id_cupon = c.id_cupon
         LEFT JOIN usuarios u ON cu.id_usuario = u.id_usuario
WHERE DATE(cu.fecha_uso) BETWEEN p_fecha_desde AND p_fecha_hasta
  AND (p_codigo IS NULL OR c.codigo = p_codigo)
ORDER BY cu.fecha_uso DESC;

-- Resumen agregado por cupón
SELECT
    '--- RESUMEN POR CUPÓN ---' AS 'Seccion',
        '' AS 'Codigo',
        '' AS 'Total_Usos',
        '' AS 'Monto_Total',
        '' AS 'Descuento_Total',
        '' AS 'Ultimo_Uso'
UNION ALL
SELECT
    'DATOS' AS 'Seccion',
        c.codigo AS 'Codigo',
        COUNT(*) AS 'Total_Usos',
        COALESCE(SUM(cu.monto_pedido), 0) AS 'Monto_Total',
        COALESCE(SUM(CASE
                         WHEN c.tipo_descuento = 'porcentaje' THEN
                             ROUND((cu.monto_pedido * c.valor_descuento / 100), 2)
                         ELSE
                             c.valor_descuento
            END), 0) AS 'Descuento_Total',
        MAX(cu.fecha_uso) AS 'Ultimo_Uso'
FROM cupones c
         LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
    AND DATE(cu.fecha_uso) BETWEEN p_fecha_desde AND p_fecha_hasta
    AND cu.estado = 'aplicado'
WHERE (p_codigo IS NULL OR c.codigo = p_codigo)
GROUP BY c.id_cupon, c.codigo
HAVING COUNT(cu.id_uso) > 0
ORDER BY COUNT(*) DESC;

END$$

DELIMITER ;

-- ============================================================================
-- SP 3: LIMPIAR DATOS SENSIBLES
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_limpiar_datos_sensibles;

DELIMITER $$

CREATE PROCEDURE sp_limpiar_datos_sensibles(
    IN p_antiguedad_dias INT,
    IN p_modo VARCHAR(20),
    OUT p_registros_afectados INT,
    OUT p_mensaje VARCHAR(500)
)
    COMMENT 'Anonimiza datos sensibles según políticas de retención. Modos: anon, mask'
BEGIN
    DECLARE v_fecha_limite DATE;
    DECLARE v_total_newsletter INT DEFAULT 0;
    DECLARE v_total_cupones_uso INT DEFAULT 0;
    DECLARE v_error_occurred BOOLEAN DEFAULT FALSE;

    -- Manejador de errores
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
BEGIN
        SET v_error_occurred = TRUE;
GET DIAGNOSTICS CONDITION 1
    p_mensaje = MESSAGE_TEXT;
ROLLBACK;
END;

    -- Inicializar valores
    SET p_registros_afectados = 0;
    SET p_mensaje = '';

    -- Validar parámetros
    IF p_antiguedad_dias IS NULL OR p_antiguedad_dias < 30 THEN
        SET p_mensaje = 'Error: Antigüedad mínima debe ser 30 días por seguridad';
        LEAVE sp_limpiar_datos_sensibles;
END IF;

    IF p_modo NOT IN ('anon', 'mask') THEN
        SET p_mensaje = 'Error: Modo debe ser anon o mask';
        LEAVE sp_limpiar_datos_sensibles;
END IF;

    SET v_fecha_limite = DATE_SUB(CURDATE(), INTERVAL p_antiguedad_dias DAY);

START TRANSACTION;

-- Registrar en log antes de procesar
INSERT INTO logs (
    id_usuario,
    operacion,
    accion,
    descripcion,
    ip,
    fecha_log
) VALUES (
             NULL,
             'UPDATE',
             'LIMPIEZA_DATOS_SENSIBLES',
             CONCAT('Iniciando limpieza con modo: ', p_modo, ', antigüedad: ', p_antiguedad_dias, ' días'),
             '127.0.0.1',
             NOW()
         );

-- LIMPIEZA EN NEWSLETTER
IF p_modo = 'anon' THEN
        -- Anonimización total (no reversible)
UPDATE newsletter
SET
    email = CONCAT('anonimo_', id_suscripcion, '@limpiado.local'),
    nombre = 'ANONIMIZADO',
    token_confirmacion = NULL,
    ip_suscripcion = '0.0.0.0'
WHERE fecha_suscripcion < v_fecha_limite
  AND estado = 'inactivo';

SET v_total_newsletter = ROW_COUNT();

    ELSEIF p_modo = 'mask' THEN
        -- Enmascaramiento (parcialmente reversible)
UPDATE newsletter
SET
    email = CONCAT(
        LEFT(email, 2),
            '***@',
            SUBSTRING_INDEX(email, '@', -1)
            ),
    nombre = CASE
                 WHEN nombre IS NOT NULL THEN
                     CONCAT(LEFT(nombre, 1), REPEAT('*', LENGTH(nombre)-1))
                 ELSE NULL
        END,
    ip_suscripcion = CONCAT(
            SUBSTRING_INDEX(ip_suscripcion, '.', 2),
            '.***.**'
                     )
WHERE fecha_suscripcion < v_fecha_limite
  AND estado = 'inactivo';

SET v_total_newsletter = ROW_COUNT();
END IF;

    -- LIMPIEZA EN CUPONES_USO
    IF p_modo = 'anon' THEN
UPDATE cupones_uso
SET
    email_usuario = CONCAT('anonimo_', id_uso, '@limpiado.local'),
    ip_usuario = '0.0.0.0',
    detalles_uso = JSON_OBJECT('anonimizado', TRUE, 'fecha_limpieza', NOW())
WHERE fecha_uso < v_fecha_limite;

SET v_total_cupones_uso = ROW_COUNT();

    ELSEIF p_modo = 'mask' THEN
UPDATE cupones_uso
SET
    email_usuario = CASE
                        WHEN email_usuario IS NOT NULL THEN
                            CONCAT(
                                LEFT(email_usuario, 2),
                                    '***@',
                                    SUBSTRING_INDEX(email_usuario, '@', -1)
                            )
                        ELSE NULL
        END,
    ip_usuario = CASE
                     WHEN ip_usuario IS NOT NULL THEN
                         CONCAT(
                                 SUBSTRING_INDEX(ip_usuario, '.', 2),
                                 '.***.**'
                         )
                     ELSE NULL
        END
WHERE fecha_uso < v_fecha_limite;

SET v_total_cupones_uso = ROW_COUNT();
END IF;

    -- Verificar errores
    IF v_error_occurred THEN
        SET p_mensaje = CONCAT('Error durante limpieza: ', p_mensaje);
        LEAVE sp_limpiar_datos_sensibles;
END IF;

COMMIT;

-- Calcular total de registros afectados
SET p_registros_afectados = v_total_newsletter + v_total_cupones_uso;

    -- Mensaje de éxito
    SET p_mensaje = CONCAT(
        'Limpieza completada. Newsletter: ', v_total_newsletter,
        ', Cupones_uso: ', v_total_cupones_uso,
        ', Total: ', p_registros_afectados,
        ' registros procesados con modo: ', p_modo
    );

    -- Log final
INSERT INTO logs (
    id_usuario,
    operacion,
    accion,
    descripcion,
    ip,
    fecha_log
) VALUES (
             NULL,
             'UPDATE',
             'LIMPIEZA_DATOS_SENSIBLES_COMPLETADA',
             p_mensaje,
             '127.0.0.1',
             NOW()
         );

END$$

DELIMITER ;

-- ============================================================================
-- TRIGGER 1: AFTER INSERT CUPONES_USO
-- ============================================================================

DROP TRIGGER IF EXISTS after_insert_cupones_uso;

DELIMITER $$

CREATE TRIGGER after_insert_cupones_uso
    AFTER INSERT ON cupones_uso
    FOR EACH ROW
BEGIN
    DECLARE v_usos_recientes INT DEFAULT 0;
    DECLARE v_es_riesgoso BOOLEAN DEFAULT FALSE;

    -- Actualizar contador de usos en la tabla cupones solo si el estado es 'aplicado'
    IF NEW.estado = 'aplicado' THEN
    UPDATE cupones
    SET usos_actuales = usos_actuales + 1,
        fecha_actualizacion = NOW()
    WHERE id_cupon = NEW.id_cupon;
END IF;

-- Detectar patrones de uso riesgoso (mismo usuario, múltiples usos en corto tiempo)
IF NEW.id_usuario IS NOT NULL THEN
SELECT COUNT(*) INTO v_usos_recientes
FROM cupones_uso
WHERE id_usuario = NEW.id_usuario
  AND fecha_uso >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
  AND estado = 'aplicado';

-- Marcar como riesgoso si hay más de 3 usos en 1 hora
IF v_usos_recientes > 3 THEN
            SET v_es_riesgoso = TRUE;
END IF;
END IF;

    -- Detectar uso riesgoso por IP (más de 5 usos desde la misma IP en 2 horas)
    IF NEW.ip_usuario IS NOT NULL THEN
SELECT COUNT(*) INTO v_usos_recientes
FROM cupones_uso
WHERE ip_usuario = NEW.ip_usuario
  AND fecha_uso >= DATE_SUB(NOW(), INTERVAL 2 HOUR)
  AND estado = 'aplicado';

IF v_usos_recientes > 5 THEN
            SET v_es_riesgoso = TRUE;
END IF;
END IF;

    -- Registrar en logs si se detecta uso riesgoso
    IF v_es_riesgoso THEN
        INSERT INTO logs (
            id_usuario,
            operacion,
            accion,
            descripcion,
            ip,
            fecha_log
        ) VALUES (
            NEW.id_usuario,
            'INSERT',
            'USO_CUPON_RIESGOSO',
            CONCAT(
                'Uso sospechoso detectado. Cupón: ',
                (SELECT codigo FROM cupones WHERE id_cupon = NEW.id_cupon),
                ', Usuario: ', COALESCE(NEW.id_usuario, 0),
                ', IP: ', COALESCE(NEW.ip_usuario, 'N/A'),
                ', Monto: ', COALESCE(NEW.monto_pedido, 0)
            ),
            NEW.ip_usuario,
            NOW()
        );
END IF;

    -- Log normal de uso de cupón para auditoría
INSERT INTO logs (
    id_usuario,
    operacion,
    accion,
    descripcion,
    ip,
    fecha_log
) VALUES (
             NEW.id_usuario,
             'INSERT',
             'USO_CUPON',
             CONCAT(
                     'Cupón usado: ',
                     (SELECT codigo FROM cupones WHERE id_cupon = NEW.id_cupon),
                     ', Estado: ', NEW.estado,
                     ', Monto: ', COALESCE(NEW.monto_pedido, 0)
             ),
             NEW.ip_usuario,
             NOW()
         );

END$$

DELIMITER ;

-- ============================================================================
-- TRIGGER 2: AFTER UPDATE CUPONES_USO
-- ============================================================================

DROP TRIGGER IF EXISTS after_update_cupones_uso;

DELIMITER $$

CREATE TRIGGER after_update_cupones_uso
    AFTER UPDATE ON cupones_uso
    FOR EACH ROW
BEGIN
    DECLARE v_ajuste_contador INT DEFAULT 0;

    -- Ajustar contador de usos en cupones cuando cambia el estado
    -- Si cambió de no-aplicado a aplicado: +1
    IF OLD.estado != 'aplicado' AND NEW.estado = 'aplicado' THEN
        SET v_ajuste_contador = 1;
    -- Si cambió de aplicado a no-aplicado: -1
    ELSEIF OLD.estado = 'aplicado' AND NEW.estado != 'aplicado' THEN
        SET v_ajuste_contador = -1;
END IF;

-- Aplicar ajuste al contador si es necesario
IF v_ajuste_contador != 0 THEN
UPDATE cupones
SET usos_actuales = GREATEST(0, usos_actuales + v_ajuste_contador),
    fecha_actualizacion = NOW()
WHERE id_cupon = NEW.id_cupon;
END IF;

    -- Registrar el cambio de estado en logs
    IF OLD.estado != NEW.estado THEN
        INSERT INTO logs (
            id_usuario,
            operacion,
            accion,
            descripcion,
            ip,
            fecha_log
        ) VALUES (
            NEW.id_usuario,
            'UPDATE',
            'CAMBIO_ESTADO_CUPON',
            CONCAT(
                'Estado de uso cambiado: ',
                (SELECT codigo FROM cupones WHERE id_cupon = NEW.id_cupon),
                ', De: ', OLD.estado,
                ', A: ', NEW.estado,
                ', Ajuste contador: ', v_ajuste_contador
            ),
            NEW.ip_usuario,
            NOW()
        );
END IF;

    -- Log para otros cambios significativos
    IF OLD.monto_pedido != NEW.monto_pedido OR OLD.detalles_uso != NEW.detalles_uso THEN
        INSERT INTO logs (
            id_usuario,
            operacion,
            accion,
            descripcion,
            ip,
            fecha_log
        ) VALUES (
            NEW.id_usuario,
            'UPDATE',
            'MODIFICACION_USO_CUPON',
            CONCAT(
                'Uso de cupón modificado: ',
                (SELECT codigo FROM cupones WHERE id_cupon = NEW.id_cupon),
                ', ID Uso: ', NEW.id_uso
            ),
            NEW.ip_usuario,
            NOW()
        );
END IF;

END$$

DELIMITER ;

-- ============================================================================
-- TRIGGER 3: BEFORE INSERT NEWSLETTER
-- ============================================================================

DROP TRIGGER IF EXISTS before_insert_newsletter;

DELIMITER $$

CREATE TRIGGER before_insert_newsletter
    BEFORE INSERT ON newsletter
    FOR EACH ROW
BEGIN
    DECLARE v_email_existe INT DEFAULT 0;
    DECLARE v_email_normalizado VARCHAR(255);

    -- Normalizar email: trim y lowercase
    SET v_email_normalizado = LOWER(TRIM(NEW.email));

    -- Validación básica de formato de email
    IF v_email_normalizado NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Formato de email inválido';
END IF;

-- Verificar si el email ya existe (control adicional al UNIQUE constraint)
SELECT COUNT(*) INTO v_email_existe
FROM newsletter
WHERE email = v_email_normalizado;

IF v_email_existe > 0 THEN
        SIGNAL SQLSTATE '23000'
        SET MESSAGE_TEXT = 'Error: Email ya está suscrito al newsletter';
END IF;

    -- Aplicar normalizaciones
    SET NEW.email = v_email_normalizado;

    -- Normalizar nombre si está presente
    IF NEW.nombre IS NOT NULL THEN
        SET NEW.nombre = TRIM(NEW.nombre);
        -- Evitar nombres vacíos
        IF NEW.nombre = '' THEN
            SET NEW.nombre = NULL;
END IF;
END IF;

    -- Generar token de confirmación si no se proporciona
    IF NEW.token_confirmacion IS NULL THEN
        SET NEW.token_confirmacion = CONCAT(
            'tok_',
            UNIX_TIMESTAMP(),
            '_',
            SUBSTRING(MD5(CONCAT(NEW.email, NOW(), RAND())), 1, 16)
        );
END IF;

    -- Establecer estado por defecto si no se especifica
    IF NEW.estado IS NULL THEN
        SET NEW.estado = 'activo';
END IF;

    -- Validar IP si se proporciona
    IF NEW.ip_suscripcion IS NOT NULL THEN
        -- Validación básica de formato IPv4
        IF NEW.ip_suscripcion NOT REGEXP '^([0-9]{1,3}\.){3}[0-9]{1,3}$' THEN
            SET NEW.ip_suscripcion = '0.0.0.0';
END IF;
END IF;

END$$

DELIMITER ;

-- ============================================================================
-- TRIGGER 4: AFTER INSERT FAVORITOS
-- ============================================================================

DROP TRIGGER IF EXISTS after_insert_favoritos;

DELIMITER $$

CREATE TRIGGER after_insert_favoritos
    AFTER INSERT ON favoritos
    FOR EACH ROW
BEGIN
    DECLARE v_favoritos_recientes INT DEFAULT 0;
    DECLARE v_producto_nombre VARCHAR(200);
    DECLARE v_usuario_email VARCHAR(100);

    -- Obtener información adicional para el log
    SELECT nombre INTO v_producto_nombre
    FROM productos
    WHERE id_producto = NEW.id_producto;

    SELECT email INTO v_usuario_email
    FROM usuarios
    WHERE id_usuario = NEW.id_usuario;

    -- Detectar comportamiento sospechoso: muchos favoritos en poco tiempo
    SELECT COUNT(*) INTO v_favoritos_recientes
    FROM favoritos
    WHERE id_usuario = NEW.id_usuario
      AND creado_el >= DATE_SUB(NOW(), INTERVAL 5 MINUTE);

    -- Log de auditoría para favorito agregado
    INSERT INTO logs (
        id_usuario,
        operacion,
        accion,
        descripcion,
        ip,
        fecha_log
    ) VALUES (
                 NEW.id_usuario,
                 'INSERT',
                 'FAVORITO_AGREGADO',
                 CONCAT(
                         'Favorito agregado - Usuario: ', COALESCE(v_usuario_email, 'N/A'),
                         ', Producto: ', COALESCE(v_producto_nombre, 'N/A'),
                         ', ID Producto: ', NEW.id_producto
                 ),
                 NEW.ip_usuario,
                 NOW()
             );

    -- Log de advertencia si hay comportamiento sospechoso
    IF v_favoritos_recientes > 10 THEN
        INSERT INTO logs (
            id_usuario,
            operacion,
            accion,
            descripcion,
            ip,
            fecha_log
        ) VALUES (
            NEW.id_usuario,
            'INSERT',
            'FAVORITOS_SOSPECHOSO',
            CONCAT(
                'Comportamiento sospechoso detectado: ',
                v_favoritos_recientes,
                ' favoritos en 5 minutos por usuario: ',
                NEW.id_usuario,
                ', IP: ', COALESCE(NEW.ip_usuario, 'N/A')
            ),
            NEW.ip_usuario,
            NOW()
        );
END IF;

END$$

DELIMITER ;

-- ============================================================================
-- CORRECCIÓN DEL ÍNDICE ERRÓNEO EN FAVORITOS
-- ============================================================================

DROP INDEX IF EXISTS idx_email ON favoritos;

-- ============================================================================
-- TRIGGERS ADICIONALES DE LIMPIEZA (OPCIONALES)
-- ============================================================================

-- Trigger para limpiar tokens expirados en newsletter
DROP EVENT IF EXISTS cleanup_newsletter_tokens;

DELIMITER $$

CREATE EVENT cleanup_newsletter_tokens
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    -- Limpiar tokens de confirmación expirados (más de 7 días)
UPDATE newsletter
SET token_confirmacion = NULL
WHERE token_confirmacion IS NOT NULL
  AND fecha_suscripcion < DATE_SUB(NOW(), INTERVAL 7 DAY)
  AND fecha_confirmacion IS NULL;

-- Log de limpieza
INSERT INTO logs (
    id_usuario,
    operacion,
    accion,
    descripcion,
    ip,
    fecha_log
) VALUES (
             NULL,
             'UPDATE',
             'LIMPIEZA_TOKENS_NEWSLETTER',
             CONCAT('Tokens expirados limpiados: ', ROW_COUNT()),
             '127.0.0.1',
             NOW()
         );
END$$

DELIMITER ;

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
STORED PROCEDURES IMPLEMENTADOS:

1. sp_aplicar_cupon_seguro:
   - Validación completa de reglas de negocio
   - Transacciones atómicas con bloqueos
   - Control de concurrencia con FOR UPDATE
   - Manejo robusto de errores
   - Prevención de doble uso por usuario

2. sp_reporte_cupones_usados:
   - Reporte detallado con filtros opcionales
   - Cálculo automático de descuentos aplicados
   - Resumen agregado por cupón
   - Joins optimizados con índices existentes

3. sp_limpiar_datos_sensibles:
   - Dos modos: anonimización y enmascaramiento
   - Políticas de retención configurables
   - Auditoría completa en tabla logs
   - Validaciones de seguridad (mínimo 30 días)

PRIVILEGIOS MÍNIMOS REQUERIDOS:
- SELECT, INSERT, UPDATE en: cupones, cupones_uso, newsletter, usuarios, logs
- EXECUTE en los stored procedures

USO RECOMENDADO:
- Ejecutar sp_aplicar_cupon_seguro en transacciones de checkout
- sp_reporte_cupones_usados para análisis de marketing
- sp_limpiar_datos_sensibles mensualmente con política corporativa
*/



/*
TRIGGERS IMPLEMENTADOS:

1. after_insert_cupones_uso:
   - Actualiza contadores automáticamente
   - Detecta patrones de uso riesgoso por usuario e IP
   - Registra auditoría completa en logs
   - Prevención de fraude básica

2. after_update_cupones_uso:
   - Mantiene consistencia de contadores al cambiar estados
   - Audita todos los cambios significativos
   - Ajuste automático con validación (no negativos)

3. before_insert_newsletter:
   - Normalización automática de emails (lowercase, trim)
   - Validación de formato con expresiones regulares
   - Generación automática de tokens de confirmación
   - Control de duplicados con mensajes claros
   - Validación básica de IPs

4. after_insert_favoritos:
   - Auditoría completa de favoritos agregados
   - Detección de comportamiento sospechoso
   - Logging enriquecido con datos de productos y usuarios

CARACTERÍSTICAS ADICIONALES:
- Event scheduler para limpieza automática de tokens
- Corrección del índice erróneo detectado
- Manejo robusto de errores con SIGNAL SQLSTATE
- Validaciones de integridad de datos

RENDIMIENTO:
- Triggers optimizados para mínimo impacto
- Uso eficiente de índices existentes
- Logging selectivo para evitar spam en logs

SEGURIDAD:
- Detección de patrones fraudulentos
- Normalización de datos de entrada
- Validaciones de formato y integridad
- Auditoría completa para compliance

PRIVILEGIOS MÍNIMOS REQUERIDOS:
- INSERT, UPDATE en tablas: cupones, cupones_uso, newsletter, favoritos, logs
- SELECT en: productos, usuarios (para enriquecer logs)
- EVENT para el cleanup automático (opcional)
*/

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

