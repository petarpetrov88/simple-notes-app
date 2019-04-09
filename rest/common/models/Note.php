<?php

namespace rest\common\models;

class Note extends \common\models\Note
{
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    public function fields()
    {
        return [
            'id',
            'user',
            'topic',
            'text',
            'color'
        ];
    }
}
