<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagosController;
use App\Http\Controllers\ReembolsosController;
use App\Http\Controllers\DashboardController;

/**
 * RUTAS API - PAGOS Y DASHBOARD
 * Prefix: /api
 */

// ==================== PAGOS ====================
Route::prefix('pagos')->group(function () {
    // CRUD Básico
    Route::get('/', [PagosController::class, 'index'])->name('pagos.index');
    Route::post('/', [PagosController::class, 'store'])->name('pagos.store');
    Route::get('/{id}', [PagosController::class, 'show'])->name('pagos.show');
    Route::put('/{id}', [PagosController::class, 'update'])->name('pagos.update');
    Route::delete('/{id}', [PagosController::class, 'destroy'])->name('pagos.destroy');

    // Gestión de estado
    Route::post('/{id}/completar', [PagosController::class, 'completar'])->name('pagos.completar');
    Route::post('/{id}/fallido', [PagosController::class, 'fallido'])->name('pagos.fallido');

    // Por pedido y usuario
    Route::get('/pedido/{idPedido}', [PagosController::class, 'pagosPorPedido'])->name('pagos.por_pedido');
    Route::get('/usuario/{idUsuario}', [PagosController::class, 'pagosPorUsuario'])->name('pagos.por_usuario');

    // Datos para dropdowns
    Route::get('/data/metodos', [PagosController::class, 'metodosPago'])->name('pagos.metodos');
    Route::get('/data/estados', [PagosController::class, 'estados'])->name('pagos.estados');
});


// ==================== REEMBOLSOS ====================
Route::prefix('reembolsos')->group(function () {
    Route::get('/', [ReembolsosController::class, 'index'])->name('reembolsos.index');
    Route::post('/', [ReembolsosController::class, 'solicitar'])->name('reembolsos.solicitar');
    Route::get('/{id}', [ReembolsosController::class, 'show'])->name('reembolsos.show');

    // Acciones
    Route::post('/{id}/aprobar', [ReembolsosController::class, 'aprobar'])->name('reembolsos.aprobar');
    Route::post('/{id}/rechazar', [ReembolsosController::class, 'rechazar'])->name('reembolsos.rechazar');
    Route::post('/{id}/procesar', [ReembolsosController::class, 'procesar'])->name('reembolsos.procesar');

    // Datos
    Route::get('/data/razones', [ReembolsosController::class, 'razones'])->name('reembolsos.razones');
    Route::get('/data/estados', [ReembolsosController::class, 'estados'])->name('reembolsos.estados');
});


// ==================== DASHBOARD ====================
Route::prefix('dashboard')->group(function () {
    // Resumen general
    Route::get('/resumen', [DashboardController::class, 'resumen'])->name('dashboard.resumen');

    // Métricas
    Route::get('/metricas/hoy', [DashboardController::class, 'metricasHoy'])->name('dashboard.metricas_hoy');
    Route::get('/metricas/rango', [DashboardController::class, 'metricasPorRango'])->name('dashboard.metricas_rango');
    Route::post('/metricas/recalcular', [DashboardController::class, 'recalcularMetricas'])->name('dashboard.recalcular');

    // Ventas
    Route::get('/ventas/detalle', [DashboardController::class, 'ventasDetalle'])->name('dashboard.ventas_detalle');
    Route::get('/ventas/por-metodo', [DashboardController::class, 'ventasPorMetodo'])->name('dashboard.ventas_metodo');
    Route::get('/ventas/tendencia', [DashboardController::class, 'tendenciaVentas'])->name('dashboard.ventas_tendencia');

    // Reportes
    Route::get('/reportes/reembolsos', [DashboardController::class, 'reporteReembolsos'])->name('dashboard.reporte_reembolsos');
    Route::get('/reportes/ordenes', [DashboardController::class, 'estadoOrdenes'])->name('dashboard.reporte_ordenes');
    Route::get('/reportes/clientes', [DashboardController::class, 'reporteClientes'])->name('dashboard.reporte_clientes');
});

