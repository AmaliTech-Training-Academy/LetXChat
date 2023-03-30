<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index() {
        return new ProfileResource(auth()->user());
    }

    public function update(ProfileRequest $request) {

    $user = User::find(auth()->user()->id);

    $user->update([
        'fullname' => $request->fullname,
        'email' => $request->email,
        'password' => $request->password
    ]);
    return new ProfileResource($user);

    }

}
