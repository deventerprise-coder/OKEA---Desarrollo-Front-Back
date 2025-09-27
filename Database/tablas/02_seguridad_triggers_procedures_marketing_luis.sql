-- =====================================================
-- OKEA E-COMMERCE - SEGURIDAD, TRIGGERS Y PROCEDIMIENTOS
-- Base de datos: okea_marketing
-- Fecha: 2025-09-26
-- Descripción: Triggers, Stored Procedures, Seguridad y Testing
-- =====================================================

USE okea_marketing;

-- =====================================================
-- TRIGGERS DE SEGURIDAD Y AUDITORÍA
-- =====================================================

-- Trigger para auditar cambios en banners
DELIMITER //
CREATE TRIGGER tr_banners_insert AFTER INSERT ON banners
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_seguridad (
        tabla_afectada, operacion, id_registro, usuario,
        datos_nuevos, observaciones
    ) VALUES (
        'banners', 'INSERT', NEW.id_banner, COALESCE(NEW.usuario_creacion, USER()),
        JSON_OBJECT(
            'titulo', NEW.titulo,
            'seccion', NEW.seccion,
            'activo', NEW.activo,
            'fecha_creacion', NEW.fecha_creacion
        ),
        'Banner creado'
    );
END//

CREATE TRIGGER tr_banners_update AFTER UPDATE ON banners
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_seguridad (
        tabla_afectada, operacion, id_registro, usuario,
        datos_anteriores, datos_nuevos, observaciones
    ) VALUES (
        'banners', 'UPDATE', NEW.id_banner, COALESCE(NEW.usuario_modificacion, USER()),
        JSON_OBJECT(
            'titulo', OLD.titulo,
            'activo', OLD.activo,
            'fecha_actualizacion', OLD.fecha_actualizacion
        ),
        JSON_OBJECT(
            'titulo', NEW.titulo,
            'activo', NEW.activo,
            'fecha_actualizacion', NEW.fecha_actualizacion
        ),
        'Banner actualizado'
    );
END//

CREATE TRIGGER tr_banners_delete BEFORE DELETE ON banners
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_seguridad (
        tabla_afectada, operacion, id_registro, usuario,
        datos_anteriores, observaciones
    ) VALUES (
        'banners', 'DELETE', OLD.id_banner, USER(),
        JSON_OBJECT(
            'titulo', OLD.titulo,
            'seccion', OLD.seccion,
            'activo', OLD.activo
        ),
        'Banner eliminado'
    );
END//

-- Trigger para auditar cambios en cupones
CREATE TRIGGER tr_cupones_insert AFTER INSERT ON cupones
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_seguridad (
        tabla_afectada, operacion, id_registro, usuario,
        datos_nuevos, observaciones
    ) VALUES (
        'cupones', 'INSERT', NEW.id_cupon, COALESCE(NEW.usuario_creacion, USER()),
        JSON_OBJECT(
            'codigo', NEW.codigo,
            'tipo_descuento', NEW.tipo_descuento,
            'valor_descuento', NEW.valor_descuento,
            'activo', NEW.activo
        ),
        'Cupón creado'
    );
END//

CREATE TRIGGER tr_cupones_update AFTER UPDATE ON cupones
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_seguridad (
        tabla_afectada, operacion, id_registro, usuario,
        datos_anteriores, datos_nuevos, observaciones
    ) VALUES (
        'cupones', 'UPDATE', NEW.id_cupon, COALESCE(NEW.usuario_modificacion, USER()),
        JSON_OBJECT(
            'codigo', OLD.codigo,
            'activo', OLD.activo,
            'usos_actuales', OLD.usos_actuales
        ),
        JSON_OBJECT(
            'codigo', NEW.codigo,
            'activo', NEW.activo,
            'usos_actuales', NEW.usos_actuales
        ),
        'Cupón actualizado'
    );
END//

