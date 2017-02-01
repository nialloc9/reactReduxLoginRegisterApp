<?php

namespace App;

require_once 'utils/core.utils.php';
require_once 'utils/Connection.utils.php';
require_once 'Controllers/Auth.controller.php';
require_once 'Controllers/Utils.controller.php';

use App\Database\Connection as Connection;
use App\Controllers\Auth as Auth;
use App\Controllers\Utils as Utils;

//connect to database and create objects to use
$db = Connection::connect('localhost', 'test', 'root', '');
$auth = new Auth($db);
$utils = new Utils();

//input is a json object so we need to get this and decode it and assign it to $_POST
$_POST = json_decode(file_get_contents('php://input'), true);

//create email authentication token
$emailAuthToken = bin2hex(openssl_random_pseudo_bytes(39)); //creates random bytes and converts them to hexidecimal

//task check
if(isset($_POST['task']) && $_POST['task'] ==='UPDATE_AUTH_INFO'){

    //add to user data to pass
    $_POST['emailAuthToken'] = $emailAuthToken;

    //add user to database and send email verificatin request email
    if($auth->createUser($_POST)){

        //send email param
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: noreply@ocwebtech.com' . "\r\n";
        $headers .= "X-MSMail-Priority: High\r\n";


        $to = $_POST['email'];
        $from = '<br /><br /> example company';
        $sub = 'Email Activation Request';
        $greeting = 'Dear '.$_POST['firstName'];
        $msg = "<br /><br />
                example.com email verification request.
                If this request was not made by you please ignore this email. 
                If this was you and you wish to activate this account please click the link below: 
                <br /><br />";
        $link = 'http://localhost/projects/reactReduxRegisterAndLoginApp/#/emailValidate?token='.$emailAuthToken.'&email='.$to;
        $tagline = '<br /><br />Where ideas become realities<br />'.$from;

        //echo true or false depending if email was sent correctly
        echo ($utils->sendEmail($headers, $to, $from, $sub, $greeting, $msg, $link, $tagline)) ? $to : false;
    }
}else if($_POST['task'] && $_POST['task'] === 'VALIDATE_EMAIL'){
    //check data
    if(
        (isset($_POST['email']) && isset($_POST['emailAuthToken'])) &&
        (!empty($_POST['email']) && !empty($_POST['emailAuthToken']))
    ){

        //validate email and return true if successful else return false
        if($auth->validateEmail($_POST)){
            echo true;
        }else{
            echo false;
        }
    }


}
?>
