<?php

namespace Okea\Backend\Controllers;

use Okea\Backend\Modelos\Attribute;
use Okea\Backend\Utils\Validator;
use Okea\Backend\Utils\Response;

class AttributeController {
    private $model;

    public function __construct($db) {
        $this->model = new Attribute($db);
    }

    // Obtener todos los atributos
    public function getAll() {
        $attributes = $this->model->getAll();
        return Response::json($attributes, 200);
    }

    // Obtener atributo por ID
    public function getById($id) {
        $attribute = $this->model->getById($id);
        if ($attribute) {
            return Response::json($attribute, 200);
        }
        return Response::json(["error" => "Atributo no encontrado"], 404);
    }

    // Crear nuevo atributo
    public function create($data) {
        try {
            Validator::required($data['name'] ?? null, 'name');

            $data['slug'] = $this->generateSlug($data['name']);

            // Validar unicidad del slug
            if ($this->model->existsBySlug($data['slug'])) {
                return Response::json(["error" => "El nombre/slug ya existe"], 409);
            }

            $newAttribute = $this->model->create($data);
            if ($newAttribute) {
                return Response::json($newAttribute, 201);
            }

            return Response::json(["error" => "No se pudo crear el atributo"], 400);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }

    // Actualizar atributo
    public function update($id, $data) {
        try {
            $existing = $this->model->getById($id);
            if (!$existing) {
                return Response::json(["error" => "Atributo no encontrado"], 404);
            }

            if (!empty($data['name'])) {
                $slug = $this->generateSlug($data['name']);
                if ($this->model->existsBySlug($slug, $id)) {
                    return Response::json(["error" => "El nombre/slug ya existe en otro atributo"], 409);
                }
                $data['slug'] = $slug;
            }

            $updated = $this->model->update($id, $data);
            if ($updated) {
                return Response::json(["message" => "Atributo actualizado"], 200);
            }

            return Response::json(["message" => "Sin cambios"], 200);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }

    // Eliminar atributo
    public function delete($id) {
        $ok = $this->model->delete($id);
        if ($ok) {
            return Response::json(["message" => "Atributo eliminado"], 200);
        }
        return Response::json(["error" => "Error al intentar eliminar atributo"], 400);
    }

    // Generar slug amigable a partir de name
    private function generateSlug($name) {
        $slug = strtolower(trim($name));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
        return trim($slug, '-');
    }
}
