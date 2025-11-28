<?php
// Controlador de newsletter
require_once __DIR__ . '/../../Modelos/Newsletter.php';
class NewsletterController {
    // Simulación de base de datos en memoria
    private static $newsletters = [];
    private static $nextId = 1;
    private static $estadosPermitidos = ['activo', 'inactivo', 'eliminado'];

    /**
     * Crear una suscripción a newsletter
     */
    public function create($data) {
        // Validación básica de email
        if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Email inválido');
        }
        if (strlen($data['email']) > 100) {
            throw new Exception('Email demasiado largo');
        }
        // Verificar duplicados
        foreach (self::$newsletters as $newsletter) {
            if ($newsletter->email === $data['email'] && $newsletter->estado !== 'eliminado') {
                throw new Exception('El email ya está suscrito');
            }
        }
        $newsletter = new Newsletter();
        $newsletter->id = self::$nextId++;
        $newsletter->email = $data['email'];
        $newsletter->fecha_suscripcion = date('Y-m-d');
        $newsletter->estado = 'activo';
        $newsletter->usuario_id = $data['usuario_id'] ?? null;
        self::$newsletters[$newsletter->id] = $newsletter;
        return $newsletter;
    }

    /**
     * Leer una suscripción por ID
     */
    public function read($id) {
        if (isset(self::$newsletters[$id]) && self::$newsletters[$id]->estado !== 'eliminado') {
            return self::$newsletters[$id];
        }
        throw new Exception('Suscripción no encontrada');
    }

    /**
     * Actualizar una suscripción
     */
    public function update($id, $data) {
        if (!isset(self::$newsletters[$id]) || self::$newsletters[$id]->estado === 'eliminado') {
            throw new Exception('Suscripción no encontrada');
        }
        $newsletter = self::$newsletters[$id];
        if (isset($data['email']) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            if (strlen($data['email']) > 100) {
                throw new Exception('Email demasiado largo');
            }
            // Verificar duplicados
            foreach (self::$newsletters as $nid => $n) {
                if ($nid !== $id && $n->email === $data['email'] && $n->estado !== 'eliminado') {
                    throw new Exception('El email ya está suscrito');
                }
            }
            $newsletter->email = $data['email'];
        }
        if (isset($data['estado'])) {
            if (!in_array($data['estado'], self::$estadosPermitidos)) {
                throw new Exception('Estado no permitido');
            }
            $newsletter->estado = $data['estado'];
        }
        if (isset($data['usuario_id'])) {
            $newsletter->usuario_id = $data['usuario_id'];
        }
        self::$newsletters[$id] = $newsletter;
        return $newsletter;
    }

    /**
     * Eliminar (soft delete) una suscripción
     */
    public function delete($id) {
        if (!isset(self::$newsletters[$id]) || self::$newsletters[$id]->estado === 'eliminado') {
            throw new Exception('Suscripción no encontrada');
        }
        self::$newsletters[$id]->estado = 'eliminado';
        return true;
    }

    /**
     * Listar todas las suscripciones activas/inactivas
     */
    public function list() {
        return array_values(array_filter(self::$newsletters, function($n) {
            return $n->estado !== 'eliminado';
        }));
    }

    /**
     * Buscar suscripción por email
     */
    public function findByEmail($email) {
        foreach (self::$newsletters as $newsletter) {
            if ($newsletter->email === $email && $newsletter->estado !== 'eliminado') {
                return $newsletter;
            }
        }
        throw new Exception('Suscripción no encontrada para ese email');
    }

    /**
     * Reactivar una suscripción eliminada
     */
    public function reactivar($id) {
        if (!isset(self::$newsletters[$id])) {
            throw new Exception('Suscripción no encontrada');
        }
        if (self::$newsletters[$id]->estado !== 'eliminado') {
            throw new Exception('La suscripción no está eliminada');
        }
        self::$newsletters[$id]->estado = 'activo';
        return self::$newsletters[$id];
    }
}
