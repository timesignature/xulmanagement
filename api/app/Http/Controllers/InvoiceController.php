<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceService;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class InvoiceController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'student'=>'required',
            'term'=>'required',
            'current_date'=>'required',
            'due_date'=>'required',
            // 'receipt_number'=>'required|unique:invoices',
        ]);


        $invoice=Invoice::where(function ($q) use($request){
            $q->where('student_id',$request->student);
            $q->where('term_id',$request->term);
        })->first();

        if($invoice){
            throw ValidationException::withMessages([
                'term' => ['looks like the student has been registered already for this term'],
            ]);
        }

        $d=new Invoice();

        $d->student_id=$request->student;
        $d->term_id=$request->term;
        $d->current_date=$request->current_date;
        $d->due_date=$request->due_date;
        // $d->receipt_number=$request->receipt_number;
        $d->save();



        $services=Service::where('isActive',1)->get();
        foreach ($services as $service){
            $is=new InvoiceService();
            $is->description=$service->description;
            $is->amount=$service->amount;
            $is->invoice_id=$d->id;
            $is->save();
        }


        return $d;


    }

    public function getOne($id){
        return Invoice::with(['student.guardian','term'])->where('id',$id)->first();
    }

    public function get(Request $request){

        $query=Invoice::query();

        if(strlen($request->student)>0){
            $query->where('student_id',$request->student);
        }


        $invoices=$query->with(['student','term'])->orderBy('id','desc')->get();
        $invoices->map(function ($invoice){
            $invoice->amount=$this->getTotalServices($invoice->id);
            return $invoice;
        });
        return $invoices;
    }

    public function getTotalServices($invoice_id){
        $services=InvoiceService::where('invoice_id',$invoice_id)->get();
        $total=0;
        foreach ($services as $s){
            $total+=$s->amount;
        }

        return $total;
    }


    public function getByStudents($id){
        $invoices=Invoice::with(['student'])->where('student_id',$id)->orderBy('id','desc')->get();
        $invoices->map(function ($invoice){
            $invoice->amount=$this->getTotalServices($invoice->id);
            return $invoice;
        });
        return $invoices;
    }
}
