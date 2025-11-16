<?php

namespace App\Services;

use App\Models\Pago;
use App\Models\Pedido;
use App\Models\Reembolso;
use App\Models\HistorialPago;
use App\Models\AuditoriaTransaccion;
use DB;

class PagoService
{
    /**
     * Procesar pago completado y actualizar pedido
     */
    public static function procesarPagoCompletado($idPago, $fechaPago = null)
    {
        DB::beginTransaction();

        try {
            $pago = Pago::findOrFail($idPago);

            // Cambiar estado
            $pago->marcarCompletado($fechaPago);

            // Actualizar pedido asociado
            $pedido = $pago->pedido;
            $pedido->estado = 'pagado';
            $pedido->save();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Procesar reembolso del pago
     */
    public static function procesarReembolsoPago($idReembolso)
    {
        DB::beginTransaction();

        try {
            $reembolso = Reembolso::findOrFail($idReembolso);

            if ($reembolso->estado !== Reembolso::ESTADO_APROBADO) {
                throw new \Exception('Solo se pueden procesar reembolsos aprobados');
            }

            // Procesar reembolso
            $reembolso->procesar();

            // Marcar pago como reembolsado
            $pago = $reembolso->pago;
            $pago->marcarReembolsado();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Obtener estado de pago de un pedido
     */
    public static function obtenerEstadoPago($idPedido)
    {
        $pago = Pago::where('id_pedido', $idPedido)
            ->latest('fecha_creacion')
            ->first();

        return $pago ? [
            'id_pago' => $pago->id_pago,
            'estado' => $pago->estado,
            'monto' => $pago->monto,
            'metodo_pago' => $pago->metodo_pago,
            'fecha_pago' => $pago->fecha_pago
        ] : null;
    }

    /**
     * Validar si un pago puede ser procesado
     */
    public static function validarPagoProcesable($idPago)
    {
        $pago = Pago::findOrFail($idPago);

        $errores = [];

        if ($pago->estado === Pago::ESTADO_COMPLETADO) {
            $errores[] = 'El pago ya fue completado';
        }

        if ($pago->estado === Pago::ESTADO_FALLIDO) {
            $errores[] = 'El pago falló previamente';
        }

        if ($pago->estado === Pago::ESTADO_REEMBOLSADO) {
            $errores[] = 'El pago fue reembolsado';
        }

        return [
            'valido' => empty($errores),
            'errores' => $errores
        ];
    }

    /**
     * Generar número de transacción único
     */
    public static function generarNumeroTransaccion()
    {
        return 'TXN-' . now()->format('YmdHis') . '-' . strtoupper(substr(md5(uniqid()), 0, 8));
    }

    /**
     * Obtener historial de cambios de un pago
     */
    public static function obtenerHistorialPago($idPago)
    {
        return HistorialPago::where('id_pago', $idPago)
            ->with('usuario')
            ->orderBy('fecha_cambio', 'desc')
            ->get();
    }
}

