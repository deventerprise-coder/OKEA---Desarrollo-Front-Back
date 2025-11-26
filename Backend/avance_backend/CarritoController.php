<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;  // Asegúrate de que esta línea esté presente.
use App\Models\Carrito;
use App\Models\Producto;
use App\Models\Pedido;
use App\Models\Direccion;

class CarritoController extends Controller
{
    // Crear un nuevo carrito para un usuario
    public function crearCarrito($id_usuario)
    {
        $carrito = DB::select("CALL sp_insertar_carrito(:id_usuario)", ['id_usuario' => $id_usuario]);
        return response()->json($carrito);
    }

    // Agregar un producto al carrito
    public function agregarProductoCarrito($id_carrito, Request $request)
    {
        $id_producto = $request->id_producto;
        $cantidad = $request->cantidad;
        
        $producto = Producto::find($id_producto);
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        DB::select("CALL sp_agregar_producto_carrito(:id_carrito, :id_producto, :cantidad)", [
            'id_carrito' => $id_carrito,
            'id_producto' => $id_producto,
            'cantidad' => $cantidad
        ]);
        
        return response()->json(['message' => 'Producto agregado al carrito']);
    }

    // Registrar un pedido a partir de un carrito
    public function registrarPedido($id_carrito, $id_direccion)
    {
        $pedido = DB::select("CALL sp_registrar_pedido(:id_carrito, :id_direccion)", [
            'id_carrito' => $id_carrito,
            'id_direccion' => $id_direccion
        ]);
        return response()->json($pedido);
    }

    // Agregar una dirección de envío o facturación
    public function agregarDireccion(Request $request)
    {
        $direccion = new Direccion();
        $direccion->id_usuario = $request->id_usuario;
        $direccion->calle = $request->calle;
        $direccion->ciudad = $request->ciudad;
        $direccion->provincia = $request->provincia;
        $direccion->pais = $request->pais;
        $direccion->tipo = $request->tipo;
        $direccion->save();

        return response()->json(['message' => 'Dirección agregada']);
    }

    // Confirmar pago de pedido (actualiza el estado de pago)
    public function confirmarPedido($id_pedido)
    {
        $pedido = Pedido::find($id_pedido);
        if (!$pedido) {
            return response()->json(['error' => 'Pedido no encontrado'], 404);
        }

        $pedido->estado = 'pagado';
        $pedido->save();

        // Actualizar el stock de los productos
        $detalles_pedido = $pedido->detallePedido;
        foreach ($detalles_pedido as $detalle) {
            $producto = Producto::find($detalle->id_producto);
            $producto->stock -= $detalle->cantidad;
            $producto->save();
        }

        return response()->json(['message' => 'Pedido confirmado y stock actualizado']);
    }
}
