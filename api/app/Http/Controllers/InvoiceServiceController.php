<?php

namespace App\Http\Controllers;

use App\Models\InvoiceService;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class InvoiceServiceController extends Controller
{
    public function add(Request $request){
        $this->validate($request,[
            'service'=>'required',
            'invoice'=>'required',
        ]);


        $service=Service::find($request->service);
        if($service==null){
            throw ValidationException::withMessages([
                'service' => ['service is not found'],
            ]);

        }

        $d=new InvoiceService();
        $d->description=$service->description;
        $d->amount=$service->amount;
        $d->invoice_id=$request->invoice;
        $d->save();
        return $d;


    }

    public function getOne($id){
        return InvoiceService::with(['student.guardian'])->where('id',$id)->first();
    }

    public function get($id){
        return InvoiceService::where('invoice_id',$id)->orderBy('id','desc')->get();
    }



    public function delete($id){
        $invoice=InvoiceService::find($id);
        return $invoice->delete();
    }
}
