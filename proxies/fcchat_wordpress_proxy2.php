<?php
/**
*
* @FCChat proxy for wordpress 
* @copyright (c) 2009- Robert Beach (fastcatsoftware.com)
*
* Use this file to establish a proxy between fcchat and wordpress' default user authentification protocol.
*
*/

define('SECRET_KEY', 'OqO,X<rU_&=F;V}f39< bh,+&Qlr>:20=V6a^FkQ9N!<Uwp|y}]}<!5(|W|N4E>8');
define('USERNAMES_ENCODED', true);
define('RETURN_AVATAR', true);

/** Make sure that the WordPress bootstrap has run before continuing. */
require( dirname(__FILE__) . '/../../../../wp-load.php' );
 
function str_decode_utf8($string) {
  if (mb_detect_encoding($string.'a', 'UTF-8', true) === 'UTF-8') {
    $string = utf8_decode($string);
  }
return $string;
}

function my_wp_validate_auth_cookie($cookie = '', $scheme = '') {
	        if ( ! $cookie_elements = wp_parse_auth_cookie($cookie, $scheme) ) {
	                do_action('auth_cookie_malformed', $cookie, $scheme);
	                wp_set_current_user(0);
			return false;
	        }
		if(!is_array($cookie_elements)){
			return false;
		}
	        extract($cookie_elements, EXTR_OVERWRITE);
	
	        $expired = $expiration;
	
	        // Allow a grace period for POST and AJAX requests
	        if ( defined('DOING_AJAX') || 'POST' == $_SERVER['REQUEST_METHOD'] )
	                $expired += 3600;
	
	        // Quick check to see if an honest cookie has expired
	        if ( $expired < time() ) {
	                do_action('auth_cookie_expired', $cookie_elements);
	                wp_set_current_user(0);
			return false;
	        }
	
	        $user = get_user_by('login', $username);
	        if ( ! $user ) {
	                do_action('auth_cookie_bad_username', $cookie_elements);
	                wp_set_current_user(0);
			return false;
	        }
	
	        $pass_frag = substr($user->user_pass, 8, 4);
		$key = wp_hash($username . $pass_frag . '|' . $expiration, $scheme);
	        $hash = hash_hmac('md5', $username . '|' . $expiration, $key);
	
	        if ( $expiration < time() ) // AJAX/POST grace period set above
	                $GLOBALS['login_grace_period'] = 1;
	
	        do_action('auth_cookie_valid', $cookie_elements, $user);
	
	       wp_set_current_user($user->ID);
}

my_wp_validate_auth_cookie($_COOKIE[LOGGED_IN_COOKIE], 'logged_in');


$user_id='';
$password='';

function validate_gravatar($email) {
	// Craft a potential url and test its headers
	$hash = md5($email);
	$uri = 'http://www.gravatar.com/avatar/' . $hash . '?d=404';
	$headers = @get_headers($uri);
	if (!preg_match("|200|", $headers[0])) {
		$has_valid_avatar = FALSE;
	} else {
		$has_valid_avatar = TRUE;
	}
	return $has_valid_avatar;
}


$request = ( isset($_POST['f']) ) ? (int) $_POST['f'] : 0;


if($request==0){
	$current_user = wp_get_current_user();
	if ( 0 == $current_user->ID ) {
    		// Not logged in.
	 	echo "<fcchatresponse><fcchatresponse>";
	} else {
    		// Logged in.
		$t1 = time();
		if(strtotime($current_user->user_registered) > strtotime('2013-02-03 12:00')){
			$username = $current_user->user_login;
		}else{
			$username = $current_user->display_name!=''?$current_user->display_name:$current_user->user_login;
		}
		if(USERNAMES_ENCODED){
			$username = htmlspecialchars_decode($username);
		}
		$name_length = strlen(str_decode_utf8($username));
		if($name_length<10){
			$name_length = '00' . $name_length;
		}else if($name_length<100){
			$name_length = '0' . $name_length;
		}
		$password = md5('wp1' . $current_user->ID . SECRET_KEY);
		$signature = md5($t1 . $password . SECRET_KEY);
		

		echo "<fcchatresponse>" . 'wp1' . $current_user->ID . '&' . $password . '&' . $name_length . $username . $signature . $t1 . "<fcchatresponse>";

		
		//Grab the avatar
		if(RETURN_AVATAR){
			$email=$current_user->user_email;
			if (function_exists('get_avatar')) {
				$avatar = get_avatar($current_user->ID);
				if(stripos($avatar, 'src="')){
					$extractURL = split('src="',$avatar);
					$extractURL = split('"',$extractURL[1]);
      					echo "<fcchatresponse2>/" . $extractURL[0] . "<fcchatresponse2>";   							}else if(stripos($avatar, "src='")){
					$extractURL = split("src='",$avatar);
					$extractURL = split("'",$extractURL[1]);
      					echo "<fcchatresponse2>/" . $extractURL[0] . "<fcchatresponse2>";   							}else{
					echo "<fcchatresponse2><fcchatresponse2>";
				}				
			} else {
				if(validate_gravatar($email)){
      					//alternate gravatar code for < 2.5
      					$grav_url = "/http://www.gravatar.com/avatar/" . 
        				 md5(strtolower($email)) . "?d=" . urlencode($default) . "&s=" . $size;
      					echo "<fcchatresponse2>" . $grav_url . "<fcchatresponse2>";
   				
				}else{
					echo "<fcchatresponse2><fcchatresponse2>";
				}
			}
		}
	}
}else{
	echo "<fcchatresponse>0<fcchatresponse>";		
}

?>