<?php
	session_start();

	// set headers
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: unix:/run/php/php8.2-fpm.sock');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Credentials: true');
	// set http response code - 200 OK
	http_response_code(200);

	if (isset($_SESSION['secret'])) {
		$key = $_SESSION['key'];
		if (isset($_COOKIE['secret'])) {
			// undo the caesar cipher
			$secret = $_SESSION['secret'];
			$decrypted_secret = "";
			$key_length = strlen($key);
			for ($i = 0; $i < strlen($secret); $i++) {
				$ascii = ord($secret[$i]);
				if (ctype_alpha($secret[$i])) {
					if (ctype_upper($secret[$i])) {
						$decrypted_secret .= chr((($ascii - 65 - strlen($key)) % 26 + 26) % 26 + 65);
					} else {
						$decrypted_secret .= chr((($ascii - 97 - strlen($key)) % 26 + 26) % 26 + 97);
					}
				} else {
					$decrypted_secret .= $secret[$i];
				}
			}

			if ($decrypted_secret == $_COOKIE['secret']) {
				$username = $_SESSION['key'];
				$message = "$username, I told you to $decrypted_secret because the cats a liar and you shouldn't trust him. ";

				// convert each character to a zero width character (including spaces(200b), joiners for 0s (200c) and non-joiners(200d for 1s)
				$zero_width_message = "";
				for ($i = 0; $i < strlen($message); $i++) {
					$binary = decbin(ord($message[$i]));
					// check how much padding is needed
					$padding = 8 - strlen($binary);
					// add the padding
					for ($j = 0; $j < $padding; $j++) {
						$binary = "0" . $binary;
					}
					$zero_width_char = str_replace(array('0', '1'), array('​', '‍'), $binary);
					$zero_width_message .= $zero_width_char;
				}
				
				$potential_cat_names = array("Whiskers", "Fluffy", "Mittens", "Snowball", "Mr. Whiskers", "Socks", "Tiger", "Kitty", "Paws", "Max", "Simba", "Oliver", "Milo", "Charlie", "Jack", "Loki", "Oscar", "Jasper", "Toby", "George", "Simon", "Boots", "Buddy", "Rocky", "Buster", "Sammy", "Sebastian", "Smokey", "Shadow", "Gizmo", "Bandit", "Sam", "Salem", "Spike", "Rusty", "Tom", "Romeo", "Oreo", "Pepper", "Felix", "Sylvester", "Garfield" );
				$cat = $potential_cat_names[array_rand($potential_cat_names)];

				$good_message = "My cats are great. $cat is learning binary but he's not very good at it yet.";

				// append the zero width characters to the good message
				$good_message .= $zero_width_message;

				// echo the message
				echo json_encode($good_message);
			} else {
				echo json_encode("");
			}
		} else {
			echo json_encode("");
		}
	} else {
		// echo the message
		echo json_encode("");
	}

?>