<?php

namespace rest\v1;

/**
 * v1 module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * @inheritdoc
     */
    public $controllerNamespace = 'rest\v1\controllers';
    
    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
    }
}
