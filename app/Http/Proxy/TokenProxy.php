<?php
namespace App\Http\Proxy;

class TokenProxy {
    protected $http;

    public function __construct(\GuzzleHttp\Client $http) {
        $this->http = $http;
    }

    public function login($email, $password) {
        if(auth()->attempt(['email' => $email, 'password' => $password, 'is_active' => 1])) {
            return $this->proxy('password', [
                'username' => $email,
                'password' => $password,
                'scope' => ''
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => 'Credentials not match'
        ], 421);
    }

    public function refresh () {
        $refreshToken = request()->cookie('refreshToken');
        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }
    public function logout() {
        $user = auth()->guard('api')->user();
        if ( is_null($user) ) {
            app('cookie')->queue(app('cookie')->forget('refreshToken'));
            return response()->json([
                'message' => 'Logout!'
            ], 204);
        }
        $access_token = $user->token();
        app('db')->table('oauth_refresh_tokens')->where('access_token_id', $access_token->id)->update([
            'revoked' => true,
        ]);
        app('cookie')->queue(app('cookie')->forget('refreshToken'));
        $access_token->revoke();

        return response()->json([
            'message' => 'Logout!'
        ], 204);
    }
    public function proxy($grantType, array $data = [] ) {
        // /oauth/token
        $data = array_merge($data, [
            'client_id' => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
            'grant_type' => $grantType
        ]);
        $response = $this->http->post('http://phpstudy/oauth/token', [
            'form_params' => $data
        ]);
        $token = json_decode((string) $response->getBody(), true);

        return response()->json([
            'token' => $token['access_token'],
            'expires_in' => $token['expires_in']
        ])->cookie('refreshToken', $token['refresh_token'], 14400, null, null, false, true);
    }
}