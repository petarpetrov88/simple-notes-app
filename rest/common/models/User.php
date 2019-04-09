<?php

namespace rest\common\models;

use Firebase\JWT\JWT;

class User extends \common\models\User
{
    protected static $decodedToken;
    
    protected static function getAlgo()
    {
        return 'HS256';
    }
    
    protected static function getSecretKey()
    {
        return 'secret_key';
    }
    
    public function getJTI()
    {
        return $this->getId();
    }
    
    public function getJWT()
    {
        $secret = static::getSecretKey();
        $token['jti'] = $this->getJTI();
        
        return JWT::encode($token, $secret, static::getAlgo());
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        $secret = static::getSecretKey();
    
        try {
            $decoded = JWT::decode($token, $secret, [static::getAlgo()]);
        } catch (\Exception $e) {
            return null;
        }
    
        static::$decodedToken = (array) $decoded;
    
        if (!isset(static::$decodedToken['jti'])) {
            return null;
        }
    
        $id = static::$decodedToken['jti'];
        return static::findIdentity($id);
    }
    
    public function fields()
    {
        return [
            'id',
            'email'
        ];
    }
}