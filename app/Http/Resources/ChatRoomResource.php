<?php

namespace App\Http\Resources;

use App\Models\ChatMessage;
use App\Models\ChatRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatRoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => 'https://takoraditraining.com/LetXChat/storage/app/public/'.$this->image,
            'created_at' => Carbon::parse($this->created_at,)->format('Y-m-d'),
            'recent_message' => $this->getRecentMessage($this->id),
            'total_messages' => $this->messages->count(),
            'members' => $this->users->map(function($user){
                return [
                    'name' => $user->fullname,
                    'email' => $user->email
                ];
            }),
            'total_members' => $this->users->count()
        ];
    }

    public function getRecentMessage($roomID)

    {
        $recent = ChatMessage::where('chat_room_id', $roomID)->latest()->first();
        if(!$recent) return null;
        return [
            'message' => $recent->message,
            'time' => strtoupper(Carbon::parse($recent->created_at)->format('g:i a'))
        ];

    }
}
