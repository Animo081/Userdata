<?php

require_once('connection.php');
$conn = OpenCon();

$query = "SELECT url FROM media WHERE id='" . $_POST['id'] . "' AND type='" . $_POST['type'] . "'";
$result = $conn->query($query);
if (!mysqli_num_rows($result)){
	$id = $_POST['id'];
	$type = $_POST['type'];
	$url = $_POST['url'];
	$query = "INSERT INTO media VALUES" .
                "('','$id','$type','$url')";
	$conn->query($query);
}else{
	$query = "UPDATE media SET url='" . $_POST['url'] . "' WHERE id='" . $_POST['id'] . "' AND type='" . $_POST['type'] . "'";   
	$conn->query($query);
}

CloseCon($conn);

?>