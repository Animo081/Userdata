<?php

	class Controller_media extends Controller{
		
		public $model;
		
		function __construct(){
			$this->model = new Model_media();
		}
		
		function action_setLocal(){
			$this->model->setLocal();
		}
		
		function action_setYoutube(){
			$this->model->setYoutube();
		}
		
		function action_getMedia(){
			$result = $this->model->getMedia();
			echo $result;	
		}
	}

?>