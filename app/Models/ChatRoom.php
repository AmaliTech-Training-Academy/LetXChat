<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'description'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'members');
    }

    public function hasUser($user)
    {
        return $this->users()->where('user_id', $user->id)->exists();
    }

    public function messages() {
        return $this->hasMany(ChatMessage::class);
    }
}
