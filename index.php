<?php
    ini_set('display_errors', 1);

	require __DIR__ . '/rest-server/server.php';
    require __DIR__ . '/controller/MainController.php';
	
    $server = new ServerRouting();
	$path = $server->getPath();
	if ($path) {
		$mainpage = file_get_contents(__DIR__ . '/js/src/index.html');
		echo $mainpage;
	}

?>