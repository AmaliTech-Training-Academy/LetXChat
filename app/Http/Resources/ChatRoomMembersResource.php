<?php

namespace App\Http\Resources;

use App\Models\ChatMessage;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatRoomMembersResource extends JsonResource
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
            'messages' => $this->users->map(function ($user) {
                return [
                    'user_id' => $user->id,
                    'messages' => $this->messages->where('user_id', $user->id),
                ];
            }),
            'recent_message' => $this->getRecentMessage()
        ];
    }

    public function getRecentMessage()
    {
        $recent = ChatMessage::latest()->first();

        return [
            'id' => $recent->id,
            'message' => $recent->message,
            'time' => Carbon::parse($recent->created_at)->format('g:i a')
        ];

    }
}
