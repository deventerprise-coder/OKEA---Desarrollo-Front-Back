<?php

namespace App\Services;

use App\Models\MetricasDashboard;
use App\Models\Pago;
use App\Models\Pedido;
use App\Models\Reembolso;
use App\Models\Usuario;
use DB;

class DashboardService
{
    /**
     * Calcular métricas completas del dashboard
     */
    public static function calcularMetricasCompletas($fecha = null)
    {
        $fecha = $fecha ?? now()->toDateString();
        $diaInicio = \Carbon\Carbon::parse($fecha)->startOfDay();
        $diaFin = \Carbon\Carbon::parse($fecha)->endOfDay();

        $datos = [
            'total_ventas' => Pago::completados()
                ->fechas($diaInicio, $diaFin)
                ->sum('monto'),

            'total_ordenes' => Pedido::whereBetween('fecha_pedido', [$diaInicio, $diaFin])
                ->count(),

            'ordenes_pagadas' => Pago::completados()
                ->fechas($diaInicio, $diaFin)
                ->distinct('id_pedido')
                ->count('id_pedido'),

            'ordenes_pendientes' => Pedido::where('estado', 'pendiente')
                ->whereBetween('fecha_pedido', [$diaInicio, $diaFin])
                ->count(),

            'ordenes_canceladas' => Pedido::where('estado', 'cancelado')
                ->whereBetween('fecha_pedido', [$diaInicio, $diaFin])
                ->count(),

            'total_clientes' => Usuario::count(),

            'clientes_nuevos' => Usuario::whereBetween('fecha_registro', [$diaInicio, $diaFin])
                ->count(),

            'reembolsos_procesados' => Reembolso::where('estado', 'procesado')
                ->whereBetween('fecha_procesamiento', [$diaInicio, $diaFin])
                ->count(),

            'total_reembolsos' => Reembolso::where('estado', 'procesado')
                ->whereBetween('fecha_procesamiento', [$diaInicio, $diaFin])
                ->sum('monto_reembolso')
        ];

        $datos['promedio_venta'] = $datos['ordenes_pagadas'] > 0
            ? $datos['total_ventas'] / $datos['ordenes_pagadas']
            : 0;

        return $datos;
    }

    /**
     * Obtener tasa de conversión
     */
    public static function calcularTasaConversion($desde, $hasta)
    {
        $visitantesUnicos = Usuario::whereBetween('fecha_registro', [$desde, $hasta])
            ->count();

        $compradoresUnicos = Pedido::whereBetween('fecha_pedido', [$desde, $hasta])
            ->distinct('id_usuario')
            ->count('id_usuario');

        return $visitantesUnicos > 0 ? ($compradoresUnicos / $visitantesUnicos) * 100 : 0;
    }

    /**
     * Obtener tasa de devolución
     */
    public static function calcularTasaDevolucion($desde, $hasta)
    {
        $totalPagos = Pago::completados()
            ->fechas($desde, $hasta)
            ->count();

        $reembolsosProcesados = Reembolso::where('estado', 'procesado')
            ->whereBetween('fecha_procesamiento', [$desde, $hasta])
            ->count();

        return $totalPagos > 0 ? ($reembolsosProcesados / $totalPagos) * 100 : 0;
    }

    /**
     * Obtener resumen ejecutivo
     */
    public static function obtenerResumenEjecutivo($desde = null, $hasta = null)
    {
        $desde = $desde ?? now()->subDays(30)->startOfDay();
        $hasta = $hasta ?? now()->endOfDay();

        $totalVentas = Pago::completados()
            ->fechas($desde, $hasta)
            ->sum('monto');

        $totalOrdenes = Pedido::whereBetween('fecha_pedido', [$desde, $hasta])->count();

        $ordenesPagadas = Pago::completados()
            ->fechas($desde, $hasta)
            ->distinct('id_pedido')
            ->count('id_pedido');

        $tasaConversion = self::calcularTasaConversion($desde, $hasta);
        $tasaDevolucion = self::calcularTasaDevolucion($desde, $hasta);

        return [
            'total_ventas' => round($totalVentas, 2),
            'total_ordenes' => $totalOrdenes,
            'ordenes_pagadas' => $ordenesPagadas,
            'promedio_venta' => $ordenesPagadas > 0 ? round($totalVentas / $ordenesPagadas, 2) : 0,
            'tasa_conversion' => round($tasaConversion, 2),
            'tasa_devolucion' => round($tasaDevolucion, 2),
            'periodo' => ['desde' => $desde, 'hasta' => $hasta]
        ];
    }

    /**
     * Obtener productos más vendidos
     */
    public static function obtenerProductosMasVendidos($limite = 10, $desde = null, $hasta = null)
    {
        $desde = $desde ?? now()->subDays(30)->startOfDay();
        $hasta = $hasta ?? now()->endOfDay();

        return DB::table('detalle_pedido')
            ->join('pedidos', 'detalle_pedido.id_pedido', '=', 'pedidos.id_pedido')
            ->join('productos', 'detalle_pedido.id_producto', '=', 'productos.id_producto')
            ->whereBetween('pedidos.fecha_pedido', [$desde, $hasta])
            ->select(
                'productos.id_producto',
                'productos.nombre',
                'productos.precio',
                DB::raw('SUM(detalle_pedido.cantidad) as total_cantidad'),
                DB::raw('SUM(detalle_pedido.cantidad * detalle_pedido.precio_unitario) as total_ventas')
            )
            ->groupBy('productos.id_producto', 'productos.nombre', 'productos.precio')
            ->orderBy('total_cantidad', 'desc')
            ->limit($limite)
            ->get()
            ->toArray();
    }

    /**
     * Obtener categorías con mejor desempeño
     */
    public static function obtenerCategoriasMejorDesempen~o($limite = 10, $desde = null, $hasta = null)
    {
        $desde = $desde ?? now()->subDays(30)->startOfDay();
        $hasta = $hasta ?? now()->endOfDay();

        return DB::table('detalle_pedido')
            ->join('pedidos', 'detalle_pedido.id_pedido', '=', 'pedidos.id_pedido')
            ->join('productos', 'detalle_pedido.id_producto', '=', 'productos.id_producto')
            ->join('categorias', 'productos.id_categoria', '=', 'categorias.id_categoria')
            ->whereBetween('pedidos.fecha_pedido', [$desde, $hasta])
            ->select(
                'categorias.id_categoria',
                'categorias.nombre_categoria',
                DB::raw('COUNT(DISTINCT detalle_pedido.id_pedido) as cantidad_pedidos'),
                DB::raw('SUM(detalle_pedido.cantidad) as cantidad_productos'),
                DB::raw('SUM(detalle_pedido.cantidad * detalle_pedido.precio_unitario) as total_ventas')
            )
            ->groupBy('categorias.id_categoria', 'categorias.nombre_categoria')
            ->orderBy('total_ventas', 'desc')
            ->limit($limite)
            ->get()
            ->toArray();
    }
}

