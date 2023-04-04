<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegisterResource;
use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $chatrooms = ChatRoom::all();

        return response()->json([
            'users' => $users,
            'chatrooms' => $chatrooms
        ]);
    }

    public function store(Request $request)
    {
        $user = User::findOrFail($request->user_id)->withMessage('User Not found');
        $chatroom = Chatroom::findOrFail($request->chat_room_id);

        if ($chatroom->hasUser($user))
            return response()->json([ 'message' => 'Already joined' ]);

        $user->chatrooms()->attach($chatroom);

        return response()->json(['message' => 'Success']);
    }

    /**
     * Display the specified resource.
     */
    public function show($user)
    {
        return User::with('chatrooms')->findOrFail($user);
    }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, User $user)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(User $user)
    // {
    //     //
    // }
}
