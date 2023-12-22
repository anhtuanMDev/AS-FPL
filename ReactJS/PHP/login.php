<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php'; 

    $data = json_decode(file_get_contents("php://input"));
    $Email = $data->Email;
    $Password = $data->Password;

    $query = "SELECT UserID, Name, Email, Password, BranchID, Phone, Avatar, Role FROM user WHERE Email = '$Email' AND Password = '$Password'";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $user = $stmt -> fetch(PDO::FETCH_ASSOC);

    // $token = array(
    //     "iss" => "http://localhost:8686",
    //     "aud" => "http://localhost:8686",
    //     "iat" => 1356999524,
    //     "nbf" => 1357000000,
    //     "data" => array(
    //         UserID => $user[0]['UserID'],
    //         Name => $user[0]['Name'],
    //         Email => $user[0]['Email'],
    //         Password => $user[0]['Password'],
    //         BranchID => $user[0]['BranchID'],
    //         Phone => $user[0]['Phone'],
    //         Avatar => $user[0]['Avatar'],
    //         Role => $user[0]['Role']
    //     )
    // )

    // $jwt = JWT::encode($token, $key);

    if($user){
        echo json_encode(
            array(
                "status" => true,
                "message" => "Login success",
                "user" => $user,
                "token" => null
            )
        );
    }else {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Login failed",
                "user" => null
            )
            );
    }
?>