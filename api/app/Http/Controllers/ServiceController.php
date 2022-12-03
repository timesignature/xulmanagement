<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'description'=>'required|unique:services',
            'amount'=>'required',
            'isActive'=>'required'
        ]);

        $d=new Service();
        $d->description=$request->description;
        $d->amount=$request->amount;
        $d->isActive=$request->isActive;
        $d->save();
        return $d;
    }

    public function edit(Request $request,$id){
        $this->validate($request,[
            'description'=>'required|unique:services,description,'.$id,
            'amount'=>'required',
            'isActive'=>'required'
        ]);

        $d=Service::find($id);
        $d->description=$request->description;
        $d->amount=$request->amount;
        $d->isActive=$request->isActive;
        $d->update();
        return $d;
    }

    public function get(){
        return Service::orderBy('id','desc')->get();
    }

    public function getOne($id){
        return Service::find($id);
    }
}
