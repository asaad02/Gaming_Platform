<?php
	// set content type to json
	header('Content-Type: application/json');
	// set access control headers to allow requests from local server
	header('Access-Control-Allow-Origin: unix:/run/php/php8.2-fpm.sock');
	header('Access-Control-Allow-Methods: POST');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Credentials: true');
	
	// handle preflight request
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		// set http response code - 200 OK
		http_response_code(200);
		exit();
	} else if ($_SERVER['REQUEST_METHOD'] != 'POST') {
		// set http response code - 405 Method Not Allowed
		http_response_code(405);
		exit();
	}

	http_response_code(200);
	// start the session
	session_start();
	if (isset($_COOKIE['hope_you_can_read_quickly'])) {
		$lastlogin = $_SESSION['key'];
		$lastWarning = $_COOKIE['hope_you_can_read_quickly'];
		// echo the message
		
		echo json_encode("Come back soon and if you tell me the secret, I'll tell you a secret about my cats. ");
		setcookie("secret", $lastWarning, time() + 3600, '/', '');
		setcookie("hope_you_can_read_quickly", "", time() - 3600, '/', '');
	} else {
		// echo the message
		
		echo json_encode("Cya!");
	}

	if (isset($_SESSION)) {
		
		// clear the session array
		$params = session_get_cookie_params();
		setcookie(session_name(), '', time() - 3600, '/', '');
		
		// destroy the session
		session_destroy();
		session_write_close();
	}
	

?>
