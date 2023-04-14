<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'fullname' => 'required|string|max:50|regex:/^[a-zA-Z0-9]/i',
            'username' => 'required|unique:users,username|string|max:50|regex:/^[a-zA-Z0-9]/i',
            'email' => ['required','unique:users,email','regex:/[a-z]+\.+[a-z]+@amalitech\.(com|org)$/m'],
            'image' => 'required',
            'password' => 'required|min:8|confirmed',
            'password_confirmation' => 'required|min:8',
        ];
    }

    public function messages()
    {
        return [
            'username.unique' => 'Username taken'
        ];
    }


}
