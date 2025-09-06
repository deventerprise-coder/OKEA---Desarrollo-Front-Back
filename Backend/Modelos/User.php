<?php
namespace Okea\Backend\Modelos;

use PDO;

class User {
    public function __construct(private PDO $db) {}
    public function findByEmail(string $email): ?array {
        $st = $this->db->prepare("SELECT * FROM usuarios WHERE email = ?");
        $st->execute([$email]);
        $u = $st->fetch(PDO::FETCH_ASSOC);
        return $u ?: null;
    }
    public function create(string $nombre, string $email, string $hash): int {
        $st = $this->db->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
        $st->execute([$nombre, $email, $hash]);
        return (int)$this->db->lastInsertId();
    }
    public function assignDefaultRole(int $userId): void {
        // role 'cliente'
        $roleId = (int)$this->db->query("SELECT id FROM roles WHERE nombre='cliente'")->fetchColumn();
        $st = $this->db->prepare("INSERT IGNORE INTO usuarios_roles (usuario_id, rol_id) VALUES (?, ?)");
        $st->execute([$userId, $roleId]);
    }
    public function getRoles(int $userId): array {
        $st = $this->db->prepare("
          SELECT r.nombre FROM roles r
          JOIN usuarios_roles ur ON ur.rol_id = r.id
          WHERE ur.usuario_id = ?");
        $st->execute([$userId]);
        return array_column($st->fetchAll(PDO::FETCH_ASSOC), 'nombre');
    }
}