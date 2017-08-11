function fcchat_includes(){
	var cnf = FCChatConfig;
	//Set up toolbar
	jGo.fcchat_toolbar = {
			config:{
				show:cnf.show_toolbar,
				layout:cnf.toolbar_layout,
				fixed:1,
				mode:1,
				spacer:cnf.toolbar_insert_top_spacer,
				position:cnf.toolbar_position,
				items:cnf.toolbar_items,
				mobile:false,
				tablet:false,
				fixed_support:true,
				small_screen:false
			}
	};
	var tcon = jGo.fcchat_toolbar.config;
	var nav = navigator.userAgent.toLowerCase();
	
	jGo.fcchat_toolbar.config.mobile = jGo.mobile = (cnf.mobile_regex.test(nav));
	jGo.blogdim={width:cnf.chatbox.width.desktop,height:cnf.chatbox.height.desktop};

	if(jGo.mobile){
		var chrome = /chrome/i;
		var not_mobile = /^(?:(?!mobile).)*$/i;
		tcon.tablet = cnf.tablet_regex.test(nav) || (chrome.test(nav)&&not_mobile.test(nav));
		tcon.fixed_support = cnf.fixed_support_regex.test(nav);
		tcon.small_screen = screen.width<600;
		tcon.show=false;
		tcon.visibility=1;
		tcon.mode=cnf.mobile_toolbar_mode;
		tcon.spacer=false;
		/*
		if(cnf.use_mobile_banner&&tcon.fixed_support&&!tcon.tablet&&!cnf.mobile_banner_exclude.test(nav)){
			tcon.layout=2;
			tcon.mode=1;
			tcon.position=cnf.mobile_banner_position;
			tcon.show=true;
		}else if(cnf.use_fixed_toolbar&&tcon.fixed_support&&!cnf.fixed_toolbar_exclude.test(nav)){
			tcon.layout=1;
			tcon.position=cnf.fixed_toolbar_position;
			if(tcon.position=='topleft'&&cnf.fixed_toolbar_insert_top_spacer){
				tcon.spacer=true
			}
			tcon.show=true;
		}else if(cnf.use_static_banner&&!cnf.static_banner_exclude.test(nav)){
			tcon.layout=1;
			tcon.fixed=0;
			tcon.position='topleft';
			tcon.show=true;
		}
		*/
		
		
		tcon.show=cnf.show_toolbar&&tcon.show;
		if(tcon.small_screen&&!tcon.tablet){
			jGo.blogdim={width:cnf.chatbox.width.mobile,height:cnf.chatbox.height.mobile};
			tcon.items=cnf.small_device_toolbar_items;
			if(tcon.mode==2){
				tcon.mode=0;
			}
		}else{
			jGo.blogdim={width:cnf.chatbox.width.tablet,height:cnf.chatbox.height.tablet};
			tcon.items=cnf.large_device_toolbar_items;
			if(tcon.mode==2){
				tcon.mode=1;
			}
		}
	}
    //End set up toolbar

	//iphone/iPod mods
	jGo.istuff=/iphone|ipad|ipod/i;
	jGo.iphone = (jGo.istuff.test(navigator.userAgent.toLowerCase()));

	jGo.toolbar_left=0;
	jGo.toolbar_top=0;
	
	jGo.scripts.importClass('jGo.browser.min.js', 'static', this,
			null);
	jGo.scripts.importClass('jGo.DefaultToolbar.min.js', 'static', this,
			null);
	jGo.scripts.importClass('jGo.DefaultMenu.min.js', 'static', this,
			null);
	jGo.scripts.importClass('jGo.InfoBox.min.js', 'static', this,
			null);
	if(cnf.facebook_connect){
		jGo.scripts.importClass('jGo.postMessage.min.js', 'static', this,
				null);
	}
	var template = cnf.templates;
	if(window["fcchat_domain"]&&template[window["fcchat_domain"]]){
			template = template[window["fcchat_domain"]];
	}else{
			template = template.alldomains;
	}
	document.write("<script language='JavaScript' src='" + cnf.dir + "js/template_overrides.js'></script>");
	document.write("<script language='JavaScript' src='" + cnf.dir + "languages/" + cnf.language_template + "'></script>");
	document.write("<script language='JavaScript' src='" + cnf.dir + "styles/" + template.application_window + "'></script>");
	document.write("<script language='JavaScript' src='" + cnf.dir + "styles/" + template.toolbar + "'></script>");
	document.write("<script language='JavaScript' src='" + cnf.dir + "styles/" + template.widget + "'></script>");
    
	if(cnf.chatbox.enabled&&(!((window['fcchat_domain']=="fullpage"||window['fcchat_domain']=="admin")))){
		for(var i = 0;i<tcon.items.length;i++){
			if(tcon.items[i]=="friendscenter"){
				tcon.items.splice(i+(cnf.blog?1:0),0,"chat:chatbox");
				break;
			}
		}
	}
	var buttons_loaded=false;
	for(var i = 0;i<tcon.items.length;i++){
		if(tcon.items[i]!="friendscenter"){
			var item=tcon.items[i].split(":");
			if(tcon.items[i].indexOf("custom_buttons:")>=0){
				if(!buttons_loaded){
					buttons_loaded=true;
					document.write("<script language='JavaScript' src='" + cnf.dir + "toolbar_items/custom_buttons/custombutton.js'></script>");
				}
				tcon.items[i]='custombutton:'+item[item.length-1].replace(/ /g, '_');
			}else{
				document.write("<script language='JavaScript' src='" + cnf.dir + "toolbar_items/"+tcon.items[i].replace(/:/g, '/')+".js'></script>");
				tcon.items[i]=item[item.length-1];
			}
		}
	}
	if(cnf.prompt_user){
		document.write("<script language='JavaScript' src='" + cnf.dir + "js/prompt.js'></script>");
	}

	document.write("<script language='JavaScript' src='" + cnf.dir + "js/template_overrides2.js'></script>");
	
	if(cnf.flashEnabled=='test'){
		cnf.flashEnabled=false;
		if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"])
		{
			cnf.flashEnabled = !(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin==null);
		}
		else if (document.all && (navigator.appVersion.indexOf("Mac")==-1))
		{
			eval ('try {var fcchat_xObj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if (fcchat_xObj) FCChatConfig.flashEnabled = true; fcchat_xObj = null; } catch (e) {}');
		}
	}
	if(cnf.websocketEnabled=='test'){
		cnf.websocketEnabled=false;
		if("WebSocket" in window){
			cnf.websocketEnabled=true;
		}
	}
	
	if(cnf.flashEnabled){
		document.write("<script type='text/javascript' src='" + cnf.dir + "js/flash.tag.min.js'></script>");
	}else if(cnf.websocketEnabled){
		document.write("<script type='text/javascript' src='" + cnf.dir + "js/fcchat.websocket.min.js'></script>");
	}else{
		cnf.no_support=true;
	}
	document.write("<script type='text/javascript' src='" + cnf.dir + "js/jquery.sound.min.js'></script>");
	document.write("<script language='JavaScript' src='" + cnf.dir + "js/css.vars.js'></script>");
	document.write("<script language='JavaScript' src='" + cnf.dir + "js/page.init.js'></script>");
	
	jGo.domIsReady = false;
	jGo.loadCalled = false;
	
	jGo.$(document).ready(function() {
	  jGo.domIsReady = true;
	  if(window.fc_chat&&window.fc_chat.initialized){
	    setTimeout("fc_chat.loader()",250);
	    jGo.loadCalled = true;
	  }
	});
	jGo.$(window).unload(function() {
		if(window.fc_chat&&fc_chat.getPause()==1){
			var date = new Date();
	    	date.setTime(date.getTime()+(365*24*60*60*1000));
			jGo.cookie.setCookie("fc_pauseChat", "0", (cnf.cookie_expires==0?null:date), "/", cnf.domain);
		}
	});
	jGo.country_code='';
	if(cnf.show_country_flags){
		jGo.$.post(cnf.dir+'proxies/getloc.php',{c1:cnf.ipinfodb_api_key,c2:cnf.data_cookie}, function(data) {
			data=data.split("<getloc>");
		  if(data.length>1){
			  jGo.country_code=data[1];
			  if(window.fc_chat&&window.fc_chat.initialized){
				  window.fc_chat.put_c(data[1],13);
			  }
		  }
		});
	};
};

if(!FCChatConfig['delay_import']){
	fcchat_includes();
};