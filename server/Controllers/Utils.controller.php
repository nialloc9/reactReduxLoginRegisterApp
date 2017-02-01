<?php
/**
 * Created by PhpStorm.
 * User: Niall
 * Date: 06/01/2017
 * Time: 10:32
 */

namespace App\Controllers;


class Utils
{
    //data members
    private $headers;
    private $to;
    private $from;
    private $sub;
    private $greeting;
    private $msg;
    private $link;
    private $tagline;
    private $message;

    //send email
    public final function sendEmail($headers, $to, $from, $sub, $greeting, $msg, $link, $tagline){
        //assign data members
        $this->headers = (isset($headers) && (!empty($headers))) ? $headers : '';
        $this->to = (isset($to) && (!empty($to))) ? $to : '';
        $this->from = (isset($from) && (!empty($from))) ? $from : '';
        $this->sub = (isset($sub) && (!empty($sub))) ? $sub : '';
        $this->greeting = (isset($greeting) && (!empty($greeting))) ? $greeting : '';
        $this->msg = (isset($msg) && (!empty($msg))) ? $msg : '';
        $this->link = (isset($link) && (!empty($link))) ? $link : '';
        $this->tagline = (isset($tagline) && (!empty($tagline))) ? $tagline : '';

        //construct message
        $this->message = $this->greeting.$this->msg.$this->link.$this->tagline;

        //send email and return true if successful and false if not
        return (mail($this->to,$this->sub,$this->message,$this->headers)) ? true : false;
    }
}