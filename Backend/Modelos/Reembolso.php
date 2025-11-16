<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reembolso extends Model
{
    use HasFactory;

    protected $table = 'reembolsos';
    protected $primaryKey = 'id_reembolso';
    public $timestamps = false;

    // Estados
    const ESTADO_SOLICITADO = 'solicitado';
    const ESTADO_APROBADO = 'aprobado';
    const ESTADO_RECHAZADO = 'rechazado';
    const ESTADO_PROCESADO = 'procesado';

    // Razones
    const RAZON_CLIENTE_SOLICITUD = 'cliente_solicitud';
    const RAZON_PRODUCTO_DEFECTUOSO = 'producto_defectuoso';
    const RAZON_CAMBIO_OPINION = 'cambio_de_opinion';
    const RAZON_NO_DISPONIBLE = 'no_disponible';
    const RAZON_ERROR_PAGO = 'error_pago';
    const RAZON_OTRO = 'otro';

    protected $fillable = [
        'id_pago',
        'id_pedido',
        'monto_reembolso',
        'razon',
        'descripcion',
        'estado',
        'usuario_aprobacion'
    ];

    protected $casts = [
        'monto_reembolso' => 'decimal:2',
        'fecha_solicitud' => 'datetime',
        'fecha_procesamiento' => 'datetime'
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

    public function usuarioAprobacion()
    {
        return $this->belongsTo(Usuario::class, 'usuario_aprobacion', 'id_usuario');
    }

    // ==================== Scopes ====================

    public function scopeEstado($query, $estado)
    {
        return $query->where('estado', $estado);
    }

    public function scopeRazon($query, $razon)
    {
        return $query->where('razon', $razon);
    }

    public function scopePendientes($query)
    {
        return $query->where('estado', self::ESTADO_SOLICITADO);
    }

    public function scopeAprobados($query)
    {
        return $query->where('estado', self::ESTADO_APROBADO);
    }

    public function scopeProcesados($query)
    {
        return $query->where('estado', self::ESTADO_PROCESADO);
    }

    // ==================== Métodos ====================

    /**
     * Aprobar reembolso
     */
    public function aprobar($usuarioId = null)
    {
        $this->estado = self::ESTADO_APROBADO;
        $this->usuario_aprobacion = $usuarioId;
        return $this->save();
    }

    /**
     * Rechazar reembolso
     */
    public function rechazar()
    {
        $this->estado = self::ESTADO_RECHAZADO;
        return $this->save();
    }

    /**
     * Procesar reembolso
     */
    public function procesar()
    {
        $this->estado = self::ESTADO_PROCESADO;
        $this->fecha_procesamiento = now();
        return $this->save();
    }

    /**
     * Obtener estados disponibles
     */
    public static function getEstados()
    {
        return [
            self::ESTADO_SOLICITADO => 'Solicitado',
            self::ESTADO_APROBADO => 'Aprobado',
            self::ESTADO_RECHAZADO => 'Rechazado',
            self::ESTADO_PROCESADO => 'Procesado'
        ];
    }

    /**
     * Obtener razones disponibles
     */
    public static function getRazones()
    {
        return [
            self::RAZON_CLIENTE_SOLICITUD => 'Solicitud del Cliente',
            self::RAZON_PRODUCTO_DEFECTUOSO => 'Producto Defectuoso',
            self::RAZON_CAMBIO_OPINION => 'Cambio de Opinión',
            self::RAZON_NO_DISPONIBLE => 'No Disponible',
            self::RAZON_ERROR_PAGO => 'Error de Pago',
            self::RAZON_OTRO => 'Otro'
        ];
    }
}

