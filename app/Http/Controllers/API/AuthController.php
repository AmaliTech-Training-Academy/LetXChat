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
        $token = Hash::make(env('HASH_SECRET'), [$user->_id]);
 
        return response()->json([
            'message' => 'Logged in Successful',
        ])->header('access-token', $token);
    }
}
