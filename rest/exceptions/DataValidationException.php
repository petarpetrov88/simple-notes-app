<?php

namespace rest\exceptions;

use yii\web\HttpException;

class DataValidationException extends HttpException
{
    /**
     * Constructor.
     * @param array $messages error message
     * @param int $code error code
     * @param \Exception $previous The previous exception used for the exception chaining.
     */
    public function __construct($messages = [], $code = 0, \Exception $previous = null)
    {
        parent::__construct(422, json_encode($messages), $code, $previous);
    }
}
