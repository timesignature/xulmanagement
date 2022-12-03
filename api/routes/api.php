<?php

use App\Http\Controllers\GuardianController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TermController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:api')->group(function (){

    Route::controller(StudentController::class)->group(function(){
        Route::post('/students','add');
        Route::get('/students','get');
        Route::get('/student/{id}','getOne');
        Route::put('/students/{id}','edit');
        Route::post('/students/avatar/{id}','updateAvatar');
        Route::post('/students/guardian/{id}','updateGuardian');
    });


    Route::controller(SectionController::class)->group(function(){
        Route::post('/sections','add');
        Route::get('/sections','get');
    });

    Route::controller(GuardianController::class)->group(function(){
        Route::post('/guardians','add');
        Route::get('/guardians','get');
    });

    Route::controller(TermController::class)->group(function(){
        Route::post('/terms','add');
        Route::get('/terms','get');
        Route::get('/term-current','getCurrent');
    });


    Route::controller(PaymentController::class)->group(function(){
        Route::post('/payments','add');
        Route::get('/payments','get');
        Route::get('/payments/invoice/{id}','getByFee');
        Route::delete('/payments/{id}','delete');
    });

    Route::controller(\App\Http\Controllers\EmployeeController::class)->group(function(){
        Route::post('/employees','add');
        Route::get('/employees','get');
        Route::get('/employee/{id}','getOne');
        Route::put('/employees/{id}','edit');
        Route::post('/employees/avatar/{id}','updateAvatar');
    });


    Route::controller(\App\Http\Controllers\DepartmentController::class)->group(function(){
        Route::post('/departments','add');
        Route::get('/departments','get');
    });



    Route::controller(\App\Http\Controllers\DesignationController::class)->group(function(){
        Route::post('/designations','add');
        Route::get('/designations','get');
    });


    Route::controller(\App\Http\Controllers\SalaryPropertyController::class)->group(function(){
        Route::post('/salary_properties','add');
        Route::get('/salary_properties','get');
    });


    Route::controller(\App\Http\Controllers\SlipController::class)->group(function(){
        Route::post('/slips','add');
        Route::get('/slips','get');
        Route::get('/slip/{id}','getEmployeeSlip');
        Route::get('/slips/total','getTotalSalary');
    });


    Route::controller(\App\Http\Controllers\SalaryController::class)->group(function(){
        Route::post('/salaries','add');
        Route::get('/salaries','get');
        Route::delete('/salaries/{id}','delete');
    });


    Route::controller(\App\Http\Controllers\TransactionController::class)->group(function(){
        Route::post('/transactions','add');
        Route::get('/transactions','get');
        Route::get('/transaction/{id}','getOne');
        Route::put('/transactions/{id}','edit');
        Route::delete('/transactions/{id}','delete');
    });



    Route::controller(\App\Http\Controllers\ReportController::class)->group(function(){
        Route::get('/reports','get');
    });

    Route::controller(\App\Http\Controllers\ServiceController::class)->group(function(){
        Route::get('/services','get');
        Route::get('/service/{id}','getOne');
        Route::post('/services','add');
        Route::put('/services/{id}','edit');
    });



    Route::controller(\App\Http\Controllers\InvoiceController::class)->group(function(){
        Route::get('/invoices','get');
        Route::get('/invoice/{id}','getOne');
        Route::post('/invoices','add');
        Route::put('/invoices/{id}','edit');
        Route::get('/invoices/students/{id}','getByStudents');
    });



    Route::controller(\App\Http\Controllers\InvoiceServiceController::class)->group(function(){
        Route::get('/invoice_services/{id}','get');
        Route::post('/invoice_services','add');
        Route::delete('/invoice_services/{id}','delete');
    });

    Route::controller(\App\Http\Controllers\AttendanceController::class)->group(function(){
        Route::get('/attendance','get');
        Route::post('/attendance','add');
        Route::post('/attendance/manual','manual');
    });


    Route::controller(\App\Http\Controllers\UserController::class)->group(function(){
        Route::get('/users','get');
        Route::put('/users/{id}','edit');
        Route::get('/user/{id}','getOne');
    });




});






Route::controller(\App\Http\Controllers\UserController::class)->group(function(){
    Route::post('/login','login');
    Route::post('/register','register');
    Route::get('/verify_email/{id}','email_verification');
    Route::post('/forgot','request_reset_link');
    Route::post('/reset','reset_password');
});
