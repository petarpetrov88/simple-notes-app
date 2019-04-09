<?php

namespace rest\common\controllers;

use rest\common\components\ActiveController;
use rest\common\models\forms\notes\CreateForm;
use rest\common\models\forms\notes\UpdateForm;
use rest\common\models\Note;
use rest\common\models\searches\NoteSearch;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\UnauthorizedHttpException;

class NotesController extends ActiveController
{
    public $modelClass = 'rest\common\models\Note';


    public function actions()
    {
        $actions = parent::actions();

        unset($actions['index']);
        unset($actions['create']);
        unset($actions['update']);
        unset($actions['view']);

        return $actions;
    }

    public function actionIndex()
    {
        $model = new NoteSearch();

        $params = [
            'user_id' => \Yii::$app->user->getId()
        ];

        return $model->search($params);
    }

    public function actionCreate()
    {
        $model = new CreateForm();

        $requestData = \Yii::$app->request->getBodyParams();
        $requestData['user_id'] = \Yii::$app->user->getId();

        $model->load($requestData, '');
        if (($note = $model->save()) !== false) {
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);

            return $note;
        }

        return $model;
    }

    public function actionUpdate($id)
    {
        $note = Note::find()
            ->where([
                'id' => $id
            ])
            ->one();

        if (!$note)
            throw new NotFoundHttpException("Object not found: $id");

        if ($note->user_id !== \Yii::$app->user->getId())
            throw new ForbiddenHttpException("You don`t have permission to edit this object.");

        $requestData = \Yii::$app->request->getBodyParams();
        $requestData['id'] = $note->id;

        $model = new UpdateForm();
        $model->load($requestData, '');

        if (($note = $model->save()) !== false) {
            return $note;
        }

        return $model;
    }

    public function actionView($id)
    {
        $note = Note::find()
            ->where([
                'id' => $id,
                'user_id' => \Yii::$app->user->getId()
            ])
            ->one();

        if (!$note)
            throw new NotFoundHttpException("Object not found: $id");

        return $note;
    }
}