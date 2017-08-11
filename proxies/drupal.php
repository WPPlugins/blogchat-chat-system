<?php
/**
*
* @FCChat proxy for drupal 
* @copyright (c) 2009- Robert Beach (fastcatsoftware.com)
*
* Use this file to establish a proxy between fcchat and drupal's default user authentification protocol.
*
* Module must be placed in /sites/all/modules or sites/your-site-folder/modules in order for this to work.
*
*/

define('SECRET_KEY', 'OqO,X<rU_&=F;V}f39< bh,+&Qlr>:20=V6a^FkQ9N!<Uwp|y}]}<!5(|W|N4E>8');
define('USERNAMES_ENCODED', true);

define('DRUPAL_ROOT', dirname(__FILE__) . '/../../../../../');
require_once DRUPAL_ROOT . 'includes/bootstrap.inc';
  
if (!isset($base_url)) {
    $fc_base_root = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https' : 'http';
    $base_url = $fc_base_root .= '://' . $_SERVER['HTTP_HOST'];
    if ($dir = trim(dirname(mb_substr($_SERVER['SCRIPT_NAME'],0,(strripos($_SERVER['SCRIPT_NAME'],'sites')+4))), '\,/')) {
      $base_url .= "/$dir";
    }
  }
drupal_bootstrap(DRUPAL_BOOTSTRAP_SESSION);

//echo 'sessionid='.session_id(); // just to see what my session ID is to manually compare to my browser's cookie session ID.

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
	$current_user = $user;
	if ( 0 == $current_user->uid ) {
    		// Not logged in.
	 	echo "<fcchatresponse><fcchatresponse>";
	} else {
    		// Logged in.
		$t1 = time();
		if(USERNAMES_ENCODED){
			$username = htmlspecialchars_decode($current_user->name);
		}else{
			$username = $current_user->name;
		}
		$name_length = strlen(str_decode_utf8($username));
		if($name_length<10){
			$name_length = '00' . $name_length;
		}else if($name_length<100){
			$name_length = '0' . $name_length;
		}
		$password = md5('dru' . $current_user->uid . SECRET_KEY);
		$signature = md5($t1 . $password . SECRET_KEY);
		echo "<fcchatresponse>" . 'dru' . $current_user->uid . '&' . $password . '&' . $name_length . $username . $signature . $t1 . "<fcchatresponse>";

	}
}else{
	echo "<fcchatresponse>0<fcchatresponse>";		
}

?>
