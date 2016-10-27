<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

namespace RestServer;
use Exception;

class RestException extends Exception
{
    public function __construct($code, $message = null)
    {
        parent::__construct($message, $code);
    }
}
?>