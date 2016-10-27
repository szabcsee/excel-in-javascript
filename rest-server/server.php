<?php

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
		$path = preg_replace('/\?.*$/', '', $_SERVER['REQUEST_URI']);
		
		if ($this->root) $path = preg_replace('/^' . preg_quote($this->root, '/') . '/', '', $path);
		
		$path = preg_replace('/\.(\w+)$/i', '', $path);
		
		if ($this->rootPath) $path = str_replace($this->rootPath, '', $path);
		return $path;
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
	
}

?>