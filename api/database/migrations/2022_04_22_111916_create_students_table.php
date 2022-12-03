<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('surname')->nullable();
            $table->text('fullname')->nullable();
            $table->text('avatar')->nullable();
            $table->text('dob')->nullable();
            $table->text('gender')->nullable();
            $table->text('nationality')->nullable();
            $table->text('national_id')->nullable();
            $table->text('religion')->nullable();
            $table->bigInteger('guardian_id')->nullable();
            $table->bigInteger('section_id')->nullable();
            $table->text('joining_date')->nullable();
            $table->text('status')->nullable();
            $table->boolean('is_active')->default(true);
            $table->text('reason')->nullable();
            $table->bigInteger('user_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
};
