<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AuthRoutesTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_user_resgiter_successful(): void
    {
        Storage::fake('images');

        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'fullname' => 'test',
            'username' => 'test',
            'email' => 'test.test@amalitech.com',
            'image' => $file,
            'password' => 'pass1234!',
            'password_confirmation' => 'pass1234!',
        ];

        $response = $this->postJson('/api/v1/register', $data);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'fullname',
                'username',
                'chat_id',
                'email',
                'image',
                'created_at',
                'updated_at',
            ],
        ]);

        // Additional assertions if required


        // $response = $this->post('api/v1/register', [
        //     'fullname' => 'test',
        //     'username' => 'test',
        //     'email' => 'test.test@amalitech.com',
        //     'image' => 'image',
        //     'password' => 'pass1234!',
        //     'password_confirmation' => 'pass1234!',
        // ]);

        // $response->assertStatus(200);
    }


    public function test_user_login_successful(): void
    {
        $response = $this->post('api/v1/login', [
            'email' => 'test.test@amalitech.com',
            'password' => 'pass1234!'
        ]);

        $response->assertStatus(200);
    }

    public function test_user_logout_successful(): void
    {
        $response = $this->post('api/v1/logout', $headers = [
            'access-token' => $this->getAccessToken()
        ]);

        $response->assertStatus(200);
    }

    public function test_admin_login_successful(): void
    {
        $response = $this->post('api/v1/admin/login', [
            'email' => 'admin@admin.com',
            'password' => 'admin'
        ]);

        $response->assertStatus(200);
    }
}
