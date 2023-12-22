<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'connection.php';

try {
    $TopicID = $_GET["TopicID"];

    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $description = $data->description;
    //  Thêm tin tức
    $query = "UPDATE topic set
    Name = '$name',
    Description = '$description'
    WHERE TopicID ='$TopicID'";
    
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to update topic!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to update topic!",
            "e" => `${e}`,
        )
    );
}
