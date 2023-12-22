<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

$keyword = $_GET["keyword"];

//  Lấy danh sách new
$query  = "SELECT NewID,Title,Content,Date,Banner,TopicID,AuthorID FROM new WHERE Title LIKE '%$keyword%' OR Content LIKE '%$keyword%'";
$stmt = $dbConn->prepare($query);
$stmt->execute();
$news = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo json_encode(
    array(
        "news" => $news
    )
)

?>