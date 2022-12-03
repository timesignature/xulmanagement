<?php

namespace App\Http\Controllers;

use App\Mail\AccountCreatedMail;
use App\Mail\AccountResetMail;
use App\Models\User;
use App\Models\VerifyUser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{




    public function get(Request $request){
        $query=User::query();


        if(strlen($request->name)>0){
            $query->where('name','LIKE',"%$request->name%");
        }


        $users=$query->orderBy('id','desc')->get();
        $users->map(function($u){
            $u->is_admin=$u->is_admin==1;
            $u->is_active=$u->is_active==1;
            return $u;
        });

        return $users;
    }


    public function getOne($id){
        return User::find($id);
    }

    public function edit(Request $request,$id){

        $this->validate($request,[
            'is_active'=>'required',
            'is_admin'=>'required',
        ]);

        $d=User::find($id);
        $d->is_active=$request->is_active;
        $d->is_admin=$request->is_admin;
        $d->update();
        return $d;

    }




    public function register(Request $request){
        $this->validate($request,[
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:8',
            'confirm_password'=>'same:password',
        ]);

        $d=new User();
        $d->name=$request->name;
        $d->email=$request->email;
        $d->api_token=Str::random(60);
        $d->password=Hash::make($request->password);
        $d->Save();

//        Mail::to($request->email)->send(new AccountCreatedMail($d));

        return $d;

    }



    public function login(Request $request){
        $this->validate($request,[
            'email'=>'required|email|exists:users',
            'password'=>'required|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

//        if($user->email_verified_at==null){
//            throw ValidationException::withMessages([
//                'email' => ['this email address is not yet verified'],
//            ]);
//        }




        if($user->is_active==0){
            throw ValidationException::withMessages([
                'email' => ['this email address is not yet activated'],
            ]);
        }


        return $user->api_token;




    }


    public function email_verification($id){
        $a=User::find($id);
        $a->email_verified_at=Carbon::now();
        $a->update();
        return Redirect::away('http://localhost:3000/login');
    }



    public function request_reset_link(Request $request){
        $this->validate($request,[
            'email'=>'required|email|exists:users'
        ]);

        $verification=VerifyUser::where('email',$request->email)->first();

        if($verification){
            Mail::to($request->email)->send(new AccountResetMail($verification));
            return $verification;
        }

        $v=new VerifyUser();
        $v->email=$request->email;
        $v->link=Str::random(60);
        $v->save();
        Mail::to($request->email)->send(new AccountResetMail($v));
        return $v;


    }

    public function reset_password(Request $request){
        $this->validate($request,[
            'password'=>'required|min:8',
            'password_confirm'=>'required|same:password',
        ]);


        $v=VerifyUser::where('link',$request->link)->first();

        if($v==null){
            throw ValidationException::withMessages([
                'password' => ['looks like your link has expired'],
            ]);
        }

        $user=User::where('email',$v->email)->first();

        if($user==null){
            throw ValidationException::withMessages([
                'password' => ['looks like your link has expired'],
            ]);
        }

        $user->password=Hash::make($request->password);
        $user->update();
        return $user;

    }



}
