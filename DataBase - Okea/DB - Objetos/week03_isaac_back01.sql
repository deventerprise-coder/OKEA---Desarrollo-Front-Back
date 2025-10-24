-- ============================================================================
-- PROYECTO: E-COMMERCE OKEA
-- BACKEND 1 - USUARIOS Y SEGURIDAD
-- DESARROLLADOR: Isaac Pasapera
-- SEMANA: 03
-- FECHA: 2024-11
-- ============================================================================
-- CONTENIDO:
--   - 4 Stored Procedures originales (mejorados)
--   - 5 Triggers (incluyendo trg_logs_automaticos)
--   - 3 Vistas originales (mejoradas)
--   - 1 Stored Procedure nuevo (sp_usuarios_mas_activos)
--   - 1 Vista nueva (vw_usuarios_con_cupones)
-- ============================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

USE ecommerce_db_okea;

-- ============================================================================
-- SECCIÓN 1: STORED PROCEDURES
-- ============================================================================

DELIMITER //

-- ============================================================================
-- NOMBRE: sp_crear_usuario
-- TIPO: Stored Procedure
-- DESCRIPCIÓN: Crea un nuevo usuario en el sistema y le asigna un rol
-- 
-- PARÁMETROS:
--   IN  p_nombre VARCHAR(100)          - Nombre del usuario
--   IN  p_apellido VARCHAR(100)        - Apellido del usuario
--   IN  p_email VARCHAR(100)           - Email único del usuario
--   IN  p_password_hash VARCHAR(255)   - Hash bcrypt del password
--   IN  p_telefono VARCHAR(20)         - Teléfono de contacto (opcional)
--   IN  p_razon_social VARCHAR(255)    - Razón social para empresas (opcional)
--   IN  p_id_rol INT                   - ID del rol a asignar
--   OUT p_resultado INT                - ID del usuario creado o 0 si falla
--   OUT p_mensaje VARCHAR(255)         - Mensaje de resultado
--
-- RETORNA:
--   - p_resultado > 0: ID del usuario creado exitosamente
--   - p_resultado = 0: Error en la operación
--
-- VALIDACIONES:
--   1. Email no debe existir previamente
--   2. El rol especificado debe existir
--   3. Transacción completa o rollback
--
-- EJEMPLO DE USO:
--   CALL sp_crear_usuario('Juan', 'Pérez', 'juan@okea.com', 
--        '$2y$10$...', '999888777', NULL, 2, @resultado, @mensaje);
--   SELECT @resultado, @mensaje;
--
-- DEPENDENCIAS:
--   - Tabla: usuarios, roles, usuarios_roles, logs
--
-- AUTOR: Isaac Pasapera
-- VERSIÓN: 1.1
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
    DECLARE v_email_existe INT DEFAULT 0;
    DECLARE v_rol_existe INT DEFAULT 0;
    
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
            
            -- Log de auditoría (IP se registra desde PHP)
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
-- NOMBRE: sp_actualizar_usuario
-- TIPO: Stored Procedure
-- DESCRIPCIÓN: Actualiza información de un usuario existente
-- 
-- PARÁMETROS:
--   IN  p_id_usuario INT           - ID del usuario a actualizar
--   IN  p_nombre VARCHAR(100)      - Nuevo nombre (NULL = mantener actual)
--   IN  p_apellido VARCHAR(100)    - Nuevo apellido (NULL = mantener actual)
--   IN  p_telefono VARCHAR(20)     - Nuevo teléfono (NULL = mantener actual)
--   IN  p_razon_social VARCHAR(255)- Nueva razón social (NULL = mantener actual)
--   IN  p_activo TINYINT(1)        - Nuevo estado (NULL = mantener actual)
--   OUT p_resultado INT            - 1 si exitoso, 0 si falla
--   OUT p_mensaje VARCHAR(255)     - Mensaje de resultado
--
-- RETORNA:
--   - p_resultado = 1: Actualización exitosa
--   - p_resultado = 0: Error en la operación
--
-- VALIDACIONES:
--   1. El usuario debe existir
--   2. Transacción completa o rollback
--
-- EJEMPLO DE USO:
--   CALL sp_actualizar_usuario(5, 'Juan Carlos', NULL, '999111222', 
--        NULL, 1, @resultado, @mensaje);
--   SELECT @resultado, @mensaje;
--
-- DEPENDENCIAS:
--   - Tabla: usuarios, logs
--
-- AUTOR: Isaac Pasapera
-- VERSIÓN: 1.1
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
    DECLARE v_usuario_existe INT DEFAULT 0;
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
-- NOMBRE: sp_asignar_rol_usuario
-- TIPO: Stored Procedure
-- DESCRIPCIÓN: Asigna un rol a un usuario (soporta múltiples roles)
-- 
-- PARÁMETROS:
--   IN  p_id_usuario INT       - ID del usuario
--   IN  p_id_rol INT           - ID del rol a asignar
--   OUT p_resultado INT        - 1 si exitoso, 0 si falla
--   OUT p_mensaje VARCHAR(255) - Mensaje de resultado
--
-- RETORNA:
--   - p_resultado = 1: Rol asignado exitosamente
--   - p_resultado = 0: Error en la operación
--
-- VALIDACIONES:
--   1. El usuario debe existir
--   2. El rol debe existir
--   3. El usuario no debe tener ya ese rol asignado
--
-- EJEMPLO DE USO:
--   CALL sp_asignar_rol_usuario(5, 3, @resultado, @mensaje);
--   SELECT @resultado, @mensaje;
--
-- DEPENDENCIAS:
--   - Tabla: usuarios, roles, usuarios_roles, logs
--
-- AUTOR: Isaac Pasapera
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_asignar_rol_usuario//
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
-- NOMBRE: sp_autenticar_usuario
-- TIPO: Stored Procedure
-- DESCRIPCIÓN: Valida credenciales de usuario y actualiza ultimo_login
-- 
-- PARÁMETROS:
--   IN  p_email VARCHAR(100)          - Email del usuario
--   OUT p_id_usuario INT              - ID del usuario si existe
--   OUT p_password_hash VARCHAR(255)  - Hash del password para verificar en PHP
--   OUT p_activo TINYINT(1)           - Estado del usuario
--   OUT p_email_verificado TINYINT(1) - Estado de verificación de email
--   OUT p_mensaje VARCHAR(255)        - Mensaje de resultado
--
-- RETORNA:
--   - p_id_usuario > 0: Usuario encontrado (validar password en PHP)
--   - p_id_usuario = NULL: Usuario no encontrado
--
-- VALIDACIONES:
--   1. Usuario debe existir
--   2. Usuario debe estar activo
--   3. Email debe estar verificado
--
-- NOTA IMPORTANTE:
--   La validación del password se hace en PHP con password_verify()
--   Este SP solo retorna el hash para validar externamente
--
-- EJEMPLO DE USO:
--   CALL sp_autenticar_usuario('isaac@okea.com', 
--        @id, @hash, @activo, @verificado, @mensaje);
--   SELECT @id, @hash, @activo, @verificado, @mensaje;
--
-- DEPENDENCIAS:
--   - Tabla: usuarios, logs
--
-- AUTOR: Isaac Pasapera
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
    DECLARE v_usuario_existe INT DEFAULT 0;
    
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


