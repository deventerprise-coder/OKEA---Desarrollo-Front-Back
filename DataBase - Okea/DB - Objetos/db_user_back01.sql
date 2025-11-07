-- ============================================================================
-- PROYECTO: E-COMMERCE OKEA
-- BACKEND 1 - USUARIOS Y SEGURIDAD
-- DESARROLLADOR: Isaac Pasapera
-- FECHA: 2024-11
-- ============================================================================
-- CONTENIDO:
--   - 5 Stored Procedures (4 originales + sp_usuarios_mas_activos)
--   - 5 Triggers (incluyendo trg_logs_automaticos integrado)
--   - 4 Vistas (3 originales + vw_usuarios_con_cupones)
-- ============================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

USE ecommerce_db_okea;

-- ============================================================================
-- SECCIÓN 1: STORED PROCEDURES
-- ============================================================================

DELIMITER $$

-- ============================================================================
-- sp_crear_usuario
-- Descripción: Crea un nuevo usuario en el sistema y le asigna un rol
-- Parámetros:
--   IN  p_nombre, p_apellido, p_email, p_password_hash, p_telefono, 
--       p_razon_social, p_id_rol
--   OUT p_resultado (ID creado o 0), p_mensaje
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_crear_usuario$$
CREATE PROCEDURE sp_crear_usuario(
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_telefono VARCHAR(20),
    IN p_razon_social VARCHAR(255),
    IN p_id_rol INT,
    OUT p_resultado INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_usuario_id INT;
    DECLARE v_email_existe INT DEFAULT 0;
    DECLARE v_rol_existe INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 0;
        SET p_mensaje = 'Error al crear usuario. Transacción revertida.';
    END;
    
    START TRANSACTION;
    
    -- Validación: Email ya existe
    SELECT COUNT(*) INTO v_email_existe 
    FROM usuarios 
    WHERE email = p_email;
    
    IF v_email_existe > 0 THEN
        SET p_resultado = 0;
        SET p_mensaje = 'El email ya está registrado en el sistema.';
        ROLLBACK;
    ELSE
        -- Validación: Rol existe
        SELECT COUNT(*) INTO v_rol_existe 
        FROM roles 
        WHERE id_rol = p_id_rol;
        
        IF v_rol_existe = 0 THEN
            SET p_resultado = 0;
            SET p_mensaje = 'El rol especificado no existe.';
            ROLLBACK;
        ELSE
            -- Crear usuario
            INSERT INTO usuarios (
                nombre, apellido, email, password_hash, telefono, 
                razon_social, email_verificado, activo
            ) VALUES (
                p_nombre, p_apellido, p_email, p_password_hash, 
                p_telefono, p_razon_social, 0, 1
            );
            
            SET v_usuario_id = LAST_INSERT_ID();
            
            -- Asignar rol
            INSERT INTO usuarios_roles (id_usuario, id_rol)
            VALUES (v_usuario_id, p_id_rol);
            
            -- Log de auditoría (IP se registra desde PHP)
            INSERT INTO logs (id_usuario, operacion, accion, descripcion)
            VALUES (
                v_usuario_id, 'INSERT', 'Creación de usuario',
                CONCAT('Usuario creado: ', p_email, ' con rol ID: ', p_id_rol)
            );
            
            SET p_resultado = v_usuario_id;
            SET p_mensaje = CONCAT('Usuario creado exitosamente con ID: ', v_usuario_id);
            
            COMMIT;
        END IF;
    END IF;
END$$


-- ============================================================================
-- sp_actualizar_usuario
-- Descripción: Actualiza información de un usuario existente
-- Parámetros:
--   IN  p_id_usuario, p_nombre, p_apellido, p_telefono, p_razon_social, p_activo
--   OUT p_resultado (1=éxito, 0=error), p_mensaje
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_actualizar_usuario$$
CREATE PROCEDURE sp_actualizar_usuario(
    IN p_id_usuario INT,
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_razon_social VARCHAR(255),
    IN p_activo TINYINT(1),
    OUT p_resultado INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_usuario_existe INT DEFAULT 0;
    DECLARE v_email_usuario VARCHAR(100);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 0;
        SET p_mensaje = 'Error al actualizar usuario. Transacción revertida.';
    END;
    
    START TRANSACTION;
    
    -- Verificar que el usuario existe
    SELECT COUNT(*), MAX(email) INTO v_usuario_existe, v_email_usuario
    FROM usuarios 
    WHERE id_usuario = p_id_usuario;
    
    IF v_usuario_existe = 0 THEN
        SET p_resultado = 0;
        SET p_mensaje = 'El usuario no existe.';
        ROLLBACK;
    ELSE
        -- Actualizar usuario
        UPDATE usuarios
        SET 
            nombre = COALESCE(p_nombre, nombre),
            apellido = COALESCE(p_apellido, apellido),
            telefono = COALESCE(p_telefono, telefono),
            razon_social = COALESCE(p_razon_social, razon_social),
            activo = COALESCE(p_activo, activo),
            fecha_actualizacion = CURRENT_TIMESTAMP
        WHERE id_usuario = p_id_usuario;
        
        -- Log de auditoría
        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (
            p_id_usuario, 'UPDATE', 'Actualización de usuario',
            CONCAT('Usuario actualizado: ', v_email_usuario)
        );
        
        SET p_resultado = 1;
        SET p_mensaje = 'Usuario actualizado exitosamente.';
        
        COMMIT;
    END IF;
END$$


-- ============================================================================
-- sp_asignar_rol_usuario
-- Descripción: Asigna un rol a un usuario (soporta múltiples roles)
-- Parámetros:
--   IN  p_id_usuario, p_id_rol
--   OUT p_resultado (1=éxito, 0=error), p_mensaje
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_asignar_rol_usuario$$
CREATE PROCEDURE sp_asignar_rol_usuario(
    IN p_id_usuario INT,
    IN p_id_rol INT,
    OUT p_resultado INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_usuario_existe INT DEFAULT 0;
    DECLARE v_rol_existe INT DEFAULT 0;
    DECLARE v_asignacion_existe INT DEFAULT 0;
    DECLARE v_nombre_rol VARCHAR(50);
    DECLARE v_email_usuario VARCHAR(100);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 0;
        SET p_mensaje = 'Error al asignar rol. Transacción revertida.';
    END;
    
    START TRANSACTION;
    
    -- Verificar usuario
    SELECT COUNT(*), MAX(email) INTO v_usuario_existe, v_email_usuario
    FROM usuarios WHERE id_usuario = p_id_usuario;
    
    -- Verificar rol
    SELECT COUNT(*), MAX(nombre_rol) INTO v_rol_existe, v_nombre_rol
    FROM roles WHERE id_rol = p_id_rol;
    
    -- Verificar si ya tiene el rol
    SELECT COUNT(*) INTO v_asignacion_existe
    FROM usuarios_roles
    WHERE id_usuario = p_id_usuario AND id_rol = p_id_rol;
    
    IF v_usuario_existe = 0 THEN
        SET p_resultado = 0;
        SET p_mensaje = 'El usuario no existe.';
        ROLLBACK;
    ELSEIF v_rol_existe = 0 THEN
        SET p_resultado = 0;
        SET p_mensaje = 'El rol especificado no existe.';
        ROLLBACK;
    ELSEIF v_asignacion_existe > 0 THEN
        SET p_resultado = 0;
        SET p_mensaje = CONCAT('El usuario ya tiene el rol "', v_nombre_rol, '" asignado.');
        ROLLBACK;
    ELSE
        -- Asignar rol
        INSERT INTO usuarios_roles (id_usuario, id_rol)
        VALUES (p_id_usuario, p_id_rol);
        
        -- Log
        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (
            p_id_usuario, 'INSERT', 'Asignación de rol',
            CONCAT('Rol "', v_nombre_rol, '" asignado a usuario: ', v_email_usuario)
        );
        
        SET p_resultado = 1;
        SET p_mensaje = CONCAT('Rol "', v_nombre_rol, '" asignado exitosamente.');
        
        COMMIT;
    END IF;
END$$


-- ============================================================================
-- sp_autenticar_usuario
-- Descripción: Valida credenciales y actualiza ultimo_login
-- NOTA: La validación del password se hace en PHP con password_verify()
-- Parámetros:
--   IN  p_email
--   OUT p_id_usuario, p_password_hash, p_activo, p_email_verificado, p_mensaje
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_autenticar_usuario$$
CREATE PROCEDURE sp_autenticar_usuario(
    IN p_email VARCHAR(100),
    OUT p_id_usuario INT,
    OUT p_password_hash VARCHAR(255),
    OUT p_activo TINYINT(1),
    OUT p_email_verificado TINYINT(1),
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_usuario_existe INT DEFAULT 0;
    
    SELECT COUNT(*) INTO v_usuario_existe
    FROM usuarios WHERE email = p_email;
    
    IF v_usuario_existe = 0 THEN
        SET p_id_usuario = NULL;
        SET p_password_hash = NULL;
        SET p_activo = NULL;
        SET p_email_verificado = NULL;
        SET p_mensaje = 'Usuario no encontrado.';
    ELSE
        -- Obtener datos
        SELECT id_usuario, password_hash, activo, email_verificado
        INTO p_id_usuario, p_password_hash, p_activo, p_email_verificado
        FROM usuarios WHERE email = p_email;
        
        IF p_activo = 0 THEN
            SET p_mensaje = 'Usuario inactivo. Contacte al administrador.';
        ELSEIF p_email_verificado = 0 THEN
            SET p_mensaje = 'Email no verificado. Revise su correo.';
        ELSE
            -- Actualizar ultimo_login
            UPDATE usuarios
            SET ultimo_login = CURRENT_TIMESTAMP
            WHERE id_usuario = p_id_usuario;
            
            -- Log
            INSERT INTO logs (id_usuario, operacion, accion, descripcion)
            VALUES (
                p_id_usuario, 'OTHER', 'Login exitoso',
                CONCAT('Usuario autenticado: ', p_email)
            );
            
            SET p_mensaje = 'Usuario autenticado correctamente.';
        END IF;
    END IF;
END$$


-- ============================================================================
-- sp_usuarios_mas_activos
-- Descripción: Reporte de usuarios más activos según ultimo_login
-- Parámetros:
--   IN  p_limite (default 10) - Cantidad a retornar
--   IN  p_dias_rango (default 30) - Rango de días a considerar
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_usuarios_mas_activos$$
CREATE PROCEDURE sp_usuarios_mas_activos(
    IN p_limite INT,
    IN p_dias_rango INT
)
BEGIN
    SET p_limite = COALESCE(p_limite, 10);
    SET p_dias_rango = COALESCE(p_dias_rango, 30);
    
    SELECT 
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.email,
        u.razon_social,
        u.telefono,
        u.ultimo_login,
        u.fecha_registro,
        GROUP_CONCAT(r.nombre_rol ORDER BY r.nombre_rol SEPARATOR ', ') AS roles,
        DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) AS dias_sin_login,
        DATEDIFF(CURRENT_DATE, DATE(u.fecha_registro)) AS dias_registrado,
        CASE
            WHEN u.ultimo_login IS NULL THEN 'Nunca ha iniciado sesión'
            WHEN DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) = 0 THEN 'Activo hoy'
            WHEN DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) <= 1 THEN 'Activo ayer'
            WHEN DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) <= 7 THEN 'Activo esta semana'
            WHEN DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) <= 30 THEN 'Activo este mes'
            ELSE CONCAT('Inactivo hace ', DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)), ' días')
        END AS estado_actividad,
        COALESCE(DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)), 9999) AS score_actividad
    FROM usuarios u
    INNER JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
    INNER JOIN roles r ON ur.id_rol = r.id_rol
    WHERE u.activo = 1 
      AND u.email_verificado = 1
      AND (u.ultimo_login IS NULL OR DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) <= p_dias_rango)
    GROUP BY u.id_usuario, u.nombre, u.apellido, u.email, u.razon_social,
             u.telefono, u.ultimo_login, u.fecha_registro
    ORDER BY score_actividad ASC, u.fecha_registro DESC
    LIMIT p_limite;
