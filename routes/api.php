<?php

use App\Http\Controllers\API\AuthController;
use App\Models\User;
use App\Http\Controllers\ProfileController;
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
});

Route::get('/v1/users', function(){
    return User::all();
});
