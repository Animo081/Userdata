<?php

class Model_media extends Model{
		
	function __construct(){
		require_once('../../php/connection.php');
	}
		
	function setLocal($id,$type,$filename,$name){
		$conn = OpenCon();
		$query = "SELECT url FROM media WHERE id='" . $id . "' AND type='" . $type . "'";
		$result = $conn->query($query);
		if (!mysqli_num_rows($result)){
			if ($type == "video"){
				move_uploaded_file($filename,'../../video/'. $name);
				$url = '../video/'. $name;
			}else{
				move_uploaded_file($filename,'../../audio/'. $name);
				$url = '../audio/'. $name;	
			}
			$query = "INSERT INTO media VALUES" .
						"('','$id','$type','$url')";
			$conn->query($query);
		}else{
			if ($type == "video"){
				move_uploaded_file($filename,'../../video/'. $name);
				$url = '../video/'. $name;
			}else{
				move_uploaded_file($filename,'../../audio/'. $name);
				$url = '../audio/'. $name;	
			}
			$query = "UPDATE media SET url='" . $url . "' WHERE id='" . $id . "' AND type='" . $type . "'";   
			$conn->query($query);
		}
		CloseCon($conn);	
	}
	
	function setYoutube($id,$type,$url){
		$conn = OpenCon();
		$query = "SELECT url FROM media WHERE id='" . $id . "' AND type='" . $type . "'";
		$result = $conn->query($query);
		if (!mysqli_num_rows($result)){
			$query = "INSERT INTO media VALUES" .
						"('','$id','$type','$url')";
			$conn->query($query);
		}else{
			$query = "UPDATE media SET url='" . $url . "' WHERE id='" . $id . "' AND type='" . $type . "'";   
			$conn->query($query);
		}
		CloseCon($conn);
	}
	
	function getMedia($id,$type){
		$conn = OpenCon();
		$query = "SELECT url FROM media WHERE id='" . $id . "' AND type='" . $type . "'";
		$result = $conn->query($query);
		if (mysqli_num_rows($result)){
			$row = mysqli_fetch_array($result);
			return $row['url'];
		}else
			return "not found";
		CloseCon($conn);
	}
	
}

?>