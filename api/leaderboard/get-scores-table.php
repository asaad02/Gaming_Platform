<?php
	// Include the database connection
	include($_SERVER['DOCUMENT_ROOT'] . '/db/connect.php');

	// set content type to json
	header('Content-Type: application/json');

	// set access control headers to allow requests from local server
	header('Access-Control-Allow-Origin: unix:/run/php/php8.2-fpm.sock');
	header("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

	$data = json_decode(file_get_contents("php://input"), true);
	$game = (int)$data['game'];
	$sortType = $data['sortType'];
	$sortColumn = $data['sortColumn'];

	// if connection to the database is successful
	if ($db and $game > 0) {
		http_response_code(200);
		
		// Get the scores from the database
		$table = "Games";
		$sql = "SELECT * FROM $table WHERE game_id=$game ORDER BY $sortColumn $sortType";
		$query = $db->query($sql);

		// If there are games in the database
		if ($query->rowCount() > 0) {
			$data = array();

			// For each entry in the database
			foreach ($query as $row) {
				$data[] = $row;
			}
			echo json_encode($data);
		} else {
			// If there are no games in the database
			echo json_encode("Coming Soon...");
		}
		// Close the database connection
		$db = null;
	} else if ($db and $game === 0) {
		// If the game id is invalid
		http_response_code(200);
		echo json_encode("Select a game to view the scores.");
	} else {
		// If connection to the database is unsuccessful
		http_response_code(500);
		echo json_encode("Error: Could not connect to the database");
	}
?>
