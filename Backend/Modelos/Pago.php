<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pago extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pagos';
    protected $primaryKey = 'id_pago';
    public $timestamps = true;

    const CREATED_AT = 'fecha_creacion';
    const UPDATED_AT = 'fecha_actualizacion';

    // Estados permitidos
    const ESTADO_PENDIENTE = 'pendiente';
    const ESTADO_PROCESANDO = 'procesando';
    const ESTADO_COMPLETADO = 'completado';
    const ESTADO_FALLIDO = 'fallido';
    const ESTADO_REEMBOLSADO = 'reembolsado';

    // Métodos de pago permitidos
    const METODO_TARJETA_CREDITO = 'tarjeta_credito';
    const METODO_TARJETA_DEBITO = 'tarjeta_debito';
    const METODO_TRANSFERENCIA = 'transferencia';
    const METODO_MERCADO_PAGO = 'mercado_pago';
    const METODO_EFECTIVO = 'efectivo';
    const METODO_YAPE = 'yape';
    const METODO_PLIN = 'plin';

    protected $fillable = [
        'id_pedido',
        'id_usuario',
        'monto',
        'metodo_pago',
        'numero_transaccion',
        'referencia_externa',
        'estado',
        'descripcion',
        'fecha_pago'
    ];

    protected $casts = [
        'monto' => 'decimal:2',
        'fecha_pago' => 'datetime',
        'fecha_creacion' => 'datetime',
        'fecha_actualizacion' => 'datetime'
    ];

    // ==================== Relaciones ====================

    /**
     * Relación con Pedido
     */
    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'id_pedido', 'id_pedido');
    }

    /**
     * Relación con Usuario
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    /**
     * Relación con Historial de Pagos
     */
    public function historial()
    {
        return $this->hasMany(HistorialPago::class, 'id_pago', 'id_pago');
    }

    /**
     * Relación con Reembolsos
     */
    public function reembolsos()
    {
        return $this->hasMany(Reembolso::class, 'id_pago', 'id_pago');
    }

    /**
     * Relación con Auditoría
     */
    public function auditoria()
    {
        return $this->hasMany(AuditoriaTransaccion::class, 'id_pago', 'id_pago');
    }

    // ==================== Scopes ====================

    /**
     * Filtrar por estado
     */
    public function scopeEstado($query, $estado)
    {
        return $query->where('estado', $estado);
    }

    /**
     * Filtrar por método de pago
     */
    public function scopeMetodoPago($query, $metodo)
    {
        return $query->where('metodo_pago', $metodo);
    }

    /**
     * Filtrar por rango de fechas
     */
    public function scopeFechas($query, $desde, $hasta)
    {
        return $query->whereBetween('fecha_creacion', [$desde, $hasta]);
    }

    /**
     * Filtrar pagos completados
     */
    public function scopeCompletados($query)
    {
        return $query->where('estado', self::ESTADO_COMPLETADO);
    }

    /**
     * Filtrar pagos pendientes
     */
    public function scopePendientes($query)
    {
        return $query->where('estado', self::ESTADO_PENDIENTE);
    }

    /**
     * Filtrar pagos por usuario
     */
    public function scopeUsuario($query, $idUsuario)
    {
        return $query->where('id_usuario', $idUsuario);
    }

    /**
     * Filtrar pagos por pedido
     */
    public function scopePedido($query, $idPedido)
    {
        return $query->where('id_pedido', $idPedido);
    }

    // ==================== Métodos ====================

    /**
     * Marcar pago como completado
     */
    public function marcarCompletado($fechaPago = null)
    {
        $this->estado = self::ESTADO_COMPLETADO;
        $this->fecha_pago = $fechaPago ?? now();
        return $this->save();
    }

    /**
     * Marcar pago como fallido
     */
    public function marcarFallido()
    {
        $this->estado = self::ESTADO_FALLIDO;
        return $this->save();
    }

    /**
     * Marcar pago como reembolsado
     */
    public function marcarReembolsado()
    {
        $this->estado = self::ESTADO_REEMBOLSADO;
        return $this->save();
    }

    /**
     * Cambiar estado del pago y registrar en historial
     */
    public function cambiarEstado($nuevoEstado, $comentario = null, $usuarioId = null)
    {
        $estadoAnterior = $this->estado;
        $this->estado = $nuevoEstado;

        if ($this->save()) {
            // Registrar en historial
            HistorialPago::create([
                'id_pago' => $this->id_pago,
                'estado_anterior' => $estadoAnterior,
                'estado_nuevo' => $nuevoEstado,
                'comentario' => $comentario,
                'usuario_cambio' => $usuarioId
            ]);

            return true;
        }

        return false;
    }

    /**
     * Verificar si el pago está completado
     */
    public function esCompletado()
    {
        return $this->estado === self::ESTADO_COMPLETADO;
    }

    /**
     * Verificar si el pago está pendiente
     */
    public function esPendiente()
    {
        return $this->estado === self::ESTADO_PENDIENTE;
    }

    /**
     * Obtener métodos de pago disponibles
     */
    public static function getMetodosPago()
    {
        return [
            self::METODO_TARJETA_CREDITO => 'Tarjeta de Crédito',
            self::METODO_TARJETA_DEBITO => 'Tarjeta de Débito',
            self::METODO_TRANSFERENCIA => 'Transferencia Bancaria',
            self::METODO_MERCADO_PAGO => 'Mercado Pago',
            self::METODO_EFECTIVO => 'Efectivo',
            self::METODO_YAPE => 'Yape',
            self::METODO_PLIN => 'Plin'
        ];
    }

    /**
     * Obtener estados disponibles
     */
    public static function getEstados()
    {
        return [
            self::ESTADO_PENDIENTE => 'Pendiente',
            self::ESTADO_PROCESANDO => 'Procesando',
            self::ESTADO_COMPLETADO => 'Completado',
            self::ESTADO_FALLIDO => 'Fallido',
            self::ESTADO_REEMBOLSADO => 'Reembolsado'
        ];
    }
}

