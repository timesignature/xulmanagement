<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\SalaryProperty;
use App\Models\Slip;
use Illuminate\Broadcasting\Broadcasters\LogBroadcaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;
use function Psy\debug;

class EmployeeController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'name'=>'required',
            'surname'=>'required',

            'dob'=>'required',
            'joining'=>'required',
            'religion'=>'required',
            'nationality'=>'required',
            'national_id'=>'required|unique:employees',
            'phone'=>'required',
            'email'=>'required|unique:employees',
            'address'=>'required',
            'city'=>'required',
            'country'=>'required',
            'department'=>'required',
            'designation'=>'required',
            'image'=>'required|mimes:jpg,jpeg,bmp,png,webp'
        ]);

        $d=new Employee();
        $d->name=$request->name;
        $d->surname=$request->surname;
        $d->fullname=$request->name.' '.$request->surname;
        $d->dob=$request->dob;
        $d->joining=$request->joining;
        $d->religion=$request->religion;
        $d->nationality=$request->nationality;
        $d->national_id=$request->national_id;
        $d->phone=$request->phone;
        $d->email=$request->email;
        $d->address=$request->address;
        $d->city=$request->city;
        $d->country=$request->country;
        $d->department_id=$request->department;
        $d->designation_id=$request->designation;
        $d->avatar=$this->image_upload($request,'employees');
        $d->save();
        return $d;
    }


    public function updateAvatar(Request $request,$id){

//        Log::debug('image update for employees');

        $this->validate($request,[
            'image'=>'required|mimes:jpg,jpeg,bmp,png,webp',
        ]);

        $d=Employee::find($id);
        $d->avatar=$this->image_upload($request,'employees');
        $d->update();
        return $d;
    }


    public function edit(Request $request,$id){
        $this->validate($request,[
            'name'=>'required',
            'surname'=>'required',
            'dob'=>'required',
            'joining'=>'required',
            'religion'=>'required',
            'nationality'=>'required',
            'national_id'=>'required|unique:employees,national_id,'.$id,
            'phone'=>'required',
            'email'=>'required|unique:employees,email,'.$id,
            'address'=>'required',
            'city'=>'required',
            'country'=>'required',
            'department_id'=>'required',
            'designation_id'=>'required',
        ]);

        $d=Employee::find($id);
        $d->name=$request->name;
        $d->surname=$request->surname;
        $d->fullname=$request->name.' '.$request->surname;
        $d->dob=$request->dob;
        $d->joining=$request->joining;
        $d->religion=$request->religion;
        $d->nationality=$request->nationality;
        $d->national_id=$request->national_id;
        $d->phone=$request->phone;
        $d->email=$request->email;
        $d->address=$request->address;
        $d->city=$request->city;
        $d->country=$request->country;
        $d->department_id=$request->department_id;
        $d->designation_id=$request->designation_id;
        $d->update();
        return $d;


    }

    public function get(Request $request){

        $query=Employee::query();

        if(strlen($request->name)>0){
            $query->where('fullname','LIKE',"%$request->name%");
        }


        if(strlen($request->department)>0){
            $query->where('department_id','=',$request->department);
        }

        if(strlen($request->designation)>0){
            $query->where('designation_id','=',$request->designation);
        }


        if(strlen($request->religion)>0){
            $query->where('religion','=',$request->religion);
        }


        $emp=$query->with(['department','designation'])->orderBy('id','desc')->get();

        $emp->map(function($e){
            $e->salary=$this->getTotalSalaryPerEmployee($e->id);
            return $e;
        });
        return $emp;
    }


    public function getOne($id){
        return Employee::with(['designation','department'])->where('id',$id)->first();
    }



    public function image_upload($request,$destination){
        $x=20;
        if($request->hasFile('image')){
            $image=$request->file('image');
            $fileName=time().'_'.$image->getClientOriginalName();
            $img=Image::make($image);
            $img->save(public_path('app/'.$destination.'/'.$fileName),$x);
            return 'app/'.$destination.'/'.$fileName;
        }
    }

    public function getTotalSalaryPerEmployee($id){
        $slips=Slip::where('employee_id',$id)->get();
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
        $s=SalaryProperty::find($id);
        return $s->type=='deduction';
    }




}
