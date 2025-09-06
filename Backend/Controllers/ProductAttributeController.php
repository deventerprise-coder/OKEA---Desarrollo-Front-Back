<?php
namespace Okea\Backend\Controllers;

use Okea\Backend\Modelos\ProductAttribute;
use Okea\Backend\Modelos\Product;
use Okea\Backend\Modelos\Attribute;
use Okea\Backend\Modelos\AttributeValue;
use Okea\Backend\Utils\Validator;
use Okea\Backend\Utils\Response;

class ProductAttributeController {
    private $model;
    private $conn;

    public function __construct($db) {
        $this->model = new ProductAttribute($db);
        $this->conn = $db;
    }

    public function getAll() {
        $data = $this->model->getAll();
        return Response::json($data, 200);
    }

    public function getById($id) {
        $item = $this->model->getById($id);
        if ($item) return Response::json($item, 200);
        return Response::json(["error" => "Relacion Producto-Atributo no encontrada"], 404);
    }

    public function getByProduct($product_id) {
        $data = $this->model->getByProduct($product_id);
        return Response::json($data, 200);
    }
    // Importante para crear productos variantes
    public function create($data) {
        try {
            // Validaciones
            Validator::required($data['product_id'] ?? null, 'product_id');
            Validator::required($data['attribute_id'] ?? null, 'attribute_id');
            Validator::required($data['attribute_value_id'] ?? null, 'attribute_value_id');

            // Verificar existencia de product, attribute y attribute_value
            $productModel = new Product($this->conn);
            if (!$productModel->getById($data['product_id'])) {
                return Response::json(["error" => "Producto no existe"], 422);
            }
            $attributeModel = new Attribute($this->conn);
            if (!$attributeModel->getById($data['attribute_id'])) {
                return Response::json(["error" => "Atributo no existe"], 422);
            }
            $valueModel = new AttributeValue($this->conn);
            if (!$valueModel->getById($data['attribute_value_id'])) {
                return Response::json(["error" => "Valor de atributo no existe"], 422);
            }

            // Evitar duplicados
            if ($this->model->exists($data['product_id'], $data['attribute_id'])) {
                return Response::json(["error" => "Este atributo ya está asignado al producto"], 409);
            }

            $newItem = $this->model->create($data);
            return Response::json($newItem, 201);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }

    public function update($id, $data) {
        try {
            $existing = $this->model->getById($id);
            if (!$existing) {
                return Response::json(["error" => "Atributo de producto no encontrado"], 404);
            }

            $final = array_merge($existing, $data);

            // Validaciones básicas
            Validator::required($final['product_id'] ?? null, 'product_id');
            Validator::required($final['attribute_id'] ?? null, 'attribute_id');
            Validator::required($final['attribute_value_id'] ?? null, 'attribute_value_id');

            // Verificar que las FK existan
            $productModel = new \Okea\Backend\Modelos\Product($this->conn);
            if (!$productModel->getById($final['product_id'])) {
                return Response::json(["error" => "El producto no existe"], 422);
            }

            $attributeModel = new \Okea\Backend\Modelos\Attribute($this->conn);
            if (!$attributeModel->getById($final['attribute_id'])) {
                return Response::json(["error" => "El atributo no existe"], 422);
            }

            $attrValueModel = new \Okea\Backend\Modelos\AttributeValue($this->conn);
            if (!$attrValueModel->getById($final['attribute_value_id'])) {
                return Response::json(["error" => "El valor de atributo no existe"], 422);
            }

            // Verificar duplicados SOLO si se cambia product_id o attribute_id
            if (
                ($final['product_id'] != $existing['product_id'] || 
                $final['attribute_id'] != $existing['attribute_id']) &&
                $this->model->exists($final['product_id'], $final['attribute_id'], $id)
            ) {
                return Response::json(["error" => "Ya existe otro registro con este producto y atributo"], 409);
            }

            $updated = $this->model->update($id, $data);
            if ($updated) {
                return Response::json(["message" => "Atributo de producto actualizado"], 200);
            }

            return Response::json(["message" => "Sin cambios"], 200);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }

    // Eliminar relacion producto-atributo, si se elimina un producto, se elimina sus relaciones; si se elimina un atributo, se eliminana sus relaciones
    public function delete($id) {
        $deleted = $this->model->delete($id);
        if ($deleted) return Response::json(["message" => "Eliminado"], 200);
        return Response::json(["error" => "Error al eliminar"], 400);
    }
}
