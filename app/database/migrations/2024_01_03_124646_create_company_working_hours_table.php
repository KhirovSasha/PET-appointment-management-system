<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company_working_hours', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->json('working_days');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_working_hours');
    }
};
