USE okea_db;

-- ==========================
-- CREAR USUARIOS DE PRUEBA
-- ==========================
INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, Activo)
VALUES 
('Isaac', 'Pasapera', 'isaac@okea.com', 'hash_isaac', '999111222', 1),
('Lucía', 'Fernández', 'lucia@okea.com', 'hash_lucia', '988777666', 1),
('Pedro', 'Ramírez', 'pedro@okea.com', 'hash_pedro', '977555444', 0);

-- Asignar roles
INSERT INTO usuarios_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.email='isaac@okea.com' AND r.nombre_rol='cliente';

INSERT INTO usuarios_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.email='lucia@okea.com' AND r.nombre_rol='cliente';

INSERT INTO usuarios_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.email='pedro@okea.com' AND r.nombre_rol='cliente';

-- ==========================
-- DIRECCIONES DE PRUEBA
-- ==========================
INSERT INTO direcciones (id_usuario, calle, ciudad, provincia, codigo_postal, pais)
VALUES
(2, 'Av. Siempre Viva 742', 'Lima', 'Lima', '15001', 'Perú'),
(3, 'Jr. Comercio 123', 'Cusco', 'Cusco', '08001', 'Perú');

-- ==========================
-- PRUEBAS DE UPDATE
-- ==========================
UPDATE usuarios
SET telefono = '999000111'
WHERE email = 'isaac@okea.com';

-- ==========================
-- PRUEBAS DE DELETE
-- ==========================
DELETE FROM usuarios
WHERE email = 'pedro@okea.com';

-- ==========================
-- CONSULTAS DE VERIFICACIÓN
-- ==========================
-- Ver usuarios activos con sus roles
SELECT * FROM vista_usuarios_activos;

-- Ver logs de auditoría
SELECT * FROM logs;

-- Ver direcciones
SELECT * FROM direcciones;

-- ==========================
-- OPCIONAL: ROLLBACK DEL MÓDULO USUARIOS
-- ==========================
-- Solo usar en pruebas personales, no es parte del entregable oficial.
-- Este bloque limpia las tablas de usuarios y seguridad.

-- USE okea_db;
-- DROP TABLE IF EXISTS logs;
-- DROP TABLE IF EXISTS direcciones;
-- DROP TABLE IF EXISTS usuarios_roles;
-- DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS usuarios;

