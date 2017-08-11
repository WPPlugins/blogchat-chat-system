//var fcchat_debug_main = true;
//var fcchat_debug_ext = true;

//Path to FCPlayer Folder (must end in a backslash)
if(!window["fc_chat_path"] || window["fc_chat_path"] == ""){
	var scripts = document.getElementsByTagName("script");
	for(var i = 0;i<scripts.length;i++){
		if(((scripts[i].src).toLowerCase()).indexOf('js/import.config.js')>0){
			fc_chat_path=scripts[i].src;
		}
	}
	fc_chat_path=fc_chat_path.split("?")[0];
	window["fc_chat_path"] = fc_chat_path.substr(0,fc_chat_path.length-19);
}
if(!window["FCChatConfig"]){
	document.write("<script type='text/javascript' src='" + fc_chat_path + "config/config.js'></script>");
}