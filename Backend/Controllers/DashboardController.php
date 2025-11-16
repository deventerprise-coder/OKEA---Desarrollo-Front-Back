<?php

namespace App\Http\Controllers;

use App\Models\MetricasDashboard;
use App\Models\Pago;
use App\Models\Pedido;
use App\Models\Reembolso;
use App\Models\Usuario;
use Illuminate\Http\Request;
use DB;

class DashboardController extends Controller
{
    /**
     * Obtener resumen general del dashboard
     */
    public function resumen(Request $request)
    {
        try {
            $desde = $request->get('desde', now()->startOfDay());
            $hasta = $request->get('hasta', now()->endOfDay());

            // Ventas totales
            $totalVentas = Pago::completados()
                ->fechas($desde, $hasta)
                ->sum('monto');

            // Total de órdenes
            $totalOrdenes = Pedido::whereBetween('fecha_pedido', [$desde, $hasta])
                ->count();

            // Órdenes pagadas
            $ordenesPagadas = Pago::completados()
                ->fechas($desde, $hasta)
                ->distinct('id_pedido')
                ->count('id_pedido');

            // Órdenes pendientes
            $ordenesPendientes = Pedido::where('estado', 'pendiente')
                ->whereBetween('fecha_pedido', [$desde, $hasta])
                ->count();

            // Promedio de venta
            $promedioVenta = $ordenesPagadas > 0 ? $totalVentas / $ordenesPagadas : 0;

            // Métodos de pago más usados
            $metodosPago = Pago::completados()
                ->fechas($desde, $hasta)
                ->select('metodo_pago', DB::raw('COUNT(*) as count'))
                ->groupBy('metodo_pago')
                ->orderBy('count', 'desc')
                ->get();

            // Total de clientes únicos
            $totalClientes = Usuario::count();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_ventas' => round($totalVentas, 2),
                    'total_ordenes' => $totalOrdenes,
                    'ordenes_pagadas' => $ordenesPagadas,
                    'ordenes_pendientes' => $ordenesPendientes,
                    'promedio_venta' => round($promedioVenta, 2),
                    'total_clientes' => $totalClientes,
                    'metodos_pago' => $metodosPago,
                    'periodo' => [
                        'desde' => $desde,
                        'hasta' => $hasta
                    ]
                ],
                'message' => 'Resumen del dashboard obtenido'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener resumen: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener métricas del día actual
     */
    public function metricasHoy()
    {
        try {
            $hoy = now()->toDateString();

            // Intentar obtener del caché
            $metrica = MetricasDashboard::where('fecha_reporte', $hoy)->first();

            if (!$metrica) {
                $metrica = $this->calcularMetricas($hoy);
            }

            return response()->json([
                'success' => true,
                'data' => $metrica,
                'message' => 'Métricas del día obtenidas'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener métricas de un rango de fechas
     */
    public function metricasPorRango(Request $request)
    {
        try {
            $desde = $request->get('desde', now()->subDays(30));
            $hasta = $request->get('hasta', now());

            $metricas = MetricasDashboard::whereBetween('fecha_reporte', [$desde, $hasta])
                ->orderBy('fecha_reporte', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $metricas,
                'message' => 'Métricas del período obtenidas'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener detalles de ventas
     */
    public function ventasDetalle(Request $request)
    {
        try {
            $desde = $request->get('desde', now()->startOfDay());
            $hasta = $request->get('hasta', now()->endOfDay());

            $ventas = Pago::completados()
                ->fechas($desde, $hasta)
                ->with(['pedido', 'usuario'])
                ->orderBy('fecha_creacion', 'desc')
                ->get()
                ->map(function ($pago) {
                    return [
                        'id_pago' => $pago->id_pago,
                        'id_pedido' => $pago->id_pedido,
                        'cliente' => $pago->usuario->nombre . ' ' . $pago->usuario->apellido,
                        'email' => $pago->usuario->email,
                        'monto' => $pago->monto,
                        'metodo_pago' => $pago->metodo_pago,
                        'fecha' => $pago->fecha_pago
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'total_ventas' => $ventas->sum('monto'),
                    'cantidad_ventas' => $ventas->count(),
                    'ventas' => $ventas
                ],
                'message' => 'Detalles de ventas obtenidos'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener gráfico de ventas por métodos de pago
     */
    public function ventasPorMetodo(Request $request)
    {
        try {
            $desde = $request->get('desde', now()->subDays(30)->startOfDay());
            $hasta = $request->get('hasta', now()->endOfDay());

            $ventasPorMetodo = Pago::completados()
                ->fechas($desde, $hasta)
                ->select('metodo_pago', DB::raw('COUNT(*) as cantidad'), DB::raw('SUM(monto) as total'))
                ->groupBy('metodo_pago')
                ->get()
                ->map(function ($item) {
                    return [
                        'metodo' => $item->metodo_pago,
                        'cantidad' => $item->cantidad,
                        'total' => round($item->total, 2),
                        'label' => Pago::getMetodosPago()[$item->metodo_pago] ?? $item->metodo_pago
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $ventasPorMetodo,
                'message' => 'Ventas por método obtenidas'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener tendencia de ventas
     */
    public function tendenciaVentas(Request $request)
    {
        try {
            $dias = $request->get('dias', 30);
            $desde = now()->subDays($dias)->startOfDay();
            $hasta = now()->endOfDay();

            $tendencia = [];

            for ($i = $dias; $i >= 0; $i--) {
                $fecha = now()->subDays($i)->toDateString();
                $diaInicio = now()->subDays($i)->startOfDay();
                $diaFin = now()->subDays($i)->endOfDay();

                $totalDia = Pago::completados()
                    ->fechas($diaInicio, $diaFin)
                    ->sum('monto');

                $cantidadDia = Pago::completados()
                    ->fechas($diaInicio, $diaFin)
                    ->count();

                $tendencia[] = [
                    'fecha' => $fecha,
                    'total' => round($totalDia, 2),
                    'cantidad' => $cantidadDia
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $tendencia,
                'message' => 'Tendencia de ventas obtenida'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener reporte de reembolsos
     */
    public function reporteReembolsos(Request $request)
    {
        try {
            $desde = $request->get('desde', now()->subDays(30)->startOfDay());
            $hasta = $request->get('hasta', now()->endOfDay());

            $reembolsos = Reembolso::whereBetween('fecha_solicitud', [$desde, $hasta])
                ->with(['pago', 'pedido', 'usuarioAprobacion'])
                ->get()
                ->groupBy('estado');

            $resumen = [
                'total_solicitados' => Reembolso::whereBetween('fecha_solicitud', [$desde, $hasta])->count(),
                'total_aprobados' => Reembolso::whereBetween('fecha_solicitud', [$desde, $hasta])->aprobados()->count(),
                'total_rechazados' => Reembolso::whereBetween('fecha_solicitud', [$desde, $hasta])->where('estado', 'rechazado')->count(),
                'total_procesados' => Reembolso::whereBetween('fecha_solicitud', [$desde, $hasta])->procesados()->count(),
                'monto_total' => Reembolso::whereBetween('fecha_solicitud', [$desde, $hasta])
                    ->where('estado', 'procesado')
                    ->sum('monto_reembolso')
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'resumen' => $resumen,
                    'reembolsos' => $reembolsos
                ],
                'message' => 'Reporte de reembolsos obtenido'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener estado de órdenes
     */
    public function estadoOrdenes(Request $request)
    {
        try {
            $desde = $request->get('desde', now()->subDays(30)->startOfDay());
            $hasta = $request->get('hasta', now()->endOfDay());

            $estados = Pedido::whereBetween('fecha_pedido', [$desde, $hasta])
                ->select('estado', DB::raw('COUNT(*) as cantidad'), DB::raw('SUM(total) as monto_total'))
                ->groupBy('estado')
                ->get()
                ->map(function ($item) {
                    return [
                        'estado' => $item->estado,
                        'cantidad' => $item->cantidad,
                        'monto_total' => round($item->monto_total, 2)
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $estados,
                'message' => 'Estado de órdenes obtenido'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener reporte de clientes
     */
    public function reporteClientes(Request $request)
    {
        try {
            $desde = $request->get('desde', now()->subDays(30)->startOfDay());
            $hasta = $request->get('hasta', now()->endOfDay());

            // Clientes nuevos
            $clientesNuevos = Usuario::whereBetween('fecha_registro', [$desde, $hasta])->count();

            // Clientes con compras
            $clientesConCompras = Pedido::whereBetween('fecha_pedido', [$desde, $hasta])
                ->distinct('id_usuario')
                ->count('id_usuario');

            // Clientes que completaron pagos
            $clientesConPagos = Pago::completados()
                ->fechas($desde, $hasta)
                ->distinct('id_usuario')
                ->count('id_usuario');

            // Top clientes por monto
            $topClientes = Pago::completados()
                ->fechas($desde, $hasta)
                ->with('usuario')
                ->select('id_usuario', DB::raw('SUM(monto) as total_compras'), DB::raw('COUNT(*) as cantidad_compras'))
                ->groupBy('id_usuario')
                ->orderBy('total_compras', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($item) {
                    return [
                        'usuario' => $item->usuario->nombre . ' ' . $item->usuario->apellido,
                        'email' => $item->usuario->email,
                        'total_compras' => round($item->total_compras, 2),
                        'cantidad_compras' => $item->cantidad_compras
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'clientes_nuevos' => $clientesNuevos,
                    'clientes_con_compras' => $clientesConCompras,
                    'clientes_con_pagos' => $clientesConPagos,
                    'top_clientes' => $topClientes
                ],
                'message' => 'Reporte de clientes obtenido'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Calcular y guardar métricas del día
     */
    private function calcularMetricas($fecha = null)
    {
        $fecha = $fecha ?? now()->toDateString();
        $diaInicio = \Carbon\Carbon::parse($fecha)->startOfDay();
        $diaFin = \Carbon\Carbon::parse($fecha)->endOfDay();

        $totalVentas = Pago::completados()->fechas($diaInicio, $diaFin)->sum('monto');
        $totalOrdenes = Pedido::whereBetween('fecha_pedido', [$diaInicio, $diaFin])->count();
        $ordenesPagadas = Pago::completados()->fechas($diaInicio, $diaFin)->distinct('id_pedido')->count('id_pedido');
        $ordenesPendientes = Pedido::where('estado', 'pendiente')->whereBetween('fecha_pedido', [$diaInicio, $diaFin])->count();
        $ordenesCanceladas = Pedido::where('estado', 'cancelado')->whereBetween('fecha_pedido', [$diaInicio, $diaFin])->count();
        $clientesNuevos = Usuario::whereBetween('fecha_registro', [$diaInicio, $diaFin])->count();
        $reembolsosProcesados = Reembolso::procesados()->whereBetween('fecha_procesamiento', [$diaInicio, $diaFin])->count();
        $totalReembolsos = Reembolso::procesados()->whereBetween('fecha_procesamiento', [$diaInicio, $diaFin])->sum('monto_reembolso');

        $metrica = MetricasDashboard::updateOrCreate(
            ['fecha_reporte' => $fecha],
            [
                'total_ventas' => $totalVentas,
                'total_ordenes' => $totalOrdenes,
                'ordenes_pagadas' => $ordenesPagadas,
                'ordenes_pendientes' => $ordenesPendientes,
                'ordenes_canceladas' => $ordenesCanceladas,
                'promedio_venta' => $ordenesPagadas > 0 ? $totalVentas / $ordenesPagadas : 0,
                'total_clientes' => Usuario::count(),
                'clientes_nuevos' => $clientesNuevos,
                'reembolsos_procesados' => $reembolsosProcesados,
                'total_reembolsos' => $totalReembolsos
            ]
        );

        return $metrica;
    }

    /**
     * Forzar recalcular métricas
     */
    public function recalcularMetricas(Request $request)
    {
        try {
            $fecha = $request->get('fecha', now()->toDateString());
            $metrica = $this->calcularMetricas($fecha);

            return response()->json([
                'success' => true,
                'data' => $metrica,
                'message' => 'Métricas recalculadas'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }
}

