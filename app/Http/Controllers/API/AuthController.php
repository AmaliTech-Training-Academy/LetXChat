<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $lastRecord = User::latest()->first();
        if(!$lastRecord) {
            $chatID = 'E001';
        }else{
            $chatID = 'E' . str_pad($lastRecord->id + 1, 3, '0', STR_PAD_LEFT);
        }


        $request->validated($request->all());

        try {
            $imageName = $request->file('image')->getClientOriginalName();
            $imageName = str_replace(' ', '_', $imageName);

            $image = $request->file('image')->storeAs('images', $imageName);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Must be image file']);
        }

        $user = User::create([
            'fullname' => $request->fullname,
            'username' => $request->username,
            'chat_id' => $chatID,
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
            if (!Auth::attempt($request->only(['chat_id', 'password']))) {
                return response()->json(['message' => 'Invalid Credentials'], 404);
            }
        }

        $user = User::where('email', Auth::user()->email)
            ->orWhere('chat_id', Auth::user()->chat_id)
            ->first();

        if (!$user) return response()->json(['not found']);

        $token = $user->createToken($user->fullname)->plainTextToken;

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
