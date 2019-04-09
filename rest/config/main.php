<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-rest',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'rest\common\controllers',
    'components' => [
        'user' => [
            'identityClass' => 'rest\common\models\User',
            'enableAutoLogin' => false,
            'enableSession' => false,
        ],
        'session' => null,
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'request' => [
            'enableCsrfCookie' => false,
            'enableCsrfValidation' => false,
            'enableCookieValidation' => false,
            'csrfParam' => false,
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'response' => [
            'formatters' => [
                \yii\web\Response::FORMAT_JSON => [
                    'class' => 'yii\web\JsonResponseFormatter',
                    'prettyPrint' => YII_DEBUG,
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => true,
            'rules' => [
                //Auth
                'OPTIONS v1/auth' => 'v1/auth/options',
                'GET v1/auth' => 'v1/auth/index',
                'OPTIONS v1/auth/login' => 'v1/auth/options',
                'POST v1/auth/login' => 'v1/auth/login',
                'OPTIONS v1/auth/signup' => 'v1/auth/options',
                'POST v1/auth/signup' => 'v1/auth/signup',
                //CRUD controllers
                'GET <module:v1>/<controller:[\w\-]+>' => '<module>/<controller>/index',
                'POST <module:v1>/<controller:[\w\-]+>' => '<module>/<controller>/create',
                'GET <module:v1>/<controller:[\w\-]+>/<id:\d+>' => '<module>/<controller>/view',
                'PUT <module:v1>/<controller:[\w\-]+>/<id:\d+>' => '<module>/<controller>/update',
                'DELETE <module:v1>/<controller:[\w\-]+>/<id:\d+>' => '<module>/<controller>/delete',
                'OPTIONS <module:v1>/<controller:[\w\-]+>/<id:\d+>' => '<module>/<controller>/options',
                'OPTIONS <module:v1>/<controller:[\w\-]+>' => '<module>/<controller>/options',
            ],
        ],
    ],
    'modules' => [
        'v1' => [
            'class' => 'rest\v1\Module',
        ],
    ],
    'params' => $params,
];
