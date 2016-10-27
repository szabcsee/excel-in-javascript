<?php
    require __DIR__ . '/../RestServer/RestServer.php';
    require __DIR__ . '/../controller/MainController.php';

$server = new \RestServer\RestServer('debug');
$server->addClass('MainController');
$server->handle();
?>