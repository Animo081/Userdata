<?php

require_once('connection.php');
$conn = OpenCon();

$query = "SELECT url FROM media WHERE id='" . $_POST['id'] . "' AND type='" . $_POST['type'] . "'";
$result = $conn->query($query);
if (!mysqli_num_rows($result)){
	$id = $_POST['id'];
	$type = $_POST['type'];
	if ($_POST['type'] == "video"){
		move_uploaded_file($_FILES['file']['tmp_name'],'../video/'. $_FILES['file']['name']);
		$url = '../video/'. $_FILES['file']['name'];
	}else{
		move_uploaded_file($_FILES['file']['tmp_name'],'../audio/'. $_FILES['file']['name']);
		$url = '../audio/'. $_FILES['file']['name'];	
	}
	$query = "INSERT INTO media VALUES" .
                "('','$id','$type','$url')";
	$conn->query($query);
}else{
	if ($_POST['type'] == "video"){
		move_uploaded_file($_FILES['file']['tmp_name'],'../video/'. $_FILES['file']['name']);
		$url = '../video/'. $_FILES['file']['name'];
	}else{
		move_uploaded_file($_FILES['file']['tmp_name'],'../audio/'. $_FILES['file']['name']);
		$url = '../audio/'. $_FILES['file']['name'];	
	}
	$query = "UPDATE media SET url='" . $url . "' WHERE id='" . $_POST['id'] . "' AND type='" . $_POST['type'] . "'";   
	$conn->query($query);
}

echo $_POST['type'];

CloseCon($conn);

?>