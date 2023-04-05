<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatRoomResource;
use App\Http\Resources\RegisterResource;
use App\Http\Resources\UserRoomsResource;
use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'users' => RegisterResource::collection(User::all()),
            'chatrooms' => ChatRoomResource::collection(ChatRoom::all())
        ]);
    }

    public function store(Request $request)
    {
        $user = User::find($request->user_id);
        $chatroom = Chatroom::find($request->chat_room_id);

        if (!$user) return response()->json(['message' => 'User Not Found']);
        if (!$chatroom) return response()->json(['message' => 'Chatroom Not Found']);

        if ($chatroom->hasUser($user))
            return response()->json(['message' => 'Already joined ' . $chatroom->name]);

        $user->chatrooms()->attach($chatroom);

        return response()->json(['message' => 'Success']);
    }

    /**
     * Display the specified resource.
     */
    public function show($user)
    {
        $userRooms = User::with('chatrooms:id,name,image')->findOrFail($user);
        return new UserRoomsResource($userRooms);
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
    // public function destroy(User $user, Chatroom $chatroom)
    // {
    //     dd($user,$chatroom);
    //     if (!($chatroom->hasUser($user)))
    //         return response()->json(['message'=>'User is not the current chatroom'],404);
    //     $user->chatrooms()->detach($chatroom);
    // }
}
