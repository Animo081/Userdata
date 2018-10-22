<?php
session_start();

if(sizeof($_SESSION)!=0){
    $responce = array(
        'id' => $_SESSION['id'],
        'login' => $_SESSION['login'],
        'password' => $_SESSION['password'],
        'fname' => $_SESSION['firstname'],
        'lname' => $_SESSION['lastname'],
        'e_mail' => $_SESSION['e-mail'],
        'role' => $_SESSION['role'],
        'url' => $_SESSION['url']);
    echo json_encode($responce);
}else{
    $responce = array();
    echo json_encode($responce);
}

?>