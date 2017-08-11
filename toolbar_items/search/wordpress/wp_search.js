
/*
 * WP Search menu item
 */

jGo.fcchat_toolbar.wp_search = {};

//WP Search style template
jGo.fcchat_toolbar.wp_search.style={
	menu_item:{
		width:32,
		button:{
			left:7
		}
	},
	dialog_box:{
		width:250,
		height:113,
		css:jGo.fcchat_toolbar.style.dialog_box.css,
		title_box_css:jGo.fcchat_toolbar.style.dialog_box.title_box_css,
		info_box_css:"top:40px;left:0px;height:73px;",
		text:jGo.fcchat_toolbar.style.dialog_box.text,
		input_css:"width:200px;height:25px"
	}
};


(function () {
	var action_url = "./";
	var jQ = jGo.$;
	var z_b = jGo.config.max_z_index - 100;
	var basedir = FCChatConfig.dir;
	var rendered=0;
	var config =jGo.fcchat_toolbar.wp_search.style;
	
	function EN(value) {
        var n = parseInt(value);
        return(n == null || isNaN(n) ? 0: n);
    };
   
	jGo.fcchat_toolbar.wp_search.create = function()    {return create_menu_item();};
	jGo.fcchat_toolbar.wp_search.create_dialogs = function()    {return create_dialog();};
	jGo.fcchat_toolbar.wp_search.append_dialogs = function(content)    {return append_dialog(content);};
	jGo.fcchat_toolbar.wp_search.tgl_dialog = function()    {return tgl_dialog();};
	
	var create_menu_item = function(){
	  return"<div class='fc_wp_search_button' style='position: absolute;width:"+config.menu_item.width+"px;top:"+ (jGo.fcchat_toolbar.style.icons_16px.top) + "px; left: "+config.menu_item.button.left+"px;'>" +
			"<div class='fc_abbtn' ><a title='"+fc_chat.textSetter(359,'search')+"' href='javascript:jGo.fcchat_toolbar.wp_search.tgl_dialog()' ><img src='"+basedir+"current_skin/wp_search.png'>&nbsp;</a></div></div>";
	};
	var create_dialog = function(){
		  dialog= "<div class='jGo_app jGo_myapp jGo_dialog' id='fc_wp_search_dialog' style='position:absolute;display: none;visibility: visible;"+config.dialog_box.css+";text-align:left;height:"+config.dialog_box.height+"px;width:"+config.dialog_box.width+"px;top: 113px; left:210px; z-index:" + z_b + ";overflow:hidden;'>" +
			"<div id='fc_wp_search_dialog_title' style='position:absolute;width:"+config.dialog_box.width+"px;"+config.dialog_box.title_box_css+";overflow:hidden'><div style='padding:4px;'><span style='"+config.dialog_box.text.title_css+"'>"+fc_chat.textSetter(357,'Search Site')+"</span>&nbsp;&nbsp;&nbsp;<a style='"+config.dialog_box.text.link_css+"' href='javascript:jGo.fcchat_toolbar.wp_search.tgl_dialog()'>"+fc_chat.textSetter(358,'Close')+"</a></div></div>" +
			"<div  id='fc_view_wp_search_dialog' style='position:absolute;width:"+config.dialog_box.width+"px;"+config.dialog_box.info_box_css+";overflow:auto'></div></div>";
			return dialog;
	};
	var render_dialog_content = function(){
		if(rendered==0){
			var content="<div style='padding-left:20px;overflow:auto;"+config.dialog_box.text.css+";line-height:120%'><br>" +
			"<li style='list-style-type: none' class='widget-container widget_search' id='search-2'><form action='"+action_url+"' id='searchform' method='get' role='search'><div><label for='s' class='screen-reader-text'> </label><input type='text' name='s' onfocus='if(this.value==\""+fc_chat.textSetter(359,'search')+"...\") this.value=\"\";' onblur='if(this.value==\"\") this.value=\""+fc_chat.textSetter(359,'search')+"...\";' value='"+fc_chat.textSetter(359,'search')+"...' style='"+config.dialog_box.input_css+"'/></div></form></li></div>";
			jQ("#fc_view_wp_search_dialog").html(content);
			rendered=1;
		}
	};
	var append_dialog = function(content){
		jQ(document.body).append(content);
	};
	var tgl_dialog = function(){
		jGo.fcchat_toolbar.control.toggle_dialog(jQ("#fc_wp_search_dialog"),position_dialog,render_dialog_content,200)
	};
	var position_dialog = function(){
		jGo.fcchat_toolbar.control.position_dialog(jQ("#fc_wp_search_dialog"),EN(jQ("#fc_wp_search_toolbar_item").css("left")),config.dialog_box.width,config.dialog_box.height)
	};

})();

//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('wp_search.js');