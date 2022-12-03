<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    public function guardian(){
        return $this->belongsTo(Guardian::class);
    }

    public function section(){
        return $this->belongsTo(Section::class,'section_id');
    }
}