END$$

DELIMITER ;


-- ============================================================================
-- SECCIÓN 2: TRIGGERS (5)
-- ============================================================================
-- NOTA IMPORTANTE SOBRE MÚLTIPLES TRIGGERS EN AFTER UPDATE:
-- MySQL permite múltiples triggers del mismo tipo en la misma tabla.
-- Cada trigger se ejecuta en el orden en que fueron creados.
-- trg_after_update_usuario: Registra cambios de perfil
-- trg_logs_automaticos: Registra logins (5to trigger solicitado)
-- ============================================================================

DELIMITER $

-- ============================================================================
-- trg_before_insert_usuario
-- Descripción: Validaciones y normalizaciones antes de insertar usuario
-- ============================================================================
DROP TRIGGER IF EXISTS trg_before_insert_usuario$
CREATE TRIGGER trg_before_insert_usuario
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
    -- Validación: Email no vacío
    IF NEW.email IS NULL OR TRIM(NEW.email) = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El email no puede estar vacío';
    END IF;
    
    -- Validación: Formato de email
    IF NEW.email NOT LIKE '%_@__%.__%' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El email no tiene un formato válido';
    END IF;
    
    -- Validación: Password hash mínimo 60 caracteres (bcrypt)
    IF LENGTH(NEW.password_hash) < 60 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El password_hash debe ser un hash válido (mínimo 60 caracteres)';
    END IF;
    
    -- Validación: Nombre y apellido obligatorios
    IF TRIM(NEW.nombre) = '' OR TRIM(NEW.apellido) = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nombre y apellido son obligatorios';
    END IF;
    
    -- Normalizar email a minúsculas
    SET NEW.email = LOWER(TRIM(NEW.email));
    
    -- Normalizar nombre y apellido (primera letra mayúscula)
    SET NEW.nombre = CONCAT(UPPER(SUBSTRING(NEW.nombre, 1, 1)), LOWER(SUBSTRING(NEW.nombre, 2)));
    SET NEW.apellido = CONCAT(UPPER(SUBSTRING(NEW.apellido, 1, 1)), LOWER(SUBSTRING(NEW.apellido, 2)));
