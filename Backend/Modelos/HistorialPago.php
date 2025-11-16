<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HistorialPago extends Model
{
    use HasFactory;

    protected $table = 'historial_pagos';
    protected $primaryKey = 'id_historial';
    public $timestamps = false;

    protected $fillable = [
        'id_pago',
        'estado_anterior',
        'estado_nuevo',
        'comentario',
        'usuario_cambio',
        'fecha_cambio'
    ];

    protected $casts = [
        'fecha_cambio' => 'datetime'
    ];

    // ==================== Relaciones ====================

    public function pago()
    {
        return $this->belongsTo(Pago::class, 'id_pago', 'id_pago');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_cambio', 'id_usuario');
    }
}

