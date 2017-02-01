<?php

/**
 * Created by PhpStorm.
 * User: Niall
 * Date: 04/01/2017
 * Time: 14:58
 */
namespace App\Controllers;

use PDO;
class Auth
{
    //data members
    private $json;
    public $db;
    private $id;
    private $username;
    private $password;
    private $email;
    private $firstName;
    private $lastName;
    private $createdAt;
    private $updatedAt;
    private $emailAuthToken;
    private $emailValidated;
    private $updatedBy;
    private $lastLogin;
    private $loggedinToken;
    private $deletedFlag;

    //constructor to make database available
    public function __construct($database)
    {
        $this->db= $database;
    }

    //destruct user json object and upload to database
    public final function createUser($user){
        if($user!= null){
            //check data
            $this->id = '';
            $this->email = ((isset($user['email']) && !empty($user['email']))) ? $user['email'] : null;
            $this->username = ((isset($user['username']) && !empty($user['username']))) ? $user['username'] : null;
            $this->firstName = ((isset($user['firstName']) && !empty($user['firstName']))) ? $user['firstName'] : null;
            $this->lastName = ((isset($user['lastName']) && !empty($user['lastName']))) ? $user['lastName'] : null;
            $this->password = ((isset($user['password']) && !empty($user['password']))) ? $user['password'] : null;
            $this->createdAt = ((isset($user['timestamp']) && !empty($user['timestamp']))) ? $user['timestamp'] : '';
            $this->updatedAt = ((isset($user['timestamp']) && !empty($user['timestamp']))) ? $user['timestamp'] : '';
            $this->emailValidated = '';
            $this->updatedBy = '';
            $this->emailAuthToken = ((isset($user['emailAuthToken']) && !empty($user['emailAuthToken']))) ? $user['emailAuthToken'] : null;
            $this->loggedinToken='';
            $this->deletedFlag = '';

            //encrypt password.. bcrypt algorithm
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);


            // prepare sql and bind parameters
            $stmt = $this->db->prepare("
                                        BEGIN;
                                        INSERT INTO `users`(`id`, `username`, `firstName`, `lastName`, `email`, `password`, `createdAt`, `updatedAt`, `emailValidated`, `updatedBy`, `lastLogin`, `loggedinToken`, `deletedFlag`)
                                        VALUES (:id,:username,:firstName,:lastName,:email,:password,:createdAt,:updatedAt,:emailValidated,:updatedBy, :lastLogin, :loggedinToken, :deletedFlag);
                                        INSERT INTO `email_auth`(`id`, `token`, `email`, `createdAt`, `updatedAt`, `deletedFlag`) 
                                        VALUES ('',:emailAuthToken,:email,:createdAt,:updatedAt, :deletedFlag);
                                        COMMIT;
                                        ");

            $stmt->bindParam(':id', $this->id);
            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':firstName', $this->firstName);
            $stmt->bindParam(':lastName', $this->lastName);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':createdAt', $this->createdAt);
            $stmt->bindParam(':updatedAt', $this->updatedAt);
            $stmt->bindParam(':emailValidated', $this->emailValidated);
            $stmt->bindParam(':updatedBy', $this->updatedBy);
            $stmt->bindParam(':emailAuthToken', $this->emailAuthToken);
            $stmt->bindParam(':lastLogin', $this->updatedAt);
            $stmt->bindParam(':loggedinToken', $this->loggedinToken);
            $stmt->bindParam(':deletedFlag', $this->deletedFlag);

