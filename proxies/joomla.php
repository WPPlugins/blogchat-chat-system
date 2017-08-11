<?php
/**
* @blogchat proxy for joomla 
* @copyright (c) 2011- Robert Beach (fastcatsoftware.com)
* @license		GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*
* Use this file to establish a proxy between blogchat and joomla's default user authentification protocol.
*
*/

// Set flag that this is a parent file
define( '_JEXEC', 1 );
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

// Config
define('RETURN_AVATAR', true);
define('RETURN_DISPLAY_NAME',false);
define('USE_JOMSOCIAL',true);
define('USE_EASYSOCIAL',true);
define('USE_KUNENA',true);
define('SECRET_KEY', 'OqO,X<rU_&=F;V}f39< bh,+&Qlr>:20=V6a^FkQ9N!<Uwp|y}]}<!5(|W|N4E>8');
define('USERNAMES_ENCODED', true);


define( 'DS', DIRECTORY_SEPARATOR );
define('JPATH_BASE', dirname(__FILE__) .DS. '..' .DS. '..' .DS. '..' .DS. '..');
require_once ( JPATH_BASE .DS.'includes'.DS.'defines.php' );
require_once ( JPATH_BASE .DS.'includes'.DS.'framework.php' );
JDEBUG ? $_PROFILER->mark( 'afterLoad' ) : null;


/**
 * CREATE THE APPLICATION
 *
 * NOTE :
 */
$mainframe =& JFactory::getApplication('site');
$mainframe->initialise();

$user_id='';
$password='';

$request = ( isset($_POST['f']) ) ? (int) $_POST['f'] : 0;

if ( !function_exists('mb_detect_encoding') ) {

// ----------------------------------------------------------------
function mb_detect_encoding ($string, $enc=null, $ret=null) {
      
        static $enclist = array(
            'UTF-8', 'ASCII',
            'ISO-8859-1', 'ISO-8859-2', 'ISO-8859-3', 'ISO-8859-4', 'ISO-8859-5',
            'ISO-8859-6', 'ISO-8859-7', 'ISO-8859-8', 'ISO-8859-9', 'ISO-8859-10',
            'ISO-8859-13', 'ISO-8859-14', 'ISO-8859-15', 'ISO-8859-16',
            'Windows-1251', 'Windows-1252', 'Windows-1254',
            );
       
        $result = false;
       
        foreach ($enclist as $item) {
            $sample = iconv($item, $item, $string);
            if (md5($sample) == md5($string)) {
                if ($ret === NULL) { $result = $item; } else { $result = true; }
                break;
            }
        }
       
    return $result;
}
// ----------------------------------------------------------------

} 

function str_decode_utf8($string) {
  if (mb_detect_encoding($string.'a', 'UTF-8', true) === 'UTF-8') {
    $string = utf8_decode($string);
  }
return $string;
}

function correct_avatar_path($avatar){
	$url = preg_split('/modules\/mod_blogchat\/blogchat\/proxies/i',$avatar);
	$avatar = $url[count($url)-1];
	if(substr($avatar, 0, 1)=="/"){
		$url = preg_split('/modules\/mod_blogchat\/blogchat\/proxies\//i',JURI::base());
		return $url[0] . substr($avatar, 1);
	}else{
		return $avatar;
	}
}

//Pull the avatar
function fc_get_avatar(){

	// Test for JomSocial avatar
	
	if(USE_JOMSOCIAL&&testForJomsocial())return fc_get_jomSocial_avatar();

	// Test for EasySocial avatar
	
	if(USE_EASYSOCIAL&&testForEasysocial())return fc_get_easySocial_avatar();

	// Test for Kunena avatar.
	
	$version=testForKunena();
	if(USE_KUNENA&&$version)return fc_get_kunena_avatar($version);
	
	
	
	return null;

}

function testForJomsocial(){
	$jspath = JPATH_BASE.DS.'components'.DS.'com_community';
   	include $jspath.DS.'libraries'.DS.'core.php';
	if (is_file($jspath.DS.'libraries'.DS.'core.php')) {
		include $jspath.DS.'libraries'.DS.'core.php';
		return true;
	}
	return false;
}

