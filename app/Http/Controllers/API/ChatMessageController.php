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
    public function rooms()
    {
        return ChatRoom::query()->paginate(7);
    }

    public function messages(Request $request, $roomId)
    {
        // dd($roomId);
        $chatMessage = ChatMessage::whereId($roomId)
            ->with('user:id,fullname')
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json([
            'message' => $chatMessage,
            // 'sender' => $chatMessage[1]
        ]);
    }

    public function newMessage(Request $request, $roomId)
    {
        $request->validate(['message' => 'required']);

        // check if user is part of the current chatroom
        $chatroom = ChatRoom::find($roomId);
        if (!($chatroom->hasUser(Auth::user())))

            return response()->json([
                'error' => 'user not in ' . $chatroom->name
            ], 404);

        $newMessage = ChatMessage::create([
            'user_id' => Auth::id(),
            'chat_room_id' => $roomId,
            'message' => $request->message,
        ]);

        broadcast(new NewChatMessage($newMessage))->toOthers();

        return response()->json([
            'sender' => Auth::user()->fullname,
            'message' => $newMessage->message,
        ]);
    }
}
