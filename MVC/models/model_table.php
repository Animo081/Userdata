<?php
	
	class Model_table extends Model{
		
		function __construct(){
			require_once('../../php/connection.php');
		}
		
		function edit(){
			$conn = OpenCon();
			$query = "UPDATE userdata SET " . $_POST['field'] . "='" . $_POST['value'] . "' WHERE id='" . $_POST['id'] . "'";   
			$conn->query($query);
			CloseCon($conn);
		}
		
		function delete(){
			session_start();
			if (sizeof($_SESSION)!=0)
				if ($_SESSION['role'] === "admin" or $_SESSION['id'] === $_POST['id']){
					$conn = OpenCon();
					$query = "DELETE FROM userdata WHERE id=" . $_POST['id'];
					$conn->query($query);
					$query = "DELETE FROM media WHERE id=" . $_POST['id'];
					$conn->query($query);
					CloseCon($conn);
    			}
		}
		
		function reveal(){
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
			return json_encode($responce);
		}
		
		function printT(){
			$conn = OpenCon();
			$query = "SELECT * FROM userdata ORDER BY lastname";
			$result = $conn->query($query);
			$rows = array();
			while($r = mysqli_fetch_assoc($result)){
				$rows[] = $r;
			}
			CloseCon($conn);
			return json_encode($rows);
		}
		
	}

?>