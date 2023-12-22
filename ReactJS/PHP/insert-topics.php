<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    // TopicID,Name,Content,Date,Banner,TopicID,AuthorID
    $TopicID = $data->TopicID;
    $Name = $data->Name;
    $Description = $data->Description;

    //  Thêm tin tức
    $query = "INSERT INTO topic (TopicID, Name, Description) 
    VALUES ('$TopicID', '$Name', '$Description')";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to add Topics!"
        )
    );
} catch(Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to add Topics!",
            "e" => `${e}`
        )
    );
}




?>