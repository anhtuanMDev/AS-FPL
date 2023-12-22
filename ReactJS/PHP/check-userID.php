<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

$data = json_decode(file_get_contents("php://input"));
$userID = $data->UserID;
$query = "SELECT UserID FROM user WHERE UserID = '$userID'";
$stmt = $dbConn->prepare($query);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(
        array(
            "message" => "This ID doesnt have any user",
            "status" => true,
        )
    );
}else {
    echo json_encode(
        array(
            "message" => "User ID is already exist",
            "status" => false,
        )
    );
}
