
<?php 
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET");
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Max-Age: 3600");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


//  Đọc dữ liệu từ client 
// http://127.0.0.1:8686/get-topics.php?a=5&b=10
// $a = $_GET["a"];
// $b = $_GET["b"];
// $c = $a + $b;
// echo json_encode(
//     array("kq"=> $c)
// );

 include_once 'connection.php';


//  Lấy danh sách topic
$query  = "SELECT * FROM topic";
$stmt = $dbConn->prepare($query);
$stmt->execute();
$topics = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo json_encode(
    array(
        "topics" => $topics
    )
)

?>