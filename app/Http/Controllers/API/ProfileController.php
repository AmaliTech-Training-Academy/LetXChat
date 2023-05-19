<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\RegisterResource;
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

        $data = [
            'fullname' => $request->fullname,
            'email' => $request->email,
        ];

        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return new ProfileResource($user);
    }

    public function status()
    {
        $pending = User::whereDoesntHave('chatrooms')->count();
        $active = User::count() - $pending;

        return [
            'users' => RegisterResource::collection(User::all()),
            'active_users' => $active,
            'pending_request' => $pending,
            'total' => User::count()
        ];
    }

}
