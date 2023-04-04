<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {

        $request->validated($request->all());

       try{
        $imageName = $request->file('image')->getClientOriginalName();
        $imageName = str_replace(' ', '_', $imageName);

        $image = $request->file('image')->storeAs('images', $imageName);
       }

       catch (\Throwable $e){
        return response()->json(['message' => 'Must be image file']);
       }

        $user = User::create([
            'fullname' => $request->fullname,
            'username' => $request->username,
            'employee_id' => $request->employee_id,
            'email' => $request->email,
            'image' => $image,
            'password' => Hash::make($request->password),
        ]);

        return new RegisterResource($user);
    }

    public function login(LoginRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::attempt($request->only(['email', 'password']))) {
            if (!Auth::attempt($request->only(['employee_id', 'password']))) {
                return response()->json(['message' => 'Invalid Credentials'], 404);
            }
        }

        $user = User::where('email', Auth::user()->email)
        ->orWhere('employee_id', Auth::user()->employee_id)
        ->first();

        if(!$user) return response()->json(['not found']);

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
