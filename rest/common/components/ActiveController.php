<?php

namespace rest\common\components;

use yii\filters\auth\HttpBearerAuth;
use yii\helpers\ArrayHelper;

class ActiveController extends \yii\rest\ActiveController
{
    public $modelClass = '';

    public $serializer = [
        'class' => 'rest\common\components\Serializer',
        'collectionEnvelope' => 'items'
    ];

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'authenticator' => [
                'class' => HttpBearerAuth::className(),
                'except' => ['options']
            ]
        ]);
    }

    public function init()
    {
        parent::init();

        if (!YII_ENV_PROD) {
            \Yii::$app->response->headers->add('Access-Control-Allow-Origin', '*');
            \Yii::$app->response->headers->add('Access-Control-Allow-Headers', '*');
        }
    }
}
