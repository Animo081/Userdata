<?php

require_once('connection.php');
$conn = OpenCon();
session_start();

$field = $_POST['field'];

$query = "UPDATE userdata SET " . $_POST['field'] . "='" . $_POST['value'] . "' WHERE id='" . $_SESSION['id'] . "'";   
$conn->query($query);

$_SESSION["$field"] = $_POST['value'];

CloseCon($conn);
?>