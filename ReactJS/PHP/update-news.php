<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'connection.php';

try {
    $NewID = $_GET["NewID"];

    $data = json_decode(file_get_contents("php://input"));
    $Title = $data->Title;
    $Content = $data->Content;
    $Banner = $data->Banner;
    $TopicID = $data->TopicID;
    $AuthorID = $data->AuthorID;
    //  Thêm tin tức
    $query = "UPDATE new set
    Title = '$Title',
    Content = '$Content',
    Banner = '$Banner',
    TopicID = '$TopicID',
    AuthorID = '$AuthorID'
    WHERE NewID ='$NewID'";
    
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to add News!",
        )
    );
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to add News!",
            "e" => `${e}`,
        )
    );
}
