<?php

require_once('connection.php');

function connectOne(){
    $conn = OpenCon();
    if (($_POST['login']) &&
        ($_POST['password'])){
            if (!mysqli_num_rows($conn->query("SELECT login FROM userdata WHERE login='".$_POST['login']."'"))){
                
                $login = $_POST['login'];
                $password = $_POST['password'];
                $fname = $_POST['fname'];
                $lname = $_POST['lname'];
                $e_mail = $_POST['e-mail'];
                $url = $_POST['image'];
                $id = 1;
                while(mysqli_num_rows($conn->query("SELECT id FROM userdata WHERE id=" . $id)))
                    $id++;
                $query = "INSERT INTO userdata VALUES" .
                    "('$id','$login', '$password', '$e_mail','user','$fname','$lname','$url')";
                $result = $conn->query($query);
                if (!$result) echo "Сбой при вставке данных: $query<br>" .
                    $conn->error . "<br><br>";
            }
    }else print("Не введены данные");

    /*$query = "DELETE FROM userdata";
    $conn->query($query);*/

    CloseCon($conn);
    
    header("Location:http://localhost/");
}

if(isset($_POST['submit']))
    connectOne();

?>