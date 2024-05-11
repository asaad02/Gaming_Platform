<?php
error_log("Testing wordgen.php execution");

// header('Access-Control-Allow-Origin: *');

// add the api key here from OpenAI
// $openAIKey

// handle preflight request
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		// set http response code - 200 OK
		http_response_code(200);
		exit();
	}

// Prepare the data for the POST request
$data = [
    "model" => "gpt-3.5-turbo",
    "response_format" => ["type" => "json_object"],
    "messages" => [
        ["role" => "system", "content" => "You are a helpful assistant designed to output JSON."],
        ["role" => "user", "content" => "Suggest a different and random one word murder weapon and use it in a small murder mystery sentence, return weapon(lowercases) and sentence(lowercases)"]
    ]
];

// Initialize cURL
$ch = curl_init('https://api.openai.com/v1/chat/completions');

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    "Authorization: Bearer $openAIKey"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

// Execute the POST request
error_log(print_r($data, true)); // Before curl_exec
$response = curl_exec($ch);
error_log($response); // After curl_exec

curl_close($ch);

// Decode the response
$responseData = json_decode($response, true);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: unix:/run/php/php8.2-fpm.sock');
header('Access-Control-Allow-Methods: GET, POST');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//header('Access-Control-Allow-Credentials: true');

if ($responseData && isset($responseData['choices'][0]['message']['content'])) {

    $result = json_decode($responseData['choices'][0]['message']['content'], true);
    
    // Example response structure (this will likely need adjustment)
    echo json_encode([
        'weapon' => $result['weapon'], 
        'sentence' => $result['sentence']  
    ]);
} else {
    // Handle error or no data case
    echo json_encode(['error' => 'Failed to generate weapon and sentence']);
}
