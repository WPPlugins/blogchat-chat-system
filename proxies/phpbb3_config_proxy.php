<?php
/**
*
* @FCChat proxy for PHPBB Configuration file
* @copyright (c) 2013- Robert Beach (fastcatsoftware.com)
*
*/

define('IN_PHPBB', true);
$phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : './../../';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include($phpbb_root_path . 'common.' . $phpEx);

global $fcchat_plugin_url, $fcchat_store;
$fcchat_store=array();
$fcchat_plugin_url=$phpbb_root_path . 'FCChat/';

include('./../config/fcchat-config.php'); 
include('proxy_functions.php');
	
if(fcchat_phpbb3_table_exists()){
	fcchat_phpbb3_get_store();
	echo fcchat_add_configuration();
}

?>