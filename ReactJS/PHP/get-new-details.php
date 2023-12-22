<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

try{
    $NewID = $_GET["NewID"];
    $query = "SELECT * FROM new WHERE NewID = '$NewID' ";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(
        array(
            "status" => true,
            "message" => "Success to get News!",
            "new" => $result,
        )
    );
}catch(Exception $e){
    echo json_encode(
        array(
            "status" => false,
            "message" => "Fail to get News!",
            "error" => "${e}"
        )
    );
}

?>