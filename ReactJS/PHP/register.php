<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

$data = json_decode(file_get_contents("php://input"));
$userID = $data->UserID;
$name = $data->Name;
$email = $data->Email;
$password = $data->Password;
$branchID = $data->BranchID;
$phone = $data->Phone;
$avatar = $data->Avatar;
$role = $data->Role;

$query = "SELECT Email, Password FROM user WHERE Email = '$email'";
$stmt = $dbConn->prepare($query);
$stmt->execute();
$user = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(
        array(
            "message" => "Email already exists",
            "status" => false,
        )
    );
} else {
    $insertQuery = "INSERT INTO user (UserID, Name, Email, Password, BranchID, Phone, Avatar, Role) 
                    VALUES ('$userID', '$name', '$email', '$password', '$branchID', '$phone', '$avatar', '$role')";
    $stmt = $dbConn->prepare($insertQuery);
    
    if ($stmt->execute()) {
        echo json_encode(
            array(
                "message" => "Register successfully",
                "status" => true,
            )
        );
    } else {
        echo json_encode(
            array(
                "message" => "Register failed",
                "status" => false,
            )
        );
    }
}
?>
