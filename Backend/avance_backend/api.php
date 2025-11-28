<?php


// routes/api.php

use App\Http\Controllers\CarritoController;
use Illuminate\Support\Facades\Route;

// Ruta para crear un carrito
Route::post('/carrito/{id_usuario}/crear', [CarritoController::class, 'crearCarrito']);

// Ruta para agregar un producto al carrito
Route::post('/carrito/{id_carrito}/agregar', [CarritoController::class, 'agregarProductoCarrito']);

// Ruta para registrar un pedido a partir del carrito
Route::post('/carrito/{id_carrito}/registrar', [CarritoController::class, 'registrarPedido']);

// Ruta para agregar una nueva dirección
Route::post('/direccion/agregar', [CarritoController::class, 'agregarDireccion']);

// Ruta para confirmar un pedido (cambiar estado a "pagado")
Route::post('/pedido/{id_pedido}/confirmar', [CarritoController::class, 'confirmarPedido']);
