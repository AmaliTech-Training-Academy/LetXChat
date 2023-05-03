<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ChatMessageController;
use App\Http\Controllers\API\ChatRoomController;
use App\Http\Controllers\API\RequestController;
use App\Models\User;
use App\Http\Controllers\API\ProfileController;
use App\Http\Resources\RegisterResource;
use App\Models\Admin;
use App\Models\ChatRoom;
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

    Route::prefix('admin')->controller(AdminController::class)->group(function (){
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });

    Route::middleware('auth:sanctum')->group(function (){
        Route::controller(ProfileController::class)->group(function(){
            Route::get('/profile', 'index');
            Route::patch('/profile/edit', 'update');
        });

        Route::controller(ChatMessageController::class)->group(function(){
            Route::get('/chatrooms/{roomId}/message', 'chatRoomMessages');
            Route::post('/chatrooms/{roomId}/message', 'newMessage');
        });

        Route::apiResource('/chatrooms', ChatRoomController::class);

        Route::apiResource('/request', RequestController::class);

        Route::controller(ChatRoomController::class)->group(function() {
            Route::post('/chatrooms/{id}', 'update');
            Route::delete('/chatroom/{room_id}/{user_id}', 'removeUser');
        });

        Route::get('/users/status', function(){
            $pending = User::whereDoesntHave('chatrooms')->count();
            $active = User::count() - $pending;

            return [
                'users' => RegisterResource::collection(User::all()),
                'active_users' => $active,
                'pending_request' => $pending,
                'total' => User::count()
            ];
        });

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/admin/logout', [AdminController::class, 'logout']);
        Route::delete('/users/{userId}', [AdminController::class, 'deleteUser']);
    });



});

