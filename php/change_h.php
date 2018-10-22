<?php

require_once('connection.php');
$conn = OpenCon();
session_start();

$query = "UPDATE userdata SET " . $_POST['field'] . "='" . $_POST['value'] . "' WHERE id='" . $_POST['id'] . "'";   
$conn->query($query);

CloseCon($conn);

?>