<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;

    // Relación con el usuario (un carrito pertenece a un usuario)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    // Relación con los productos a través de detalle_carrito
    public function detalles()
    {
        return $this->hasMany(DetalleCarrito::class, 'id_carrito');
    }

    // Relación con los pedidos
    public function pedido()
    {
        return $this->hasOne(Pedido::class, 'id_carrito');
    }
}
