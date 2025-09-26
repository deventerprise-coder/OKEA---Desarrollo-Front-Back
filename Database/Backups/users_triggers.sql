DELIMITER //

-- ========================================
-- TRIGGERS PARA USUARIOS (WEB)
-- ========================================

--  INSERT en usuarios
CREATE TRIGGER trg_usuarios_insert
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (NEW.id_usuario, 'INSERT', CONCAT('Se creó el usuario: ', NEW.email), '127.0.0.1');
END;
//

-- UPDATE en usuarios
CREATE TRIGGER trg_usuarios_update
AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (NEW.id_usuario, 'UPDATE', CONCAT('Se actualizó el usuario: ', NEW.email), '127.0.0.1');
END;
//

-- DELETE en usuarios
CREATE TRIGGER trg_usuarios_delete
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (OLD.id_usuario, 'DELETE', CONCAT('Se eliminó el usuario: ', OLD.email), '127.0.0.1');
END;
//

-- ========================================
-- TRIGGERS PARA USUARIOS_ADMIN (ADMIN)
-- ========================================

--  INSERT en usuarios_admin
CREATE TRIGGER trg_usuarios_admin_insert
AFTER INSERT ON usuarios_admin
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (NEW.id_usuario, 'INSERT_ADMIN', CONCAT('Se creó el usuario admin: ', NEW.email), '127.0.0.1');
END;
//

-- UPDATE en usuarios_admin
CREATE TRIGGER trg_usuarios_admin_update
AFTER UPDATE ON usuarios_admin
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (NEW.id_usuario, 'UPDATE_ADMIN', CONCAT('Se actualizó el usuario admin: ', NEW.email), '127.0.0.1');
END;
//

-- DELETE en usuarios_admin
CREATE TRIGGER trg_usuarios_admin_delete
AFTER DELETE ON usuarios_admin
FOR EACH ROW
BEGIN
  INSERT INTO logs (id_usuario, accion, descripcion, ip)
  VALUES (OLD.id_usuario, 'DELETE_ADMIN', CONCAT('Se eliminó el usuario admin: ', OLD.email), '127.0.0.1');
END;
//

DELIMITER ;
