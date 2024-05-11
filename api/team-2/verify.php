<?php
	//set headers
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: unix:/run/php/php8.2-fpm.sock');
	header('Access-Control-Allow-Methods: POST');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
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

	// parse the data from the request
	$data = json_decode(file_get_contents("php://input"), true);

	if (!empty($data)) {
		// get the user's secret
		$pass = $data['password'];

		if ($pass == "gregklotz") {
			// return the response
			echo json_encode(array("message" => "Great work detective! You've solved the case!"));
		} else {
			// return the response
			echo json_encode(array("message" => "Have you even played the game?!"));
		}
	} else {
		// return the response
		echo json_encode(array("message" => "What are you even doing?"));
	}
?>