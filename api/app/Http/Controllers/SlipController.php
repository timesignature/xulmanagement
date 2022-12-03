<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use App\Models\SalaryProperty;
use App\Models\Slip;
use Illuminate\Http\Request;

class SlipController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'amount'=>'required|numeric',
            'employee'=>'required|integer',
            'salary_property'=>'required|integer',
        ]);



        return Slip::updateOrCreate(
            [
                'salary_property_id'=>$request->salary_property,
                'employee_id'=>$request->employee,
            ],
            [
                'amount'=>$request->amount,
                'employee_id'=>$request->employee,
                'salary_property_id'=>$request->salary_property,

            ]);


    }

    public function get(){
        return Slip::orderBy('id','desc')->get();
    }


    public function getEmployeeSlip($id){
        $salary_properties=SalaryProperty::orderBy('type')->get();
        $salary_properties->map(function ($salary) use ($id) {
            $slip=Slip::where(function ($q) use ($salary, $id) {
                $q->where('employee_id',$id);
                $q->where('salary_property_id',$salary->id);
            })->first();

            if($slip){
                $salary->amount=$slip->amount;
            }else{
                $salary->amount=0;
            }
            return $salary;

        });
        return $salary_properties;

    }


    public function getTotalSalary(){
        $slips=Slip::with(['salaryProperty'])->get();
        $total=0;
        foreach ($slips as $slip){
            if($this->isDeduction($slip->salary_property_id)){
                $total-=$slip->amount;
            }else{
                $total+=$slip->amount;
            }
        }
        return $total;

    }

    public function isDeduction($id){
        $p=SalaryProperty::find($id);
        return $p->type=='deduction';
    }




}
