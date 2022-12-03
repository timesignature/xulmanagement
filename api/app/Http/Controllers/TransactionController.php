<?php

namespace App\Http\Controllers;

use App\Models\Term;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TransactionController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'description'=>'required',
            'amount'=>'required',
            'type'=>'required',
        ]);


        $term=Term::orderBy('id','desc')->first();

        if($term==null){
            throw ValidationException::withMessages([
                'description' => ['looks like you have not created a term yet'],
            ]);
        }

        $d=new Transaction();
        $d->description=$request->description;
        $d->amount=$request->amount;
        $d->type=$request->type;
        $d->term_id=$term->id;
        $d->save();
        return $d;


    }

    public function get(Request $request){

        $query=Transaction::query();
        if(strlen($request->type)>0){
            $query->where('type','=',$request->type);
        }

        return $query->orderBy('id','desc')->get();
    }

    public function getOne($id){
        return Transaction::find($id);
    }


    public function edit(Request $request,$id){
        $this->validate($request,[
            'description'=>'required',
            'amount'=>'required',
            'type'=>'required',
        ]);

        $d=Transaction::find($id);
        $d->description=$request->description;
        $d->amount=$request->amount;
        $d->type=$request->type;
        $d->save();
        return $d;


    }


    public function delete($id){
        $t=Transaction::find($id);
        return $t->delete();
    }
}
