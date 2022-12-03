<?php

namespace App\Http\Controllers;

use App\Models\SalaryProperty;
use Illuminate\Http\Request;

class SalaryPropertyController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'description'=>'required|unique:salary_properties',
            'type'=>'required',
        ]);

        $d=new SalaryProperty();
        $d->description=$request->description;
        $d->type=$request->type;
        $d->save();
        return $d;
    }

    public function get(Request $request){

        $query=SalaryProperty::query();

        if(strlen($request->type)>0){
            $query->where('type','=',$request->type);
        }


            return $query->orderBy('type')->get();
    }
}
