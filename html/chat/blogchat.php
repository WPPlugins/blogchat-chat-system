<?php
$FCCHAT_BASE_URL="http://YOURDOMAIN.COM/FCChat/";
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script>
var fc_chat_path = "";
var fcchat_domain="blogchat";

</script>
<!-- Begin Fastcat Header Insert -->
<script type="text/javascript" src="<?php echo $FCCHAT_BASE_URL;?>js/import.google.loader.js"></script>
<script type="text/javascript" src="<?php echo $FCCHAT_BASE_URL;?>js/import.config.js"></script>


<script type="text/javascript">
//Proxy config
if(FCChatConfig['proxy_type']){
document.write("<script type='text/javascript' src='<?php echo $FCCHAT_BASE_URL;?>proxies/" + FCChatConfig['proxy_type'] + "_config_proxy.php'></" + "script>");
}
</script>
<script type="text/javascript" src="<?php echo $FCCHAT_BASE_URL;?>js/import.libs.js"></script>

<script type="text/javascript">

var fc_add_chatcenter_button=false;

//General mobile browser
var mobile_list=/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i;
var mobile = (mobile_list.test(navigator.userAgent.toLowerCase()));
if(mobile){
	FCChatConfig.toolbar_banner_mode=true;
	if(FCChatConfig.chatcenter_layout==0){
		fc_add_chatcenter_button=true;
	}
	//FCChatConfig.chatcenter_layout=1;
}

//toolbar items
FCChatConfig.toolbar_items=[(FCChatConfig.blog?"":"fullpage:logo"),"friendscenter",(mobile||FCChatConfig.blog?"":"fullpage:spacer")];
FCChatConfig.large_device_toolbar_items=["friendscenter"];
FCChatConfig.small_device_toolbar_items=["friendscenter"];
</script>
<script type="text/javascript" src="<?php echo $FCCHAT_BASE_URL;?>js/import.includes.js"></script>

<script type="text/javascript">
<!--
function getQuerystring(key, default_){
	if (default_== null){
    	default_= null;
	}
	var search = unescape(location.search);
	if (search == ""){
    	return default_;
	}
	search = search.substr(1);
	var params = search.split("&");
	for (var i = 0; i < params.length; i++){
    	var pairs = params[i].split("=");
    	if(pairs[0] == key){
        		return pairs[1];
    	}
	}
	return default_;
}
var fcchat_room_transfer = getQuerystring("rmid");
var fcchat_embed = getQuerystring("embed");
var fcchat_width = getQuerystring("width");
var fcchat_room_offset = getQuerystring("room_offset");
var fcchat_show_toolbar = getQuerystring("toolbar");

document.documentElement.style.overflow= 'hidden';

jGo.fcchat_toolbar.config.show=true;
jGo.fcchat_toolbar.config.layout=1;

if(jGo.mobile){
	jGo.fcchat_toolbar.config.fixed=0;
	jGo.fcchat_toolbar.config.mode=0;
	jGo.fcchat_toolbar.config.position='bottomleft';
	jGo.fcchat_toolbar.config.noclose=true;
}else{
	jGo.fcchat_toolbar.config.position='bottomright';
}
			  
FCChatConfig.toolbar_default_display=1;   

FCChatConfig.default_on=true;
FCChatConfig.window_height_offset=0;
FCChatConfig.chat_room_height_offset=(fcchat_room_offset | FCChatConfig.chat_room_height_offset);
FCChatConfig.absolute_positioning=true;
FCChatConfig.styles.widget.control.top=0;
FCChatConfig.styles.widget.control.left=0;
FCChatConfig.styles.widget.control.css="display:none;";
FCChatConfig.chatbox.resize.enable=false;



//-->
</script>
</head>
<body style='background-color:#eee;font-family:arial;font-size:20px;font-weight:bold;'>
<script>
jGo.$(document.body).css(FCChatConfig.quickstyling.alldomains.full_page_css_obj);
</script>
<script type="text/javascript" src="<?php echo $FCCHAT_BASE_URL;?>js/install.prep.adv.js"></script>
<script type="text/javascript" src="<?php echo $FCCHAT_BASE_URL;?>js/embed.js"></script>
<div id='popup_box_header' style='position:absolute;'>
</div>
<script type="text/javascript">document.write((true?FCChatConfig.load_standalone_bsc:FCChatConfig.load_integrated_bsc));</script>
<script>

function clear_popup_header(){
	var v = jGo.$('#popup_box_header')[0];
	v.style.display="none";
	v.style.visibility="hidden";
}
function set_popup_header(top,txt){
	var v = jGo.$('#popup_box_header')[0];
	v.style.display="block";
	v.innerHTML=txt;
	jGo.$(v).css({"top": (top-5) + "px","left": ( Math.max(20,Math.round(jGo.$(window).width() - jGo.$(v).width() ) / 2))+jGo.$(window).scrollLeft() + "px"});
}
set_popup_header((jGo.util.getInnerHeight())/2,(FCChatConfig.big_logo!=''?"<img align=absmiddle height=80px style='height:80px;width:80px;' src="+FCChatConfig.big_logo+">":"")+ " " + (FCChatConfig.chat_id==''?"&nbsp;<a href='http://www.fastcatsoftware.com/chat/activation.aspx' target=_blank style='font-weight:bold'>Click Here To Activate</a> <span style='font:12px arial;'>or, if you have already received your chat ID and host, enter these values in the BLOGCHAT settings panel.</span>":FCChatConfig.full_page_loading + "&nbsp;<img height='24px' onload='this.style.visibility=\"visible\";' style='visibility:hidden;width:24px;height:24px' ALIGN='absmiddle' src='<?php echo $FCCHAT_BASE_URL;?>current_skin/ajax-loader.gif'>"));
</script>
</body></html>
