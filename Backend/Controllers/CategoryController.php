<?php
namespace Okea\Backend\Controllers;

use Okea\Backend\Modelos\Category;
use Okea\Backend\Utils\Validator;
use Okea\Backend\Utils\Response;

class CategoryController {
    private $model;

    public function __construct($db) {
        $this->model = new Category($db);
    }
    // Obtener todas las categorías
    public function getAll() {
        $categories = $this->model->getAll();
        return Response::json($categories, 200);
    }
    // Obtener categoría por ID
    public function getById($id) {
        $category = $this->model->getById($id);
        if ($category) {
            return Response::json($category, 200);
        }
        return Response::json(["error" => "Categoría no encontrada"], 404);
    }
    // Obtener categorías hijas por ID de padre
    public function getByParent($parent_id) {
        $category = $this->model->getByParent($parent_id);
        if ($category) {
            return Response::json($category, 200);
        }
        return Response::json(["error" => "Categoría padre no encontrada"], 404);
    }
    // Crear nueva categoría
    public function create($data) {
        try {
            Validator::required($data['name'] ?? null, 'name');

            $data['slug'] = $this->generateSlug($data['name']);
            $newCategory = $this->model->create($data);

            if ($newCategory) {
                return Response::json($newCategory, 201);
            }
            return Response::json(["error" => "No se pudo crear la categoría"], 400);

        } catch (\PDOException $e) {
            if ($e->getCode() == "23000") {
                return Response::json(["error" => "El slug y/o name ya existe"], 409);
            }
            return Response::json(["error" => "Error interno de base de datos"], 500);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }
    // Actualizar categoría existente
    public function update($id, $data) {
        try {
            // verificar si la categoria existe
            $existing = $this->model->getById($id);
            if (!$existing) {
                return Response::json(["error" => "Categoría no encontrada"], 404);
            }
            // Validar name/slug duplicados
            if (!empty($data['name'])) {
                $slug = $this->generateSlug($data['name']);
                // ¿Ya existe ese slug en otro registro?
                if ($this->model->existsBySlug($slug, $id)) {
                    return Response::json(["error" => "El nombre/slug ya existe en otra categoría"], 409);
                }
                $data['slug'] = $slug;
            }
            // Actualizar categoría
            $updated = $this->model->update($id, $data);
            if ($updated > 0) {
                return Response::json(["message" => "Categoría actualizada"], 200);
            }
            return Response::json(["message" => "Sin cambios"], 200);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }
    // Eliminar categoría
    public function delete($id) {
        $ok = $this->model->delete($id);
        if ($ok) {
            return Response::json(["message" => "Categoría eliminada"], 200);
        }
        return Response::json(["error" => "Error al intentar eliminar categoria"], 400);
    }
    // crear slug amigable
    private function generateSlug($name) {
        $slug = strtolower(trim($name));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
        return trim($slug, '-');
    }
}