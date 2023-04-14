<?php

namespace App\Http\Resources;

use App\Models\ChatMessage;
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
            'image' => env('APP_URL').'/LetXChat/storage/app/public/'.$this->image,
            'recent_message' => $this->getRecentMessage($this->id)
        ];
    }

    public function getRecentMessage($roomID)
    {
        $recent = ChatMessage::where('chat_room_id', $roomID)->latest()->first();
        if(!$recent) return null;
        return [
            'message' => $recent->message,
            'time' => Carbon::parse($recent->created_at)->format('g:i a')
        ];

    }
}
