<?php
//set headers
header('Content-Type: application/json');
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

// parse the data from the request
$data = json_decode(file_get_contents("php://input"), true);

// the post will contain the scrambled secret and the key

// if the data is not empty
if (!empty($data)) {
	// get the user's secret
	$secret = $data['secret'];
	
	// get the user's key
	$key = $data['key'];

	// the secret is a caesar cipher, so we need to decrypt it
	$decrypted_secret = "";

	$key_length = strlen($key);

	// loop through each character in the secret
	for ($i = 0; $i < strlen($secret); $i++) {
		// get the ASCII value of the character
		$ascii = ord($secret[$i]);
		
		// if the character is a letter
		if (ctype_alpha($secret[$i])) {
			// if the character is uppercase
			if (ctype_upper($secret[$i])) {
				// shift the character by the key
				$decrypted_secret .= chr((($ascii - 65 - strlen($key)) % 26 + 26) % 26 + 65);
			} else {
				// shift the character by the key
				$decrypted_secret .= chr((($ascii - 97 - strlen($key)) % 26 + 26) % 26 + 97);
			}
		} else {
			// if the character is not a letter, add it to the decrypted secret
			$decrypted_secret .= $secret[$i];
		}
	}


	if ($decrypted_secret == $key && !isset($_SESSION['key'])) {
		$_SESSION['key'] = $key;
		echo json_encode("Interesting.. I'll let my cat know you're here. I shouldn't be more than a minute.. ");
	} else if ($decrypted_secret == $key && isset($_SESSION['key'])) {
		$potential_messages = array("leave_now", "run_from_this_place", "hurry_leave_now", "go_quickly", "move_quickly", "run_fast", "go_now", "leave_immediately", "escape_while_you_can", "its_time_to_skedaddle", "beat_it" );
		if (!isset($_COOKIE['hope_you_can_read_quickly'])) {
			// echo the message
			$message = $potential_messages[array_rand($potential_messages)];

			//ceasar cipher it
			$encrypted_message = "";
			$key = $_SESSION['key'];
			
			// loop through each character in the message
			for ($i = 0; $i < strlen($message); $i++) {
				// get the ASCII value of the character
				$ascii = ord($message[$i]);
				
				// if the character is a letter
				if (ctype_alpha($message[$i])) {
					// if the character is uppercase
					if (ctype_upper($message[$i])) {
						// shift the character by the key
						$encrypted_message .= chr((($ascii - 65 + strlen($key)) % 26 + 26) % 26 + 65);
					} else {
						// shift the character by the key
						$encrypted_message .= chr((($ascii - 97 + strlen($key)) % 26 + 26) % 26 + 97);
					}
				} else {
					// if the character is not a letter, add it to the encrypted message
					$encrypted_message .= $message[$i];
				}
			}
	
		setcookie('hope_you_can_read_quickly', $encrypted_message, time() + 3600, '/', '');
		}
		
		echo json_encode("My cats really want to see you but we've got to look for some snacks, we'll talk later.");
	} else {
		$_SESSION['key'] = $key;
		// if the decrypted secret is not the same as the key, then the user has entered the wrong key
		// so we cannot reveal the secret
		// return an error message
		echo json_encode("I'm not exactly sure what you're talking about.");
	}
}
else {
	// if the data is empty, return an error message
	echo json_encode("I'm not exactly sure what you're talking about.");
}
?>
