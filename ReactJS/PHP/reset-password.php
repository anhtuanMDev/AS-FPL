<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

$data = json_decode(file_get_contents("php://input"));
$email = $data->Email;
$token = $data->Token;
$password = $data->Password;

$query = "SELECT * FROM password_reset where email = '$email' and token = '$token'
        and created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR) and available = 1";

$stmt = $dbConn->prepare($query);
$stmt->execute();
$reset = $stmt->fetch(PDO::FETCH_ASSOC);

if ($reset) {
    $query = "UPDATE user set Password = '$password' where Email = '$email'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    $query = "UPDATE password_reset set available = 0 where email = '$email'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    echo json_encode(
        array(
            "message" => "Password has been reset",
            "status" => true,
        )
    );
} else {
    echo json_encode(
        array(
            "status" => false,
        )
    );
}
