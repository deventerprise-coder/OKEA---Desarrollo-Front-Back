-- ============================================================================
-- 02_TRIGGERS_MARKETING.SQL - Triggers Marketing y Experiencia
-- ============================================================================
USE ecommerce_db_okea;

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
-- COMENTARIOS FINALES Y DOCUMENTACIÓN
-- ============================================================================

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
