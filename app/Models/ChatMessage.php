<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ChatMessage extends Model
{
    use HasFactory;

    // protected $charset = 'utf8mb4';

    // protected $collation = 'utf8mb4_unicode_ci';

    // protected $appends = ['recent_message'];

    protected $fillable = [
        'user_id',
        'chat_room_id',
        'text',
        'image',
        'video',
        'voiceNote',
        'file'
    ];

    public function chatRoom(): HasOne
    {
        return $this->hasOne(ChatRoom::class, 'id', 'chat_room_id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function latestMessage()
    {
        return ChatMessage::latest()->first();
    }

}
