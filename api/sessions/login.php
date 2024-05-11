<?php
	header('Content-Type: application/json'); 
	header('Access-Control-Allow-Origin: unix:/run/php/php8.2-fpm.sock');
	header('Access-Control-Allow-Methods: POST');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Credentials: true');

	// start the session
	session_start();

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
	
	// decode the json data
	$data = json_decode(file_get_contents("php://input"), true);

	// if the data is not empty
	if (!empty($data) && isset($data['username'])) {
		if (isset($_COOKIE['secret'])) {
			$_SESSION['secret'] = $_COOKIE['secret'];
			$_SESSION['key'] = $data['username'];
			setcookie("secret", "", time() - 3600, '/', '');
		}
		try {
			http_response_code(200);
			// include the database connection
			include($_SERVER['DOCUMENT_ROOT'] . '/db/connect.php');

			$username = $data['username'];
			$table = "Users";

			$query = "SELECT * FROM $table WHERE username='$username'";
			$row = $db->query($query);
			
			if ($row->rowCount() > 0) {
				$_SESSION['username'] = $username;
				echo json_encode(array("status" => "exists"));
			} else {
				$query = "INSERT INTO $table (username) VALUES ('$username')";
				$db->query($query);
				$_SESSION['username'] = $username;

				echo json_encode(array("status" => "new"));
			}

			// close the database connection
			$db = null;
		} catch (PDOException $e) {
			// if there is an error with the database
			echo json_encode(array("status" => "error", "message" => $e->getMessage()));
			http_response_code(500);
		}
		
	} else {
		echo json_encode(array("status" => "invalid data"));
		http_response_code(400);
	}
?>
