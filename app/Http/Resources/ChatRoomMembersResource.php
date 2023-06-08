<?php

namespace App\Http\Resources;

use App\Models\ChatMessage;
use Carbon\Carbon;
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
            'description' => $this->description,
            'image' => $this->image ? 'https://takoraditraining.com/LetXChat/storage/app/public/' . $this->image : null,
            'members' => $this->users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->fullname,
                    'username' => $user->username,
                    'image' => $user->image,
                    'time' => Carbon::parse($user->created_at)->format('g:i a'),
                    'messages' => $this->messages->where('user_id', $user->id),
                ];
            }),
            'recent_message' => $this->getRecentMessage($this->id),
            'total_users' => $this->users->count()
        ];
    }

    public function getRecentMessage($roomID)
    {
        $recent = ChatMessage::where('chat_room_id', $roomID)->latest()->first();
        if (!$recent) return null;
        return [
            'message' => $recent->text,
            'time' => strtoupper(Carbon::parse($recent->created_at)->format('g:i a'))
        ];
    }
}
