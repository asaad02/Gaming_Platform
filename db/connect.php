<?php
	include($_SERVER['DOCUMENT_ROOT'] . '/db/initialize.php');

	try {
		// Create connection from webpage to the database
		$db = new PDO("mysql:host=$host;port=$port;dbname=$database", $user, $password);
		
		// Set the PDO error mode to exception
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
		$db = null;
	}
?>
