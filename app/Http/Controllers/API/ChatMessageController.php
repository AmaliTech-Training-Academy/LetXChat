<?php

namespace App\Http\Controllers\API;

use App\Events\NewChatMessage;
use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatMessageController extends Controller
{
    public function chatRoomMessages($roomId)
    {
        $chatroom = ChatRoom::find($roomId);
        if (!($chatroom->hasUser(Auth::user())))
            return response()->json([
                'error' => 'user not in ' . $chatroom->name
            ], 404);

        return ChatMessage::where('chat_room_id', $roomId)
            ->with('user:id,fullname')
            ->orderBy('created_at', 'DESC')
            ->get();
    }

    public function newMessage(Request $request, $roomId)
    {
        $request->validate([
            'message' => 'required',
            'image' => 'nullable',
            'video' => 'nullable',
            'voicenote' => 'nullable'
        ]);

        // check if user is part of the current chatroom
        $chatroom = ChatRoom::find($roomId);
        if (!($chatroom->hasUser(Auth::user())))
            return response()->json([
                'error' => 'user not in ' . $chatroom->name
            ], 404);

            if($request->hasFile('image')) {
                $imageName = $request->file('image')->getClientOriginalName();
                $imageName = str_replace(' ', '_', $imageName);
                $image = $request->file('image')->storeAs('app/images', $imageName);
            } else {
                $image = null;
            }

            $video =  $request->hasFile('video') ? $request->file('video')->store('app/videos') : null;

            $audio =  $request->hasFile('video') ? $request->file('voicenote')->store('app/voicenotes') : null;

        $newMessage = ChatMessage::create([
            'user_id' => Auth::id(),
            'chat_room_id' => $roomId,
            'message' => $request->message,
            'image' => $image,
            'video' => $video,
            'voicenote' => $audio
        ]);

        broadcast(new NewChatMessage($newMessage))->toOthers();

        return response()->json([
            'sender' => Auth::user()->fullname,
            'message' => $newMessage->message,
            'image' => $newMessage->image,
            'video' => $newMessage->video,
            'voicenote' => $newMessage->voicenote
        ]);
    }
}
