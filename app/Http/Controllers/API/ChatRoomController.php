<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatRoomMembersResource;
use App\Http\Resources\ChatRoomResource;
use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'chatrooms' => ChatRoomResource::collection(ChatRoom::all()),
            'total' => ChatRoom::count()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:chat_rooms|max:255',
            'image' => 'nullable'
        ]);

        $chatRoom = ChatRoom::create([
            'name' => $request->name,
            'image' => $this->checkImage($request)
        ]);

        return new ChatRoomResource($chatRoom);
    }

    /**
     * Display the specified resource.
     */
    public function show($chatRoom)
    {
        $chatroomMembers = ChatRoom::with(['users:id,fullname,email', 'messages'])->findOrFail($chatRoom);
        return new ChatRoomMembersResource($chatroomMembers);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $chatRoom)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'image' => 'nullable'
        ]);

        $chatRoom = ChatRoom::findOrFail($chatRoom)->first();

        $chatRoom->updateOrFail([
            'name' => $request->name,
            'image' => $request->old($this->checkImage($request), null)
        ]);

        return new ChatRoomResource($chatRoom);
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */

    public function destroy($chatRoom)
    {
        $delete = ChatRoom::whereId($chatRoom)->delete();

        if (!$delete) return response()->json([
            'message' => 'Not Found'
        ], 404);

        return $delete;
    }

    public function removeUser(User $user, ChatRoom $chatRoom)
    {
        // $chatRoom = ChatRoom::with('users')->find($chatRoom);
        // dd($chatRoom);
        // if (!($chatRoom->hasUser($user)))
        //     return response()->json(['message'=>'User is not the current chatroom'],404);
        $user = User::findOrFail($user);

        // Find the chatroom with the given ID
        $chatRoom = ChatRoom::findOrFail($chatRoom);

        return $user->chatrooms()->detach($chatRoom);
    }

    public function checkImage($request)
    {
        try {
            $imageName = $request->file('image')->getClientOriginalName();
            $imageName = str_replace(' ', '_', $imageName);

            $image = $request->file('image')->storeAs('images', $imageName);
            return $image;
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Must be image file']);
        }
    }
}
