-- ============================================================================
-- 01_PROCEDURES_MARKETING.SQL - Stored Procedures Marketing y Experiencia
-- ============================================================================
-- Propósito: Implementar SP para gestión segura de cupones, reportes y limpieza
-- Motor: MySQL 8.0
-- Dependencias: Tablas cupones, cupones_uso, newsletter, favoritos
-- Privilegios mínimos: SELECT, INSERT, UPDATE, DELETE en tablas objetivo
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
