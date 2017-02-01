<?php

namespace App;

require_once 'utils/core.utils.php';
require_once 'utils/Connection.utils.php';
require_once 'Controllers/Auth.controller.php';
require_once 'Controllers/Utils.controller.php';

use App\Database\Connection as Connection;
use App\Controllers\Auth as Auth;
use App\Controllers\Utils as Utils;

$db = Connection::connect('localhost', 'test', 'root', '');
$auth = new Auth($db);
$utils = new Utils();

//input is a json object so we need to get this and decode it and assign it to $_POST
$_POST = json_decode(file_get_contents('php://input'), true);

//create email auth token
$emailAuthToken = bin2hex(openssl_random_pseudo_bytes(39)); //creates random bytes and converts them to hexidecima

//task check
if(isset($_POST['task']) && $_POST['task'] ==='AUTH_LOGIN'){
    //get user data from database
    $userData = $auth->fetchUserDataFromUsernameAndPassword($_POST);

    //save keep loggedin
    $userData['keepMeLoggedin'] = $_POST['keepMeLoggedin'];

    //return data as JSON object. json_encode converts array to json object.
    $returnData = json_encode($userData, JSON_FORCE_OBJECT);


    //send json object of returnData to user
    echo $returnData;

}// AUTH_LOGIN END
else if(isset($_POST['task']) && $_POST['task']==='FORGOTTON_PASSWORD'){

    //add token to post array
    $_POST['emailAuthToken'] = $emailAuthToken;

    //send email param
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: noreply@example.com' . "\r\n";
    $headers .= "X-MSMail-Priority: High\r\n";

    //check email is provided
    if(isset($_POST['email']) && !empty($_POST['email'])){
        $to = $_POST['email'];
    }else{
        //error echo false
        echo false;
    }

    //check timestamp
    $_POST['timestamp'] = (isset($_POST['timestamp']) && !empty($_POST['timestamp'])) ? $_POST['timestamp'] : '';

    //add to database and if true send email to user
    if($auth->resetPasswordAddToDb($_POST)){

        //prepare email
        $from = '<br /><br /> Example Company';
        $sub = 'Password Reset Request';
        $greeting = 'Dear user.';
        $msg = "<br /><br />
                example.com password reset request.
                If this request was not made by you please ignore this email. 
                If this was you and you wish to activate this account please click the link below: 
                <br /><br />";
        $link = 'http://localhost/projects/reactReduxRegisterAndLoginApp/#/fp?token='.$emailAuthToken.'&email='.$to;
        $tagline = '<br /><br />Where ideas become realities<br />'.$from;

        //echo true or false depending if email was sent correctly
        echo ($utils->sendEmail($headers, $to, $from, $sub, $greeting, $msg, $link, $tagline)) ? $to : false;
    }


} //FORGOTTON_PASSWORD END
else if(isset($_POST['task']) && $_POST['task']==='FORGOTTON_PASSWORD_CHANGE_PASSWORD'){

    //check token and password
    if(isset($_POST['emailAuthToken']) && isset($_POST['password']) && !empty($_POST['emailAuthToken']) && !empty($_POST['password'])){

        echo $auth->resetPasswordForgottonPassword($_POST);
    }

} //CHECK IF USER COOKIE IS VALID
else if(isset($_GET['task']) && $_GET['task']==='LOGIN_CHECK'){

    //check token and password
    if(isset($_GET['userLoggedinToken']) && !empty($_GET['userLoggedinToken'])){

        //return data from db
        echo $auth->checkUserLoggedin($_GET);
    }
}
?>