END$$


-- ============================================================================
-- trg_after_insert_usuario
-- Descripción: Registra en logs la creación de usuario
-- ============================================================================
DROP TRIGGER IF EXISTS trg_after_insert_usuario$$
CREATE TRIGGER trg_after_insert_usuario
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (
        NEW.id_usuario, 'INSERT', 'Usuario creado',
        CONCAT('Nuevo usuario registrado: ', NEW.email, 
               ' - Activo: ', NEW.activo, ' - Verificado: ', NEW.email_verificado)
    );
END$$


-- ============================================================================
-- trg_after_update_usuario
-- Descripción: Registra cambios en el perfil del usuario
-- ============================================================================
DROP TRIGGER IF EXISTS trg_after_update_usuario$
CREATE TRIGGER trg_after_update_usuario
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
    DECLARE v_cambios TEXT DEFAULT '';
    DECLARE v_hay_cambios BOOLEAN DEFAULT FALSE;
    
    -- Detectar cambios de perfil (NO incluye ultimo_login)
    IF OLD.nombre != NEW.nombre THEN
        SET v_cambios = CONCAT(v_cambios, 'Nombre: ', OLD.nombre, ' → ', NEW.nombre, '; ');
        SET v_hay_cambios = TRUE;
    END IF;
    
    IF OLD.apellido != NEW.apellido THEN
        SET v_cambios = CONCAT(v_cambios, 'Apellido: ', OLD.apellido, ' → ', NEW.apellido, '; ');
        SET v_hay_cambios = TRUE;
    END IF;
    
    IF COALESCE(OLD.telefono, '') != COALESCE(NEW.telefono, '') THEN
        SET v_cambios = CONCAT(v_cambios, 'Teléfono modificado; ');
        SET v_hay_cambios = TRUE;
    END IF;
    
    IF COALESCE(OLD.razon_social, '') != COALESCE(NEW.razon_social, '') THEN
        SET v_cambios = CONCAT(v_cambios, 'Razón social modificada; ');
        SET v_hay_cambios = TRUE;
    END IF;
    
    IF OLD.activo != NEW.activo THEN
        SET v_cambios = CONCAT(v_cambios, 'Estado: ', 
            IF(OLD.activo = 1, 'Activo', 'Inactivo'), ' → ', 
            IF(NEW.activo = 1, 'Activo', 'Inactivo'), '; ');
        SET v_hay_cambios = TRUE;
    END IF;
    
    IF OLD.email_verificado != NEW.email_verificado THEN
        SET v_cambios = CONCAT(v_cambios, 'Email verificado: ', 
            IF(OLD.email_verificado = 1, 'Sí', 'No'), ' → ', 
            IF(NEW.email_verificado = 1, 'Sí', 'No'), '; ');
        SET v_hay_cambios = TRUE;
    END IF;
    
    -- Solo registrar si hubo cambios significativos
    IF v_hay_cambios THEN
        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (
            NEW.id_usuario, 'UPDATE', 'Usuario actualizado',
            CONCAT('Cambios en usuario ', NEW.email, ': ', v_cambios)
        );
    END IF;
