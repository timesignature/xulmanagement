<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceService;
use App\Models\Payment;
use App\Models\Salary;
use App\Models\Transaction;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function getSalary(Request $request){
        $query=Salary::query();

        if($request->term){
            $query->where('term_id',$request->term);
        }


        $total=0;
        $salaries=$query->get();
        foreach ($salaries as $s){
            $total+=$s->amount;
        }

        return $total;
    }


    public function getExpenses(Request $request){
        $query=Transaction::query();

        if($request->term){
            $query->where('term_id',$request->term);
        }

        $total=0;
        $expense=$query->where('type','expense')->get();
        foreach ($expense as $s){
            $total+=$s->amount;
        }
        return $total;
    }


    public function getIncomes(Request $request){
        $query=Transaction::query();


        if($request->term){
            $query->where('term_id',$request->term);
        }


        $total=0;
        $expense=$query->where('type','income')->get();
        foreach ($expense as $s){
            $total+=$s->amount;
        }
        return $total;
    }


    public function getPayments(Request $request){
        $query=Payment::query();

        if($request->term){
            $query->where('term_id',$request->term);
        }
        $total=0;
        $payments=$query->get();
        foreach ($payments as $s){
            $total+=$s->amount;
        }
        return $total;
    }


    public function get(Request $request){
        $data['payments']=$this->getPayments($request);
        $data['incomes']=$this->getIncomes($request);
        $data['expenses']=$this->getExpenses($request);
        $data['salary']=$this->getSalary($request);
        $data['services']=$this->getInvoice($request);
        $data['profit']=$this->getPayments($request)+$this->getIncomes($request)-$this->getExpenses($request)-$this->getSalary($request);
        $data['fees_not_paid']=$this->getInvoice($request)-$this->getPayments($request);
        return $data;
    }


    public function getInvoice(Request $request){
        $query=Invoice::query();


        if($request->term){
            $query->where('term_id',$request->term);
        }

        $charges=$query->get();
        $charges=$charges->map(function($c){
            $c->charge=$this->getInvoiceService($c->id);
            return $c;
        });

        $total=0;
        foreach ($charges as $charge){
            $total+=$charge->charge;
        }
        return $total;
    }


    public function getInvoiceService($invoice_id){
        $total=0;
        $charges=InvoiceService::where('invoice_id',$invoice_id)->get();
        foreach ($charges as $charge){
            $total+=$charge->amount;
        }
        return $total;
    }
}
