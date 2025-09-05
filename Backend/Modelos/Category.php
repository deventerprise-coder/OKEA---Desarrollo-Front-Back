<?php

namespace Okea\Backend\Modelos;

use PDO;

class Category {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($active_only = true) {
        $sql = "SELECT * FROM categories";
        if ($active_only) {
            $sql .= " WHERE is_active = 1";
        }
        $sql .= " ORDER BY level ASC, name ASC";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "SELECT * FROM categories WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function getByParent($parent_id) {
        $sql = "SELECT * FROM categories WHERE parent_id = :parent_id AND is_active = 1 ORDER BY name ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':parent_id', $parent_id);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO categories (name, slug, description, image_url, parent_id, level, is_active) 
                VALUES (:name, :slug, :description, :image_url, :parent_id, :level, :is_active)";
        
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':slug', $data['slug']);
        $stmt->bindValue(':description', $data['description'] ?? null);
        $stmt->bindValue(':image_url', $data['image_url'] ?? null);
        $stmt->bindValue(':parent_id', $data['parent_id'] ?? null, PDO::PARAM_INT);
        $stmt->bindValue(':level', $data['level'] ?? 0);
        $stmt->bindValue(':is_active', $data['is_active'] ?? 1);

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
        if (isset($data['description'])) {
            $fields[] = "description = :description";
            $params[':description'] = $data['description'];
        }
        if (isset($data['image_url'])) {
            $fields[] = "image_url = :image_url";
            $params[':image_url'] = $data['image_url'];
        }
        if (isset($data['parent_id'])) {
            $fields[] = "parent_id = :parent_id";
            $params[':parent_id'] = $data['parent_id'];
        }
        if (isset($data['level'])) {
            $fields[] = "level = :level";
            $params[':level'] = $data['level'];
        }
        if (isset($data['is_active'])) {
            $fields[] = "is_active = :is_active";
            $params[':is_active'] = $data['is_active'];
        }

        if (empty($fields)) {
            return false; // no hay nada que actualizar
        }

        $sql = "UPDATE categories SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($sql);

        return $stmt->execute($params);
    }

    public function delete($id) {
        $sql = "DELETE FROM categories WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function existsBySlug($slug, $excludeId = null) {
        $sql = "SELECT id FROM categories WHERE slug = :slug";
        if ($excludeId) {
            $sql .= " AND id != :id";
        }

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':slug', $slug);
        if ($excludeId) {
            $stmt->bindValue(':id', (int)$excludeId, \PDO::PARAM_INT);
        }
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

}
