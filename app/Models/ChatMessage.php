<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ChatMessage extends Model
{
    use HasFactory;

    // protected $appends = ['recent_message'];

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

    public function latestMessage()
    {
        return ChatMessage::latest()->first();
    }

    // public function getRecentMessageAttribute()
    // {
    //     $latestMessage = ChatMessage::latest()->first([
    //         'id',
    //         'message',
    //         'created_at'
    //     ]);

    //     $created_at = Carbon::parse($latestMessage['created_at'])->format('g:i a');
    //     $latestMessage['created_at_formatted'] = $created_at;

    //     return $latestMessage;
    // }
}
