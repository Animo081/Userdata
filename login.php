<?php

require_once('connection.php');
$conn = OpenCon();

if (($_POST['login']) &&
    ($_POST['password'])){
    if (mysqli_num_rows($conn->query("SELECT login FROM userdata WHERE login='".$_POST['login']."'"))){
        $result = $conn->query("SELECT * FROM userdata WHERE login='".$_POST['login']."'");
        $row = mysqli_fetch_array($result);
        if ($_POST['password'] === $row['password']){
            $result->close();
            session_start();
            $_SESSION['id'] = $row['id'];
            $_SESSION['login'] = $row['login'];
            $_SESSION['password'] = $row['password'];
            $_SESSION['firstname'] = $row['firstname'];
            $_SESSION['lastname'] = $row['lastname'];
            $_SESSION['e-mail'] = $row['e-mail'];
            $_SESSION['role'] = $row['role'];
            $_SESSION['url'] = $row['url'];
            $result = "welcome, " . $_SESSION['login'];
        }else $result = "invalid password";
    }else $result = "такого логина не существует";
}else $result = "есть незаполненные поля";
    
CloseCon($conn);

echo $result;

?>