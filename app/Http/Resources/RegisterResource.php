<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegisterResource extends JsonResource
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
            'fullname' => $this->fullname,
            'username' => $this->username,
            'chat_id' => $this->chat_id,
            'email' => $this->email,
            'image' => 'https://takoraditraining.com/LetXChat/storage/app/public/images/'.$this->image,
        ];
    }
}
