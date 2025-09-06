<?php
namespace Okea\Backend\Modelos;

use PDO;

class ProductAttribute {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM product_attributes");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM product_attributes WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getByProduct($product_id) {
        $stmt = $this->conn->prepare("SELECT * FROM product_attributes WHERE product_id = :product_id");
        $stmt->execute([':product_id' => $product_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO product_attributes (product_id, attribute_id, attribute_value_id)
                VALUES (:product_id, :attribute_id, :attribute_value_id)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':product_id' => $data['product_id'],
            ':attribute_id' => $data['attribute_id'],
            ':attribute_value_id' => $data['attribute_value_id']
        ]);
        return $this->getById($this->conn->lastInsertId());
    }

    public function update($id, $data) {
        $fields = [];
        $params = [':id' => $id];

        if (isset($data['product_id'])) {
            $fields[] = "product_id = :product_id";
            $params[':product_id'] = $data['product_id'];
        }
        if (isset($data['attribute_id'])) {
            $fields[] = "attribute_id = :attribute_id";
            $params[':attribute_id'] = $data['attribute_id'];
        }
        if (isset($data['attribute_value_id'])) {
            $fields[] = "attribute_value_id = :attribute_value_id";
            $params[':attribute_value_id'] = $data['attribute_value_id'];
        }

        if (empty($fields)) return false;

        $sql = "UPDATE product_attributes SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM product_attributes WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    public function exists($product_id, $attribute_id, $excludeId = null) {
        $sql = "SELECT id FROM product_attributes 
                WHERE product_id = :product_id 
                AND attribute_id = :attribute_id";
        
        if ($excludeId) {
            $sql .= " AND id != :id";
        }

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':product_id', $product_id, PDO::PARAM_INT);
        $stmt->bindValue(':attribute_id', $attribute_id, PDO::PARAM_INT);

        if ($excludeId) {
            $stmt->bindValue(':id', $excludeId, PDO::PARAM_INT);
        }

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }
}
