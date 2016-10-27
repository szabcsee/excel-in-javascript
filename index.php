<?php
    ini_set('display_errors', 1);

	require __DIR__ . '/rest-server/server.php';
    require __DIR__ . '/controller/MainController.php';
	
    $server = new ServerRouting();
	$path = $server->getPath();
	print_r($path);

?>