<?php

//PHPBB3 SPECIFIC FUNCTIONS
function fcchat_phpbb3_table_exists(){
	global $table_prefix, $db;      	
	if (!class_exists('phpbb_db_tools')){
		global $phpbb_root_path, $phpEx;
		require($phpbb_root_path . 'includes/db/db_tools.' . $phpEx);
	}
	$db_tools = new phpbb_db_tools($db);
	$table= $db_tools->sql_table_exists($table_prefix."fcchat_config");
	if ($table) {
			return true;
	}
	return false;
}

function fcchat_phpbb3_init_table(){
	global $table_prefix, $db;
	$sql = "CREATE TABLE ".$table_prefix."fcchat_config (name varchar(255) NOT NULL default '',value text)";
	$db->sql_query($sql);
	fcchat_phpbb3_save_field('updates',fcchat_phpbb3_get_update_string(),true);
}

function fcchat_phpbb3_get_store(){
	global $table_prefix, $db, $fcchat_store;
	$sql = "Select * from ".$table_prefix."fcchat_config";
	$result = $db->sql_query($sql);
	while($row = $db->sql_fetchrow($result)){
			$fcchat_store[$row['name']]=$row['value'];
	}
	$db->sql_freeresult($result);
	fcchat_phpbb3_updates();
}

function fcchat_phpbb3_reset_store(){
	global $table_prefix,$db;
	$sql = "delete from ".$table_prefix."fcchat_config";
	$db->sql_query($sql);
	fcchat_phpbb3_save_field('updates',fcchat_phpbb3_get_update_string(),true);
}

function fcchat_phpbb3_save_form($Arr1){
	fcchat_phpbb3_reset_store();
	foreach($Arr1 as $key => $Value){
		if(isset($_POST["fcchat-".$key])){
			$value=$_POST["fcchat-".$key];
			fcchat_phpbb3_save_field($key,$value,true);
		}
	}
}

function fcchat_phpbb3_save_field($key,$value,$insert){
	global $table_prefix,$db;
	if($insert){
		$sql = "Insert into ".$table_prefix."fcchat_config set name='".$key."',value='". (get_magic_quotes_gpc() ? $db->sql_escape(stripslashes($value)) : $db->sql_escape($value))."'";
	}else{
		$sql = "Update ".$table_prefix."fcchat_config set value='". (get_magic_quotes_gpc() ? $db->sql_escape(stripslashes($value)) : $db->sql_escape($value))."' where name='".$key."'";
	}
	$db->sql_query($sql);
}

function fcchat_phpbb3_updates(){
	global $fcchat_store;
	$insert=true;
	$insert2=true;
	$updated=false;
	$updates='';
	if(isset($fcchat_store['updates'])){
		$insert=false;
		$updates = $fcchat_store['updates'];
		if(strpos($updates , "update 3.2;") !== false){
				$updated=true;
		}
	}
	// apply 3.2 updates
	if(!$updated){
		$quickstyling='';
		if(isset($fcchat_store['quickstyling'])){
			$insert2=false;
			$quickstyling = $fcchat_store['quickstyling'];
		}
		if($quickstyling!=''){
			$quickstyling = str_replace('border_css','background_css',$quickstyling);
			$pos = strpos($quickstyling,'application_window');
			if($pos !== false){
				$pos = strpos($quickstyling,'frame_color',$pos);
			}
			if ($pos !== false) {
				$pos = strpos($quickstyling,'title_css',$pos);
			}
			if ($pos !== false) {
				$quickstyling = substr($quickstyling,0,$pos)."background_color:'',
	panel_color:'',
	".substr($quickstyling,$pos);
			}
			fcchat_phpbb3_save_field('quickstyling',$quickstyling,$insert2);
		}
		fcchat_phpbb3_save_field('updates',fcchat_phpbb3_get_update_string(),$insert);
	}
}

function fcchat_phpbb3_get_update_string(){
	return 'update 3.2;';
}

//END PHPBB3 FUNCTIONS

function fcchat_get_widget_options() {
	return fcchat_array_merge(fcchat_widget_options());
}

function fcchat_array_merge($Arr1){
	global $fcchat_store;
	foreach($Arr1 as $key => $Value){
  			$Arr1[$key]['value'] = isset($fcchat_store[$key]) ? $fcchat_store[$key] : $Arr1[$key]['value'];
	}
	return $Arr1;
}

