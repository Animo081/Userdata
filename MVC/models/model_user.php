<?php

	class Model_user extends Model{
		
		function __construct(){
			require_once('../../php/connection.php');
		}
		
		function sign_up(){
			$conn = OpenCon();
			if (!mysqli_num_rows($conn->query("SELECT login FROM userdata WHERE login='".$_POST['login']."'"))){            
				$login = $_POST['login'];
				$password = $_POST['password'];
				$fname = $_POST['fname'];
				$lname = $_POST['lname'];
				$e_mail = $_POST['e_mail'];
				$url = $_POST['image'];
				$id = 1;
				while(mysqli_num_rows($conn->query("SELECT id FROM userdata WHERE id=" . $id)))
					$id++;
				$query = "INSERT INTO userdata VALUES" .
					"('$id','$login', '$password', '$e_mail','user','$fname','$lname','$url')";
				$conn->query($query);
			}else
				echo "Такой пользователь уже существует";
			CloseCon($conn);
		}
		
		function log_in(){
			$conn = OpenCon();
			if (mysqli_num_rows($conn->query("SELECT login FROM userdata WHERE login='".$_POST['login']."'"))){
				$result = $conn->query("SELECT * FROM userdata WHERE login='".$_POST['login']."'");
				$row = mysqli_fetch_array($result);
				if ($_POST['password'] === $row['password']){
					$result->close();
					return $row;
				}else echo "Неверный пароль";
			}else echo "Такого логина не существует";
			CloseCon($conn);
		}
		
		function self_editing(){
			$conn = OpenCon();
			session_start();
			$query = "UPDATE userdata SET " . $_POST['field'] . "='" . $_POST['value'] . "' WHERE id='" . $_SESSION['id'] . "'";   
			$conn->query($query);
			CloseCon($conn);
		}
		
	}

?>