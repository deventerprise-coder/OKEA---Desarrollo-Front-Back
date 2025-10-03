SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE DATABASE IF NOT EXISTS okea_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE okea_db;

-- ==========================
-- TABLAS PRINCIPALES
-- ==========================

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NULL,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Activo TINYINT(1) NOT NULL DEFAULT 1,
  INDEX idx_usuarios_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS roles (
  id_rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre_rol VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS usuarios_roles (
  id_usuario INT NOT NULL,
  id_rol INT NOT NULL,
  PRIMARY KEY (id_usuario, id_rol),
  CONSTRAINT fk_ur_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ur_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS direcciones (
  id_direccion INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  calle VARCHAR(255) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  provincia VARCHAR(100) NULL,
  codigo_postal VARCHAR(20) NULL,
  pais VARCHAR(100) NULL,
  CONSTRAINT fk_direcciones_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_dir_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Logs (auditoría de seguridad)
CREATE TABLE IF NOT EXISTS logs (
  id_log BIGINT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NULL,
  accion VARCHAR(255) NOT NULL,
  descripcion TEXT NULL,
  ip VARCHAR(45) NULL,
  fecha_log TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_logs_usuario (id_usuario),
  INDEX idx_logs_fecha (fecha_log)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==========================
-- TRIGGERS
-- ==========================
DELIMITER //

CREATE TRIGGER trg_usuarios_insert
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (NEW.id_usuario, 'INSERT', CONCAT('Se creó el usuario: ', NEW.email), '127.0.0.1');
END;
//

CREATE TRIGGER trg_usuarios_update
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (NEW.id_usuario, 'UPDATE', CONCAT('Se actualizó el usuario: ', NEW.email), '127.0.0.1');
END;
//

CREATE TRIGGER trg_usuarios_delete
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (OLD.id_usuario, 'DELETE', CONCAT('Se eliminó el usuario: ', OLD.email), '127.0.0.1');
END;
//

DELIMITER ;


-- ==========================
-- STORED PROCEDURES
-- ==========================
DELIMITER //

CREATE PROCEDURE sp_crear_usuario (
  IN p_nombre VARCHAR(100),
  IN p_apellido VARCHAR(100),
  IN p_email VARCHAR(100),
  IN p_password_hash VARCHAR(255),
  IN p_id_rol INT
)
BEGIN
  DECLARE new_user_id INT;
  INSERT INTO usuarios (nombre, apellido, email, password_hash)
  VALUES (p_nombre, p_apellido, p_email, p_password_hash);
  SET new_user_id = LAST_INSERT_ID();
  INSERT INTO usuarios_roles (id_usuario, id_rol) VALUES (new_user_id, p_id_rol);
END;
//

DELIMITER ;


-- ==========================
-- VISTAS
-- ==========================
CREATE OR REPLACE VIEW vista_usuarios_activos AS
SELECT u.id_usuario, u.nombre, u.apellido, u.email, u.Activo, r.nombre_rol
FROM usuarios u
JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
JOIN roles r ON ur.id_rol = r.id_rol
WHERE u.Activo = 1;


-- ==========================
-- DATOS INICIALES
-- ==========================
INSERT INTO roles (nombre_rol) VALUES ('admin'), ('cliente')
  ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol);

INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, Activo)
VALUES ('Admin', 'Principal', 'admin@okea.com', 'hash_admin', '999888777', 1)
ON DUPLICATE KEY UPDATE email=email;

-- Vincular Admin al rol admin
INSERT INTO usuarios_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.email='admin@okea.com' AND r.nombre_rol='admin'
ON DUPLICATE KEY UPDATE usuarios_roles.id_usuario = usuarios_roles.id_usuario;