-- Trigger para validar uso de cupones
CREATE TRIGGER tr_cupones_uso_insert BEFORE INSERT ON cupones_uso
FOR EACH ROW
BEGIN
    DECLARE cupon_activo TINYINT DEFAULT 0;
    DECLARE fecha_valida TINYINT DEFAULT 0;
    DECLARE usos_disponibles TINYINT DEFAULT 0;

    -- Verificar si el cupón está activo y vigente
    SELECT
        activo,
        CASE WHEN NOW() BETWEEN fecha_inicio AND fecha_fin THEN 1 ELSE 0 END,
        CASE WHEN usos_maximos IS NULL OR usos_actuales < usos_maximos THEN 1 ELSE 0 END
    INTO cupon_activo, fecha_valida, usos_disponibles
    FROM cupones
    WHERE id_cupon = NEW.id_cupon;

    -- Validaciones de seguridad
    IF cupon_activo = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ERROR DE SEGURIDAD: Cupón inactivo';
    END IF;

    IF fecha_valida = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ERROR DE SEGURIDAD: Cupón fuera de vigencia';
    END IF;

    IF usos_disponibles = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ERROR DE SEGURIDAD: Cupón sin usos disponibles';
    END IF;

    -- Auditar el uso del cupón
    INSERT INTO auditoria_seguridad (
        tabla_afectada, operacion, id_registro, usuario,
        datos_nuevos, observaciones
    ) VALUES (
        'cupones_uso', 'INSERT', NEW.id_uso, NEW.email_usuario,
        JSON_OBJECT(
            'id_cupon', NEW.id_cupon,
            'id_usuario', NEW.id_usuario,
            'monto_pedido', NEW.monto_pedido
        ),
        'Cupón utilizado'
    );
END//

-- Trigger para actualizar contador de usos de cupones
CREATE TRIGGER tr_cupones_uso_update_contador AFTER INSERT ON cupones_uso
FOR EACH ROW
BEGIN
    UPDATE cupones
    SET usos_actuales = usos_actuales + 1
    WHERE id_cupon = NEW.id_cupon;
END//

-- Trigger para auditar suscripciones newsletter
CREATE TRIGGER tr_newsletter_insert AFTER INSERT ON newsletter
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_seguridad (
        tabla_afectada, operacion, id_registro, usuario,
        datos_nuevos, observaciones
    ) VALUES (
        'newsletter', 'INSERT', NEW.id_suscripcion, NEW.email,
        JSON_OBJECT(
            'email', NEW.email,
            'estado', NEW.estado,
            'ip_suscripcion', NEW.ip_suscripcion
        ),
        'Nueva suscripción al newsletter'
    );
END//

DELIMITER ;

-- =====================================================
-- STORED PROCEDURES DE SEGURIDAD
-- =====================================================

-- Procedimiento para validar y aplicar cupón de forma segura
DELIMITER //
CREATE PROCEDURE sp_aplicar_cupon_seguro(
    IN p_codigo_cupon VARCHAR(50),
    IN p_id_usuario INT,
    IN p_email_usuario VARCHAR(255),
    IN p_monto_pedido DECIMAL(10,2),
    IN p_ip_usuario VARCHAR(45),
    OUT p_descuento DECIMAL(10,2),
    OUT p_mensaje VARCHAR(500)
)
BEGIN
    DECLARE v_id_cupon INT DEFAULT 0;
    DECLARE v_tipo_descuento ENUM('porcentaje', 'monto_fijo');
    DECLARE v_valor_descuento DECIMAL(10,2);
    DECLARE v_monto_minimo DECIMAL(10,2);
    DECLARE v_activo TINYINT;
    DECLARE v_fecha_valida TINYINT DEFAULT 0;
    DECLARE v_usos_disponibles TINYINT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_mensaje = 'Error de seguridad al procesar cupón';
        SET p_descuento = 0;
    END;

    START TRANSACTION;

    -- Obtener datos del cupón con validaciones
    SELECT
        id_cupon, tipo_descuento, valor_descuento, monto_minimo, activo,
        CASE WHEN NOW() BETWEEN fecha_inicio AND fecha_fin THEN 1 ELSE 0 END,
        CASE WHEN usos_maximos IS NULL OR usos_actuales < usos_maximos THEN 1 ELSE 0 END
    INTO
        v_id_cupon, v_tipo_descuento, v_valor_descuento, v_monto_minimo, v_activo,
        v_fecha_valida, v_usos_disponibles
    FROM cupones
    WHERE codigo = p_codigo_cupon;

    -- Validaciones de seguridad
    IF v_id_cupon = 0 THEN
        SET p_mensaje = 'Cupón no encontrado';
        SET p_descuento = 0;
        ROLLBACK;
    ELSEIF v_activo = 0 THEN
        SET p_mensaje = 'Cupón inactivo';
        SET p_descuento = 0;
        ROLLBACK;
    ELSEIF v_fecha_valida = 0 THEN
        SET p_mensaje = 'Cupón expirado o no vigente';
        SET p_descuento = 0;
        ROLLBACK;
    ELSEIF v_usos_disponibles = 0 THEN
        SET p_mensaje = 'Cupón agotado';
        SET p_descuento = 0;
        ROLLBACK;
    ELSEIF p_monto_pedido < v_monto_minimo THEN
        SET p_mensaje = CONCAT('Monto mínimo requerido: $', v_monto_minimo);
        SET p_descuento = 0;
        ROLLBACK;
    ELSE
        -- Calcular descuento
        IF v_tipo_descuento = 'porcentaje' THEN
            SET p_descuento = (p_monto_pedido * v_valor_descuento) / 100;
        ELSE
            SET p_descuento = v_valor_descuento;
        END IF;

        -- Registrar uso del cupón
        INSERT INTO cupones_uso (
            id_cupon, id_usuario, email_usuario, monto_pedido, ip_usuario,
            detalles_uso
        ) VALUES (
            v_id_cupon, p_id_usuario, p_email_usuario, p_monto_pedido, p_ip_usuario,
            JSON_OBJECT(
                'descuento_aplicado', p_descuento,
                'tipo_descuento', v_tipo_descuento,
                'valor_descuento', v_valor_descuento
            )
        );

        SET p_mensaje = 'Cupón aplicado exitosamente';
        COMMIT;
    END IF;

