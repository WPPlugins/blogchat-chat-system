<?php
include('ip2locationlite.class.php');
 
$api_key = ( isset($_POST['c1']) ) ? $_POST['c1'] : '';
$data_cookie = ( isset($_POST['c2']) ) ? $_POST['c2'] : '';

//Load the class
$ipLite = new ip2location_lite;
$ipLite->setKey($api_key);

$loc='';
$ipp='';

function iptoc($ip, $type = 1) {
	global $ipLite,$api_key;

	$country = "";

	//ipinfodb
	if($api_key !=''){
		$locations = $ipLite->getCountry($ip);
		if (!empty($locations) && is_array($locations)) {
  			foreach ($locations as $field => $val) {
    				if(strtolower($field)=="countrycode"){
					$country = strtolower($val);
					if (preg_match("/[^a-z0-9]/",$country)){
						$country = "";
        				}
    				}
  			}
		}
	}
	if($country==""){
		//hostip (fallback)
		$result = file_get_contents("http://api.hostip.info/?ip=".$ip);
		$country = explode("<countryAbbrev>", $result);
		if(count($country)>1){
			$country = explode("</countryAbbrev>", $country[1]);
			$country = substr(strtolower($country[0]),0,3);
			if (preg_match("/[^a-z0-9]/",$country)){
				$country="xx";
			}
		}else{
			$country="xx"; 
		}
	}
	return $country."/".$ip;
}


if (isset($_COOKIE[$data_cookie])){
	$data = $_COOKIE[$data_cookie];
	$datapieces = explode("&", $data);
	if(count($datapieces)>13){
		$loc = $datapieces[13];
		$locpieces = explode("/", $loc);
		if(count($locpieces)>1){
			$ipp=$locpieces[1];
		}
	}
}


if($loc==''||$ipp!=$_SERVER['REMOTE_ADDR']){ 
	echo '<getloc>'.iptoc($_SERVER['REMOTE_ADDR']).'<getloc>';
}else{
	echo '<getloc>'.$loc.'<getloc>';
}
?>