<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthRoutesTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_route_is_resgiter(): void
    {
        $response = $this->post('api/v1/register', [
            'fullname' => 'test',
            'username' => 'test',
            'email' => 'tzirw@example.com',
            'image' => fake()->image,
            'password' => 'test',
            'password_confirmation' => 'test',
        ]);

        $response->assertStatus(200);
    }

    public function test_route_is_login(): void
    {
        $response = $this->post('api/v1/login', [
            'email' => 'test@gmail.com',
            'password' => 'test'
        ]);

        $response->assertStatus(200);
    }
}
