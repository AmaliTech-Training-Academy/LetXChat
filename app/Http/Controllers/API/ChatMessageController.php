<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatRoom;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    public function rooms()
    {
        return ChatRoom::query()->paginate(7);
    }

    public function messages(Request $request, $roomId)
    {
        return ChatMessage::whereId($roomId)
        ->with('user')
        ->orderBy('created_at', 'DESC')
        ->get();
    }

    public function newMessage(Request $request, $roomId)
    {
        ChatMessage::create([
            'user_id' => $request->user()->id,
            'room_id' => $roomId,
            'message' => $request->content,
        ]);
    }
}
