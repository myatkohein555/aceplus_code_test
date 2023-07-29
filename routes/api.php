<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['cors'])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::apiResource('/companies',CompanyController::class);
    Route::apiResource('/employee',EmployeeController::class);

    Route::get('/filterByCompanyName',[CompanyController::class,'filterByCompanyName']);
    Route::get('/filterByEmployee',[EmployeeController::class,'filterByEmployee']);
    Route::get('/export-employee',[EmployeeController::class,'export']);

});

