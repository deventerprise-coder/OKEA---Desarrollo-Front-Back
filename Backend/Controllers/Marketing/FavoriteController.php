<?php
// Controlador de favoritos
require_once __DIR__ . '/../../Modelos/Favorite.php';
class FavoriteController {
    private static $favorites = [];
    private static $nextId = 1;
    private static $estadosPermitidos = ['activo', 'inactivo', 'eliminado'];

    /**
     * Crear favorito
     */
    public function create($data) {
        if (!isset($data['usuario_id']) || !isset($data['producto_id'])) {
            throw new Exception('Datos incompletos');
        }
        // Verificar duplicados
        foreach (self::$favorites as $fav) {
            if ($fav->usuario_id === $data['usuario_id'] && $fav->producto_id === $data['producto_id'] && $fav->estado !== 'eliminado') {
                throw new Exception('El producto ya está en favoritos');
            }
        }
        $favorite = new Favorite();
        $favorite->id = self::$nextId++;
        $favorite->usuario_id = $data['usuario_id'];
        $favorite->producto_id = $data['producto_id'];
        $favorite->fecha_agregado = date('Y-m-d');
        $favorite->estado = 'activo';
        self::$favorites[$favorite->id] = $favorite;
        return $favorite;
    }

    /**
     * Leer favorito por ID
     */
    public function read($id) {
        if (isset(self::$favorites[$id]) && self::$favorites[$id]->estado !== 'eliminado') {
            return self::$favorites[$id];
        }
        throw new Exception('Favorito no encontrado');
    }

    /**
     * Actualizar favorito
     */
    public function update($id, $data) {
        if (!isset(self::$favorites[$id]) || self::$favorites[$id]->estado === 'eliminado') {
            throw new Exception('Favorito no encontrado');
        }
        $favorite = self::$favorites[$id];
        if (isset($data['usuario_id'])) {
            $favorite->usuario_id = $data['usuario_id'];
        }
        if (isset($data['producto_id'])) {
            // Verificar duplicados
            foreach (self::$favorites as $fid => $fav) {
                if ($fid !== $id && $fav->usuario_id === $favorite->usuario_id && $fav->producto_id === $data['producto_id'] && $fav->estado !== 'eliminado') {
                    throw new Exception('El producto ya está en favoritos');
                }
            }
            $favorite->producto_id = $data['producto_id'];
        }
        if (isset($data['estado'])) {
            if (!in_array($data['estado'], self::$estadosPermitidos)) {
                throw new Exception('Estado no permitido');
            }
            $favorite->estado = $data['estado'];
        }
        self::$favorites[$id] = $favorite;
        return $favorite;
    }

    /**
     * Eliminar (soft delete) favorito
     */
    public function delete($id) {
        if (!isset(self::$favorites[$id]) || self::$favorites[$id]->estado === 'eliminado') {
            throw new Exception('Favorito no encontrado');
        }
        self::$favorites[$id]->estado = 'eliminado';
        return true;
    }

    /**
     * Listar favoritos activos/inactivos
     */
    public function list() {
        return array_values(array_filter(self::$favorites, function($f) {
            return $f->estado !== 'eliminado';
        }));
    }

    /**
     * Buscar favorito por usuario y producto
     */
    public function findByUsuarioProducto($usuario_id, $producto_id) {
        foreach (self::$favorites as $fav) {
            if ($fav->usuario_id === $usuario_id && $fav->producto_id === $producto_id && $fav->estado !== 'eliminado') {
                return $fav;
            }
        }
        throw new Exception('Favorito no encontrado para ese usuario y producto');
    }

    /**
     * Reactivar favorito eliminado
     */
    public function reactivar($id) {
        if (!isset(self::$favorites[$id])) {
            throw new Exception('Favorito no encontrado');
        }
        if (self::$favorites[$id]->estado !== 'eliminado') {
            throw new Exception('El favorito no está eliminado');
        }
        self::$favorites[$id]->estado = 'activo';
        return self::$favorites[$id];
    }
}
// Modelo Cupón
class Coupon {
    public $id;
    public $codigo;
    public $descripcion;
    public $fecha_inicio;
    public $fecha_fin;
    public $limite_uso;
    public $usos_actuales;
    public $usuario_id;
    public $producto_id;
    public $estado;

    /**
     * Verifica si el cupón está vigente
     */
    public function esVigente() {
        $hoy = date('Y-m-d');
        return ($this->fecha_inicio <= $hoy && $this->fecha_fin >= $hoy);
    }

    /**
     * Verifica si el cupón puede usarse (no ha alcanzado el límite)
     */
    public function puedeUsarse() {
        return $this->usos_actuales < $this->limite_uso;
    }

    /**
     * Marca un uso del cupón
     */
    public function registrarUso() {
        if ($this->esVigente() && $this->puedeUsarse()) {
            $this->usos_actuales++;
            return true;
        }
        return false;
    }
}
