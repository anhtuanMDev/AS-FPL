<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try {

    $NewID = $_GET["NewID"];
    $query = "DELETE FROM new WHERE NewID ='$NewID'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to delete News!",
            "news" => $news,
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
