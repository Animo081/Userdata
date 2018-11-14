<?php

	class Controller_table extends Controller{
		
		public $model;
		
		function __construct(){
			$this->model = new Model_table();
		}
		
		function action_printT(){
			$result = $this->model->printT();
			echo $result;
		}
		
		function action_reveal(){
			$this->id = $_POST['id'];
			$result = $this->model->reveal($this->id);
			echo $result;
		}
		
		function action_edit(){
			$this->field = $_POST['field'];
			$this->value = $_POST['value'];
			$this->id = $_POST['id'];
			$this->model->edit($this->field,$this->value,$this->id);
		}
		
		function action_delete(){
			$this->id = $_POST['id'];
			$this->model->delete($this->id);
		}
		
	}

?>