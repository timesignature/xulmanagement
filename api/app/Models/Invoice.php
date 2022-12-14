<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;


    public function student(){
        return $this->belongsTo(Student::class);
    }


    public function term(){
        return $this->belongsTo(Term::class);
    }
}
