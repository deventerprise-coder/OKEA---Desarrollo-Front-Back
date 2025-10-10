-- ============================================================================
-- BACKEND 1 - USUARIOS Y SEGURIDAD - SEMANA 03
-- Contenido: Stored Procedures, Triggers y Vistas
-- ============================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

USE ecommerce_db_okea;

-- ============================================================================
-- SECCIÓN 1: STORED PROCEDURES (4)
-- ============================================================================

DELIMITER //

-- ============================================================================
-- SP 1: sp_crear_usuario
-- Descripción: Crea un nuevo usuario con su rol asignado
-- Parámetros:
--   - Datos del usuario (nombre, apellido, email, password, telefono, razon_social)
--   - id_rol: Rol a asignar (por defecto: cliente)
-- Retorna: id_usuario creado o mensaje de error
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_crear_usuario//
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
    DECLARE v_email_existe INT;
    DECLARE v_rol_existe INT;
    
    -- Handler para errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 0;
        SET p_mensaje = 'Error al crear usuario. Transacción revertida.';
    END;
    
    START TRANSACTION;
    
    -- Validación 1: Email ya existe
    SELECT COUNT(*) INTO v_email_existe 
    FROM usuarios 
    WHERE email = p_email;
    
    IF v_email_existe > 0 THEN
        SET p_resultado = 0;
        SET p_mensaje = 'El email ya está registrado en el sistema.';
        ROLLBACK;
    ELSE
        -- Validación 2: Rol existe
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
                nombre, 
                apellido, 
                email, 
                password_hash, 
                telefono, 
                razon_social,
                email_verificado,
                activo
            ) VALUES (
                p_nombre,
                p_apellido,
                p_email,
                p_password_hash,
                p_telefono,
                p_razon_social,
                0,  -- Email no verificado por defecto
                1   -- Activo por defecto
            );
            
            SET v_usuario_id = LAST_INSERT_ID();
            
            -- Asignar rol
            INSERT INTO usuarios_roles (id_usuario, id_rol)
            VALUES (v_usuario_id, p_id_rol);
            
            -- Log de auditoría (sin IP, se registra desde PHP)
            INSERT INTO logs (id_usuario, operacion, accion, descripcion)
            VALUES (
                v_usuario_id,
                'INSERT',
                'Creación de usuario',
                CONCAT('Usuario creado: ', p_email, ' con rol ID: ', p_id_rol)
            );
            
            SET p_resultado = v_usuario_id;
            SET p_mensaje = CONCAT('Usuario creado exitosamente con ID: ', v_usuario_id);
            
            COMMIT;
        END IF;
    END IF;
END//


-- ============================================================================
-- SP 2: sp_actualizar_usuario
-- Descripción: Actualiza información de un usuario existente
-- Retorna: 1 si exitoso, 0 si falla
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_actualizar_usuario//
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
    DECLARE v_usuario_existe INT;
    DECLARE v_email_usuario VARCHAR(100);
    
    -- Handler para errores
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
            p_id_usuario,
            'UPDATE',
            'Actualización de usuario',
            CONCAT('Usuario actualizado: ', v_email_usuario)
        );
        
        SET p_resultado = 1;
        SET p_mensaje = 'Usuario actualizado exitosamente.';
        
        COMMIT;
    END IF;
END//


