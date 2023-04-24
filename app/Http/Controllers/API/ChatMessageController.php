<?php

namespace App\Http\Controllers\API;

use App\Events\NewChatMessage;
use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
            ->with('user:id,fullname,username,image')
            ->orderBy('created_at', 'DESC')
            ->get();
    }

    public function newMessage(Request $request, $roomId)
    {

        // dd($request->all());
        $request->validate([
            'text' => 'nullable',
            'image' => 'nullable',
            'video' => 'nullable',
            'voiceNote' => 'nullable',
            'file' => 'nullable'
            // 'audioUrl'
        ]);

        // check if user is part of the current chatroom
        $chatroom = ChatRoom::find($roomId);
        if (!($chatroom->hasUser(Auth::user())))
            return response()->json([
                'error' => 'user not in ' . $chatroom->name
            ], 404);

        if ($request->hasFile('image')) {
            $imageName = $request->file('image')->getClientOriginalName();
            $imageName = str_replace(' ', '_', $imageName);
            $image = $request->file('image')->storeAs('images', $imageName);
        } else {
            $image = null;
        }
        $fileName = '';
        if ($request->hasFile('file')) {
            $fileName = $request->file('file')->getClientOriginalName();
            $fileName = str_replace(' ', '_', $fileName);
            $file = $request->file('file')->storeAs('files', $fileName);
        } else {
            $file = null;
        }
        $videoName = '';
        if ($request->hasFile('video')) {
            $videoName = $request->file('video')->getClientOriginalName();
            $videoName = $videoName != null ? str_replace(' ', '_', $videoName) : '';
            $video = $request->file('video')->storeAs('videos', $videoName);
        } else {
            $video = null;
        }
        $audioName = '';
        if ($request->hasFile('voiceNote')) {
            $audioName = $request->file('voiceNote')->getClientOriginalName();
            $audioName = $audioName != null ? str_replace(' ', '_', $audioName) : '';
            $audio = $request->file('voiceNote')->storeAs('voiceNotes', $audioName);
        } else {
            $audio = null;
        }

        $newMessage = ChatMessage::create([
            'user_id' => Auth::id(),
            'chat_room_id' => $roomId,
            'text' => mb_convert_encoding($request->text, 'UTF-8', 'auto'),
            'image' => $image,
            'video' => $video,
            'voiceNote' => $audio,
            'file' => $file
        ]);

        broadcast(new NewChatMessage(
            Auth::user()->username,
            Auth::user()->image,
            Carbon::now()->format('g:i a'),
            $request->text,
            $image,
            $video,
            $audio,
            $file
        ))->toOthers();

        return response()->json([
            'sender' => Auth::user()->username,
            'sender_image' =>  Auth::user()->image,
            'time' => Carbon::now()->format('g:i a'),
            'text' => $newMessage->text,
            'image' =>  $newMessage->image,
            'video' => [
                'name' => $videoName,
                'url' =>  $newMessage->video
            ],
            'voiceNote' => [
                'name' => $audioName,
                'url' =>  $newMessage->voiceNote
            ],
            'file' => [
                'name' => $fileName,
                'url' =>  $newMessage->file
            ]
        ]);
    }
}
