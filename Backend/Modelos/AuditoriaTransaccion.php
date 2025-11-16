<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AuditoriaTransaccion extends Model
{
    use HasFactory;

    protected $table = 'auditoria_transacciones';
    protected $primaryKey = 'id_auditoria';
    public $timestamps = false;

    protected $fillable = [
        'id_pago',
        'id_pedido',
        'tipo_evento',
        'detalles',
        'usuario_responsable',
        'ip_origen',
        'fecha_evento'
    ];

    protected $casts = [
        'detalles' => 'array',
        'fecha_evento' => 'datetime'
    ];

    // ==================== Relaciones ====================

    public function pago()
    {
        return $this->belongsTo(Pago::class, 'id_pago', 'id_pago');
    }

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'id_pedido', 'id_pedido');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_responsable', 'id_usuario');
    }

    // ==================== Scopes ====================

    public function scopeTipoEvento($query, $tipo)
    {
        return $query->where('tipo_evento', $tipo);
    }

    public function scopeFechas($query, $desde, $hasta)
    {
        return $query->whereBetween('fecha_evento', [$desde, $hasta]);
    }

    public function scopeUsuario($query, $usuarioId)
    {
        return $query->where('usuario_responsable', $usuarioId);
    }

    // ==================== Métodos ====================

    /**
     * Registrar evento de auditoría
     */
    public static function registrar($tipoEvento, $detalles = [], $idPago = null, $idPedido = null, $usuarioId = null, $ipOrigen = null)
    {
        return self::create([
            'id_pago' => $idPago,
            'id_pedido' => $idPedido,
            'tipo_evento' => $tipoEvento,
            'detalles' => $detalles,
            'usuario_responsable' => $usuarioId,
            'ip_origen' => $ipOrigen,
            'fecha_evento' => now()
        ]);
    }
}

