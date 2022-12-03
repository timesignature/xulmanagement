<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'title'=>'required|unique:departments',
        ]);

        $d=new Department();
        $d->title=$request->title;
        $d->save();
        return $d;


    }

    public function get(){
        return Department::orderBy('id','desc')->get();
    }
}
