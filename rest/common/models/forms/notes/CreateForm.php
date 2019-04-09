<?php

namespace rest\common\models\forms\notes;

use rest\common\models\Note;
use rest\common\models\User;
use yii\base\Model;

class CreateForm extends Model
{
    public $user_id;
    public $topic;
    public $text;
    public $color;

    public function rules()
    {
        return [
            [['user_id', 'topic', 'color'], 'required'],
            [['text'], 'string'],
            [['topic', 'color'], 'string', 'max' => 255],
            ['color', 'in', 'range' => ['red', 'blue', 'green']],
            [['user_id'], 'integer'],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    public function save()
    {
        if (!$this->validate())
            return false;

        $note = new Note();
        $note->setAttributes([
            'user_id' => $this->user_id,
            'topic' => $this->topic,
            'text' => $this->text,
            'color' => $this->color
        ]);

        return ($note->save())? $note : null;
    }
}