-- ============================================================================
-- NOMBRE: sp_usuarios_mas_activos
-- TIPO: Stored Procedure
-- DESCRIPCIÓN: Genera reporte de usuarios más activos según ultimo_login
-- 
-- PARÁMETROS:
--   IN  p_limite INT           - Cantidad de usuarios a retornar (default: 10)
--   IN  p_dias_rango INT       - Rango de días a considerar (default: 30)
--
-- RETORNA:
--   - Listado de usuarios ordenados por actividad reciente
--
-- EJEMPLO DE USO:
--   CALL sp_usuarios_mas_activos(20, 60);  -- Top 20 usuarios activos últimos 60 días
--   CALL sp_usuarios_mas_activos(10, 30);  -- Top 10 usuarios activos último mes
--
-- DEPENDENCIAS:
--   - Tabla: usuarios, usuarios_roles, roles
--
-- AUTOR: Isaac Pasapera
-- VERSIÓN: 1.0
-- ============================================================================
DROP PROCEDURE IF EXISTS sp_usuarios_mas_activos//
CREATE PROCEDURE sp_usuarios_mas_activos(
    IN p_limite INT,
    IN p_dias_rango INT
)
BEGIN
    -- Valores por defecto
    SET p_limite = COALESCE(p_limite, 10);
    SET p_dias_rango = COALESCE(p_dias_rango, 30);
    
    -- Consulta de usuarios más activos
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
        -- Score de actividad (más bajo = más activo)
        COALESCE(DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)), 9999) AS score_actividad
    FROM usuarios u
    INNER JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
    INNER JOIN roles r ON ur.id_rol = r.id_rol
    WHERE u.activo = 1 
      AND u.email_verificado = 1
      AND (
          u.ultimo_login IS NULL 
          OR DATEDIFF(CURRENT_DATE, DATE(u.ultimo_login)) <= p_dias_rango
      )
    GROUP BY 
        u.id_usuario, 
        u.nombre, 
        u.apellido, 
        u.email, 
        u.razon_social,
        u.telefono,
        u.ultimo_login, 
        u.fecha_registro
    ORDER BY 
        score_actividad ASC,  -- Usuarios con login más reciente primero
        u.fecha_registro DESC
    LIMIT p_limite;
