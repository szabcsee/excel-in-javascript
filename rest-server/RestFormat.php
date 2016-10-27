<?php
namespace ExtCel\RestServer;

error_reporting(E_ALL);
ini_set('display_errors', '1');


class RestFormat {
	const PLAIN = 'text/plain';
	const HTML  = 'text/html';
	const JSON  = 'application/json';
	const XML   = 'application/xml';

    /** @var array */
	static public $formats = array(
		'plain' => RestFormat::PLAIN,
		'txt'   => RestFormat::PLAIN,
		'html'  => RestFormat::HTML,
		'json'  => RestFormat::JSON,
		'xml'   => RestFormat::XML,
	);
}
?>