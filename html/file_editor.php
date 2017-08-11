<?php
include ("./file_editor_config.php");
include ("./file_editor_salt.php");

class Conf {

    /*><HTML><head></head><body><div style='display:none'>


   /* 
    * Public vars begin with Uppercase letter,
    * private vars all lowercase. 
    */

   /* Option defaults go here */
   var $Success_message_color = "#119900";
   var $Alert_message_color = "#DD0000";
   var $salt_code_pre = "<?php \$salt='";
   var $salt_code_post = "';
?>";
   var $File_dir = array('./../config','./../languages','./../styles','./config','./','./../toolbar_items');
   var $dir_names = array('FCChat/config/','FCChat/languages/','FCChat/styles/','FCChat/html/config/','FCChat/toolbar_items/');
   var $Language_files,$Style_files,$Toolbar_files;

function Conf() {
}


function is_bad_environment($index) {
  global $password;
   $error = "";
   if($password == ""){
	$error = "<b>Editor Disabled</b><br><br>To use the file editor, you must first set up a password. Open the file: /FCChat/html/file_editor_config.php with a text editor and fill out the password field.<br><br> Furthermore, make sure the following files/directories have read and write permission set:<br><br>
			/FCChat/html/file_editor_salt.php<br>
			/FCChat/config/<BR>
			/FCChat/languages/<BR>
			/FCChat/toolbar_items/<BR>
			/FCChat/styles/<BR>
			/FCChat/html/config<BR><BR><br>To ensure security, you should also set up a notification email in /FCChat/html/file_editor_config.php. This will notify you when any changes are made to the filesystem. Also, you should always click on 'Lock File Editor' when you are done using it.<br><br><b>Warning:</b> The changes you make to files using this editor will <b>not</b> carry over when you update the chat. When you upgrade, you must manually transfer any file changes to the new version.";
       	if($error!=""){
		return $error;
   	}
   }
   $std_error = "To use the file editor, the following files/directories need read and write permission set:<br><br>
			/FCChat/html/file_editor_salt.php<br>
			/FCChat/config/<BR>
			/FCChat/languages/<BR>
			/FCChat/toolbar_items/<BR>
			/FCChat/styles/<BR>
			/FCChat/html/config<BR><BR>";

   //Check is directories are readable and writable
   if(! (is_readable($this->File_dir[0]))) {
      $error = $std_error;
   }
   if(! (is_readable($this->File_dir[1]))) {
      $error = $std_error;
   }
   if(! (is_readable($this->File_dir[2]))) {
      $error = $std_error; 
   }
   if(! (is_readable($this->File_dir[4]))) {
      $error = $std_error; 
   }
   if(! (is_readable($this->File_dir[3]))) {
      $error = $std_error; 
   }
   if(! (is_readable($this->File_dir[5]))) {
      $error = $std_error; 
   }
   if($error!=""){
	return $error;
   }
   
   //Check if required files exist
   if(! file_exists("{$this->File_dir[4]}file_editor_salt.php")) {
      $error .= "The required file /FCChat/html/file_editor_salt.php is missing!<br><br>";      
   }
   if(! file_exists("{$this->File_dir[0]}/config.js")) {
      $error .= "The required file /FCChat/config/config.js is missing!<br><br>";      
   }
   if(! file_exists("{$this->File_dir[3]}/php_config.php")) {
      $error .= "The required file /FCChat/html/config/php_config.php is missing!<br><br>";      
   }
   if(! file_exists("{$this->File_dir[3]}/asp_config.asp")) {
      $error .= "The required file /FCChat/html/config/asp_config.asp is missing!<br><br>";      
   }
   if($error!=""){
	return $error;
   }

   chmod ("{$this->File_dir[4]}/file_editor_salt.php", 0777);
   chmod ("{$this->File_dir[0]}/config.js", 0777);
   chmod ("{$this->File_dir[3]}/php_config.php", 0777);
   chmod ("{$this->File_dir[3]}/asp_config.asp", 0777);

   //Second check to see that directories are writable
   if (!($FH_SAVEAS = @fopen ("{$this->File_dir[4]}/file_editor_salt.php", "a"))){
	$error = "FCChat/html/file_editor_salt.php does not have write permission set. ".$std_error; 
   }else{
	fclose ($FH_SAVEAS);
   }
   if (!($FH_SAVEAS = @fopen ("{$this->File_dir[0]}/config.js", "a"))){
	$error = "FCChat/config.js does not have write permission set. ".$std_error; 
   }else{
	fclose ($FH_SAVEAS);
   }
   if (!($FH_SAVEAS = @fopen ("{$this->File_dir[3]}/php_config.php", "a"))){
      $error = "FCChat/html/config/php_config.php does not have write permission set. ".$std_error; 
   }else{
	fclose ($FH_SAVEAS);
   }
   if (!($FH_SAVEAS = @fopen ("{$this->File_dir[3]}/asp_config.asp", "a"))){
      $error = "FCChat/html/config/asp_config.asp does not have write permission set. ".$std_error; 
   }else{
	fclose ($FH_SAVEAS);
   }
   
   $data_dir_obj = dir ($this->File_dir[1]);
   while (false !== ($entry = $data_dir_obj->read())) $files[] = $entry;
   sort($files);
   while (strlen($file=next($files))) {
      if (ereg("^\.{1,2}$", $file)) continue;
      $my_fullname = "{$data_dir_obj->path}/$file";
      if(is_file($my_fullname)){
      	$this->Language_files[] = $file;
      	chmod ($my_fullname, 0777);
      	if (!($FH_SAVEAS = @fopen ("{$my_fullname}", "a"))){
      		$error = "<br>Some files within FCChat/languages (".$my_fullname.") do not have write permission set. ".$std_error;
			break;     
      	}else{
			fclose ($FH_SAVEAS);
      	}
      }
   }
   $data_dir_obj->close();

   $data_dir_obj = dir ($this->File_dir[2]);
   while (false !== ($entry = $data_dir_obj->read())) $files2[] = $entry;
   sort($files2);
   while (strlen($file=next($files2))) {
      if (ereg("^\.{1,2}$", $file)) continue;
      $my_fullname = "{$data_dir_obj->path}/$file";
      if(is_file($my_fullname)){
      	$this->Style_files[] = $file;
      	chmod ($my_fullname, 0777);
      	if (!($FH_SAVEAS = @fopen ("{$my_fullname}", "a"))){
      		$error = "<br>Some files within FCChat/styles (".$my_fullname.") do not have write permission set. ".$std_error;
			break;     
      	}else{
			fclose ($FH_SAVEAS);
      	}
      }
   }
   $data_dir_obj->close();

   $data_dir_obj = dir ($this->File_dir[5]);
   while (false !== ($entry = $data_dir_obj->read())) $files5[] = $entry;
   sort($files5);
   while (strlen($file=next($files5))) {
      if (ereg("^\.{1,2}$", $file)) continue;
      $my_fullname = "{$data_dir_obj->path}/$file";
      if(is_file($my_fullname)){
      	$this->Toolbar_files[] = $file;
     	 chmod ($my_fullname, 0777);
     	 if (!($FH_SAVEAS = @fopen ("{$my_fullname}", "a"))){
      		$error = "<br>Some files within FCChat/toolbar_items (".$my_fullname.") do not have write permission set. ".$std_error;
			break;     
      	}else{
			fclose ($FH_SAVEAS);
      	}
      }
   }
   $data_dir_obj->close();

   return $error;
}
}

