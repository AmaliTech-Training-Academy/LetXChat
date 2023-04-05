<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ChatRoomController;
use App\Http\Controllers\API\RequestController;
use App\Models\User;
use App\Http\Controllers\API\ProfileController;
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
    Route::controller(AuthController::class)->group(function(){
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });

    Route::middleware('auth:sanctum')->group(function (){
        Route::controller(ProfileController::class)->group(function(){
            Route::get('/profile', 'index');
            Route::patch('/profile/edit', 'update');
        });
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::apiResource('/chatrooms', ChatRoomController::class);
    Route::apiResource('/request', RequestController::class);

    Route::get('/users', function(){
        return User::all();
    });
});

