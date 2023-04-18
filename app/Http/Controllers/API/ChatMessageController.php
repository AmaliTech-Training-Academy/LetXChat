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
            ->with('user:id,fullname,username,image')
            ->orderBy('created_at', 'DESC')
            ->get();
    }

    public function newMessage(Request $request, $roomId)
    {

        // dd($request->all());
        $request->validate([
            'message' => 'nullable',
            'image' => 'nullable',
            'video' => 'nullable',
            'voiceNote' => 'nullable',
            'file' => 'nullable'
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
            $audio = $request->file('voiceNotes')->storeAs('voiceNotes', $audioName);
        } else {
            $audio = null;
        }

        // $video =  $request->hasFile('video') ? $request->file('video')->store('videos') : null;
        // $audio =  $request->hasFile('voiceNote') ? $request->file('voiceNote')->store('voiceNotes') : null;
        // $file =  $request->hasFile('file') ? $request->file('file')->store('files') : null;

        $newMessage = ChatMessage::create([
            'user_id' => Auth::id(),
            'chat_room_id' => $roomId,
            'message' => $request->message,
            'image' => $image,
            'video' => $video,
            'voiceNote' => $audio,
            'file' => $file
        ]);

        broadcast(new NewChatMessage(
            $request->message,
            'https://takoraditraining.com/LetXChat/storage/app/public/' . $image,
            'https://takoraditraining.com/LetXChat/storage/app/public/' . $video,
            'https://takoraditraining.com/LetXChat/storage/app/public/' . $audio,
            'https://takoraditraining.com/LetXChat/storage/app/public/' . $file
        ))->toOthers();

        return response()->json([
            'sender' => Auth::user()->fullname,
            'sender_image' => 'https://takoraditraining.com/LetXChat/storage/app/public/' . Auth::user()->image,
            'message' => $newMessage->message,
            'image' => 'https://takoraditraining.com/LetXChat/storage/app/public/' . $newMessage->image,
            'video' => [
                'name' => $videoName,
                'url' => 'https://takoraditraining.com/LetXChat/storage/app/public/' . $newMessage->video
            ],
            'voiceNote' => [
                'name' => $audioName,
                'url' => 'https://takoraditraining.com/LetXChat/storage/app/public/' . $newMessage->voiceNote
            ],
            'file' => [
                'name' => $fileName,
                'url' => 'https://takoraditraining.com/LetXChat/storage/app/public/' . $newMessage->file
            ]
        ]);
    }
}
