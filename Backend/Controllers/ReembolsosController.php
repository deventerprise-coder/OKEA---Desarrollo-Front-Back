<?php

namespace App\Http\Controllers;

use App\Models\Reembolso;
use App\Models\Pago;
use App\Models\AuditoriaTransaccion;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use DB;

class ReembolsosController extends Controller
{
    /**
     * Listar reembolsos con filtros
     */
    public function index(Request $request)
    {
        try {
            $query = Reembolso::query();

            if ($request->has('estado')) {
                $query->estado($request->estado);
            }

            if ($request->has('razon')) {
                $query->razon($request->razon);
            }

            $reembolsos = $query->with(['pago', 'pedido', 'usuarioAprobacion'])
                ->orderBy('fecha_solicitud', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $reembolsos,
                'message' => 'Reembolsos obtenidos'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener reembolso específico
     */
    public function show($id)
    {
        try {
            $reembolso = Reembolso::with([
                'pago',
                'pedido',
                'usuarioAprobacion'
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $reembolso,
                'message' => 'Reembolso obtenido'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Reembolso no encontrado'
            ], 404);
        }
    }

    /**
     * Solicitar reembolso
     */
    public function solicitar(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_pago' => 'required|exists:pagos,id_pago',
                'id_pedido' => 'required|exists:pedidos,id_pedido',
                'monto_reembolso' => 'required|numeric|min:0.01',
                'razon' => ['required', Rule::in(array_keys(Reembolso::getRazones()))],
                'descripcion' => 'nullable|string'
            ]);

            DB::beginTransaction();

            try {
                // Crear reembolso
                $reembolso = Reembolso::create([
                    ...$validated,
                    'estado' => Reembolso::ESTADO_SOLICITADO
                ]);

                // Registrar auditoría
                AuditoriaTransaccion::registrar(
                    'reembolso_solicitado',
                    ['monto' => $reembolso->monto_reembolso, 'razon' => $reembolso->razon],
                    $reembolso->id_pago,
                    $reembolso->id_pedido,
                    auth()->id(),
                    $request->ip()
                );

                DB::commit();

                return response()->json([
                    'success' => true,
                    'data' => $reembolso,
                    'message' => 'Reembolso solicitado correctamente'
                ], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al solicitar reembolso: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Aprobar reembolso
     */
    public function aprobar(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $reembolso = Reembolso::findOrFail($id);

            if ($reembolso->estado !== Reembolso::ESTADO_SOLICITADO) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se pueden aprobar reembolsos solicitados'
                ], 400);
            }

            $reembolso->aprobar(auth()->id());

            // Registrar auditoría
            AuditoriaTransaccion::registrar(
                'reembolso_aprobado',
                ['monto' => $reembolso->monto_reembolso],
                $reembolso->id_pago,
                $reembolso->id_pedido,
                auth()->id(),
                $request->ip()
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $reembolso,
                'message' => 'Reembolso aprobado'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Rechazar reembolso
     */
    public function rechazar(Request $request, $id)
    {
        try {
            $reembolso = Reembolso::findOrFail($id);
            $reembolso->rechazar();

            // Registrar auditoría
            AuditoriaTransaccion::registrar(
                'reembolso_rechazado',
                ['motivo' => $request->get('motivo', 'No especificado')],
                $reembolso->id_pago,
                $reembolso->id_pedido,
                auth()->id(),
                $request->ip()
            );

            return response()->json([
                'success' => true,
                'data' => $reembolso,
                'message' => 'Reembolso rechazado'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Procesar reembolso (ejecutar la devolución)
     */
    public function procesar(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $reembolso = Reembolso::findOrFail($id);

            if ($reembolso->estado !== Reembolso::ESTADO_APROBADO) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se pueden procesar reembolsos aprobados'
                ], 400);
            }

            $reembolso->procesar();

            // Actualizar estado del pago
            $pago = $reembolso->pago;
            $pago->marcarReembolsado();

            // Registrar auditoría
            AuditoriaTransaccion::registrar(
                'reembolso_procesado',
                ['monto' => $reembolso->monto_reembolso],
                $reembolso->id_pago,
                $reembolso->id_pedido,
                auth()->id(),
                $request->ip()
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $reembolso,
                'message' => 'Reembolso procesado correctamente'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener razones disponibles
     */
    public function razones()
    {
        return response()->json([
            'success' => true,
            'data' => Reembolso::getRazones(),
            'message' => 'Razones de reembolso obtenidas'
        ]);
    }

    /**
     * Obtener estados de reembolso
     */
    public function estados()
    {
        return response()->json([
            'success' => true,
            'data' => Reembolso::getEstados(),
            'message' => 'Estados de reembolso obtenidos'
        ]);
    }
}

