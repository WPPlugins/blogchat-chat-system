/*
* As of version 2.2.12.1, FCChat client configuration has been transfered to the Settings -> FCChat Settings page, in * your wordpress administration. This file now serves mainly as a backup.
*/

var FCChatConfig_wp = {
	port:443,
	policy_port:443,
	version:"1.3.6.3",
	subversion:"0",
	jQuery_stable:"2.1.1",
	use_global_configuration:false,
	global_configuration_url:"", 
	language_template:"english.js",
	widget_style_template:"widget_default_sidebar.js",
	toolbar_style_template:"toolbar_default.js",
	chatcenter_style_template:"chatcenter_light_gray.js",
	use_template_overrides:false,
	template_overrides_url:"", 
	toolbar_items:["friendscenter","social_media:social_media"], // List MUST include "friendscenter"
	prompt_user:true,
	facebook_connect:true,
	show_country_flags:true,
	ipinfodb_api_key:"",
	cookie_expires:1, 
	data_cookie:"fc_data",
	flashEnabled:"test",
	websocketEnabled:"test",
	blog:true,
	retry:[5,3000,1], //connection retry
	domain:null,
	dir: window["fc_chat_path"] || "/FCChat/",
	alt_dir:"",
	proxy_path:"",
	proxy_type:"wordpress",

	// LOADING PHRASES
	load_standalone_bsc:(!window["jGo"]||jGo.scripts.loadState('jGo.DefaultWindow.init.min.js') == 'not.loaded'?"<script type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "jGo/js/jGo.DefaultWindow.init.min.js'></" +
		"script>":"") +
	    "<script>" +
			"(function() {" +
				"var s = document.createElement('script');" +
	  			"s.src = '" + (window["fc_chat_path"] || "/FCChat/") + "js/fcchat.standalone.min.js';" +
	  			"s.async = true;" +
	  			"var e = document.getElementsByTagName('script')[0];" +
	  			"e.parentNode.insertBefore(s, e);" +
			"})();</" +
		"script>",
	load_integrated_bsc:"",
	load_standalone:(!window["jGo"]||jGo.scripts.loadState('jGo.DefaultWindow.init.min.js') == 'not.loaded'?"<script type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "jGo/js/jGo.DefaultWindow.init.min.js'></" +
		"script>":"") +
		"<script type='text/javascript' src='" + (window["fc_chat_path"] || "/FCChat/") + "js/fcchat.standalone.min.js'></" +
		"script>",
	load_integrated:""
};

if(!window["FCChatConfig"]){
	window["FCChatConfig"] = {}
}

for (var key in FCChatConfig_wp) {
  if(FCChatConfig_wp.hasOwnProperty(key)){
	if(typeof(FCChatConfig[key]) == 'undefined' || FCChatConfig[key] == null) {
  		FCChatConfig[key] = FCChatConfig_wp[key];
	}
  }
}
