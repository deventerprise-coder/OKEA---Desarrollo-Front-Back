<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use App\Models\Pedido;
use App\Models\HistorialPago;
use App\Models\AuditoriaTransaccion;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use DB;

class PagosController extends Controller
{
    // ==================== CRUD BÁSICO ====================

    /**
     * Obtener todos los pagos con filtros opcionales
     */
    public function index(Request $request)
    {
        try {
            $query = Pago::query();

            // Filtros
            if ($request->has('estado')) {
                $query->estado($request->estado);
            }

            if ($request->has('metodo_pago')) {
                $query->metodoPago($request->metodo_pago);
            }

            if ($request->has('id_usuario')) {
                $query->usuario($request->id_usuario);
            }

            if ($request->has('id_pedido')) {
                $query->pedido($request->id_pedido);
            }

            if ($request->has('desde') && $request->has('hasta')) {
                $query->fechas($request->desde, $request->hasta);
            }

            // Paginación
            $pagos = $query->with(['pedido', 'usuario'])
                ->orderBy('fecha_creacion', 'desc')
                ->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $pagos,
                'message' => 'Pagos obtenidos correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener pagos: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener un pago específico
     */
    public function show($id)
    {
        try {
            $pago = Pago::with([
                'pedido',
                'usuario',
                'historial',
                'reembolsos',
                'auditoria'
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $pago,
                'message' => 'Pago obtenido correctamente'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pago no encontrado'
            ], 404);
        }
    }

    /**
     * Crear un nuevo pago
     */
    public function store(Request $request)
    {
        try {
            // Validar datos
            $validated = $request->validate([
                'id_pedido' => 'required|exists:pedidos,id_pedido',
                'id_usuario' => 'required|exists:usuarios,id_usuario',
                'monto' => 'required|numeric|min:0.01',
                'metodo_pago' => ['required', Rule::in(array_keys(Pago::getMetodosPago()))],
                'numero_transaccion' => 'required|unique:pagos,numero_transaccion',
                'referencia_externa' => 'nullable|string',
                'descripcion' => 'nullable|string'
            ]);

            // Verificar que el pedido existe y pertenece al usuario
            $pedido = Pedido::findOrFail($validated['id_pedido']);
            if ($pedido->id_usuario !== $validated['id_usuario']) {
                return response()->json([
                    'success' => false,
                    'message' => 'El pedido no pertenece al usuario especificado'
                ], 403);
            }

            DB::beginTransaction();

            try {
                // Crear pago
                $pago = Pago::create([
                    ...$validated,
                    'estado' => Pago::ESTADO_PENDIENTE
                ]);

                // Registrar en auditoría
                AuditoriaTransaccion::registrar(
                    'pago_creado',
                    ['monto' => $pago->monto, 'metodo' => $pago->metodo_pago],
                    $pago->id_pago,
                    $pago->id_pedido,
                    auth()->id(),
                    $request->ip()
                );

                DB::commit();

                return response()->json([
                    'success' => true,
                    'data' => $pago,
                    'message' => 'Pago creado correctamente'
                ], 201);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validación fallida',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear pago: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar un pago
     */
    public function update(Request $request, $id)
    {
        try {
            $pago = Pago::findOrFail($id);

            $validated = $request->validate([
                'descripcion' => 'nullable|string',
                'referencia_externa' => 'nullable|string',
            ]);

            $pago->update($validated);

            return response()->json([
                'success' => true,
                'data' => $pago,
                'message' => 'Pago actualizado correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar pago: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar un pago (solo si está pendiente)
     */
    public function destroy($id)
    {
        try {
            $pago = Pago::findOrFail($id);

            if (!$pago->esPendiente()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se pueden eliminar pagos pendientes'
                ], 400);
            }

            $pago->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pago eliminado correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar pago: ' . $e->getMessage()
            ], 500);
        }
    }

    // ==================== GESTIÓN DE ESTADO ====================

    /**
     * Marcar pago como completado y actualizar pedido
     */
    public function completar(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $pago = Pago::findOrFail($id);

            if (!$pago->esPendiente() && $pago->estado !== Pago::ESTADO_PROCESANDO) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'El pago no puede ser completado desde su estado actual'
                ], 400);
            }

            // Actualizar estado del pago
            $pago->cambiarEstado(
                Pago::ESTADO_COMPLETADO,
                $request->get('comentario'),
                auth()->id()
            );

            // Actualizar estado del pedido
            $pedido = $pago->pedido;
            $pedido->estado = 'pagado';
            $pedido->save();

            // Registrar auditoría
            AuditoriaTransaccion::registrar(
                'pago_completado',
                ['monto' => $pago->monto],
                $pago->id_pago,
                $pago->id_pedido,
                auth()->id(),
                $request->ip()
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $pago,
                'message' => 'Pago completado y pedido actualizado'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al completar pago: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Marcar pago como fallido
     */
    public function fallido(Request $request, $id)
    {
        try {
            $pago = Pago::findOrFail($id);

            $pago->cambiarEstado(
                Pago::ESTADO_FALLIDO,
                $request->get('comentario', 'Pago rechazado'),
                auth()->id()
            );

            // Registrar auditoría
            AuditoriaTransaccion::registrar(
                'pago_fallido',
                ['motivo' => $request->get('comentario', 'No especificado')],
                $pago->id_pago,
                $pago->id_pedido,
                auth()->id(),
                $request->ip()
            );

            return response()->json([
                'success' => true,
                'data' => $pago,
                'message' => 'Pago marcado como fallido'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al marcar pago como fallido: ' . $e->getMessage()
            ], 500);
        }
    }

    // ==================== CONEXIÓN CON PEDIDOS ====================

    /**
     * Obtener pagos de un pedido confirmado
     */
    public function pagosPorPedido($idPedido)
    {
        try {
            $pedido = Pedido::findOrFail($idPedido);
            $pagos = $pedido->pagos()->with('historial')->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'pedido' => $pedido,
                    'pagos' => $pagos
                ],
                'message' => 'Pagos del pedido obtenidos'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener pagos de un usuario
     */
    public function pagosPorUsuario($idUsuario)
    {
        try {
            $pagos = Pago::usuario($idUsuario)
                ->with(['pedido', 'historial'])
                ->orderBy('fecha_creacion', 'desc')
                ->paginate(15);

            return response()->json([
                'success' => true,
                'data' => $pagos,
                'message' => 'Pagos del usuario obtenidos'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }

    // ==================== DATOS PARA DROPDOWN ====================

    /**
     * Obtener métodos de pago disponibles
     */
    public function metodosPago()
    {
        return response()->json([
            'success' => true,
            'data' => Pago::getMetodosPago(),
            'message' => 'Métodos de pago obtenidos'
        ]);
    }

    /**
     * Obtener estados de pago disponibles
     */
    public function estados()
    {
        return response()->json([
            'success' => true,
            'data' => Pago::getEstados(),
            'message' => 'Estados de pago obtenidos'
        ]);
    }
}

