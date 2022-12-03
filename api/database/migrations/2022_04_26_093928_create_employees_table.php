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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('surname')->nullable();
            $table->text('fullname')->nullable();
            $table->text('avatar')->nullable();
            $table->date('dob')->nullable();
            $table->date('joining')->nullable();
            $table->text('religion')->nullable();
            $table->text('nationality')->nullable();
            $table->text('national_id')->nullable();
            $table->text('phone')->nullable();
            $table->text('email')->nullable();
            $table->text('address')->nullable();
            $table->text('city')->nullable();
            $table->text('country')->nullable();
            $table->bigInteger('department_id')->nullable();
            $table->bigInteger('designation_id')->nullable();
            $table->boolean('isActive')->default(true);
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
        Schema::dropIfExists('employees');
    }
};
