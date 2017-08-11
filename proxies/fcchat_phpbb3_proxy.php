<?php
/**
*
* @FCChat proxy for PHPBB Configuration file
* @copyright (c) 2009- Robert Beach (fastcatsoftware.com)
*
*/

define('SECRET_KEY', 'OqO,X<rU_&=F;V}f39< bh,+&Qlr>:20=V6a^FkQ9N!<Uwp|y}]}<!5(|W|N4E>8');
define('USERNAMES_ENCODED', true);
define('RETURN_AVATAR', true);

/**
* @ignore
*/
define('IN_PHPBB', true);
$phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : './../../';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
$php_root_path = explode("fcchat/proxies/fcchat_phpbb3_proxy.php",strtolower($_SERVER["REQUEST_URI"]));
$php_root_path = $php_root_path[0];
include($phpbb_root_path . 'common.' . $phpEx);

$user_id='';
$password='';

function str_decode_utf8($string) {
  if (mb_detect_encoding($string.'a', 'UTF-8', true) === 'UTF-8') {
    $string = utf8_decode($string);
  }
return $string;
}

/*
if (isset($_COOKIE[$config['cookie_name'] . "_u"])){
	echo "1";
	$user_id = $_COOKIE[$config['cookie_name'] . "_u"];
}
*/

if (isset($_COOKIE[$config['cookie_name'] . "_sid"])){
	$session_id = $db->sql_escape(utf8_clean_string($_COOKIE[$config['cookie_name'] . "_sid"]));
	//$session_id = mysql_real_escape_string($_COOKIE[$config['cookie_name'] . "_sid"]);
}
if (isset($_GET['sid'])){
	$session_id = $db->sql_escape(utf8_clean_string($_GET['sid']));
	//$session_id = mysql_real_escape_string($_GET['sid']);
}

$request = ( isset($_POST['f']) ) ? (int) $_POST['f'] : 0;

if($request==0){
	$sql = "Select user_id, username, (unix_timestamp(now())-session_time<(" . $config['session_length'] . " + 60)) as online from " . SESSIONS_TABLE . " left join " . USERS_TABLE . " on session_user_id=user_id where session_id='" . $session_id . "'";
	$result = $db->sql_query($sql);
	$row = $db->sql_fetchrow($result);
	$db->sql_freeresult($result);
	if($row['online']!='1'||$row['user_id']=='1'){
		echo "<fcchatresponse><fcchatresponse>";
	}else{
		$t1 = time();
		if(USERNAMES_ENCODED){
			$username = htmlspecialchars_decode($row['username']);
		}else{
			$username = $row['username'];
		}
		$name_length = strlen(str_decode_utf8($username));
		if($name_length<10){
			$name_length = '00' . $name_length;
		}else if($name_length<100){
			$name_length = '0' . $name_length;
		}
		$password = md5('pbb' . $row['user_id'] . SECRET_KEY);
		$signature = md5($t1 . $password . SECRET_KEY);
		echo "<fcchatresponse>" . 'pbb' . $row['user_id'] . '&' . $password . '&' . $name_length . $username . $signature . $t1 . "<fcchatresponse>";
		if(RETURN_AVATAR){
			$sql = "Select user_avatar from " . SESSIONS_TABLE . " left join " . USERS_TABLE . " on session_user_id=user_id  where session_id='" . $session_id . "'";
			$result = $db->sql_query($sql);
			$row = $db->sql_fetchrow($result);
			$db->sql_freeresult($result);
			if($row['user_avatar']==''){
				echo "<fcchatresponse2><fcchatresponse2>";
			}else{
				echo "<fcchatresponse2>/" . $php_root_path . "download/file.php?avatar=" . $row['user_avatar'] . "<fcchatresponse2>";
			}
		}	

	}
}else{
	$sql = "Select user_avatar from " . SESSIONS_TABLE . " left join " . USERS_TABLE . " on session_user_id=user_id  where session_id='" . $session_id . "'";
	$result = $db->sql_query($sql);
	$row = $db->sql_fetchrow($result);
	$db->sql_freeresult($result);
	if($row['user_avatar']==''){
		echo "<fcchatresponse>0<fcchatresponse>";
	}else{
		echo "<fcchatresponse>/" . $php_root_path . "download/file.php?avatar=" . $row['user_avatar'] . "<fcchatresponse>";
	}		
}

?>