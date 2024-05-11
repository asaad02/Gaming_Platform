<?php
	# include the database connection, # use an absolute path to avoid issues
	require_once($_SERVER['DOCUMENT_ROOT'] . '/db/connect.php');

	$table = "Games";
	$sql = "CREATE TABLE IF NOT EXISTS $table (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, username TEXT, score INTEGER, date_time TEXT, game_id INTEGER)";

	# execute the SQL statement
	$db->exec($sql);

	# close the database connection
	$db = null;
?>
