<?php

// Define an associative array with weapons as keys and sentences as values
$weapons = [
    "sword" => "The sword unsheathed dripped with guilt",
    "spear" => "Beside the vase the spear whispered betrayal",
    "arrow" => "An arrow in the shadow silent but deadly",
    "dagger" => "The dagger on the floor shone under the moonlight",
    "crossbow" => "A crossbow forgotten held the key to the mystery",
    "axe" => "The axe still sharp spoke of a swift end",
    "mace" => "The mace out of place echoed a dark deed",
    "halberd" => "The halberds stance was a silent confession",
    "flail" => "In the corner the flails presence was ominous",
    "hammer" => "A hammer discarded hid its sinister tale"
];

// Select a random weapon and its corresponding sentence
$weapon = array_rand($weapons);
$sentence = $weapons[$weapon];

// Create an array to hold the weapon and sentence
$response = [
    "weapon" => $weapon,
    "sentence" => $sentence
];

// Return JSON representation of the response
header('Content-Type: application/json');
echo json_encode($response);

?>
