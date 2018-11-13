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
			$result = $this->model->reveal();
			echo $result;
		}
		
		function action_edit(){
			$this->model->edit();
		}
		
		function action_delete(){
			$this->model->delete();
		}
		
	}

?>