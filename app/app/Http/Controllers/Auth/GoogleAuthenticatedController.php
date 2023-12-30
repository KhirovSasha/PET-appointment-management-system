<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthenticatedController extends Controller
{
    function index() {
        $googleUser = Socialite::driver('google')->user();

        $user = User::where('email', $googleUser->email)->first();

        if (!$user) {
            session()->put('name', $googleUser->name);
            session()->put('email', $googleUser->email);
            session()->put('token', $googleUser->token);

            return redirect()->route('select-role');

        } elseif (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        auth()->login($user);

        return redirect()->route('dashboard');
    }

    function roleIdentification(Request $request)
    {
        $user = User::create([
            'name' => session()->get('name'),
            'email' => session()->get('email'),
            'google_id' => session()->get('token'),
            'role' => $request->role,
        ]);

        $user->markEmailAsVerified();
        event(new Verified($user));

        session()->forget('name');
        session()->forget('email');
        session()->forget('token');

        auth()->login($user);
        return redirect()->route('dashboard');
    }

}
