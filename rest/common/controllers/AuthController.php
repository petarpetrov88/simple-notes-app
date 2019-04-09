<?php

namespace rest\common\controllers;

use rest\common\models\forms\auth\SignupForm;
use rest\common\components\ActiveController;
use rest\common\models\forms\auth\LoginForm;
use yii\helpers\ArrayHelper;
use yii\web\ForbiddenHttpException;

class AuthController extends ActiveController
{
    
    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'authenticator' => [
                'optional' => ['login', 'signup']
            ]
        ]);
    }

    public function actions()
    {
        $actions = parent::actions();
        unset(
            $actions['index'],
            $actions['view'],
            $actions['create'],
            $actions['update'],
            $actions['delete']
        );

        return $actions;
    }

    public function actionIndex()
    {
        return true;
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        
        if (!\Yii::$app->user->isGuest)
            throw new ForbiddenHttpException();

        $model->load(\Yii::$app->request->post(), '');
        if (($user = $model->login()) !== false)
            return [
                'jwt' => $user->getJWT()
            ];

        return $model;
    }

    public function actionSignup()
    {
        $model = new SignupForm();

        if (!\Yii::$app->user->isGuest)
            throw new ForbiddenHttpException();

        $model->load(\Yii::$app->request->post(), '');
        if (($user = $model->signup()))
            return [
                'jwt' => $user->getJWT()
            ];

        return $model;
    }
}