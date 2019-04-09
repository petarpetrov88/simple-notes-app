<?php

namespace rest\common\models\searches;

use rest\common\models\Note;
use yii\data\ActiveDataProvider;
use yii\data\BaseDataProvider;

class NoteSearch extends Note
{

    public $user_id;


    public function rules()
    {
        return [
            ['user_id', 'integer']
        ];
    }

    public function search(array $params = []) : BaseDataProvider
    {
        $query = Note::find();

        if (!$this->load($params, '')) {
            return new ActiveDataProvider([
                'query' => $query
            ]);
        }

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => [
                'defaultOrder' => [
                    'created_at' => SORT_DESC
                ]
            ],
            'pagination' => [
                'pageSizeLimit' => [1,100]
            ]
        ]);

        $query->filterWhere(['=', 'user_id', $this->user_id]);

        return $dataProvider;
    }
}