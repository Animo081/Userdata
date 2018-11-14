<?php

	class Controller_user extends Controller{
		
		public $model;
		
		function __construct(){
			$this->model = new Model_user();
		}
		
		function action_signup(){
			if (($_POST['login']) && ($_POST['password'])){
				$this->login = $_POST['login'];
				$this->password = $_POST['password'];
				$this->fname = $_POST['fname'];
				$this->lname = $_POST['lname'];
				$this->e_mail = $_POST['e_mail'];
				$this->url = $_POST['image'];
				$this->model->sign_up($this->login,$this->password,$this->fname,$this->lname,$this->e_mail,$this->url);
			}else{
				echo "Заполните поля логина и пароля";
			}
		}
		
		function action_login(){
			if (($_POST['login']) && ($_POST['password'])){
				$this->login = $_POST['login'];
				$this->password = $_POST['password'];
				$row = $this->model->log_in($this->login,$this->password);
				if (!is_string($row)){
					session_start();
					$_SESSION['id'] = $row['id'];
					$_SESSION['login'] = $row['login'];
					$_SESSION['password'] = $row['password'];
					$_SESSION['firstname'] = $row['firstname'];
					$_SESSION['lastname'] = $row['lastname'];
					$_SESSION['e-mail'] = $row['e-mail'];
					$_SESSION['role'] = $row['role'];
					$_SESSION['url'] = $row['url'];
				}
			}else{
				echo "Заполните поля логина и пароля";
			}
		}
		
		function action_logout(){
			session_start();
			session_destroy();
		}
		
		function action_userInfo(){
			session_start();
			if(sizeof($_SESSION)!=0){
				$responce = array(
					'id' => $_SESSION['id'],
					'login' => $_SESSION['login'],
					'password' => $_SESSION['password'],
					'fname' => $_SESSION['firstname'],
					'lname' => $_SESSION['lastname'],
					'e_mail' => $_SESSION['e-mail'],
					'role' => $_SESSION['role'],
					'url' => $_SESSION['url']);
				echo json_encode($responce);
			}else{
				$responce = array();
				echo json_encode($responce);
			}
		}
		
		function action_selfediting(){
			$this->field = $_POST['field'];
			$this->value = $_POST['value'];
			$this->model->self_editing($this->field,$this->value);
			session_start();
			$_SESSION["$this->field"] = $this->value;
		}
	}

?>