END$


-- ============================================================================
-- trg_logs_automaticos
-- Descripción: Registra automáticamente logins de usuarios (5to trigger)
-- EVENTO: AFTER UPDATE en campo ultimo_login específicamente
-- FUNCIÓN: Captura cuando un usuario inicia sesión
-- ============================================================================
DROP TRIGGER IF EXISTS trg_logs_automaticos$
CREATE TRIGGER trg_logs_automaticos
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
    -- Solo ejecutar si cambió ultimo_login (indica nuevo login)
    -- NO procesar si son cambios de perfil (nombre, teléfono, etc.)
    IF (OLD.ultimo_login IS NULL AND NEW.ultimo_login IS NOT NULL) OR
       (OLD.ultimo_login IS NOT NULL AND NEW.ultimo_login IS NOT NULL AND 
        OLD.ultimo_login != NEW.ultimo_login) THEN
        
        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (
            NEW.id_usuario,
            'OTHER',
            'Login automático',
            CONCAT('Usuario ', NEW.email, ' inició sesión el ', 
                   DATE_FORMAT(NEW.ultimo_login, '%Y-%m-%d %H:%i:%s'))
        );
    END IF;
END$


-- ============================================================================
-- trg_after_delete_usuario
-- Descripción: Registra eliminación de usuarios
-- ============================================================================
DROP TRIGGER IF EXISTS trg_after_delete_usuario$$
CREATE TRIGGER trg_after_delete_usuario
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO logs (id_usuario, operacion, accion, descripcion)
    VALUES (
        OLD.id_usuario, 'DELETE', 'Usuario eliminado',
        CONCAT('Usuario eliminado: ', OLD.email, ' (ID: ', OLD.id_usuario, ') - ',
               'Estado anterior: ', IF(OLD.activo = 1, 'Activo', 'Inactivo'),
               ' - Registrado: ', DATE_FORMAT(OLD.fecha_registro, '%Y-%m-%d'))
    );
