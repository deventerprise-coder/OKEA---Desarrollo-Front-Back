<?php
namespace Okea\Backend\Controllers;

use Okea\Backend\Modelos\Product;
use Okea\Backend\Utils\Validator;
use Okea\Backend\Utils\Response;
use Okea\Backend\Modelos\Category;

class ProductController {
    private $model;
    private $db;

    public function __construct($db) {
        $this->db = $db;
        $this->model = new Product($db);
    }

    // Obtener todas los productos(solo variantes y simples, no abstracciones como los productos padres)
    public function getAll() {
        $products = $this->model->getAll();
        return Response::json($products, 200);
    }
    // Obtener producto por ID
    public function getById($id) {
        $product = $this->model->getById($id);
        if ($product) {
            return Response::json($product, 200);
        }
        return Response::json(["error" => "Producto no encontrado"], 404);
    }
    // Obtener productos variantes por ID de padre
    public function getByParent($parent_id) {
        $product = $this->model->getVariants($parent_id);
        if ($product) {
            return Response::json($product, 200);
        }
        return Response::json(["error" => "Producto padre no encontrado"], 404);
    }
    // Obtener productos simples y padres
    public function getSimpleYParentProducts() {
        $products = $this->model->getSimpleYParentProducts();
        return Response::json($products, 200);
    }
    // Crear nuevo producto
    public function create($data) {
        try {
            Validator::required($data['name'] ?? null, 'name');
            Validator::required($data['price'] ?? null, 'price');
            Validator::isPositive($data['price'] ?? null, 'price');
            Validator::inArray($data['product_type'] ?? null, ['simple','parent','variant'], 'product_type');
            Validator::required($data['category_id'] ?? null, 'category_id');
            // Validar categoría
            $categoryModel = new Category($this->db);
            if (!$categoryModel->getById($data['category_id'])) {
                throw new \Exception("La categoría especificada no existe");
            }
            // Validar integridad product_type y parent_id
            if ($data['product_type'] === 'variant') {
                Validator::required($data['parent_id'] ?? null, 'parent_id');
                // Verificar que el parent_id corresponde a un producto padre
                $parentProduct = $this->model->getById($data['parent_id']);
                if (!$parentProduct || $parentProduct['product_type'] !== 'parent') {
                    return Response::json([
                        "error" => "El parent_id no corresponde a un producto padre válido"
                    ], 422);
                }
            } else {
                $data['parent_id'] = null;
            }
            // Stock según tipo
            if ($data['product_type'] === 'parent') {
                $data['stock_quantity'] = 0;
            }
            // Generar slug
            $data['slug'] = $this->generateSlug($data['name']);
            // Validar SKU único
            if (!isset($data['sku']) || $this->model->existsBySku($data['sku'])) {
                throw new \Exception("SKU obligatorio y debe ser único");
            }

            $newProduct = $this->model->create($data);

            if ($newProduct) {
                return Response::json($newProduct, 201);
            }

            return Response::json(["error" => "No se pudo crear el producto"], 400);

        } catch (\PDOException $e) {
            if ($e->getCode() == "23000") {
                return Response::json(["error" => "El slug-name y/o SKU ya existe"], 409);
            }
            return Response::json(["error" => "Error interno de base de datos"], 500);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }
    // Actualizar producto
    public function update($id, $data) {
        try {
            // verificar si el producto existe
            $existing = $this->model->getById($id);
            if (!$existing) {
                return Response::json(["error" => "Producto no encontrado"], 404);
            }
            // Validar integridad product_type y parent_id
            if (isset($data['product_type']) && $data['product_type'] === 'variant') {
                if (!isset($data['parent_id'])) {
                    return Response::json(["error" => "parent_id es obligatorio para productos variante"], 422);
                }
                // Verificar que el parent_id corresponde a un producto padre
                $parentProduct = $this->model->getById($data['parent_id']);
                if (!$parentProduct || $parentProduct['product_type'] !== 'parent') {
                    return Response::json([
                        "error" => "El parent_id no corresponde a un producto padre válido"
                    ], 422);
                }
            } elseif (isset($data['product_type']) && in_array($data['product_type'], ['simple','parent'])) {
                $data['parent_id'] = null; // limpiar parent_id si cambia a simple o parent
            }
            // Validar categoría si se proporciona
            if (isset($data['category_id'])) {
                $categoryModel = new Category($this->db);
                if (!$categoryModel->getById($data['category_id'])) {
                    throw new \Exception("La categoría especificada no existe");
                }
            }
            // Validar precio si se proporciona
            if (isset($data['price'])) {
                Validator::isPositive($data['price'], 'price');
            }
            // Validar SKU único si se proporciona
            if (isset($data['sku']) && $data['sku'] !== $existing['sku'] && $this->model->existsBySku($data['sku'])) {
                throw new \Exception("El SKU debe ser único");
            }
            // Actualizar slug si cambia el nombre
            if (isset($data['name'])) {
                $data['slug'] = $this->generateSlug($data['name']);
            }
            // Stock según tipo
            if (isset($data['product_type']) && $data['product_type'] === 'parent') {
                $data['stock_quantity'] = 0;
            }
            $ok = $this->model->update($id, $data);
            if ($ok) {
                return Response::json(["message" => "Producto actualizado"], 200);
            }
            return Response::json(["message" => "Sin cambios"], 200);
        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }
    // Eliminar producto (Si elimina un producto padre, eliminará sus variantes)
    public function delete($id) {
        $ok = $this->model->delete($id);
        if ($ok) {
            return Response::json(["message" => "Producto eliminado"], 200); 
        }
        return Response::json(["error" => "No se pudo eliminar el producto o no existe"], 400);
    }
    // crear slug amigable
    private function generateSlug($name) {
        $slug = strtolower(trim($name));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
        return trim($slug, '-');
    }
}