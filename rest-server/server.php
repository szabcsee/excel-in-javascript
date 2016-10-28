<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

class ServerRouting {
	
	public $root;
	public $rootPath;

	/**
	 *
	 *
	 **/
	public function  __construct() {
		
	}
	
	/**
	 * Returns the path from the current url as string
	 *
	 **/
	public function getPath() {
		$path =  $_SERVER['REQUEST_URI'];
		return $path;
	}

    /**
     *  Returns the REST calls' method
     */
    public function getMethod() {
        $method = $_SERVER['REQUEST_METHOD'];
        return $method;
    }

    /**
     * @return mixed|string
     * Read raw data from the request body.
     */
    public function getData() {
        $data = file_get_contents('php://input');
        $data = json_decode($data, $this->jsonAssoc);

        return $data;
    }

    /**
     * @param $data
     */
    public function sendData($data)
    {
        header("Cache-Control: no-cache, must-revalidate");
        header("Expires: 0");
        header('Content-Type: ' . $this->format);

        $options = JSON_PRETTY_PRINT;

        $options = $options | JSON_UNESCAPED_UNICODE;
        echo json_encode($data, $options);
    }
	
	/**
	 * Returns the queries from the current url and returns them as an array
	 *
	 **/
	public function retrieveCurrentQueries($url) {
		$queries = parse_url($url, PHP_URL_QUERY);
		$queries_array = array();
		if(isset($queries)){
			parse_str($queries, $queries_array);
		}	
		return $queries_array;	
	}

    /**
     * Response HTTP codes
     * @var array
     */
    private $codes = array(
        '100' => 'Continue',
        '200' => 'OK',
        '201' => 'Created',
        '202' => 'Accepted',
        '203' => 'Non-Authoritative Information',
        '204' => 'No Content',
        '205' => 'Reset Content',
        '206' => 'Partial Content',
        '300' => 'Multiple Choices',
        '301' => 'Moved Permanently',
        '302' => 'Found',
        '303' => 'See Other',
        '304' => 'Not Modified',
        '305' => 'Use Proxy',
        '307' => 'Temporary Redirect',
        '400' => 'Bad Request',
        '401' => 'Unauthorized',
        '402' => 'Payment Required',
        '403' => 'Forbidden',
        '404' => 'Not Found',
        '405' => 'Method Not Allowed',
        '406' => 'Not Acceptable',
        '409' => 'Conflict',
        '410' => 'Gone',
        '411' => 'Length Required',
        '412' => 'Precondition Failed',
        '413' => 'Request Entity Too Large',
        '414' => 'Request-URI Too Long',
        '415' => 'Unsupported Media Type',
        '416' => 'Requested Range Not Satisfiable',
        '417' => 'Expectation Failed',
        '500' => 'Internal Server Error',
        '501' => 'Not Implemented',
        '503' => 'Service Unavailable'
    );
}

?>