END$$

DELIMITER ;


-- ============================================================================
-- SECCIÓN 3: VISTAS
-- vw_usuarios_roles
-- Descripción: Usuarios con sus roles asignados
-- ============================================================================
CREATE OR REPLACE VIEW vw_usuarios_roles AS
SELECT 
    u.id_usuario,
    u.nombre,
    u.apellido,
    u.razon_social,
    u.email,
    u.telefono,
    u.email_verificado,
    u.ultimo_login,
    u.fecha_registro,
    u.activo,
    r.id_rol,
    r.nombre_rol,
    r.descripcion AS rol_descripcion,
    CASE 
        WHEN u.activo = 1 AND u.email_verificado = 1 THEN 'Verificado y Activo'
        WHEN u.activo = 1 AND u.email_verificado = 0 THEN 'Activo pero no verificado'
        WHEN u.activo = 0 THEN 'Inactivo'
    END AS estado_usuario
FROM usuarios u
INNER JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
INNER JOIN roles r ON ur.id_rol = r.id_rol
ORDER BY u.fecha_registro DESC, r.nombre_rol;


-- ============================================================================
-- vw_usuarios_activos
-- Descripción: Solo usuarios activos con email verificado
-- ============================================================================
CREATE OR REPLACE VIEW vw_usuarios_activos AS
SELECT 
    u.id_usuario,
    u.nombre,
    u.apellido,
    u.razon_social,
    u.email,
    u.telefono,
    u.ultimo_login,
    u.fecha_registro,
    GROUP_CONCAT(r.nombre_rol ORDER BY r.nombre_rol SEPARATOR ', ') AS roles,
    COUNT(DISTINCT d.id_direccion) AS total_direcciones,
    DATEDIFF(CURRENT_DATE, DATE(u.fecha_registro)) AS dias_registrado,
    CASE
        WHEN u.ultimo_login IS NULL THEN 'Nunca ha iniciado sesión'
        WHEN DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) = 0 THEN 'Activo hoy'
        WHEN DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) <= 7 THEN 'Activo esta semana'
        WHEN DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) <= 30 THEN 'Activo este mes'
        ELSE 'Inactivo hace más de un mes'
    END AS actividad_reciente