class Ide {
   var $code, $alert_message, $success_message, $dir_index,$file,$pass;

function Ide() {
   global $salt;
   $this->Conf = new Conf;

/*
** Remove slashes if necessary, put code in $this->code
*/
   if (isset($_POST['code'])) {
      if (get_magic_quotes_gpc()) {
         $this->code = stripslashes($_POST['code']);
      }
      else {
         $this->code = $_POST['code'];
      }
   }

/*
** Put code in $this->textarea_safe_code. The reverse substitution is first
** performed on $this->code, to restore any previous replacements.
*/
   $this->textarea_safe_code = $this->make_textarea_safe($this->code);

/*
** Check our environment.
*/
   if ($error = $this->Conf->Is_bad_environment(0)) {
      print $this->html_top();
      print "$error\n";
      print $this->html_bottom();
      exit;
   }

/*
** Check authentication.
*/
$this->auth();

/*
** Act according to 'action'
*/
if($this->pass){
   if ($_POST['action'] == "save_as") {
      if (! strlen($_POST['save_file'])) {
         $this->alert_message = "<b>Can't save file without a filename!!</b>";
      }else {
	        $file = $_POST['save_file'];
	        $dir_index = intval($_POST['save_dir']);
	   	if($dir_index<=3&&$dir_index>=0||$dir_index==5){ 
			if($dir_index==3){
				if($this->make_script_safe($this->code)){
					if ($FH_SAVEAS = @fopen ("{$this->Conf->File_dir[$dir_index]}/{$file}", "w")) {
            					fputs  ($FH_SAVEAS, $this->code);
           		 			fclose ($FH_SAVEAS);
            					$this->success_message = "<B>Saved!</B>";
						$this->send_mail($file,$this->code);
					}else {
            					$this->alert_message = "<b>Could not save file: " . $php_errormsg . "</b>";
					}
				}else{
					$this->alert_message = "<B>File Contains restricted term! Please save manually.</B>";
				}
			}else{
				if ($FH_SAVEAS = @fopen ("{$this->Conf->File_dir[$dir_index]}/{$file}", "w")) {
            				fputs  ($FH_SAVEAS, $this->code);
           		 		fclose ($FH_SAVEAS);
            				$this->success_message = "<B>Saved!</B>";
					$this->send_mail($file,$this->code);
				}else {
            				$this->alert_message = "<b>Could not save file: " . $php_errormsg . "</b>";
				}
         		}
      	}
	}
   }elseif ($_GET['action'] == "open_file") {
	$dir_index = intval($_GET['dir']);
	$file = $_GET['file'];
	if($dir_index<=3&&$dir_index>=0||$dir_index==5){ 
      		$this->textarea_safe_code = join ("", (file ("{$this->Conf->File_dir[$dir_index]}/{$file}")));
      		if (get_magic_quotes_runtime()) $this->textarea_safe_code = stripslashes($this->textarea_safe_code);
      		$this->textarea_safe_code = $this->make_textarea_safe($this->textarea_safe_code);
      		$_POST['save_file'] = $file;
		$_POST['save_dir'] = $dir_index;
	}
   }elseif ($_GET['action'] == "lock_file_editor"){
	if ($FH_SAVEAS = @fopen ("{$this->Conf->File_dir[4]}file_editor_salt.php", "w")) {
		setcookie('fc_ed_sid','',1);
		$this->pass=FALSE;
		$new_salt = mt_rand();
		if($salt == $new_salt){
			$salt = $new_salt+$mt_rand(1);
		}else{
			$salt = $new_salt;
		}
            	fputs  ($FH_SAVEAS, $this->Conf->salt_code_pre . $salt . $this->Conf->salt_code_post);
                fclose ($FH_SAVEAS);
	}else {
            	$this->alert_message = "<b>Error: Could not lock the file editor!</b>";
	}	
   }
}

/*
** Print the main page and exit
*/
   print $this->html_top();
   print $this->main_page();
   print $this->html_bottom();
   exit;
}

/*
** Functions
*/

function auth() {
        global $password, $salt;
	$session="";
	$this->pass=FALSE;
	if(isset($_POST['pwd'])){
		$time = (int) (time()/60);
		for ( $counter = -10; $counter <= 1; $counter ++) {
			$time_inc = $time + $counter;
			if($_POST['pwd'] == md5(md5($time_inc.$salt).$password)){
				$this->pass = TRUE;
				break;
			}
		}
		if($this->pass){
			setcookie("fc_ed_sid", md5($password.$salt.$time), time()+1200);
		}else{
			$this->alert_message = "<b>Please Reenter Password!</b>";
		}

	}elseif (isset($_COOKIE["fc_ed_sid"])){
		//authenticate user based on session id
   		$session = $_COOKIE["fc_ed_sid"];
		$time = (int) (time()/60);
		for ( $counter = -20; $counter <= 1; $counter ++) {
			$time_inc = $time + $counter;
			if($session == md5($password.$salt.$time_inc)){
				$this->pass = TRUE;
				break;
			}
		}
		
	}
        //Set timestamp cookie each time
	$time = (int) (time()/60);
	setcookie("fc_ed_auth", md5($time.$salt), time()+1200);
}

function main_page() {
   $ret .= "<FORM NAME='main_form' METHOD='POST' ACTION='{$_SERVER['PHP_SELF']}' onSubmit='if(document.getElementById(\"fc_ed_pwrd\")!=null){document.getElementById(\"fc_ed_pwrd\").value=jGo.MD5.hex_md5(jGo.cookie.getCookie(\"fc_ed_auth\")+document.getElementById(\"fc_ed_pwrd_txt\").value)};'>\n";
   if(!$this->pass){
	$ret .= $this->password_page();
   }
   $ret .= "<INPUT TYPE='hidden' NAME='action' VALUE=''>\n";
   $ret .= "<INPUT TYPE='hidden' NAME='save_file'  VALUE='{$_POST['save_file']}'>\n";
   $ret .= "<INPUT TYPE='hidden' NAME='save_dir'  VALUE='{$_POST['save_dir']}'>\n";
   $ret .= "<a style='text-decoration:none;float:right;margin-right:20px' href='file_editor.php?action=lock_file_editor'><b>Lock File Editor</b></a><br clear=right>\n";
   if($this->pass){
	$ret .= "<INPUT TYPE='submit' VALUE='Save' onClick='document.getElementById(\"saving_msg\").innerHTML=\"<b>Saving...</b>\";main_form.action.value=\"save_as\"; main_form.submit()'>\n";
   }else{
        $ret .= "<INPUT TYPE='submit' disabled VALUE='Save' onClick='return false'>\n";
   }
   $ret .= "<a style='text-decoration:none' href='file_editor.php'><input type='button' value='Clear' onClick='window.location.href=\"file_editor.php\"'></a>&nbsp;\n";
   $ret .= "<b><i>{$this->Conf->dir_names[$_POST['save_dir']]}{$_POST['save_file']}</i></b>&nbsp;\n";
   $ret .= "<i><FONT COLOR='{$this->Conf->Alert_message_color}' FACE='MS Sans Serif, Arial'>{$this->alert_message}</FONT></i>\n";
   $ret .= "<i><span id='saving_msg' style='COLOR:{$this->Conf->Success_message_color};font-family: Arial'>{$this->success_message}</span></i><br>\n";
   $ret .= "<TEXTAREA wrap='off' COLS='{$this->Conf->Code_cols}' style='width:600px;height:260px' NAME='code'>{$this->textarea_safe_code}</TEXTAREA><br><br>\n";
   $ret .= "<span style='color:darkblue'><i><b>Configuration File:</b></i></span><br>\n";
   $ret .= "<a style='text-decoration:none' href='file_editor.php?action=open_file&dir=0&file=config.js'>FCChat/config/config.js</a><br><br>\n";
   $ret .= "<span style='color:darkblue'><i><b>Language Templates:</b></i></span><br>\n";
   foreach ($this->Conf->Language_files as $file) {
      $urlfile = urlencode($file);
      $ret .= "<a style='text-decoration:none' href='file_editor.php?action=open_file&dir=1&file={$urlfile}'>FCChat/languages/{$file}</a><br>\n";
   }
   $ret .= "<br><span style='color:darkblue'><i><b>Style Templates:</b></i></span><br>\n";
   foreach ($this->Conf->Style_files as $file) {
      $urlfile = urlencode($file);
      $ret .= "<a style='text-decoration:none' href='file_editor.php?action=open_file&dir=2&file={$urlfile}'>FCChat/styles/{$file}</a><br>\n";
   }
   $ret .= "<br><span style='color:darkblue'><i><b>Toolbar Items:</b></i></span><br>\n";
   foreach ($this->Conf->Toolbar_files as $file) {
      $urlfile = urlencode($file);
      $ret .= "<a style='text-decoration:none' href='file_editor.php?action=open_file&dir=5&file={$urlfile}'>FCChat/toolbar_items/{$file}</a><br>\n";
   }
   $ret .= "<br><span style='color:darkblue'><i><b>Scripting Configuration Files:</b></i></span><br>\n";
   $ret .= "<a style='text-decoration:none' href='file_editor.php?action=open_file&dir=3&file=php_config.php'>FCChat/html/config/php_config.php</a><br>\n";
   $ret .= "<a style='text-decoration:none' href='file_editor.php?action=open_file&dir=3&file=asp_config.asp'>FCChat/html/config/asp_config.asp</a><br>\n";
   $ret .= "</FORM>\n";
   return ($ret);
}


function password_page() {
   $ret .= "<INPUT type = 'hidden' id='fc_ed_pwrd' NAME='pwd'>\n";
   $ret .= "Editor Locked. Please enter password: "; 
   $ret .= "<INPUT type = 'password' id='fc_ed_pwrd_txt' NAME='fc_ed_pwrd'>\n";
   $ret .= "<INPUT TYPE='submit' VALUE='Unlock Editor' onClick='main_form.submit()'><br><br>\n";
   return ($ret);
}

function make_textarea_safe($code) {
   $safe_code = eregi_replace("&", "&amp;", $code);
   $safe_code = eregi_replace("<", "&lt;", $safe_code);
   $safe_code = eregi_replace(">", "&gt;", $safe_code);
   return $safe_code;
}

function make_script_safe($code) {
  $disable_functions = array("escapeshellarg","escapeshellcmd","exec","passthru","proc_close","proc_get_status","proc_open","proc_nice","proc_terminate","shell_exec","system","ini_restore","popen","dl","disk_free_space","diskfreespace","set_time_limit","tmpfile","fopen","readfile","fpassthru","fsockopen","mail","ini_alter","highlight_file","openlog","show_source","symlink","apache_child_terminate","apache_get_modules","apache_get_version","apache_getenv","apache_note","apache_setenv","parse_ini_file","createObject","getObject");
  foreach ($disable_functions as $a){
  	if(stristr($code, $a) != FALSE) return FALSE;
  }
  return TRUE;
}

function send_mail($file,$code){
	global $email;
	if($email != ""){
		$headers = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type:text/html;charset=iso-8859-1\r\n";
		$headers .= 'From: postmaster@' . $_SERVER["HTTP_HOST"];
		$html_file = htmlspecialchars($file);
		$html_contents = nl2br(htmlspecialchars($code));
		$message = "The following file has been edited: {$html_file}<br><br>Here are the new contents:<br><br>{$html_contents}";

		$message = wordwrap($message, 70);
		date_default_timezone_set('America/New_York');
		// Send
		mail($email, 'FCChat File Editor Report', $message, $headers);
	}
}

function html_top() {
	return "<html><HEAD>
			<script type='text/javascript'> var jGo = {}; </script>
			<script type='text/javascript' src='../jGo/js/jGo.MD5.min.js'></script>
			<script type='text/javascript' src='../jGo/js/jGo.c.min.js'></script>
			</HEAD>
			<BODY style='font-family:arial;font-size:12px;background-color:#F3F3F3'>\n";
}

function html_bottom() {
   return "</BODY></HTML>\n";
}

}

error_reporting(E_ERROR | E_WARNING | E_PARSE);
set_magic_quotes_runtime(0);

$Ide = new Ide;

?>
</div>
<b>Editor Not Available</b><br><br>The File Editor requires <a target=_blank href='http://www.php.net'>PHP</a> 4.1 or greater to be running on your host.
</BODY></HTML>