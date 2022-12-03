<?php

namespace App\Http\Controllers;
use App\Models\Invoice;
use App\Models\InvoiceService;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Term;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class StudentController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'name'=>'required',
            'surname'=>'required',
            'dob'=>'required',
            'gender'=>'required',
            'nationality'=>'required',
            'national_id'=>'required|unique:students',
            'religion'=>'required',
            'guardian'=>'required',
            'section'=>'required',
            'joining_date'=>'required',
            'image'=>'required|mimes:jpg,jpeg,bmp,png,webp',
        ]);

        $d=new Student();
        $d->name=$request->name;
        $d->surname=$request->surname;
        $d->fullname=$request->name.' '.$request->surname;
        $d->dob=$request->dob;
        $d->gender=$request->gender;
        $d->nationality=$request->nationality;
        $d->national_id=$request->national_id;
        $d->religion=$request->religion;
        $d->guardian_id=$request->guardian;
        $d->section_id=$request->section;
        $d->joining_date=$request->joining_date;
        $d->avatar=$this->image_upload($request,'students');
        $d->save();
        return $d;
    }

    public function edit(Request $request,$id){
        $this->validate($request,[
            'name'=>'required',
            'surname'=>'required',
            'dob'=>'required',
            'gender'=>'required',
            'nationality'=>'required',
            'national_id'=>'required|unique:students,national_id,'.$id,
            'religion'=>'required',
            'section_id'=>'required',
            'joining_date'=>'required',
            'is_active'=>'required'
        ]);

        if($request->is_active==false){
            $this->validate($request,[
                'reason'=>'required',
            ]);

        }

        $d=Student::find($id);
        $d->name=$request->name;
        $d->surname=$request->surname;
        $d->fullname=$request->name.' '.$request->surname;
        $d->dob=$request->dob;
        $d->gender=$request->gender;
        $d->nationality=$request->nationality;
        $d->national_id=$request->national_id;
        $d->religion=$request->religion;
        $d->section_id=$request->section_id;
        $d->joining_date=$request->joining_date;
        $d->is_active=$request->is_active;
        $d->reason=$request->reason;
        $d->update();
        return $d;
    }

    public function updateAvatar(Request $request,$id){
        $this->validate($request,[
            'image'=>'required|mimes:jpg,jpeg,bmp,png,webp',
        ]);

        $d=Student::find($id);
        $d->avatar=$this->image_upload($request,'students');
        $d->update();
        return $d;
    }

    public function updateGuardian(Request $request,$id){
        $this->validate($request,[
            'guardian'=>'required'
        ]);

        $d=Student::find($id);
        $d->guardian_id=$request->guardian;
        $d->update();
        return $d;
    }



    public function get(Request $request){
        $query=Student::query();

        if(strlen($request->name)>0){
            $query->where('fullname','LIKE',"%$request->name%");
        }


        if(strlen($request->section)>0){
            $query->where('section_id','=',$request->section);
        }

        if(strlen($request->gender)>0){
            $query->where('gender','=',$request->gender);
        }

        if(strlen($request->religion)>0){
            $query->where('religion','=',$request->religion);
        }


        $students=$query->with(['section','guardian'])->orderBy('fullname')->get();
        $students->map(function($s){
            $s->is_registered=$this->isRegistered($s->id);
            $s->charge=$this->getTotalCosts($s->id);
            $s->paid=$this->getTotalAmountPaid($s->id);
            $s->amount_due=$this->getTotalCosts($s->id)-$this->getTotalAmountPaid($s->id);
            return $s;
        });
        return $students;
    }


    public function getTotalCosts($student_id){
        $invoices=Invoice::where('student_id',$student_id)->get();

        $total=0;
        foreach ($invoices as $i){
            $total+=$this->getCostByInvoice($i->id);
        }

        return $total;
    }

    public function getCostByInvoice($invoice_id){
        $costs=InvoiceService::where('invoice_id',$invoice_id)->get();
        $total=0;
        foreach ($costs as $c){
            $total+=$c->amount;
        }

        return $total;
    }

    public function getTotalAmountPaid($student_id){
        $payments=Payment::where('student_id',$student_id)->get();
        $total=0;
        foreach ($payments as $p){
            $total+=$p->amount;
        }

        return $total;

    }


    public function isRegistered($student_id){
        $term=Term::orderBy('id','desc')->first();

        if($term==null){
            return false;
        }

        $invoice=Invoice::where(function ($q) use($student_id,$term){
            $q->where('student_id',$student_id);
            $q->where('term_id',$term->id);
        })->first();


        if($invoice==null){
            return false;
        }

        return true;

    }

    public function getOne($id){
        return Student::with(['guardian'])->where('id',$id)->first();
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

}