//widget header js
function fcchat_add_configuration(){
    global $fcchat_plugin_url;
    // if (!is_admin()){
	$fcchat_options = fcchat_get_widget_options();
	$header= 'if(!window["FCChatConfig"]){window["FCChatConfig"] = {}}(function(){var a = window["FCChatConfig"];';
	foreach($fcchat_options as $key => $value){
		if($key=='custom_buttons'||$key=='templates'||$key=='quickstyling'||$key=='chatbox'){
			$header.= 'a.' . $key . '=' . '{' . $fcchat_options[$key]['value'] . '};';
		}else if($fcchat_options[$key]['type']!='hidden'&&$fcchat_options[$key]['type']!='comment'&&$key!='template_overrides'){
			if($fcchat_options[$key]['quote']=='1'||($fcchat_options[$key]['quote']=='2'&&$fcchat_options[$key]['value']!='true'&&$fcchat_options[$key]['value']!='false')){
				$header.= 'a.' . $key . '=' . '"' . $fcchat_options[$key]['value'] . '";';
			}else{
				if($fcchat_options[$key]['value']==''){
					$fcchat_options[$key]['value']='""';
				}
				$header.= 'a.' . $key . '=' . str_replace("window['fc_chat_path']",'"' . $fcchat_plugin_url . '"',$fcchat_options[$key]['value']) . ';';
			}
		}
	}
	if ($fcchat_options['template_overrides']['value']!=""){
		$header.= 'function getObj(a,b,d){var c=window;for(var i=0;i<b.length-d;i++){c=c[b[i]]}return c};function setOption(a,d){try{var b=a.split(".");var c= getObj(a,b,1);c[b[b.length-1]]=d}catch(e){}};function mergeOption(a,d){try{var b=a.split(".");var c = getObj(a,b,1);c[b[b.length-1]]+=d}catch(e){}};function mergeBlock(a,d){try{var b=a.split(".");var c=getObj(a,b,0);jGo.$.extend(true,c,d)}catch(e){}};';
		$header.= 'function getCSSProp(a,d,g){try{var b=a.split(".");var c;c=getObj(a,b,1);var f=((c[b[b.length-1]].split(d+":"))[1].split(";"))[0];return (g?jGo.util.eN(f):f)}catch(e){}};';
		$header.= 'a.global = {template_overrides:function(){'.$fcchat_options['template_overrides']['value'].'}}';
    }
	$header.= '})();';
	return $header;
    //}
}

function fcchat_build_form(){
	$form= '<br /><br />';
	$fcchat_options = fcchat_get_widget_options();
	foreach($fcchat_options as $key => $value){
		if($fcchat_options[$key]['type']=='comment'){
			$form.= '<br /><br /><div style="color:blue;font-weight:bold"><big>'
			. $fcchat_options[$key]['desc']
			. '</big></div><br>';
		}else if($fcchat_options[$key]['type']=='text'){
			$form.= '<p>' . $fcchat_options[$key]['desc'] 
			. '<br /><b>' . $key . '</b>&nbsp; <input type="text" name="fcchat-' . $key . '" value="' . $fcchat_options[$key]['value'] . '" size="' . $fcchat_options[$key]['sz'] . '">';
			$form.= '</p><hr />';
		}else if($fcchat_options[$key]['type']=='radio'){
			$form.= '<p><b>' . $key . '</b>&nbsp; ' . $fcchat_options[$key]['desc'] 
		. '<br /><input type="radio"  name="fcchat-' . $key . '" value="true" ' . ($fcchat_options[$key]['value'] == "true"? 'checked="checked"':'') . ' /> Yes&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio"  name="fcchat-' . $key . '" value="false" ' . ($fcchat_options[$key]['value'] == "false"? 'checked="checked"':'') . ' /> no ';
			$form.= '</p><hr />';
		}else if($fcchat_options[$key]['type']=='textarea'){
			$form.= '<p>' . $fcchat_options[$key]['desc'] 
			. '&nbsp;&nbsp;<b>' . $key . '</b><br>&nbsp; <textarea style="font-size:16px;font-family:arial;width:100%;height:300px" name="fcchat-' . $key . '">' . $fcchat_options[$key]['value'] . '</textarea>';
			$form.= '</p><hr />';
		}else if($fcchat_options[$key]['type']=='hidden'){
			//
		}else{
			$form.= '<p><b>' . $key . '</b>&nbsp; ' . $fcchat_options[$key]['desc'];
			foreach($fcchat_options[$key]['ops'] as $op => $val){
				$form.= '<input type="radio"  name="fcchat-' . $key . '" value="' . $fcchat_options[$key]['ops'][$op]['value'] . '" ' . ($fcchat_options[$key]['value'] == $fcchat_options[$key]['ops'][$op]['value']? 'checked="checked"':'') . ' /> ' . $fcchat_options[$key]['ops'][$op]['desc'] . '&nbsp;&nbsp;&nbsp;';
			}
			$form.= '</p><hr />';
		}
	}
	return $form;
}
?>