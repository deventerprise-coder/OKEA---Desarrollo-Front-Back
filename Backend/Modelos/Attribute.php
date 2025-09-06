<?php

namespace Okea\Backend\Modelos;

use PDO;

class Attribute {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $sql = "SELECT * FROM attributes";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "SELECT * FROM attributes WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO attributes (name, slug) 
                VALUES (:name, :slug)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':slug', $data['slug']);

        if ($stmt->execute()) {
            return $this->getById($this->conn->lastInsertId());
        }
        return false;
    }

    public function update($id, $data) {
        $fields = [];
        $params = [':id' => $id];

        if (isset($data['name'])) {
            $fields[] = "name = :name";
            $params[':name'] = $data['name'];
        }
        if (isset($data['slug'])) {
            $fields[] = "slug = :slug";
            $params[':slug'] = $data['slug'];
        }
        if (empty($fields)) return false;

        $sql = "UPDATE attributes SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete($id) {
        $sql = "DELETE FROM attributes WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function existsBySlug($slug, $excludeId = null) {
        $sql = "SELECT id FROM attributes WHERE slug = :slug";
        if ($excludeId) {
            $sql .= " AND id != :id";
        }

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':slug', $slug);
        if ($excludeId) {
            $stmt->bindValue(':id', (int)$excludeId, PDO::PARAM_INT);
        }
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }
}