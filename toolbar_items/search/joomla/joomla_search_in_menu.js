
/*
 * Joomla Search menu item
 */

//Joomla Search functions
jGo.fcchat_toolbar.joomla_search_in_menu = {};

//Joomla Search style template
jGo.fcchat_toolbar.joomla_search_in_menu.style={
	menu_item:{
		width:148,
		padding:{
			left:10,
			top:3
		},
		text_input_css:"position:absolute;top:3px;left:5px;height:12px;font-size:9px;background-color:lightgray;width:90px;-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius:3px;",
		button_css:"position:absolute;top:4px;left:105px"
	}
};

(function () {
	var action_url = "index.php";
	var jQ = jGo.$;
	var z_b = jGo.config.max_z_index - 100;
	var basedir = FCChatConfig.dir;
	var rendered=0;
	var config =jGo.fcchat_toolbar.joomla_search_in_menu.style;
	
	function EN(value) {
        var n = parseInt(value);
        return(n == null || isNaN(n) ? 0: n);
    };
   
	jGo.fcchat_toolbar.joomla_search_in_menu.create = function()    {return create_menu_item();};
	jGo.fcchat_toolbar.joomla_search_in_menu.create_dialogs = function()    {return create_dialog();};
	jGo.fcchat_toolbar.joomla_search_in_menu.append_dialogs = function(content)    {return append_dialog(content);};
	jGo.fcchat_toolbar.joomla_search_in_menu.tgl_dialog = function()    {return tgl_dialog();};
	
	var create_menu_item = function(){
	  return"<div class='fc_joomla_search_in_menu_item' style='position: absolute;width:"+config.menu_item.width+"px;top:"+config.menu_item.padding.top+"px; left: "+config.menu_item.padding.left+"px;'>" +
			"<div id='fc_joomla_search_content'>"+
				"<form method='post' action='"+action_url+"'>"+
					"<span class='search'>"+
						"<input type='text' onfocus='if(this.value==\""+fc_chat.textSetter(359,'search')+"...\") this.value=\"\";' onblur='if(this.value==\"\") this.value=\""+fc_chat.textSetter(359,'search')+"...\";' value='"+fc_chat.textSetter(359,'search')+"...' size='20' alt='Search' maxlength='20' style='"+config.menu_item.text_input_css+"' id='fc_mod_search_searchword' name='searchword'/>"+
					"</span>"+
					"<input type='image' src='"+basedir+"current_skin/wp_search.png' style='"+config.menu_item.button_css+"' name='image' width='16' height='16'>"+
					"<input type='hidden' value='search' name='task'/>"+
					"<input type='hidden' value='com_search' name='option'/>"+
					"<input type='hidden' value='1' name='Itemid'/>"+
				"</form>"+
			"</div>"+
		"</div>";
	};
	var create_dialog = function(){
	};
	var render_dialog_content = function(){
	};
	var append_dialog = function(){
	};
	var tgl_dialog = function(){
	};
	var position_dialog = function(){
	};

})();

//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('joomla_search_in_menu.js');