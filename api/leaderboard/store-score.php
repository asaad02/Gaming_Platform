<?php
	//set headers
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: unix:/run/php/php8.2-fpm.sock');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	// parse the data from the request
	$data = json_decode(file_get_contents("php://input"), true);

	// if the data is not empty
	if (!empty($data)) {
		// get the user's score
		$score = $data['score'];
		
		// get the user's username
		$username = $data['username'];

		// get the current date and time
		$date_time = date('Y-m-d H:i:s');

		// get the game id from the data
		$game_id = $data['gameId'];
		
		// include the database connection
		include($_SERVER['DOCUMENT_ROOT'] . '/db/create-games-table.php');
		include($_SERVER['DOCUMENT_ROOT'] . '/db/connect.php');
		
		// insert the user's score into the database
		$sql = "INSERT INTO $table (username, score, date_time, game_id) VALUES ('$username', $score, '$date_time', $game_id)";
		$db->exec($sql);
		
		// close the database connection
		$db = null;

	}
	
	// set the http response code
	http_response_code(200);
	echo json_encode("Score stored successfully");
	
?>