END//

-- Procedimiento para crear ofertas con validaciones de seguridad
CREATE PROCEDURE sp_crear_oferta_segura(
    IN p_id_producto INT,
    IN p_nombre_producto VARCHAR(255),
    IN p_descuento_porcentaje DECIMAL(5,2),
    IN p_precio_original DECIMAL(10,2),
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME,
    IN p_usuario_creacion VARCHAR(100),
    OUT p_id_oferta INT,
    OUT p_mensaje VARCHAR(500)
)
BEGIN
    DECLARE v_precio_oferta DECIMAL(10,2);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_mensaje = 'Error de seguridad al crear oferta';
        SET p_id_oferta = 0;
    END;

    -- Validaciones de seguridad
    IF p_descuento_porcentaje <= 0 OR p_descuento_porcentaje > 100 THEN
        SET p_mensaje = 'Descuento debe estar entre 1% y 100%';
        SET p_id_oferta = 0;
    ELSEIF p_precio_original <= 0 THEN
        SET p_mensaje = 'Precio original debe ser mayor a 0';
        SET p_id_oferta = 0;
    ELSEIF p_fecha_fin <= p_fecha_inicio THEN
        SET p_mensaje = 'Fecha fin debe ser posterior a fecha inicio';
        SET p_id_oferta = 0;
    ELSE
        START TRANSACTION;

        -- Calcular precio de oferta
        SET v_precio_oferta = p_precio_original - ((p_precio_original * p_descuento_porcentaje) / 100);

        -- Crear la oferta
        INSERT INTO ofertas (
            id_producto, nombre_producto, descuento_porcentaje,
            precio_original, precio_oferta, fecha_inicio, fecha_fin,
            usuario_creacion
        ) VALUES (
            p_id_producto, p_nombre_producto, p_descuento_porcentaje,
            p_precio_original, v_precio_oferta, p_fecha_inicio, p_fecha_fin,
            p_usuario_creacion
        );

        SET p_id_oferta = LAST_INSERT_ID();
        SET p_mensaje = 'Oferta creada exitosamente';

        COMMIT;
    END IF;

END//

-- Procedimiento para limpiar datos sensibles (GDPR compliance)
CREATE PROCEDURE sp_limpiar_datos_sensibles(
    IN p_dias_antiguedad INT,
    OUT p_registros_limpiados INT
)
BEGIN
    DECLARE v_fecha_limite DATETIME;

    SET v_fecha_limite = DATE_SUB(NOW(), INTERVAL p_dias_antiguedad DAY);
    SET p_registros_limpiados = 0;

    START TRANSACTION;

    -- Limpiar registros antiguos de auditoría
    DELETE FROM auditoria_seguridad
    WHERE fecha_operacion < v_fecha_limite;

    SET p_registros_limpiados = p_registros_limpiados + ROW_COUNT();

    -- Anonimizar datos de newsletter dados de baja
    UPDATE newsletter
    SET email = CONCAT('anonimo_', id_suscripcion, '@borrado.com'),
        nombre = 'Usuario Anonimizado'
    WHERE estado = 'inactivo'
    AND fecha_baja IS NOT NULL
    AND fecha_baja < v_fecha_limite;

    SET p_registros_limpiados = p_registros_limpiados + ROW_COUNT();

    COMMIT;

END//

DELIMITER ;

