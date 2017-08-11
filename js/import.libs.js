if (!window["jGo"] && (!window.jQuery || (window.jQuery.fn.jquery.substr(0,2)-0)<2.1)) {
	//document.write("<script type='text/javascript' src='http://www.google.com/jsapi'></script>");
	//As of fcchat version 3.5 load jquery directly
	document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/'+FCChatConfig.jQuery_stable+'/jquery.min.js"></script>');
}

// Load jGo css and js
if (!window["jGo"] || window["jGo"].version < 1.0) {
	document.write("<script type='text/javascript' src='"
			+ FCChatConfig.dir + "jGo/js/jGo.min.js'></script>");
	var fcp_headID = document.getElementsByTagName("head")[0];
	if (fcp_headID) {
		var fcp_cssNode = document.createElement('link');
		fcp_cssNode.type = 'text/css';
		fcp_cssNode.rel = 'stylesheet';
		fcp_cssNode.href = FCChatConfig.dir + 'jGo/css/jGo.min.css';
		fcp_cssNode.media = 'screen';
		fcp_headID.appendChild(fcp_cssNode);
	} else {
		document.write("<link rel='stylesheet' href='" + FCChatConfig.dir
				+ "jGo/css/jGo.min.css' type='text/css'>");
	}
}
//Load Global Config
if(FCChatConfig.use_global_configuration){
	document.write("<script language='JavaScript' src='" + (FCChatConfig.global_configuration_url!=''?FCChatConfig.global_configuration_url:"/global.config.js")+"'></script>");
}