<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'connection.php';

use PHPMailer\PHPMailer\PHPMailer;
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/PHPMailer.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/SMTP.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/Exception.php';


$data = json_decode(file_get_contents("php://input"));
$email = $data->Email;

$query = "SELECT UserID FROM user WHERE Email = '$email'";
$stmt = $dbConn->prepare($query);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {

    $token = md5(time() . $email);
    $dbConn->query("insert into password_reset (email, token) values ('$email', '$token')");

    // link email gan port reactJS
    $link = "<a href='http://127.0.0.1:3000/user/resetPassword/?email="
    . $email . "&token=" . $token . "'>Click here to reset password</a>";

    $mail = new PHPMailer();
    $mail -> CharSet = "utf-8";
    $mail -> isSMTP();
    $mail -> SMTPAuth = true;
    $mail -> Username = "anhtuan03.mdev";
    $mail -> Password = "ysyvdlcpdpvbsfqt";
    $mail -> SMTPSecure = "ssl";
    $mail -> Host = "ssl://smtp.gmail.com";
    $mail -> Port = "465";
    $mail -> From = "anhtuan03.mdev@gmail.com";
    $mail -> FromName = "Anh Tuấn";
    $mail -> AddAddress($email,"Hello");
    $mail -> Subject = "Reset password";
    $mail -> isHTML(true);
    $mail -> Body = "Click on this link to reset password " . $link . "";

    $res = $mail -> Send();

    if ($res) {
        echo json_encode(
            array(
                "message" => "Email has been sent",
                "status" => true
            )
        );
    } else {
        echo json_encode(
            array(
                "message" => "Error email",
                "status" => false,
            )
        );
    }

} else {
    echo json_encode(
        array(
            "message" => "Email not exist",

        )
    );
}
