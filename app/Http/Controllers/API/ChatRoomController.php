<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatRoomMembersResource;
use App\Http\Resources\ChatRoomResource;
use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ChatRoomResource::collection(ChatRoom::query()->with('users')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:chat_rooms|max:255',
            'image' => 'nullable',
            'description' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $imageName = $request->file('image')->getClientOriginalName();
            $imageName = str_replace(' ', '_', $imageName);
            $image = $request->file('image')->storeAs('images', $imageName);
        } else {
            $image = null;
        }

        $chatRoom = ChatRoom::create([
            'name' => $request->name,
            'image' => $image,
            'description' => $request->description
        ]);

        return new ChatRoomResource($chatRoom);
    }

    /**
     * Display the specified resource.
     */
    public function show($chatRoom)
    {
        $chatroomMembers = ChatRoom::with(['users', 'messages'])->findOrFail($chatRoom);
        return new ChatRoomMembersResource($chatroomMembers);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $chatRoom)
    {
        $request->validate([
            'name' => 'nullable',
            'image' => 'nullable',
            'description' => 'sometimes|required|string',
        ]);

        $chatRoom = ChatRoom::findOrFail($chatRoom);

        if ($request->hasFile('image')) {
            $imageName = $request->file('image')->getClientOriginalName();
            $imageName = str_replace(' ', '_', $imageName);
            $image = $request->file('image')->storeAs('images', $imageName);
            $chatRoom->image = $image;
        } else {
            $image = $chatRoom->image;
            $chatRoom->image = $request->old('image', $image);
        }

        $chatRoom->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return $chatRoom;
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

    public function removeUser($room_id, $user_id)
    {
        $user = User::findOrFail($user_id);
        $chatRoom = ChatRoom::findOrFail($room_id);
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
            return response()->json(['message' => $e->message]);
        }
    }
}
