<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index()
    {
        return new ProfileResource(auth()->user());
    }

    public function update(ProfileRequest $request)
    {
        $user = User::find(auth()->user()->id);

        $user->update([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return new ProfileResource($user);
    }
}
