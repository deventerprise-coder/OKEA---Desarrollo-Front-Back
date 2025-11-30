<?php
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
    // Métodos para validar vigencia y límite de uso
    public function esVigente() {
        $hoy = date('Y-m-d');
        return ($hoy >= $this->fecha_inicio && $hoy <= $this->fecha_fin);
    }
    public function puedeUsarse() {
        return ($this->usos_actuales < $this->limite_uso);
    }
}

