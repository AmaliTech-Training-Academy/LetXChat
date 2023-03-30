<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserContrller;
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
Route::prefix('v1')->group(function(){
    Route::middleware('auth:sanctum')->group(function (){

        Route::controller(ProfileController::class)->group(function(){
            Route::get('/profile', 'index');
            Route::patch('/profile/edit', 'update');
        });
        // Route::apiResource('/profile', UserContrller::class)
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::controller(AuthController::class)->group(function(){
        Route::post('/login', 'login');
    });
});
