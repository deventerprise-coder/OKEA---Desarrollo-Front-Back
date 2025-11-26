<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDireccionesTable extends Migration
{
    public function up()
    {
        Schema::create('direcciones', function (Blueprint $table) {
            $table->id('id_direccion');
            $table->foreignId('id_usuario')->constrained('usuarios')->onDelete('cascade');
            $table->string('calle');
            $table->string('ciudad');
            $table->string('provincia')->nullable();
            $table->string('pais')->nullable();
            $table->enum('tipo', ['envio', 'facturacion']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('direcciones');
    }
}
