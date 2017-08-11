/*
 * Spacer menu item
 */

jGo.fcchat_toolbar.spacer = {};

//Social media style template
jGo.fcchat_toolbar.spacer.style={
	menu_item:{
		width:52
	}
};

//Spacer functions
(function () {
	
	var config =jGo.fcchat_toolbar.spacer.style;
	
	jGo.fcchat_toolbar.spacer.create = function()    {return create_menu_item();};
	jGo.fcchat_toolbar.spacer.create_dialogs = function()    {return create_dialog();};
	jGo.fcchat_toolbar.spacer.append_dialogs = function(content)    {return append_dialog(content);};
	jGo.fcchat_toolbar.spacer.tgl_dialog = function()    {return tgl_dialog();};
	
	var create_menu_item = function(){
	  return"<div class='fc_spacer' style='position: absolute;width:"+config.menu_item.width+"px;top:0px; left: 0px;'>" +
			"&nbsp;</div>";
	};
	var create_dialog = function(){
	};
	var append_dialog = function(content){
	};
	var tgl_dialog = function(){
	};

})();

//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('spacer.js');