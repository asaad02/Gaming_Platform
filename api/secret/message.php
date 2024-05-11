<?php
	// if the movequick cookie is set
	if (isset($_COOKIE['hope_you_can_read_quickly'])) {
		$lastlogin = $_SESSION['key'];
		$lastWarning = $_COOKIE['hope_you_can_read_quickly'];
		// echo the message
		http_response_code(200);
		echo json_encode("Come back soon and if you tell me the secret, I'll tell you a secret about my cats. ");
		setcookie("secret", $lastWarning, time() + 3600, '/', '');
		setcookie("hope_you_can_read_quickly", "", time() - 3600, '/', '');
	} else {
		// echo the message
		http_response_code(200);
		echo json_encode("Cya!");
	}
?>