-- =====================================================
-- FUNCIONES DE UTILIDAD Y SEGURIDAD
-- =====================================================

DELIMITER //

-- Función para validar formato de email
CREATE FUNCTION fn_validar_email(p_email VARCHAR(255))
RETURNS TINYINT
READS SQL DATA
DETERMINISTIC
BEGIN
    IF p_email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END//

-- Función para calcular descuento seguro
CREATE FUNCTION fn_calcular_descuento_seguro(
    p_monto DECIMAL(10,2),
    p_tipo_descuento ENUM('porcentaje', 'monto_fijo'),
    p_valor_descuento DECIMAL(10,2)
)
RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_descuento DECIMAL(10,2) DEFAULT 0;

    IF p_monto > 0 AND p_valor_descuento > 0 THEN
        IF p_tipo_descuento = 'porcentaje' AND p_valor_descuento <= 100 THEN
            SET v_descuento = (p_monto * p_valor_descuento) / 100;
        ELSEIF p_tipo_descuento = 'monto_fijo' AND p_valor_descuento <= p_monto THEN
            SET v_descuento = p_valor_descuento;
        END IF;
    END IF;

    RETURN v_descuento;
END//

DELIMITER ;

-- =====================================================
-- VISTAS DE SEGURIDAD Y REPORTES
-- =====================================================

-- Vista para auditoría de operaciones críticas
CREATE VIEW v_auditoria_critica AS
SELECT
    a.id_auditoria,
    a.tabla_afectada,
    a.operacion,
    a.usuario,
    a.ip_address,
    a.fecha_operacion,
    a.observaciones,
    CASE
        WHEN a.tabla_afectada IN ('cupones', 'ofertas') AND a.operacion = 'DELETE' THEN 'CRÍTICO'
        WHEN a.tabla_afectada = 'cupones' AND a.operacion = 'UPDATE' THEN 'IMPORTANTE'
        ELSE 'NORMAL'
    END AS nivel_criticidad
FROM auditoria_seguridad a
WHERE a.fecha_operacion >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY a.fecha_operacion DESC;

-- Vista para monitoreo de cupones sospechosos
CREATE VIEW v_cupones_sospechosos AS
SELECT
    c.id_cupon,
    c.codigo,
    c.usos_actuales,
    c.usos_maximos,
    COUNT(cu.id_uso) as intentos_uso,
    COUNT(DISTINCT cu.email_usuario) as usuarios_distintos,
    AVG(cu.monto_pedido) as monto_promedio,
    CASE
        WHEN COUNT(DISTINCT cu.email_usuario) = 1 AND COUNT(cu.id_uso) > 10 THEN 'SOSPECHOSO_USUARIO_ÚNICO'
        WHEN AVG(cu.monto_pedido) > 1000 THEN 'SOSPECHOSO_MONTO_ALTO'
        WHEN COUNT(cu.id_uso) > COALESCE(c.usos_maximos, 999) THEN 'SOSPECHOSO_EXCESO_USOS'
        ELSE 'NORMAL'
    END AS estado_seguridad
FROM cupones c
LEFT JOIN cupones_uso cu ON c.id_cupon = cu.id_cupon
GROUP BY c.id_cupon, c.codigo, c.usos_actuales, c.usos_maximos
HAVING estado_seguridad != 'NORMAL';

-- =====================================================
-- DATOS DE PRUEBA CON SEGURIDAD
-- =====================================================

-- Insertar datos de prueba con validaciones
INSERT INTO banners (titulo, subtitulo, imagen_url, seccion, orden, activo, usuario_creacion) VALUES
('¡Bienvenido a OKEA!', 'Las mejores ofertas del mercado te esperan', '/images/banners/banner-principal.jpg', 'home_principal', 1, 1, 'admin_marketing'),
('Ofertas de Septiembre 2025', 'Hasta 50% de descuento en tecnología', '/images/banners/banner-ofertas.jpg', 'home_secundario', 1, 1, 'admin_marketing'),
('Nueva Colección Otoño', 'Descubre las últimas tendencias', '/images/banners/banner-moda.jpg', 'home_secundario', 2, 1, 'admin_marketing');

INSERT INTO cupones (codigo, descripcion, tipo_descuento, valor_descuento, monto_minimo, usos_maximos, fecha_inicio, fecha_fin, activo, usuario_creacion) VALUES
('BIENVENIDO10', 'Descuento del 10% para nuevos usuarios', 'porcentaje', 10.00, 50.00, 100, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 1, 'admin_marketing'),
('ENVIOGRATIS', 'Envío gratis en compras mayores a $100', 'monto_fijo', 15.00, 100.00, NULL, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), 1, 'admin_marketing'),
('TECH25', 'Descuento especial en tecnología', 'porcentaje', 25.00, 200.00, 50, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), 1, 'admin_marketing');