END//

DELIMITER ;


-- ============================================================================
-- SECCIÓN 2: TRIGGERS
-- ============================================================================

DELIMITER //

-- ============================================================================
-- NOMBRE: trg_before_insert_usuario
-- TIPO: Trigger
-- EVENTO: BEFORE INSERT
-- TABLA: usuarios
-- DESCRIPCIÓN: Validaciones y normalizaciones antes de insertar un usuario
-- 
-- VALIDACIONES:
--   1. Email no puede estar vacío
--   2. Email debe tener formato válido básico
--   3. Password hash debe tener mínimo 60 caracteres (bcrypt estándar)
--   4. Nombre y apellido no pueden estar vacíos
--
-- NORMALIZACIONES:
--   - Email a minúsculas
--   - Nombre y apellido con primera letra mayúscula
--
-- AUTOR: Isaac Pasapera
-- VERSIÓN: 1.1
-- ============================================================================
DROP TRIGGER IF EXISTS trg_before_insert_usuario//
CREATE TRIGGER trg_before_insert_usuario
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
-- NOMBRE: trg_after_insert_usuario
-- TIPO: Trigger
-- EVENTO: AFTER INSERT
-- TABLA: usuarios
-- DESCRIPCIÓN: Registra en logs la creación de un nuevo usuario
-- 
-- NOTA: La IP se debe registrar desde PHP, no desde el trigger
--
-- AUTOR: Isaac Pasapera
-- VERSIÓN: 1.1
-- ============================================================================
DROP TRIGGER IF EXISTS trg_after_insert_usuario//
CREATE TRIGGER trg_after_insert_usuario
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    -- Registrar en logs (IP se agrega desde PHP)
    INSERT INTO logs (
        id_usuario, 
        operacion, 
        accion, 
        descripcion
    ) VALUES (
        NEW.id_usuario,
        'INSERT',
        'Usuario creado',
        CONCAT('Nuevo usuario registrado: ', NEW.email, 
               ' - Activo: ', NEW.activo,
               ' - Verificado: ', NEW.email_verificado)
    );
END//


