<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    // Relación con el usuario (un pedido pertenece a un usuario)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    // Relación con la dirección (un pedido tiene una dirección)
    public function direccion()
    {
        return $this->belongsTo(Direccion::class, 'id_direccion');
    }

    // Relación con los detalles del pedido (un pedido tiene muchos detalles de productos)
    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'id_pedido');
    }
}
