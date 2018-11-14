<?php

	class Model_user extends Model{
		
		function __construct(){
			require_once('../../php/connection.php');
		}
		
		function sign_up($login,$password,$fname,$lname,$e_mail,$url){
			$conn = OpenCon();
			if (!mysqli_num_rows($conn->query("SELECT login FROM userdata WHERE login='".$login."'"))){            
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
		
		function log_in($login,$password){
			$conn = OpenCon();
			if (mysqli_num_rows($conn->query("SELECT login FROM userdata WHERE login='".$login."'"))){
				$result = $conn->query("SELECT * FROM userdata WHERE login='".$login."'");
				$row = mysqli_fetch_array($result);
				if ($password === $row['password']){
					$result->close();
					return $row;
				}else echo "Неверный пароль";
			}else echo "Такого логина не существует";
			CloseCon($conn);
		}
		
		function self_editing($field,$value){
			$conn = OpenCon();
			session_start();
			$query = "UPDATE userdata SET " . $field . "='" . $value . "' WHERE id='" . $_SESSION['id'] . "'";   
			$conn->query($query);
			CloseCon($conn);
		}
		
	}

?>