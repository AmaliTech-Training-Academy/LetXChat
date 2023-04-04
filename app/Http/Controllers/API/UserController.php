<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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

    public function joinChatroom(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        $chatroom = Chatroom::findOrFail($request->chatroom_id);
        $user->chatrooms()->attach($chatroom);

        return response()->json([
            'message' => 'Success',
            'user' => $user,
            'chatroom' => $chatroom
        ]);
    }

    /**
     * Display the specified resource.
     */
    // public function show(User $user)
    // {
    //     //
    // }

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
