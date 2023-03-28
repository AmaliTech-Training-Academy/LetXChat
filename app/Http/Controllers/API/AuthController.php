<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $request->validated($request->all());

        if(!Auth::attempt($request->only(['email', 'password']))){
            return response()->json(['message' => 'Invalid Credentials'],403);
        }

        $user = User::where('email', Auth::user()->email)->first();
        if(!$user) return;
        // $response->header('access-token');
        return response()->json([
            // 'user' => $user,
            'message' => 'Logged in Successful',
        ]);
    }

}
