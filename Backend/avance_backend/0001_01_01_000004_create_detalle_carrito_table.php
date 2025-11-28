<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleCarritoTable extends Migration
{
    public function up()
    {
        Schema::create('detalle_carrito', function (Blueprint $table) {
            $table->id('id_detalle_carrito');
            $table->foreignId('id_carrito')->constrained('carrito')->onDelete('cascade');
            $table->foreignId('id_producto')->constrained('productos')->onDelete('cascade');
            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detalle_carrito');
    }
}
