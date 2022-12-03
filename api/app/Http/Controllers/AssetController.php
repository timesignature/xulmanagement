<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'description'=>'required',
            'value'=>'required',
        ]);

        $d=new Asset();
        $d->description=$request->description;
        $d->value=$request->value;
        $d->save();
        return $d;


    }

    public function get(){
        return Asset::orderBy('id','desc')->get();
    }
}
