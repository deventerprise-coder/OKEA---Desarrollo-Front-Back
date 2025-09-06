<?php

namespace Okea\Backend\Controllers;

use Okea\Backend\Modelos\AttributeValue;
use Okea\Backend\Modelos\Attribute;
use Okea\Backend\Utils\Validator;
use Okea\Backend\Utils\Response;

class AttributeValueController {
    private $model;
    private $db;

    public function __construct($db) {
        $this->db = $db;
        $this->model = new AttributeValue($db);
    }

    // Obtener todos los valores, opcional por attribute_id
    public function getAll($attribute_id = null) {
        $values = $this->model->getAll($attribute_id);
        return Response::json($values, 200);
    }

    // Obtener por ID
    public function getById($id) {
        $value = $this->model->getById($id);
        if ($value) {
            return Response::json($value, 200);
        }
        return Response::json(["error" => "Valor no encontrado"], 404);
    }

    // Crear nuevo valor
    public function create($data) {
        try {
            Validator::required($data['attribute_id'] ?? null, 'attribute_id');
            Validator::required($data['value'] ?? null, 'value');

            // Validar existencia de atributo padre
            $AttributeModel = new Attribute($this->db);
            if (!$AttributeModel->getById($data['attribute_id'])) {
                throw new \Exception("El atributo especificado no existe");
            }

            $data['slug'] = $this->generateSlug($data['value']);

            if ($this->model->existsBySlug($data['attribute_id'], $data['slug'])) {
                return Response::json(["error" => "El valor/slug ya existe para este atributo"], 409);
            }

            $newValue = $this->model->create($data);
            if ($newValue) return Response::json($newValue, 201);

            return Response::json(["error" => "No se pudo crear el valor"], 400);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }

    // Actualizar valor
    public function update($id, $data) {
        try {
            $existing = $this->model->getById($id);
            if (!$existing) return Response::json(["error" => "Valor no encontrado"], 404);

            // Validar existencia de atributo padre
            if(!empty($data['attribute_id'])) {
                $AttributeModel = new Attribute($this->db);
                if (!$AttributeModel->getById($data['attribute_id'])) {
                    throw new \Exception("El atributo especificado no existe");
                }
            }

            if (!empty($data['value'])) {
                $slug = $this->generateSlug($data['value']);
                if ($this->model->existsBySlug($existing['attribute_id'], $slug, $id)) {
                    return Response::json(["error" => "El valor/slug ya existe para este atributo"], 409);
                }
                $data['slug'] = $slug;
            }

            $updated = $this->model->update($id, $data);
            if ($updated) return Response::json(["message" => "Valor actualizado"], 200);

            return Response::json(["message" => "Sin cambios"], 200);

        } catch (\Exception $e) {
            return Response::json(["error" => $e->getMessage()], 422);
        }
    }

    // Eliminar valor, si se elimina el atributo(padre), se eliminarán sus valores
    public function delete($id) {
        $ok = $this->model->delete($id);
        if ($ok) return Response::json(["message" => "Valor eliminado"], 200);
        return Response::json(["error" => "Error al eliminar valor"], 400);
    }

    // Generar slug
    private function generateSlug($value) {
        $slug = strtolower(trim($value));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
        return trim($slug, '-');
    }
}