-- ============================================================================
-- SP 3: sp_asignar_rol_usuario
-- Descripción: Asigna un rol a un usuario (puede tener múltiples roles)
-- Parámetros: id_usuario, id_rol
-- Retorna: 1 si exitoso, 0 si falla
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_asignar_rol_usuario//
CREATE PROCEDURE sp_asignar_rol_usuario(
    IN p_id_usuario INT,
    IN p_id_rol INT,
    OUT p_resultado INT,
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_usuario_existe INT;
    DECLARE v_rol_existe INT;
    DECLARE v_asignacion_existe INT;
    DECLARE v_nombre_rol VARCHAR(50);
    DECLARE v_email_usuario VARCHAR(100);
    
    -- Handler para errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 0;
        SET p_mensaje = 'Error al asignar rol. Transacción revertida.';
    END;
    
    START TRANSACTION;
    
    -- Verificar que el usuario existe
    SELECT COUNT(*), MAX(email) INTO v_usuario_existe, v_email_usuario
    FROM usuarios 
    WHERE id_usuario = p_id_usuario;
    
    -- Verificar que el rol existe
    SELECT COUNT(*), MAX(nombre_rol) INTO v_rol_existe, v_nombre_rol
    FROM roles 
    WHERE id_rol = p_id_rol;
    
    -- Verificar si ya tiene ese rol asignado
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
        
        -- Log de auditoría
        INSERT INTO logs (id_usuario, operacion, accion, descripcion)
        VALUES (
            p_id_usuario,
            'INSERT',
            'Asignación de rol',
            CONCAT('Rol "', v_nombre_rol, '" asignado a usuario: ', v_email_usuario)
        );
        
        SET p_resultado = 1;
        SET p_mensaje = CONCAT('Rol "', v_nombre_rol, '" asignado exitosamente.');
        
        COMMIT;
    END IF;
END//


-- ============================================================================
-- SP 4: sp_autenticar_usuario
-- Descripción: Valida credenciales y actualiza ultimo_login
-- Parámetros: email del usuario
-- Retorna: Datos del usuario si existe y está activo, NULL si no
-- NOTA: La validación del password se hace en PHP con password_verify()
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_autenticar_usuario//
CREATE PROCEDURE sp_autenticar_usuario(
    IN p_email VARCHAR(100),
    OUT p_id_usuario INT,
    OUT p_password_hash VARCHAR(255),
    OUT p_activo TINYINT(1),
    OUT p_email_verificado TINYINT(1),
    OUT p_mensaje VARCHAR(255)
)
BEGIN
    DECLARE v_usuario_existe INT;
    
    -- Verificar si el usuario existe
    SELECT COUNT(*) INTO v_usuario_existe
    FROM usuarios
    WHERE email = p_email;
    
    IF v_usuario_existe = 0 THEN
        SET p_id_usuario = NULL;
        SET p_password_hash = NULL;
        SET p_activo = NULL;
        SET p_email_verificado = NULL;
        SET p_mensaje = 'Usuario no encontrado.';
    ELSE
        -- Obtener datos del usuario
        SELECT 
            id_usuario,
            password_hash,
            activo,
            email_verificado
        INTO 
            p_id_usuario,
            p_password_hash,
            p_activo,
            p_email_verificado
        FROM usuarios
        WHERE email = p_email;
        
        -- Verificar si está activo
        IF p_activo = 0 THEN
            SET p_mensaje = 'Usuario inactivo. Contacte al administrador.';
        ELSEIF p_email_verificado = 0 THEN
            SET p_mensaje = 'Email no verificado. Revise su correo.';
        ELSE
            -- Actualizar ultimo_login (se hace DESPUÉS de validar password en PHP)
            UPDATE usuarios
            SET ultimo_login = CURRENT_TIMESTAMP
            WHERE id_usuario = p_id_usuario;
            
            -- Log de auditoría
            INSERT INTO logs (id_usuario, operacion, accion, descripcion)
            VALUES (
                p_id_usuario,
                'OTHER',
                'Login exitoso',
                CONCAT('Usuario autenticado: ', p_email)
            );
            
            SET p_mensaje = 'Usuario autenticado correctamente.';
        END IF;
    END IF;
END//

DELIMITER ;


-- ============================================================================
-- SECCIÓN 2: TRIGGERS (4)
-- ============================================================================

DELIMITER //

-- ============================================================================
-- TRIGGER 1: before_insert_usuario
-- Descripción: Validaciones antes de insertar un nuevo usuario
-- Ejecuta: BEFORE INSERT en usuarios
-- ============================================================================
DROP TRIGGER IF EXISTS before_insert_usuario//
CREATE TRIGGER before_insert_usuario
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
    -- Validación 1: Email no puede estar vacío
    IF NEW.email IS NULL OR TRIM(NEW.email) = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El email no puede estar vacío';
    END IF;
    
    -- Validación 2: Email debe tener formato válido (básico)
    IF NEW.email NOT LIKE '%_@__%.__%' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El email no tiene un formato válido';
    END IF;
    
    -- Validación 3: Password hash debe tener al menos 60 caracteres (bcrypt)
    IF LENGTH(NEW.password_hash) < 60 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El password_hash debe ser un hash válido (mínimo 60 caracteres)';
    END IF;
    
    -- Validación 4: Nombre y apellido no vacíos
    IF TRIM(NEW.nombre) = '' OR TRIM(NEW.apellido) = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Nombre y apellido son obligatorios';
    END IF;
    
    -- Normalizar email a minúsculas
    SET NEW.email = LOWER(TRIM(NEW.email));
    
    -- Normalizar nombre y apellido (primera letra mayúscula)
    SET NEW.nombre = CONCAT(UPPER(SUBSTRING(NEW.nombre, 1, 1)), LOWER(SUBSTRING(NEW.nombre, 2)));
    SET NEW.apellido = CONCAT(UPPER(SUBSTRING(NEW.apellido, 1, 1)), LOWER(SUBSTRING(NEW.apellido, 2)));
END//


-- ============================================================================
-- TRIGGER 2: after_insert_usuario
-- Descripción: Registra en logs la creación de un usuario
-- Ejecuta: AFTER INSERT en usuarios
-- NOTA: La IP se debe registrar desde PHP, no desde el trigger
-- ============================================================================
DROP TRIGGER IF EXISTS after_insert_usuario//
CREATE TRIGGER after_insert_usuario
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    -- Registrar en logs (sin IP, se agrega desde PHP)
    INSERT INTO logs (
        id_usuario, 
        operacion, 
        accion, 
        descripcion
    ) VALUES (
        NEW.id_usuario,
        'INSERT',
        'Usuario creado',
        CONCAT('Nuevo usuario registrado: ', NEW.email, ' - Verificado: ', NEW.email_verificado)
    );
END//


-- ============================================================================
-- TRIGGER 3: after_update_usuario
-- Descripción: Registra en logs las actualizaciones de usuarios
-- Ejecuta: AFTER UPDATE en usuarios
-- ============================================================================
DROP TRIGGER IF EXISTS after_update_usuario//
CREATE TRIGGER after_update_usuario
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
    DECLARE v_cambios TEXT DEFAULT '';
    
    -- Detectar qué campos cambiaron
    IF OLD.nombre != NEW.nombre THEN
        SET v_cambios = CONCAT(v_cambios, 'Nombre: ', OLD.nombre, ' → ', NEW.nombre, '; ');
    END IF;
    
    IF OLD.apellido != NEW.apellido THEN
        SET v_cambios = CONCAT(v_cambios, 'Apellido: ', OLD.apellido, ' → ', NEW.apellido, '; ');
    END IF;
    
    IF OLD.telefono != NEW.telefono THEN
        SET v_cambios = CONCAT(v_cambios, 'Teléfono modificado; ');
    END IF;
    
    IF OLD.activo != NEW.activo THEN
        SET v_cambios = CONCAT(v_cambios, 'Estado: ', 
            IF(OLD.activo = 1, 'Activo', 'Inactivo'), ' → ', 
            IF(NEW.activo = 1, 'Activo', 'Inactivo'), '; ');
    END IF;
    
    IF OLD.email_verificado != NEW.email_verificado THEN
        SET v_cambios = CONCAT(v_cambios, 'Email verificado: ', 
            IF(OLD.email_verificado = 1, 'Sí', 'No'), ' → ', 
            IF(NEW.email_verificado = 1, 'Sí', 'No'), '; ');
    END IF;
    
    -- Solo registrar si hubo cambios significativos
    IF LENGTH(v_cambios) > 0 THEN
        INSERT INTO logs (
            id_usuario,
            operacion,
            accion,
            descripcion
        ) VALUES (
            NEW.id_usuario,
            'UPDATE',
            'Usuario actualizado',
            CONCAT('Cambios en usuario ', NEW.email, ': ', v_cambios)
        );
    END IF;
END//


-- ============================================================================
-- TRIGGER 4: after_delete_usuario
-- Descripción: Registra en logs la eliminación de usuarios
-- Ejecuta: AFTER DELETE en usuarios
-- ============================================================================
DROP TRIGGER IF EXISTS after_delete_usuario//
CREATE TRIGGER after_delete_usuario
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
    -- Registrar eliminación (id_usuario será NULL por el SET NULL en FK de logs)
    INSERT INTO logs (
        id_usuario,
        operacion,
        accion,
        descripcion
    ) VALUES (
        OLD.id_usuario,
        'DELETE',
        'Usuario eliminado',
        CONCAT('Usuario eliminado: ', OLD.email, ' (ID: ', OLD.id_usuario, ') - ',
               'Estado anterior: ', IF(OLD.activo = 1, 'Activo', 'Inactivo'))
    );
END//

DELIMITER ;


-- ============================================================================
-- SECCIÓN 3: VISTAS (3)
-- ============================================================================

-- ============================================================================
-- VISTA 1: vw_usuarios_roles
-- Descripción: Lista todos los usuarios con sus roles asignados
-- Uso: SELECT * FROM vw_usuarios_roles WHERE email = 'isaac@okea.com';
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
    ur.fecha_asignacion AS fecha_asignacion_rol,
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
-- VISTA 2: vw_usuarios_activos
-- Descripción: Solo usuarios activos con email verificado y sus roles
-- Uso: SELECT * FROM vw_usuarios_activos WHERE nombre_rol = 'cliente';
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
    COUNT(d.id_direccion) AS total_direcciones,
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
WHERE u.activo = 1 
  AND u.email_verificado = 1
GROUP BY 
    u.id_usuario, 
    u.nombre, 
    u.apellido, 
    u.razon_social, 
    u.email, 
    u.telefono, 
    u.ultimo_login, 
    u.fecha_registro
ORDER BY u.ultimo_login DESC;


-- ============================================================================
-- VISTA 3: vw_direcciones_usuarios
-- Descripción: Direcciones con información del usuario asociado
-- Uso: SELECT * FROM vw_direcciones_usuarios WHERE tipo = 'envio';
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
    d.es_predeterminada,
    d.fecha_creacion,
    CONCAT(d.calle, ', ', d.ciudad, ' - ', d.provincia) AS direccion_completa,
    CASE 
        WHEN d.es_predeterminada = 1 THEN 'Dirección principal'
        ELSE 'Dirección secundaria'
    END AS tipo_direccion,
    CASE
        WHEN d.tipo = 'envio' THEN ' Envío'
        WHEN d.tipo = 'facturacion' THEN ' Facturación'
    END AS icono_tipo
FROM direcciones d
INNER JOIN usuarios u ON d.id_usuario = u.id_usuario
WHERE u.activo = 1
ORDER BY u.email, d.es_predeterminada DESC, d.fecha_creacion DESC;
