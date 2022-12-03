<?php

namespace App\Http\Controllers;

use App\Models\Guardian;
use Illuminate\Http\Request;

class GuardianController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'name'=>'required',
            'national_id'=>'required|unique:guardians,national_id',
            'phone'=>'required',
            'address'=>'required',
            'city'=>'required',
            'country'=>'required',
        ]);


        $d=new Guardian();
        $d->name=$request->name;
        $d->national_id=$request->national_id;
        $d->phone=$request->phone;
        $d->address=$request->address;
        $d->city=$request->city;
        $d->country=$request->country;
        $d->save();
        return $d;
    }


    public function get(){
        return Guardian::orderBy('id','desc')->get();
    }
}
