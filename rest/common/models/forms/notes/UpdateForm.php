<?php

namespace rest\common\models\forms\notes;

use rest\common\models\Note;
use yii\base\Model;

class UpdateForm extends Model
{
    public $id;
    public $topic;
    public $text;
    public $color;

    public function rules()
    {
        return [
            [['topic', 'id', 'color'], 'required'],
            ['id', 'integer'],
            [['text'], 'string'],
            [['topic', 'color'], 'string', 'max' => 255],
            ['color', 'in', 'range' => ['red', 'blue', 'green']],
            [['id'], 'exist', 'skipOnError' => true, 'targetClass' => Note::className(), 'targetAttribute' => ['id' => 'id']],
        ];
    }

    public function save()
    {
        if (!$this->validate())
            return false;

        $note = Note::findOne($this->id);

        if (!$note)
            return false;

        $note->setAttributes([
            'topic' => $this->topic,
            'text' => $this->text,
            'color' => $this->color
        ]);

        return ($note->save())? $note : false;
    }
}