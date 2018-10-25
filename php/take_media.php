<?php


require_once('connection.php');
$conn = OpenCon();

$query = "SELECT url FROM media WHERE id='" . $_POST['id'] . "' AND type='" . $_POST['type'] . "'";
$result = $conn->query($query);
if (mysqli_num_rows($result)){
	$row = mysqli_fetch_array($result);
	echo $row['url'];
}else
	echo "not found";

CloseCon($conn);

?>