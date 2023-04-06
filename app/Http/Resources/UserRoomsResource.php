<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserRoomsResource extends JsonResource
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
                'name' => $this->fullname,
                'employee_id' => $this->employee_id,
                'email' => $this->email,
                'image' => $this->image,
                'chatrooms' => $this->chatrooms,
        ];
    }
}
