<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class FacebookAuthenticatedController extends Controller
{
    public function facebookCallback()
    {

        $facebookUser = Socialite::driver('facebook')->stateless()->user();
        $user = User::where('email', $facebookUser->email)->first();

        if(!$user) {
            session()->put('name', $facebookUser->name);
            session()->put('email', $facebookUser->email);
            session()->put('token', $facebookUser->token);

            return redirect()->route('select-role');
        } elseif (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        auth()->login($user);
        return redirect()->route('dashboard');
    }
}
