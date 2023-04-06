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
        dd($roomId);
        return ChatMessage::whereId($roomId)
        ->with('user')
        ->orderBy('created_at', 'DESC')
        ->get();
    }

    public function newMessage(Request $request, $roomId)
    {
        // dd(Auth::id());
        $newMessage = ChatMessage::create([
                'user_id' => Auth::id(),
                'chat_room_id' => $roomId,
                'message' => $request->messages,
        ]);

        broadcast(new NewChatMessage($newMessage))->toOthers();

        return response()->json([
            'message' => $newMessage->message,
        ]);
    }
}
