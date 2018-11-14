<?php

	class Controller_media extends Controller{
		
		public $model;
		
		function __construct(){
			$this->model = new Model_media();
		}
		
		function action_setLocal(){
			$this->id = $_POST['id'];
			$this->type = $_POST['type'];
			$this->filename = $_FILES['file']['tmp_name'];
			$this->name = $_FILES['file']['name'];
			$this->model->setLocal($this->id,$this->type,$this->filename,$this->name);
		}
		
		function action_setYoutube(){
			$this->id = $_POST['id'];
			$this->type = $_POST['type'];
			$this->url = $_POST['url'];
			$this->model->setYoutube($this->id,$this->type,$this->url);
		}
		
		function action_getMedia(){
			$this->id = $_POST['id'];
			$this->type = $_POST['type'];
			$result = $this->model->getMedia($this->id,$this->type);
			echo $result;	
		}
	}

?>