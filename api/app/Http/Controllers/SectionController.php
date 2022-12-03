<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'title'=>'required|unique:sections'
        ]);
        $d=new Section();
        $d->title=$request->title;
        $d->save();
        return $d;
    }

    public function get(){
        return Section::with(['students'])->orderBy('id','desc')->get();
    }
}
