<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarritoController;

// Ruta para crear un carrito
Route::post('/carrito/{id_usuario}/crear', [CarritoController::class, 'crearCarrito']);

// Ruta para agregar un producto al carrito
Route::post('/carrito/{id_carrito}/agregar', [CarritoController::class, 'agregarProductoCarrito']);

// Ruta para registrar un pedido
Route::post('/carrito/{id_carrito}/registrar', [CarritoController::class, 'registrarPedido']);

// Ruta para agregar una dirección
Route::post('/direccion/agregar', [CarritoController::class, 'agregarDireccion']);

// Ruta para confirmar un pedido y actualizar el stock
Route::post('/pedido/{id_pedido}/confirmar', [CarritoController::class, 'confirmarPedido']);
