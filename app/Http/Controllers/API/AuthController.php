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

        if (!Auth::attempt($request->only(['email', 'password']))) {
            if (!Auth::attempt($request->only(['employee_id', 'password']))) {
                return response()->json(['message' => 'Invalid Credentials'], 403);
            }
        }

        $user = User::where('email', Auth::user()->email)
        ->orWhere('employee_id', Auth::user()->employee_id)
        ->first();

        $token = $user->createToken($user->fullname)->plainTextToken;

        return response()
            ->json([
                'message' => 'Logged in Successful',
            ])
            ->header('access-token', $token);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out Successful'], 200);
    }
}
