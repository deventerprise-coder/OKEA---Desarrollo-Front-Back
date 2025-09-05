<?php

namespace Okea\Backend\Modelos;

use PDO;

class Product {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($active_only = true) {
        $sql = "SELECT * FROM products WHERE product_type IN ('variant', 'simple') ";
        if ($active_only) {
            $sql .= " AND is_active = 1";
        }
        $sql .= " ORDER BY name ASC";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "SELECT * FROM products WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getVariants($parent_id) {
        $sql = "SELECT * FROM products WHERE parent_id = :parent_id AND product_type = 'variant'";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':parent_id', $parent_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getSimpleYParentProducts($active_only = true) {
        $sql = "SELECT * FROM products WHERE product_type IN ('simple', 'parent')";
        if ($active_only) {
            $sql .= " AND is_active = 1";
        }
        $sql .= " ORDER BY name ASC";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO products 
            (parent_id, product_type, name, slug, description, category_id, brand, model, sku, barcode, price, compare_price, cost_price, stock_quantity, manage_stock, stock_status, is_active, is_featured, featured_image, image_gallery) 
            VALUES 
            (:parent_id, :product_type, :name, :slug, :description, :category_id, :brand, :model, :sku, :barcode, :price, :compare_price, :cost_price, :stock_quantity, :manage_stock, :stock_status, :is_active, :is_featured, :featured_image, :image_gallery)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':parent_id', $data['parent_id'] ?? null, PDO::PARAM_INT);
        $stmt->bindValue(':product_type', $data['product_type'] ?? 'simple');
        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':slug', $data['slug']);
        $stmt->bindValue(':description', $data['description'] ?? null);
        $stmt->bindValue(':category_id', $data['category_id']);
        $stmt->bindValue(':brand', $data['brand'] ?? null);
        $stmt->bindValue(':model', $data['model'] ?? null);
        $stmt->bindValue(':sku', $data['sku']);
        $stmt->bindValue(':barcode', $data['barcode'] ?? null);
        $stmt->bindValue(':price', $data['price'] ?? null);
        $stmt->bindValue(':compare_price', $data['compare_price'] ?? null);
        $stmt->bindValue(':cost_price', $data['cost_price'] ?? null);
        $stmt->bindValue(':stock_quantity', $data['stock_quantity'] ?? 0);
        $stmt->bindValue(':manage_stock', $data['manage_stock'] ?? true, PDO::PARAM_BOOL);
        $stmt->bindValue(':stock_status', $data['stock_status'] ?? 'instock');
        $stmt->bindValue(':is_active', $data['is_active'] ?? true, PDO::PARAM_BOOL);
        $stmt->bindValue(':is_featured', $data['is_featured'] ?? false, PDO::PARAM_BOOL);
        $stmt->bindValue(':featured_image', $data['featured_image'] ?? null);
        $stmt->bindValue(':image_gallery', isset($data['image_gallery']) ? json_encode($data['image_gallery'], JSON_UNESCAPED_UNICODE) : null);

        if ($stmt->execute()) {
            return $this->getById($this->conn->lastInsertId());
        }

        return false;
    }

    public function update($id, $data) {
        $fields = [];
        $params = [':id' => $id];

        if (array_key_exists('parent_id', $data)) {
            $fields[] = "parent_id = :parent_id";
            $params[':parent_id'] = $data['parent_id'];
        }
        if (array_key_exists('product_type', $data)) {
            $fields[] = "product_type = :product_type";
            $params[':product_type'] = $data['product_type'];
        }
        if (array_key_exists('name', $data)) {
            $fields[] = "name = :name";
            $params[':name'] = $data['name'];
        }
        if (array_key_exists('slug', $data)) {
            $fields[] = "slug = :slug";
            $params[':slug'] = $data['slug'];
        }
        if (array_key_exists('description', $data)) {
            $fields[] = "description = :description";
            $params[':description'] = $data['description'];
        }
        if (array_key_exists('category_id', $data)) {
            $fields[] = "category_id = :category_id";
            $params[':category_id'] = $data['category_id'];
        }
        if (array_key_exists('brand', $data)) {
            $fields[] = "brand = :brand";
            $params[':brand'] = $data['brand'];
        }
        if (array_key_exists('model', $data)) {
            $fields[] = "model = :model";
            $params[':model'] = $data['model'];
        }
        if (array_key_exists('sku', $data)) {
            $fields[] = "sku = :sku";
            $params[':sku'] = $data['sku'];
        }
        if (array_key_exists('barcode', $data)) {
            $fields[] = "barcode = :barcode";
            $params[':barcode'] = $data['barcode'];
        }
        if (array_key_exists('price', $data)) {
            $fields[] = "price = :price";
            $params[':price'] = $data['price'];
        }
        if (array_key_exists('compare_price', $data)) {
            $fields[] = "compare_price = :compare_price";
            $params[':compare_price'] = $data['compare_price'];
        }
        if (array_key_exists('cost_price', $data)) {
            $fields[] = "cost_price = :cost_price";
            $params[':cost_price'] = $data['cost_price'];
        }
        if (array_key_exists('stock_quantity', $data)) {
            $fields[] = "stock_quantity = :stock_quantity";
            $params[':stock_quantity'] = $data['stock_quantity'];
        }
        if (array_key_exists('manage_stock', $data)) {
            $fields[] = "manage_stock = :manage_stock";
            $params[':manage_stock'] = $data['manage_stock'];
        }
        if (array_key_exists('stock_status', $data)) {
            $fields[] = "stock_status = :stock_status";
            $params[':stock_status'] = $data['stock_status'];
        }
        if (array_key_exists('is_active', $data)) {
            $fields[] = "is_active = :is_active";
            $params[':is_active'] = $data['is_active'];
        }
        if (array_key_exists('is_featured', $data)) {
            $fields[] = "is_featured = :is_featured";
            $params[':is_featured'] = $data['is_featured'];
        }
        if (array_key_exists('featured_image', $data)) {
            $fields[] = "featured_image = :featured_image";
            $params[':featured_image'] = $data['featured_image'];
        }
        if (array_key_exists('image_gallery', $data)) {
            $fields[] = "image_gallery = :image_gallery";
            $params[':image_gallery'] = isset($data['image_gallery']) ? json_encode($data['image_gallery'], JSON_UNESCAPED_UNICODE) : null;
        }
        if (empty($fields)) {
            return false; // nada que actualizar
        }
        $sql = "UPDATE products SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($params);        
    }

    public function delete($id) {
        $sql = "DELETE FROM products WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function existsBySku($sku, $excludeId = null) {
        $sql = "SELECT id FROM products WHERE sku = :sku";
        if ($excludeId) $sql .= " AND id != :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':sku', $sku);
        if ($excludeId) $stmt->bindValue(':id', $excludeId, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }
}