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

        // $user = User::where('email', $request->email)->first();
        // // dd($user->password);

        // $password = Hash::check($request->password, $user->password);
        // dd($request->password);

        // if (!$password) {
        //     return 'Invalid password';
        //     }

        // if (!$user) {
        //     throw 'Invalid email';
        //     }

        // Auth::login($user->id);

        // return $user;

        if(!Auth::attempt($request->only(['email', 'password']))){
            return response()->json([
                'status' => false,
                'message' => 'Invalid Credentials'
            ],403);
        }
        $user = User::where('email', $request->email)->first();

        return response()->json([
            'status' => true,
            'user' => $user,
            'message' => 'Logged in Successful',
            'token' => $user->createToken($user->name)->plainTextToken
        ]);
    }

}
