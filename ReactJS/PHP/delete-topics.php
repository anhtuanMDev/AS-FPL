<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {

    $TopicID = $_GET["TopicID"];
    $query = "DELETE FROM topic WHERE TopicID ='$TopicID'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $topic = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to delete News!",
            "topic" => $topic,
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to delete News!",
            "e" => "${e}",
        )
    );
}
