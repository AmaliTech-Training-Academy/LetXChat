<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
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

    public function login(AdminLoginRequest $request)
    {
        $request->validated($request->all());

        $admin = Admin::firstWhere('email', $request->email);
        $check = Hash::check($request->password,  $admin->password);

        if(!$check)  return response()->json(['message' => 'Invalid Credentials'], 404);

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
