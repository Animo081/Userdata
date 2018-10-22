<?php

session_start();

require_once('connection.php');

if (sizeof($_SESSION)!=0)
    if ($_SESSION['role'] === "admin" or $_SESSION['id'] === $_POST['id']){
        $conn = OpenCon();
        $query = "DELETE FROM userdata WHERE id=" . $_POST['id'];
        $conn->query($query);
        CloseCon($conn);
    }

?>