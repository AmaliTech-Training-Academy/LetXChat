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
        // Retrieve the chatroom details
        $chatroom = ChatRoom::firstWhere('name', $request->chat_room);

        if (!$chatroom) {
            return response()->json(['message' => 'Chatroom Not Found'], 404);
        }

        // Retrieve the users details
        $userNames = $request->user_names;
        $users = User::whereIn('username', $userNames)->get();

        if ($users->count() !== count($userNames)) {
            return response()->json(['message' => 'One or more users were not found'], 404);
        }

        // Add the users to the chatroom
        $usersToAdd = $users->reject(function ($user) use ($chatroom) {
            return $chatroom->hasUser($user);
        });

        $usersToAdd->each(function ($user) use ($chatroom) {
            $user->chatrooms()->attach($chatroom);
        });

        if ($usersToAdd->count() === 0) {
            return response()->json(['message' => 'All users are already members of the chatroom'], 409);
        }

        return response()->json(['message' => 'Users successfully added to the chatroom']);
        
    }

    /**
     * Display the specified resource.
     */
    public function show($user)
    {
        $userRooms = User::with('chatrooms:id,name,image')->findOrFail($user);
        return new UserRoomsResource($userRooms);
    }

}
