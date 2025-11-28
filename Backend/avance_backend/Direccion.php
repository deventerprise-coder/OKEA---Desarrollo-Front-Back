<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    use HasFactory;

    // Relación con el usuario (una dirección pertenece a un usuario)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    // Relación con los pedidos (una dirección puede estar asociada a muchos pedidos)
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'id_direccion');
    }
}
