<?php 
	session_start();

	function get_session() {
		// return the session variables that are set
		echo json_encode($_SESSION);
	}

	function get_session_user() {
		if (isset($_SESSION['username'])) {
			echo $_SESSION['username'];
		}
	}

	function get_session_game_id() {
		if (isset($_SESSION['game_id'])) {
			echo $_SESSION['game_id'];
		}
	}

	function get_session_score() {
		if (isset($_SESSION['score'])) {
			echo $_SESSION['score'];
		}
	}

?>