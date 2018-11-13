<?php
	
	require_once 'model.php';
	require_once 'controller.php';
	
	class Route{
		static function start(){
			$controller_name = 'Main';
			$action_name = 'index';
			
			$routes = explode('/',$_SERVER['REQUEST_URI']);
			
			if (!empty($routes[1])){
				$controller_name = $routes[1];
			}
			if (!empty($routes[2])){
				$action_name = $routes[2];
			}
			
			$model_name = 'Model_' . $controller_name;
			$controller_name = 'Controller_' . $controller_name;
			$action_name = 'action_' . $action_name;
			
			$model_file = strtolower($model_name) . '.php';
			$model_path = "../models/" . $model_file;
			if (file_exists($model_path)){
				include "../models/" . $model_file;
			}
			
			$controller_file = strtolower($controller_name) . '.php';
			$controller_path = "../controllers/" . $controller_file;
			if (file_exists($controller_path)){
				include "../controllers/" . $controller_file;
			}
			
			$controller = new $controller_name;
			$action = $action_name;
			if (method_exists($controller,$action)){
				$controller->$action();
			}			
		}
	}

	$route = new Route();
	$route->start();

?>