<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use App\Models\Term;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SalaryController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'month'=>'required|unique:salaries',
            'amount'=>'required|numeric'
        ]);



        $term=Term::orderBy('id','desc')->first();

        if($term==null){
            throw ValidationException::withMessages([
                'month' => ['looks like you have not created a term yet'],
            ]);
        }

        $d=new Salary();
        $d->month=$request->month;
        $d->amount=$request->amount;
        $d->term_id=$term->id;
        $d->save();
        return $d;
    }

    public function get(){
        return Salary::orderBy('month','desc')->get();
    }



    public function delete($id){
        $salary=Salary::find($id);
        $salary->delete();
        return $salary;
    }
}