function testForEasysocial(){
	if (is_file(JPATH_ADMINISTRATOR.DS.'components'.DS.'com_easysocial'.DS.'includes'.DS.'foundry.php')) {
		include JPATH_ADMINISTRATOR.DS.'components'.DS.'com_easysocial'.DS.'includes'.DS.'foundry.php';
		return true;
	}
	return false;
}

function testForKunena() {
	if (class_exists('KunenaForum')) {
		return KunenaForum::versionMajor();
	} elseif (class_exists('Kunena')) {
		return substr(Kunena::version(), 0, 3);
	} elseif (is_file(JPATH_ADMINISTRATOR.'/components/com_kunena/api.php')) {
		// Oops, Kunena 1.6/2.0 API has been disabled (please enable System - Kunena plugin)
		return false;
	} elseif (is_file(JPATH_ROOT.'/components/com_kunena/lib/kunena.defines.php')) {
		return '1.5';
	} elseif (is_file(JPATH_ROOT.'/components/com_kunena/lib/kunena.version.php')) {
		return '1.0';
	}
	return false;
}


function fc_get_jomSocial_avatar(){
	// Get the current logged in user
	$user =& CFactory::getUser($userid);
	
	// Retrieve the avatar.
	return correct_avatar_path($user->getThumbAvatar());
}

function fc_get_easySocial_avatar(){
	// Get the current logged in user
	$user     = Foundry::user();
	
	// Retrieve the avatar.
	return correct_avatar_path($user->getAvatar());
}

function fc_get_kunena_avatar($version){

	if ($version>=2) {
		KunenaForum::setup();
	}

	// Initialize variables
	$sizex = $sizey = 90;
	$class = 'avatar';
	$user = KunenaFactory::getUser();
 
	// Get avatar URL "/media/kunena/avatars/path/file.jpg"
	$avatar=$user->getAvatarURL($sizex, $sizey);

	if(!empty($avatar)){
		if($version>=2){
			correct_avatar_path($avatar);
		}else{
			$url = preg_split('/modules\/mod_blogchat\/blogchat\/proxies\//i',JURI::base());
			$url = $url[0];
			$url2 = preg_split('/modules\/mod_blogchat\/blogchat\/proxies\//i',$avatar);
			return $url . $url2[count($url2)-1];
		}
	}else{
		return null;
	}
}

if($request==0){
	$current_user =& JFactory::getUser();
	if ($current_user->guest) {
    		// Not logged in.
	 	echo "<fcchatresponse><fcchatresponse>";
	} else {
    		// Logged in.
		$t1 = time();
		$username = (RETURN_DISPLAY_NAME?$current_user->name:$current_user->username);
		if($username==""){
			$username = $current_user->username;
		}
		$username = (USERNAMES_ENCODED?htmlspecialchars_decode($username):$username);
		$name_length = strlen(str_decode_utf8($username));
		if($name_length<10){
			$name_length = '00' . $name_length;
		}else if($name_length<100){
			$name_length = '0' . $name_length;
		}
		$password = md5('jm1' . $current_user->id . SECRET_KEY);
		$signature = md5($t1 . $password . SECRET_KEY);
		echo "<fcchatresponse>" . 'jm1' . $current_user->id . '&' . $password . '&' . $name_length . $username . $signature . $t1 .  "<fcchatresponse>";

//Grab the avatar
		if(RETURN_AVATAR){
			$avatar=fc_get_avatar();
			if (!empty($avatar)){
				echo "<fcchatresponse2>/" . $avatar . "<fcchatresponse2>";
			}else{
				echo "<fcchatresponse2><fcchatresponse2>";
			}
		}
	}
}else{
	$avatar=fc_get_avatar();
	if (!empty($avatar)){
		echo "<fcchatresponse>/" . $avatar . "<fcchatresponse>";		
	}else{
		echo "<fcchatresponse>0<fcchatresponse>";
	}		
}
