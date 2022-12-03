<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Term;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PaymentController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'invoice'=>'required',
            'student'=>'required',
            'amount'=>'required',
            'description'=>'required',
        ]);


        $term=Term::orderBy('id','desc')->first();
        if($term==null){
            throw ValidationException::withMessages([
                'description' => ['looks like you have not created a term yet'],
            ]);
        }

        $p=new Payment();
        $p->student_id=$request->student;
        $p->invoice_id=$request->invoice;
        $p->amount=$request->amount;
        $p->description=$request->description;
        $p->term_id=$term->id;
        $p->save();
        return $p;
    }

    public function get(){
        return Payment::orderBy('id','desc')->get();
    }


    public function getByFee($id){
        return Payment::where('invoice_id',$id)->orderBy('id','desc')->get();
    }

    public function delete($id){
        $p=Payment::find($id);
        return $p->delete();
    }
}
