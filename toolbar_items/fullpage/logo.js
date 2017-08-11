
/*
 * Logo menu item
 */

jGo.fcchat_toolbar.logo = {};

//WP Search style template
jGo.fcchat_toolbar.logo.style={
	menu_item:{
		width:FCChatConfig.branding_bar_width,
		img:{
			src:(FCChatConfig.small_logo!=''?FCChatConfig.small_logo:FCChatConfig.dir + "current_skin/" + FCChatConfig.styles.chat_window.frame.logo),
			left:8
		},
		txt:FCChatConfig.branding_bar_title,
		padding_top:8
	}
};

(function () {
	var basedir = FCChatConfig.dir;
	var config =jGo.fcchat_toolbar.logo.style;
	
	
	jGo.fcchat_toolbar.logo.create = function()    {return create_menu_item();};
	jGo.fcchat_toolbar.logo.create_dialogs = function()    {return create_dialog();};
	jGo.fcchat_toolbar.logo.append_dialogs = function(content)    {return append_dialog(content);};
	jGo.fcchat_toolbar.logo.tgl_dialog = function()    {return tgl_dialog();};
	
	var create_menu_item = function(){
	  return"<div class='fc_logo_fullpage' style='position: absolute;top:0px;left:0pxwidth:"+config.menu_item.width+"px;'>" +
			"<img height='24px' style='display:block;position:absolute;top:"+ (jGo.fcchat_toolbar.style.icons_24px.top) + "px; left: "+config.menu_item.img.left+"px;width:24px;height:24px;filter:alpha(opacity=60); -moz-opacity:.60; opacity:.60;' src='"+config.menu_item.img.src+"'>" +
					
			"<div id='jGo_logo_bar_txt_inner' style='position:absolute;top:0px;left:40px;width:"+(config.menu_item.width-40)+"px;"+jGo.fcchat_toolbar.style.text+";"+jGo.fcchat_toolbar.style.logo_css+";padding-top:"+(config.menu_item.padding_top+fc_chat.get_ie_offset())+"px'>" +config.menu_item.txt+ "</div>" +
			"</div>";
	};
	var create_dialog = function(){
	};
	var append_dialog = function(content){
	};
	var tgl_dialog = function(){
	};
})();

//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('logo.js');