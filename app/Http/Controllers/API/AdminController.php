<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Http\Requests\AdminRequest;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    public function register(AdminRequest $request)
    {
        $request->validated($request->all());

        $admin = Admin::create([
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'id' => $admin->id,
            'email' => $admin->email,
            $admin

        ]);
    }

    // public function login(AdminLoginRequest $request)
    // {
    //     $request->validated($request->all());

    //     if (!Auth::attempt($request->only(['email', 'password']))) {
    //         $checkpass = Hash::check($request->password, Admin::where('email',$request->email)->get('password'));
    //         return $checkpass;
    //         return response()->json(['message' => 'Invalid Credentials'], 404);
    //     }

    //     $admin = Admin::where('email', Auth::user()->email)->first();

    //     if (!$admin) return response()->json(['not found']);

    //     $token = $admin->createToken($admin->email)->plainTextToken;

    //     return response()
    //         ->json([
    //             'message' => 'Logged in Successful',
    //             'token' => $token
    //         ]);
    // }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $admin->createToken($admin->email)->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully',
            'admin' => [
                'id' => $admin->id,
                'email' => $admin->email
            ],
            'token' => $token,
        ]);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out Successful'], 200);
    }
}
