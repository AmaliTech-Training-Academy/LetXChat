<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $request->validated($request->all());

        $image = $request->file('image');
        $path = Storage::disk('public')->put('images', $image);

        $user = User::create([
            'fullname' => $request->fullname,
            'username' => $request->username,
            'employee_id' => $request->employee_id,
            'email' => $request->email,
            'image' => $path,
            'password' => Hash::make($request->password),
        ]);

        return new RegisterResource($user);
    }
}