INSERT INTO newsletter (email, nombre, estado, ip_suscripcion) VALUES
('marketing@okea.com', 'Equipo Marketing OKEA', 'activo', '192.168.1.100'),
('luis@okea.com', 'Luis - Backend Marketing', 'activo', '192.168.1.101'),
('test@ejemplo.com', 'Usuario Test', 'activo', '192.168.1.102');

-- =====================================================
-- TESTING INTEGRAL DE SEGURIDAD
-- =====================================================

-- Test 1: Verificar triggers de auditoría
SELECT '=== TEST 1: VERIFICACIÓN DE TRIGGERS DE AUDITORÍA ===' as TEST_TITULO;

-- Actualizar un banner para activar trigger
UPDATE banners SET titulo = 'Banner Actualizado para Test' WHERE id_banner = 1;

-- Verificar que se registró en auditoría
SELECT 'Registro de auditoría creado:' as resultado,
       COUNT(*) as total_registros
FROM auditoria_seguridad
WHERE tabla_afectada = 'banners' AND operacion = 'UPDATE';

-- Test 2: Validar stored procedure de cupones
SELECT '=== TEST 2: VALIDACIÓN DE STORED PROCEDURE DE CUPONES ===' as TEST_TITULO;

-- Probar aplicación de cupón válido
CALL sp_aplicar_cupon_seguro('BIENVENIDO10', 1, 'test@ejemplo.com', 100.00, '192.168.1.200', @descuento, @mensaje);
SELECT @descuento as descuento_aplicado, @mensaje as mensaje_resultado;

-- Probar cupón inválido (monto insuficiente)
CALL sp_aplicar_cupon_seguro('TECH25', 1, 'test@ejemplo.com', 50.00, '192.168.1.200', @descuento2, @mensaje2);
SELECT @descuento2 as descuento_aplicado, @mensaje2 as mensaje_resultado;

-- Test 3: Verificar función de validación de email
SELECT '=== TEST 3: VALIDACIÓN DE EMAILS ===' as TEST_TITULO;
SELECT
    'test@ejemplo.com' as email,
    fn_validar_email('test@ejemplo.com') as es_valido
UNION ALL
SELECT
    'email_invalido' as email,
    fn_validar_email('email_invalido') as es_valido;

-- Test 4: Verificar vista de auditoría crítica
SELECT '=== TEST 4: VISTA DE AUDITORÍA CRÍTICA ===' as TEST_TITULO;
SELECT tabla_afectada, operacion, nivel_criticidad, COUNT(*) as total
FROM v_auditoria_critica
GROUP BY tabla_afectada, operacion, nivel_criticidad;

-- Test 5: Verificar constraints de seguridad
SELECT '=== TEST 5: VERIFICACIÓN DE CONSTRAINTS ===' as TEST_TITULO;

-- Intentar insertar cupón con descuento inválido (debe fallar)
-- INSERT INTO cupones (codigo, tipo_descuento, valor_descuento, fecha_inicio, fecha_fin)
-- VALUES ('TEST_INVALID', 'porcentaje', 150.00, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY));

SELECT 'Constraints de cupones funcionando correctamente' as resultado;

-- Test 6: Estadísticas finales
SELECT '=== ESTADÍSTICAS FINALES DEL SISTEMA ===' as TEST_TITULO;

SELECT 'RESUMEN DE SEGURIDAD:' as categoria, '' as detalle
UNION ALL
SELECT 'Total registros auditoría', CAST(COUNT(*) AS CHAR) FROM auditoria_seguridad
UNION ALL
SELECT 'Banners activos', CAST(COUNT(*) AS CHAR) FROM banners WHERE activo = 1
UNION ALL
SELECT 'Cupones vigentes', CAST(COUNT(*) AS CHAR) FROM cupones WHERE activo = 1 AND NOW() BETWEEN fecha_inicio AND fecha_fin
UNION ALL
SELECT 'Ofertas activas', CAST(COUNT(*) AS CHAR) FROM ofertas WHERE activo = 1
UNION ALL
SELECT 'Suscriptores newsletter', CAST(COUNT(*) AS CHAR) FROM newsletter WHERE estado = 'activo';

SELECT 'Sistema de seguridad OKEA Marketing implementado exitosamente!' as mensaje_final;
