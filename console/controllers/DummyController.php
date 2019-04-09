<?php

namespace console\controllers;

use common\models\Note;
use yii\console\Controller;

class DummyController extends Controller
{
    public function actionIndex()
    {
        for ($i = 0; $i < 10; $i++) {
            $model = new Note();

            $model->setAttributes([
                'user_id' => 2,
                'topic' => \Yii::$app->security->generateRandomString(),
                'text' => \Yii::$app->security->generateRandomString(200),
                'color' => 'green'
            ]);

            $model->save();
        }
    }
}