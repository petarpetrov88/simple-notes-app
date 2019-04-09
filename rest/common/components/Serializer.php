<?php

namespace rest\common\components;

use rest\exceptions\DataValidationException;

class Serializer extends \yii\rest\Serializer
{
    protected function serializePagination($pagination)
    {
        return [
            $this->metaEnvelope => [
                'totalCount' => $pagination->totalCount,
                'pageCount' => $pagination->getPageCount(),
                'currentPage' => $pagination->getPage() + 1,
                'perPage' => $pagination->getPageSize(),
            ],
        ];
    }

    protected function serializeModelErrors($model)
    {
        $result = [];

        foreach ($model->getErrors() as $name => $messages) {
            $result[$name] = $messages;
        }

        throw new DataValidationException($result);
    }
}