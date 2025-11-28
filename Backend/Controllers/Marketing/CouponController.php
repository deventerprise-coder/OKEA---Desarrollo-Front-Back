<?php
// Controlador de cupones
require_once __DIR__ . '/../../Modelos/Coupon.php';
class CouponController {
    // Simulación de base de datos en memoria
    private static $coupons = [];
    private static $nextId = 1;
    private static $estadosPermitidos = ['activo', 'inactivo', 'eliminado'];

    /**
     * Crear cupón
     */
    public function create($data) {
        // Validación básica
        if (!isset($data['codigo']) || !isset($data['descripcion']) || !isset($data['fecha_inicio']) || !isset($data['fecha_fin']) || !isset($data['limite_uso'])) {
            throw new Exception('Datos incompletos');
        }
        if (strlen($data['codigo']) > 50) {
            throw new Exception('Código demasiado largo');
        }
        // Verificar duplicados por código
        foreach (self::$coupons as $coupon) {
            if ($coupon->codigo === $data['codigo'] && $coupon->estado !== 'eliminado') {
                throw new Exception('El código de cupón ya existe');
            }
        }
        $coupon = new Coupon();
        $coupon->id = self::$nextId++;
        $coupon->codigo = $data['codigo'];
        $coupon->descripcion = $data['descripcion'];
        $coupon->fecha_inicio = $data['fecha_inicio'];
        $coupon->fecha_fin = $data['fecha_fin'];
        $coupon->limite_uso = $data['limite_uso'];
        $coupon->usos_actuales = 0;
        $coupon->usuario_id = $data['usuario_id'] ?? null;
        $coupon->producto_id = $data['producto_id'] ?? null;
        $coupon->estado = 'activo';
        self::$coupons[$coupon->id] = $coupon;
        return $coupon;
    }

    /**
     * Leer cupón por ID
     */
    public function read($id) {
        if (isset(self::$coupons[$id]) && self::$coupons[$id]->estado !== 'eliminado') {
            return self::$coupons[$id];
        }
        throw new Exception('Cupón no encontrado');
    }

    /**
     * Actualizar cupón
     */
    public function update($id, $data) {
        if (!isset(self::$coupons[$id]) || self::$coupons[$id]->estado === 'eliminado') {
            throw new Exception('Cupón no encontrado');
        }
        $coupon = self::$coupons[$id];
        if (isset($data['codigo'])) {
            if (strlen($data['codigo']) > 50) {
                throw new Exception('Código demasiado largo');
            }
            // Verificar duplicados por código
            foreach (self::$coupons as $cid => $c) {
                if ($cid !== $id && $c->codigo === $data['codigo'] && $c->estado !== 'eliminado') {
                    throw new Exception('El código de cupón ya existe');
                }
            }
            $coupon->codigo = $data['codigo'];
        }
        if (isset($data['descripcion'])) $coupon->descripcion = $data['descripcion'];
        if (isset($data['fecha_inicio'])) $coupon->fecha_inicio = $data['fecha_inicio'];
        if (isset($data['fecha_fin'])) $coupon->fecha_fin = $data['fecha_fin'];
        if (isset($data['limite_uso'])) $coupon->limite_uso = $data['limite_uso'];
        if (isset($data['usos_actuales'])) $coupon->usos_actuales = $data['usos_actuales'];
        if (isset($data['usuario_id'])) $coupon->usuario_id = $data['usuario_id'];
        if (isset($data['producto_id'])) $coupon->producto_id = $data['producto_id'];
        if (isset($data['estado'])) {
            if (!in_array($data['estado'], self::$estadosPermitidos)) {
                throw new Exception('Estado no permitido');
            }
            $coupon->estado = $data['estado'];
        }
        self::$coupons[$id] = $coupon;
        return $coupon;
    }

    /**
     * Eliminar (soft delete) cupón
     */
    public function delete($id) {
        if (!isset(self::$coupons[$id]) || self::$coupons[$id]->estado === 'eliminado') {
            throw new Exception('Cupón no encontrado');
        }
        self::$coupons[$id]->estado = 'eliminado';
        return true;
    }

    /**
     * Listar cupones activos/inactivos
     */
    public function list() {
        return array_values(array_filter(self::$coupons, function($c) {
            return $c->estado !== 'eliminado';
        }));
    }

    /**
     * Validar vigencia y límite de uso
     */
    public function validarVigenciaYLimite($id) {
        $coupon = $this->read($id);
        $hoy = date('Y-m-d');
        $vigente = ($coupon->fecha_inicio <= $hoy && $coupon->fecha_fin >= $hoy);
        $puedeUsarse = ($coupon->usos_actuales < $coupon->limite_uso);
        return $vigente && $puedeUsarse;
    }

    /**
     * Registrar uso de cupón
     */
    public function registrarUso($id) {
        $coupon = $this->read($id);
        if ($this->validarVigenciaYLimite($id)) {
            $coupon->usos_actuales++;
            self::$coupons[$id] = $coupon;
            return true;
        }
        throw new Exception('Cupón no vigente o límite de uso alcanzado');
    }

    /**
     * Buscar cupón por código
     */
    public function findByCodigo($codigo) {
        foreach (self::$coupons as $coupon) {
            if ($coupon->codigo === $codigo && $coupon->estado !== 'eliminado') {
                return $coupon;
            }
        }
        throw new Exception('Cupón no encontrado para ese código');
    }

    /**
     * Reactivar cupón eliminado
     */
    public function reactivar($id) {
        if (!isset(self::$coupons[$id])) {
            throw new Exception('Cupón no encontrado');
        }
        if (self::$coupons[$id]->estado !== 'eliminado') {
            throw new Exception('El cupón no está eliminado');
        }
        self::$coupons[$id]->estado = 'activo';
        return self::$coupons[$id];
    }
}
