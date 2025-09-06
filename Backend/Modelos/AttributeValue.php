<?php

namespace Okea\Backend\Modelos;

use PDO;

class AttributeValue {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($attribute_id = null) {
        $sql = "SELECT * FROM attribute_values";
        $params = [];

        if ($attribute_id) {
            $sql .= " WHERE attribute_id = :attribute_id";
            $params[':attribute_id'] = $attribute_id;
        }

        $stmt = $this->conn->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "SELECT * FROM attribute_values WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO attribute_values (attribute_id, value, slug) 
                VALUES (:attribute_id, :value, :slug)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':attribute_id', $data['attribute_id'], PDO::PARAM_INT);
        $stmt->bindValue(':value', $data['value']);
        $stmt->bindValue(':slug', $data['slug']);

        if ($stmt->execute()) {
            return $this->getById($this->conn->lastInsertId());
        }

        return false;
    }

    public function update($id, $data) {
        $fields = [];
        $params = [':id' => $id];

        if (isset($data['value'])) {
            $fields[] = "value = :value";
            $params[':value'] = $data['value'];
        }
        if (isset($data['slug'])) {
            $fields[] = "slug = :slug";
            $params[':slug'] = $data['slug'];
        }
        if (isset($data['attribute_id'])) {
            $fields[] = "attribute_id = :attribute_id";
            $params[':attribute_id'] = $data['attribute_id'];
        }

        if (empty($fields)) return false;

        $sql = "UPDATE attribute_values SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($sql);

        return $stmt->execute($params);
    }

    public function delete($id) {
        $sql = "DELETE FROM attribute_values WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function existsBySlug($attribute_id, $slug, $excludeId = null) {
        $sql = "SELECT id FROM attribute_values WHERE attribute_id = :attribute_id AND slug = :slug";
        if ($excludeId) $sql .= " AND id != :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':attribute_id', $attribute_id, PDO::PARAM_INT);
        $stmt->bindValue(':slug', $slug);
        if ($excludeId) $stmt->bindValue(':id', (int)$excludeId, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }
}
