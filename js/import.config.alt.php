<?php
	/* Modified version of import.config.js for wordpress
	*/
	$chars = array(">", "<" , "||period||","||protocol||");
	$repl = array("", "" , ".","http");
?>
//Path to FCPlayer Folder (must end in a backslash)' .
var fc_chat_path = "<?php echo str_replace($chars, $repl, $_GET['path']); ?>/";
if(!window["FCChatConfig_wp"]){
	document.write("<script type='text/javascript' src='" + fc_chat_path + "config/config.js'></script>");
}