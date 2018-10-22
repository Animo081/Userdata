<?php

require_once('connection.php');

$id = $_POST['id'];

$conn = OpenCon();
$query = "SELECT * FROM userdata WHERE id=" . $id;
$result = $conn->query($query);
$row = mysqli_fetch_array($result);
$responce = array(
    'id' => $row['id'],
    'login' => $row['login'],
    'password' => $row['password'],
    'fname' => $row['firstname'],
    'lname' => $row['lastname'],
    'e_mail' => $row['e-mail'],
    'role' => $row['role'],
    'url' => $row['url']);

CloseCon($conn);

echo json_encode($responce);

?>