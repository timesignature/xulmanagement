<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\Request;

class DesignationController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'title'=>'required|unique:designations',
        ]);

        $d=new Designation();
        $d->title=$request->title;
        $d->save();
        return $d;


    }

    public function get(){
        return Designation::orderBy('id','desc')->get();
    }
}
