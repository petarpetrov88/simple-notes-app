<?php

namespace rest\common\models\forms\auth;

use rest\common\models\User;

class LoginForm extends \yii\base\Model
{
    public $email;
    public $password;

    protected $_user;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['email', 'password'], 'required'],
            // password is validated by validatePassword()
            ['email', 'email'],
            ['email', 'validateEmail'],
            ['password', 'validatePassword'],
        ];
    }

    /**
     *
     */
    public function validateEmail($attribute)
    {
        if (!$this->hasErrors() && !$this->getUser()) {
            $this->addError($attribute, 'Invalid email');
        }
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     */
    public function validatePassword($attribute)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();
            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError($attribute, 'Invalid password');
            }
        }
    }

    /**
     * Logs in a user using the provided email and password.
     *
     * @return bool false | User
     */
    public function login()
    {
        if ($this->validate()) {
            return $this->_user;
        }

        return false;
    }

    /**
     * Finds user by [[email]]
     *
     * @return User|null
     */
    protected function getUser()
    {
        if ($this->_user === null) {
            $this->_user = User::findByEmail($this->email);
        }

        return $this->_user;
    }
}