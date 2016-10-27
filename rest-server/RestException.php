<?php
namespace RestServer;

error_reporting(E_ALL);
ini_set('display_errors', '1');

use Exception;

class RestException extends Exception
{
    public function __construct($code, $message = null)
    {
        parent::__construct($message, $code);
    }
}
?>