FROM usuarios u
INNER JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
INNER JOIN roles r ON ur.id_rol = r.id_rol
LEFT JOIN direcciones d ON u.id_usuario = d.id_usuario
WHERE u.activo = 1 AND u.email_verificado = 1
GROUP BY u.id_usuario, u.nombre, u.apellido, u.razon_social, 
         u.email, u.telefono, u.ultimo_login, u.fecha_registro
ORDER BY u.ultimo_login DESC;


-- ============================================================================
-- vw_direcciones_usuarios
-- Descripción: Direcciones con información del usuario
-- ============================================================================
CREATE OR REPLACE VIEW vw_direcciones_usuarios AS
SELECT 
    d.id_direccion,
    d.id_usuario,
    u.nombre,
    u.apellido,
    u.email,
    u.razon_social,
    d.calle,
    d.telefono AS telefono_direccion,
    u.telefono AS telefono_usuario,
    d.ciudad,
    d.provincia,
    d.codigo_postal,
    d.pais,
    d.tipo,
    CONCAT(d.calle, ', ', d.ciudad, 
           IF(d.provincia IS NOT NULL, CONCAT(' - ', d.provincia), '')) AS direccion_completa,
    CASE
        WHEN d.tipo = 'envio' THEN 'Envío'
        WHEN d.tipo = 'facturacion' THEN 'Facturación'
    END AS tipo_descripcion
FROM direcciones d
INNER JOIN usuarios u ON d.id_usuario = u.id_usuario
WHERE u.activo = 1
ORDER BY u.email, d.tipo, d.fecha_creacion DESC;


-- ============================================================================
-- vw_usuarios_con_cupones
-- Descripción: Usuarios con cupones usados y disponibles (colaborativa)
-- NOTA: Esta vista hace JOIN con tablas de Luis (Backend 3 - Marketing)
-- ============================================================================
CREATE OR REPLACE VIEW vw_usuarios_con_cupones AS
SELECT 
    u.id_usuario,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_completo,
    u.email,
    u.fecha_registro,
    -- Cupones usados
    COUNT(DISTINCT cu.id_uso) AS total_cupones_usados,
    COALESCE(SUM(CASE 
        WHEN c.tipo_descuento = 'porcentaje' 
        THEN (cu.monto_pedido * c.valor_descuento / 100)
        ELSE c.valor_descuento
    END), 0) AS total_ahorrado,
    MAX(cu.fecha_uso) AS ultimo_uso_cupon,
    -- Cupones activos disponibles
    (SELECT COUNT(*)
     FROM cupones
     WHERE activo = 1
       AND fecha_inicio <= NOW()
       AND fecha_fin >= NOW()
       AND (usos_maximos IS NULL OR usos_actuales < usos_maximos)
    ) AS cupones_disponibles,
    -- Estado del usuario
    CASE
        WHEN COUNT(DISTINCT cu.id_uso) = 0 THEN 'Sin cupones usados'
        WHEN COUNT(DISTINCT cu.id_uso) <= 2 THEN 'Uso bajo de cupones'
        WHEN COUNT(DISTINCT cu.id_uso) <= 5 THEN 'Uso medio de cupones'
        ELSE 'Usuario frecuente de cupones'
    END AS nivel_uso_cupones
FROM usuarios u
LEFT JOIN cupones_uso cu ON u.id_usuario = cu.id_usuario AND cu.estado = 'aplicado'
LEFT JOIN cupones c ON cu.id_cupon = c.id_cupon
WHERE u.activo = 1 AND u.email_verificado = 1
GROUP BY u.id_usuario, u.nombre, u.apellido, u.email, u.fecha_registro
ORDER BY total_ahorrado DESC, total_cupones_usados DESC;

SET FOREIGN_KEY_CHECKS = 1;