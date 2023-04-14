<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function register(AdminRequest $request)
    {
        $request->validated($request->all());

        $request->merge([
            'password' => Hash::make($request->password)
        ]);

        $admin = Admin::create($request->all());

        return response()->json([
            'id' => $admin->id,
            'email' => $admin->email,

        ]);
    }

    public function login(AdminRequest $request)
    {
        $request->validated($request->all());
dd($request->all());

        if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json(['message' => 'Invalid Credentials'], 404);
        }

        $admin = Admin::where('email', Auth::user()->email)
            ->first();

        if (!$admin) return response()->json(['not found']);

        $token = $admin->createToken($admin->email)->plainTextToken;

        return response()
            ->json([
                'message' => 'Logged in Successful',
                'token' => $token
            ]);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out Successful'], 200);
    }
}
