<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MetricasDashboard extends Model
{
    use HasFactory;

    protected $table = 'metricas_dashboard';
    protected $primaryKey = 'id_metrica';
    public $timestamps = true;

    const CREATED_AT = 'fecha_creacion';
    const UPDATED_AT = 'fecha_actualizacion';

    protected $fillable = [
        'fecha_reporte',
        'total_ventas',
        'total_ordenes',
        'ordenes_pagadas',
        'ordenes_pendientes',
        'ordenes_canceladas',
        'promedio_venta',
        'total_clientes',
        'clientes_nuevos',
        'producto_mas_vendido',
        'cantidad_producto_mas_vendido',
        'metodo_pago_preferido',
        'tasa_conversion',
        'tasa_devolucion',
        'reembolsos_procesados',
        'total_reembolsos'
    ];

    protected $casts = [
        'fecha_reporte' => 'date',
        'total_ventas' => 'decimal:2',
        'promedio_venta' => 'decimal:2',
        'tasa_conversion' => 'decimal:2',
        'tasa_devolucion' => 'decimal:2',
        'total_reembolsos' => 'decimal:2'
    ];

    // ==================== Relaciones ====================

    public function productoMasVendido()
    {
        return $this->belongsTo(Producto::class, 'producto_mas_vendido', 'id_producto');
    }

    // ==================== Scopes ====================

    public function scopeFecha($query, $fecha)
    {
        return $query->where('fecha_reporte', $fecha);
    }

    public function scopeRangoFechas($query, $desde, $hasta)
    {
        return $query->whereBetween('fecha_reporte', [$desde, $hasta]);
    }

    public function scopeUltimoDia($query)
    {
        return $query->where('fecha_reporte', now()->toDateString());
    }

    // ==================== Métodos ====================

    /**
     * Obtener métricas del día actual
     */
    public static function getMetricasHoy()
    {
        return self::where('fecha_reporte', now()->toDateString())->first();
    }

    /**
     * Obtener métricas de un rango de fechas
     */
    public static function getMetricasPorRango($desde, $hasta)
    {
        return self::whereBetween('fecha_reporte', [$desde, $hasta])->get();
    }

    /**
     * Obtener métricas de los últimos N días
     */
    public static function getUltimosNDias($dias = 30)
    {
        $desde = now()->subDays($dias);
        $hasta = now();
        return self::rangoFechas($desde, $hasta)->get();
    }
}

