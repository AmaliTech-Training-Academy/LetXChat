<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // $request->validated($request->all());
        // dd($request);
        if(!Auth::attempt($request->only(['email','password']))){
            return response()->json([
                'status' => false,
                'message' => 'Invalid Credentials'
            ],403);
        }

        $user = User::firstWhere('email', Auth::user()->email);
        dd($user);
            // return response()->json([
            //     'status' => true,
            //     'user' => $user,
            //     'message' => 'Logged in Successful',
            //     'token' => $user->createToken($user->name)->plainTextToken
            // ]);

    }
}
