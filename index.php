<?php
    ini_set('display_errors', 1);

    require __DIR__ . '/rest-server/RestServer.php';
    require __DIR__ . '/controller/MainController.php';

    $server = new \ExtCel\RestServer\RestServer('debug');
    $server->addClass('MainController');
    $server->handle();

?>