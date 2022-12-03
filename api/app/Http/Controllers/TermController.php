<?php

namespace App\Http\Controllers;

use App\Models\Term;
use Illuminate\Http\Request;

class TermController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'description'=>'required|unique:terms',
            'end'=>'required|date',
            'start'=>['required','date','before:'.$request->end],
        ]);


        Term::where('is_active',true)->update(['is_active'=>false]);

        $d=new Term();
        $d->description=$request->description;
        $d->start=$request->start;
        $d->end=$request->end;
        $d->save();
        return $d;
    }

    public function get(){
        return Term::orderBy('id','desc')->get();
    }

    public function getCurrent(){
        return Term::orderBy('id','desc')->first();
    }
}