-- ============================================================================
-- NOMBRE: trg_after_update_usuario
-- TIPO: Trigger
-- EVENTO: AFTER UPDATE
-- TABLA: usuarios
-- DESCRIPCIÓN: Registra cambios en usuarios y detecta logins automáticos
-- 
-- FUNCIONALIDAD DUAL:
--   1. Detecta y registra cambios de perfil (nombre, teléfono, etc.)
--   2. Detecta y registra logins automáticos (cambio en ultimo_login)
--      Esto cumple con la funcionalidad de trg_logs_automaticos
--
-- AUTOR: Isaac Pasapera
-- ============================================================================
DROP TRIGGER IF EXISTS trg_after_update_usuario//
CREATE TRIGGER trg_after_update_usuario
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
    DECLARE v_cambios TEXT DEFAULT '';
    DECLARE v_hay_cambios_perfil BOOLEAN DEFAULT FALSE;
    DECLARE v_hay_login BOOLEAN DEFAULT FALSE;
    
    -- ========================================================================
    -- PARTE 1: DETECTAR CAMBIOS DE PERFIL
    -- ========================================================================
    IF OLD.nombre != NEW.nombre THEN
        SET v_cambios = CONCAT(v_cambios, 'Nombre: ', OLD.nombre, ' → ', NEW.nombre, '; ');
        SET v_hay_cambios_perfil = TRUE;
    END IF;
    
    IF OLD.apellido != NEW.apellido THEN
        SET v_cambios = CONCAT(v_cambios, 'Apellido: ', OLD.apellido, ' → ', NEW.apellido, '; ');
        SET v_hay_cambios_perfil = TRUE;
    END IF;
    
    IF COALESCE(OLD.telefono, '') != COALESCE(NEW.telefono, '') THEN
        SET v_cambios = CONCAT(v_cambios, 'Teléfono modificado; ');
        SET v_hay_cambios_perfil = TRUE;
    END IF;
    
    IF OLD.activo != NEW.activo THEN
        SET v_cambios = CONCAT(v_cambios, 'Estado: ', 
            IF(OLD.activo = 1, 'Activo', 'Inactivo'), ' → ', 
            IF(NEW.activo = 1, 'Activo', 'Inactivo'), '; ');
        SET v_hay_cambios_perfil = TRUE;
    END IF;
    
    IF OLD.email_verificado != NEW.email_verificado THEN
        SET v_cambios = CONCAT(v_cambios, 'Email verificado: ', 
            IF(OLD.email_verificado = 1, 'Sí', 'No'), ' → ', 
            IF(NEW.email_verificado = 1, 'Sí', 'No'), '; ');
        SET v_hay_cambios_perfil = TRUE;
    END IF;
    
    -- Registrar cambios de perfil
    IF v_hay_cambios_perfil THEN
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
    
    -- ========================================================================
    -- PARTE 2: DETECTAR LOGIN AUTOMÁTICO (trg_logs_automaticos)
    -- ========================================================================
    -- Detectar si cambió ultimo_login (indica nuevo inicio de sesión)
    IF (OLD.ultimo_login IS NULL AND NEW.ultimo_login IS NOT NULL) OR
       (OLD.ultimo_login IS NOT NULL AND NEW.ultimo_login IS NOT NULL AND 
        OLD.ultimo_login != NEW.ultimo_login) THEN
        SET v_hay_login = TRUE;
    END IF;
    
    -- Registrar login automático
    IF v_hay_login THEN
        INSERT INTO logs (
            id_usuario,
            operacion,
            accion,
            descripcion
        ) VALUES (
            NEW.id_usuario,
            'OTHER',
            'Login automático registrado',
            CONCAT('Usuario ', NEW.email, ' inició sesión el ', 
                   DATE_FORMAT(NEW.ultimo_login, '%Y-%m-%d %H:%i:%s'))
        );
    END IF;
END//


-- ============================================================================
-- NOMBRE: trg_after_delete_usuario
-- TIPO: Trigger
-- EVENTO: AFTER DELETE
-- TABLA: usuarios
-- DESCRIPCIÓN: Registra en logs la eliminación de usuarios
-- 
-- NOTA: Por el CASCADE en FK, también se eliminan automáticamente:
--       - Registros en usuarios_roles
--       - Registros en direcciones
--
-- AUTOR: Isaac Pasapera
-- VERSIÓN: 1.1
-- ============================================================================
DROP TRIGGER IF EXISTS trg_after_delete_usuario//
CREATE TRIGGER trg_after_delete_usuario
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
    -- Registrar eliminación
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
               'Estado anterior: ', IF(OLD.activo = 1, 'Activo', 'Inactivo'),
               ' - Registrado: ', DATE_FORMAT(OLD.fecha_registro, '%Y-%m-%d'))
    );
END//


-- ============================================================================
-- NOMBRE: trg_logs_automaticos
-- TIPO: Trigger (CONSOLIDADO en trg_after_update_usuario)
-- DESCRIPCIÓN: Este trigger está integrado dentro de trg_