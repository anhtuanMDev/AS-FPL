<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    // NewID,Title,Content,Date,Banner,TopicID,AuthorID
    $NewID = $data->NewID;
    $Title = $data->Title;
    $Content = $data->Content;
    $Banner = $data->Banner;
    $TopicID = $data->TopicID;
    $AuthorID = $data->AuthorID;
    //  Thêm tin tức
    $query = "INSERT INTO new (NewID, Title, Content, Date, Banner, TopicID, AuthorID) 
    VALUES ('$NewID', '$Title', '$Content', now(), '$Banner', '$TopicID', '$AuthorID')";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to add News!"
        )
    );
} catch(Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to add News!",
            "e" => `${e}`
        )
    );
}




?>