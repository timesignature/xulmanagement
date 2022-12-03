<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AttendanceController extends Controller
{
    public function clock_in(Request $request){


        $d=Attendance::where(function ($q) use($request){
            $q->where('employee_id',$request->employee);
            $q->where('active',true);
        })->first();

        if($d){
            throw ValidationException::withMessages([
                'employee' => ['employee has not been clocked out yet'],
            ]);
        }


        $d=new Attendance();
        $d->clock_in=Carbon::now();
        $d->employee_id=$request->employee;
        $d->active=true;
        $d->save();



        return Employee::find($request->employee);
    }

    public function clock_out(Request $request){
        $d=Attendance::where(function ($q) use($request){
            $q->where('employee_id',$request->employee);
            $q->where('active',true);
        })->first();

        if($d==null){
            throw ValidationException::withMessages([
                'employee' => ['the employee has not been clocked in'],
            ]);
        }

        $d->clock_out=Carbon::now();
        $d->employee_id=$request->employee;
        $d->active=false;
        $d->update();

        return Employee::find($request->employee);

    }


    public function add(Request $request){
        $this->validate($request,[
            'type'=>'required',
            'employee'=>'required|exists:employees,id'
        ]);

        if($request->type=='clock_in'){
            $this->clock_in($request);
        }else{
          $this->clock_out($request);
        }
    }

    public function manual(Request $request){
        $this->validate($request,[
            'in'=>'required',
            'out'=>'required',
            'employee'=>'required|exists:employees,id'
        ]);

        Attendance::where('active',true)->update(['active'=>false]);

        $d=new Attendance();
        $d->clock_in=$request->in;
        $d->clock_out=$request->out;
        $d->employee_id=$request->employee;
        $d->active=false;
        $d->save();

    }


    public function get(){
        return Attendance::with(['employee'])->orderBy('id','desc')->get();
    }
}
