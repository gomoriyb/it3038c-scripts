<?php
$visitor = $_GET['name'];
$message = 'Hello ' . $visitor. ', Welcome to my project 2!';
$output = (object) ['creator'=> 'Benjamin Gomori', 'content'=> 
'<!DOCTYPE html><html><head><title>Project 2</title></head><body><h1>'.$message.'</h1><p>For this project, I wanted to continue our class learning. I developed this project by using the different Python modules we learned, developed a PHP backend,  made the JSON a bit more dynamic using the user name, and pressed the returned data.</br>Thank you for reviewing my project!</p></body></html>'
];

$myJSON = json_encode($output);
header('Content-Type: application/json');
echo $myJSON;
?> 