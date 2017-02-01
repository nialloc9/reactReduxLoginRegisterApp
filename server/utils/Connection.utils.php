<?php
/**
 * Created by PhpStorm.
 * User: Niall
 * Date: 04/01/2017
 * Time: 14:54
 */

namespace App\Database;

use PDO;

class Connection{
    static function connect($host, $dbname, $username, $password){
        try{
            $connectString = 'mysql:host='.$host.';dbname='.$dbname.';charset=utf8';
            return $database = new PDO($connectString, $username, $password);
        }catch (Exception $e){
            return null;
            echo 'ERROR: '.$e->getMessage();
        }
    }
}
?>