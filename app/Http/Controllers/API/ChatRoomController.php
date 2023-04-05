<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatRoomMembersResource;
use App\Http\Resources\ChatRoomResource;
use App\Http\Resources\ChatRoomUsersResource;
use App\Models\ChatRoom;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ChatRoomResource::collection(ChatRoom::all());
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

        $chatRoom = Chatroom::create([
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
        $chatroomMembers = ChatRoom::with('users:fullname,email')->findOrFail($chatRoom);
        return new ChatRoomMembersResource($chatroomMembers);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $chatRoom)
    {
        $chatRoom = ChatRoom::whereId($chatRoom)->first();
        dd($request->all());

        $chatRoom->update([
            'name' => $request->name,
            'image' => $this->checkImage($request)
        ]);

        return new ChatRoomResource($chatRoom);
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */

    public function destroy($chatRoom)
    {
        return ChatRoom::whereId($chatRoom)->delete();
    }

    public function checkImage($request)
    {
        try {
            $imageName = $request->file('image')->getClientOriginalName();
            $imageName = str_replace(' ', '_', $imageName);

            $image = $request->file('image')->storeAs('chatroom_profile', $imageName);
            return $image;
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Must be image file']);
        }
    }
}
