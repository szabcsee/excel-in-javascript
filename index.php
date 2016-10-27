<?php
    ini_set('display_errors', 1);

    require __DIR__ . '/../rest-server/RestServer.php';
    require 'MainController.php';
    $server = new RestServer('debug');
    $server->addClass('MainController');
    $server->handle();
?>