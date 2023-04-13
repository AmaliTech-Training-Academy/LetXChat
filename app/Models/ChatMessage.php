<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chat_room_id',
        'message',
        'image',
        'video',
        'voicenote',
        'file'
    ];

    public function chatRoom(): HasOne
    {
        return $this->hasOne(ChatRoom::class, 'id', 'chat_room_id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id','user_id');
    }
}
