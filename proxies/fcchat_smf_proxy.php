<?php
/**
*
* @FCChat proxy for simple machines forum 
* @copyright (c) 2009- Robert Beach (fastcatsoftware.com)
*
* Use this file to establish a proxy between fcchat and smf default user authentification protocol.
*
*/


require_once(dirname(__FILE__) . '/../../SSI.php');

define('SECRET_KEY', 'OqO,X<rU_&=F;V}f39< bh,+&Qlr>:20=V6a^FkQ9N!<Uwp|y}]}<!5(|W|N4E>8');
define('USERNAMES_ENCODED', true);
define('RETURN_AVATAR', true);

$user_id='';
$password='';

function str_decode_utf8($string) {
  if (mb_detect_encoding($string.'a', 'UTF-8', true) === 'UTF-8') {
    $string = utf8_decode($string);
  }
return $string;
}

$request = ( isset($_POST['f']) ) ? (int) $_POST['f'] : 0;

if($request==0){
	if ( 0 != $user_info['is_guest']) {
    		// Not logged in.
		echo "<fcchatresponse><fcchatresponse>";
	} else {
    		// Logged in.
		$t1 = time();
		if(USERNAMES_ENCODED){
			$username = htmlspecialchars_decode($user_info['username']);
		}else{
			$username = $user_info['username'];
		}
		$name_length = strlen(str_decode_utf8($username));
		if($name_length<10){
			$name_length = '00' . $name_length;
		}else if($name_length<100){
			$name_length = '0' . $name_length;
		}
		$password = md5('smf' . $user_info['id'] . SECRET_KEY);
		$signature = md5($t1 . $password . SECRET_KEY);
		echo "<fcchatresponse>" . 'smf' . $user_info['id'] . '&' . $password . '&' . $name_length . $username . $signature . $t1 . "<fcchatresponse>";

		//Grab the avatar
		if(RETURN_AVATAR){
			if (!empty($context['user']['avatar'])){
				$url =  explode('"',$context['user']['avatar']['image']);
				echo "<fcchatresponse2>/" . $url[1] . "<fcchatresponse2>";
			}else{
				echo "<fcchatresponse2><fcchatresponse2>";
			}
		}
	}
}else{
	if (!empty($context['user']['avatar'])){
		$url =  explode('"',$context['user']['avatar']['image']);
		echo "<fcchatresponse>/" . $url[1] . "<fcchatresponse>";		
	}else{
		echo "<fcchatresponse>0<fcchatresponse>";
	}		
}


?>