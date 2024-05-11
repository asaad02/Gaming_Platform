<?php
	try {
		$config_file = dirname(__FILE__) . '/config.ini';
		
		// Check if the config file exists
		if (!file_exists($config_file)) {
			throw new Exception("Missing config.ini file in " . dirname(__FILE__));
		}

		// Read the database connection information from the config.ini file
		$config = parse_ini_file($config_file, true);

		// Get Connection Information
		$host = $config['database']['host'];
		$port = $config['database']['port'];
		$database = $config['database']['database'];
		$user = $config['database']['user'];
		$password = $config['database']['password'];

		// if any of the connection information is missing, throw an error
		if (!$host || !$port || !$database || !$user || !$password) {
			throw new Exception("Missing connection information. Check the config.ini file in " . dirname(__FILE__));
		}
	} catch (Exception $e) {
		echo "Error: " . $e->getMessage();
		exit();
	}
?>