            //return true if executes otherwise false
            return ($stmt->execute()) ? true : false;

        }
    }

    //destruct user json object and check for user in database. Return user data if found.
    public final function fetchUserDataFromUsernameAndPassword($user){
        if(isset($user) && !empty($user)){

            //destructure data and assign data members
            $this->username = $user['username'];
            $this->password = $user['password'];
            $this->updatedAt = $user['timestamp'];
            $this->lastLogin = $user['timestamp'];

            //prepare sql and bind parameters
            $stmt = $this->db->prepare("SELECT * FROM users WHERE username=:username");
            $stmt-> bindParam(':username', $this->username);

            //fetch from database if present
            if($result = $stmt->execute()){

                //check number of rows
                if($stmt->rowCount() > 0){

                    //get user data
                    $data =  $stmt->fetch(PDO::FETCH_ASSOC);


                    //check password
                    if(password_verify($this->password, $data['password'])){

                        //set id and updatedBy
                        $this->id = $data['id'];
                        $this->updatedBy = $data['id'];

                        //create loggedin token
                        $this->loggedinToken = bin2hex(openssl_random_pseudo_bytes(200));


                        //prepare sql and bind parameters
                        $stmt2 = $this->db->prepare("UPDATE `users` SET `updatedAt`=:updatedAt,`updatedBy`=:updatedBy,`lastLogin`=:lastLogin, `loggedinToken`=:loggedinToken WHERE id = :id");
                        $stmt2->bindParam(':updatedAt', $this->updatedAt);
                        $stmt2->bindParam(':updatedBy', $this->updatedBy);
                        $stmt2->bindParam(':lastLogin', $this->lastLogin);
                        $stmt2->bindParam(':loggedinToken', $this->loggedinToken);
                        $stmt2-> bindParam(':id', $this->id);

                        if($stmt2->execute()){
                            $data['loggedinToken'] = $this->loggedinToken;
                            return $data;
                        }
                    }
                }

                //error return false
                return false;
            }

            //error return false
            return false;

        }
    }

    //validate email
    public final function validateEmail($data){

        //user array check
        if(isset($data) && !empty($data)){

            //detstructure user data
            $this->email = (isset($data['email']) && !empty($data['email'])) ? $data['email'] : '';
            $this->emailAuthToken = ($data['emailAuthToken']) ? $data['emailAuthToken'] : '';
            $this->updatedAt = ((isset($data['timestamp']) && !empty($data['timestamp']))) ? $data['timestamp'] : '';
            $this->emailValidated = 1;
            $this->deletedFlag = 1;

            //check email and token exists in one table and if it is update the user table to validated to 1
            $stmt = $this->db->prepare("UPDATE email_auth, users SET email_auth.deletedFlag =:deletedFlag, users.emailValidated=:emailValidated 
                                        WHERE users.email=:email AND email_auth.token=:emailAuthToken AND email_auth.email=:email");
            //bind param
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':emailAuthToken', $this->emailAuthToken);
            $stmt->bindParam(':updatedAt', $this->updatedAt);
            $stmt->bindParam(':emailValidated', $this->emailValidated);
            $stmt->bindParam(':deletedFlag', $this->deletedFlag);

            if($stmt->execute()){
                return true;
            }
        }

        //default return false
        return false;
    }

    //forgotton password email sent add to database
    public final function resetPasswordAddToDb($data){

        //detstructure user data
        $this->email = $data['email'];
        $this->emailAuthToken = $data['emailAuthToken'];
        $this->createdAt = $_POST['timestamp'];
        $this->updatedAt = $_POST['timestamp'];
        $this->deletedFlag = 0;

        //prepare query
        $stmt = $this->db->prepare("INSERT INTO `resetPassword`(`id`, `email`, `token`, `updatedBy`, `createdAt`, `updatedAt`, `deletedFlag`) 
                                    VALUES ('',:email,:emailAuthToken,'',:createdAt,:updatedAt,:deletedFlag)");

        //bind param
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':emailAuthToken', $this->emailAuthToken);
        $stmt->bindParam(':createdAt', $this->createdAt);
        $stmt->bindParam(':updatedAt', $this->updatedAt);
        $stmt->bindParam(':deletedFlag', $this->deletedFlag);

        $stmt->execute();

        if($stmt->rowCount() > 0){
            return $this->email;
        }

        return false;
    }

    //forgotton password reset password
    public final function resetPasswordForgottonPassword($data){

        //check data
        if(isset($data) && !empty($data)){

            //detstructure user data
            $this->email = $data['email'];
            $this->emailAuthToken = $data['emailAuthToken'];
            $this->password = $data['password'];
            $this->updatedAt = $data['timestamp'];
            $this->deletedFlag = 1;

            //encrypt password.. bcrypt algorithm
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);

            //prepare query
            $stmt = $this->db->prepare("UPDATE users, resetpassword SET users.password = :password, users.updatedAt=:updatedAt, users.updatedBy=users.id, resetpassword.updatedBy=users.id, resetpassword.updatedAt=:updatedAt, resetpassword.deletedFlag=:deletedFlag 
                                        WHERE users.email=:email AND resetpassword.email=:email AND resetpassword.token=:emailAuthToken");

            //bind param
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':emailAuthToken', $this->emailAuthToken);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':updatedAt', $this->updatedAt);
            $stmt->bindParam(':deletedFlag', $this->deletedFlag);

            //execute query
            $stmt->execute();

            if($stmt->rowCount()){
                return $this->email;
            }

            return false;
        }
    }

    //check if user is loggedin
    public final function checkUserLoggedin($data){
        $this->loggedinToken = $data['userLoggedinToken'];

        //prepare sql and bind parameters
        $stmt = $this->db->prepare("SELECT * FROM users WHERE loggedinToken=:loggedinToken");
        $stmt-> bindParam(':loggedinToken', $this->loggedinToken);

        if($result = $stmt->execute()){
            return $result;
        }else{
            return false;
        }
    }
}

?>