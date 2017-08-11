(function(){
FCChatConfig.overrides={
	application_overrides:function(){	
		var d = FCChatConfig.quickstyling;
		if(window["fcchat_domain"]&&d[window["fcchat_domain"]]){
			d = d[window["fcchat_domain"]];
		}else{
			d = d.alldomains;
		}
		c=d.application_window;
		var s = "FCChatConfig.styles.chat_window";
		var x = jGo.util.mergeOption;
		var y = jGo.util.setOption;
		if(c.frame_color!="")y(s+".frame.color",c.frame_color);
		x(s+".frame.title_css",c.title_css);
		if(c.background_color!=""){
			y(s+".main_panel.background_color",c.background_color);
			y(s+".main_panel.side_panels.background_color",c.background_color);
		}
		if(c.panel_color!=""){
			y(s+".main_panel.chat_panels.chat_room_panel.background_color",c.panel_color);
			y(s+".main_panel.chat_panels.private_chat_panel.background_color",c.panel_color);
		}
		if(FCChatConfig.global)FCChatConfig.global.template_overrides();
	},
	toolbar_overrides:function(){
		var d = FCChatConfig.quickstyling;
		if(window["fcchat_domain"]&&d[window["fcchat_domain"]]){
			d = d[window["fcchat_domain"]];
		}else{
			d = d.alldomains;
		}
		var c = d.toolbar;
		var s = "jGo.fcchat_toolbar.style";
		var x = jGo.util.mergeOption;
		var w = c.width_prop_offsets.split(':');
		
		if(jGo.fcchat_toolbar.config.layout==2)jGo.util.mergeOption("jGo.fcchat_toolbar.style.text","font-size:100%;");
		
		w[0]-=0;
		w[1]-=0;
		w[2]-=0;
		x(s+".css",c.background_css);
		var bck='';
		try{
			bck=c.background_css.split("background-color:")[1].split(";")[0];
		}catch(e){};
		if(bck!='')jGo.util.setOption(s+".banner_css.background-color",bck);
		x(s+".text",c.base_font_css);
		x(s+".divider_css",c.divider_css);
		x(s+".icon_tray.minimize_icon.css",c.base_font_css);
		x(s+".icon_tray.hide_icon.css",c.base_font_css);
		x(s+".icon_tray.minimize_icon.top",c.text_top_offset);
		x(s+".icon_tray.hide_icon.top",c.text_top_offset);
		x(s+".icon_tray.restore.width",w[2]);
		
		c = d.dialog;

		s = "jGo.fcchat_toolbar.style.dialog_box";
		x(s+".css",c.background_css);
		x(s+".title_box_css",c.title_background_css);
		x(s+".text.title_css",c.title_css);
		x(s+".text.link_css",c.link_css);
		if(FCChatConfig.global)FCChatConfig.global.template_overrides();
	},
	widget_overrides:function(){
		var d = FCChatConfig.quickstyling;
		var c;
		var s = "FCChatConfig.styles.widget.control";
		var x = jGo.util.mergeOption;
		if(!window["fcchat_domain"]){
			c=d.alldomains.widget;		
			var w = c.width_prop_offsets.split(':');	
			w[0]-=0;
			w[1]-=0;
			w[2]-=0;
			x(s+".css",c.background_css);
			x(s+".height",c.height_offset);
			x(s+".width",w[0]+w[1]+w[2]);
			x(s+".logo.top",c.logo_top_offset);
			x(s+".logo.left",c.logo_left_offset);
			x(s+".logo.css",c.logo_css);
			x(s+".title_box.height",c.height_offset);
			x(s+".title_box.top",c.text_top_offset);
			x(s+".title_box.width",w[0]);
			x(s+".title_box.css",c.title_css);
			x(s+".title_box.text.css",c.base_font_css+c.title_font_css);
			x(s+".buttons.left",w[0]);
			x(s+".buttons.top",c.text_top_offset);
			x(s+".buttons.height",c.height_offset);
			x(s+".buttons.width",w[1]);
			x(s+".buttons.default_css",c.base_font_css);
			x(s+".buttons.states.link_css",c.link_css);
			x(s+".buttons.states.hover_css",c.link_hover_css);
			x(s+".buttons.states.disabled_css",c.link_disabled_css);
			x(s+".buttons.full_page_button.css",c.full_page_button_css);
			x(s+".buttons.on_off_button.css",c.off_button_css);
			x(s+".info_box.left",w[0]+w[1]);
			x(s+".info_box.top",c.text_top_offset);
			x(s+".info_box.height",c.height_offset);
			x(s+".info_box.width",w[2]);
			x(s+".info_box.css",c.infobox_css);
			x(s+".info_box.text.css",c.base_font_css);
			x(s+".info_box.text.alert_css",c.base_font_css+c.alert_css);
			x(s+".info_box.text.link_css",c.base_font_css+c.link_css);
			x(s+".info_box.text.info_css",c.base_font_css+c.info_css);
			
			s = "FCChatConfig.styles.widget";
			x(s+".online_box.top",c.height_offset);
			x(s+".login_panel.top",c.height_offset);
			x(s+".friends_box.top",c.height_offset);
			x(s+".chatrooms_box.top",c.height_offset);
			x(s+".new_messages_box.top",c.height_offset);
		}
		if(window["fcchat_domain"]&&d[window["fcchat_domain"]]){
			c = d[window["fcchat_domain"]];
		}else{
			c = d.alldomains;
		}
		c = c.toolbar;
		s = "jGo.fcchat_toolbar.style.toolbar_item";
		var w = c.width_prop_offsets.split(':');
		
		w[0]-=0;
		w[1]-=0;
		w[2]-=0;
		x(s+".text.css",c.base_font_css);
		x(s+".text.link_css",c.base_font_css+c.link_css);
		x(s+".text.alert_css",c.base_font_css+c.alert_css);
		x(s+".text.info_css",c.base_font_css+c.info_css);
		x(s+".buttons.default_css",c.base_font_css);
		x(s+".buttons.states.link_css",c.link_css);
		x(s+".buttons.states.hover_css",c.link_hover_css);
		x(s+".buttons.states.disabled_css",c.link_disabled_css);
		x(s+".chatcenter_layout.info_box.padding_top",c.text_top_offset);
		x(s+".chatcenter_layout.open_chat_button.top",c.text_top_offset);
		x(s+".chatcenter_layout.off_button.top",c.text_top_offset);
		x(s+".msgcenter_layout.info_box.padding_top",c.text_top_offset);
		x(s+".msgcenter_layout.open_chat_button.top",c.text_top_offset);
		x(s+".msgcenter_layout.off_button.top",c.text_top_offset);
		x(s+".chatcenter_layout.width",w[0]+w[1]);
		x(s+".msgcenter_layout.width",w[0]+w[1]);
		x(s+".chatcenter_layout.info_box.width",w[0]);
		x(s+".msgcenter_layout.info_box.width",w[0]);
		x(s+".chatcenter_layout.open_chat_button.left",w[0]);
		x(s+".msgcenter_layout.open_chat_button.left",w[0]);
		x(s+".chatcenter_layout.off_button.left",w[0]+(c.off_button_left_offset||0));
		x(s+".msgcenter_layout.off_button.left",w[0]+(c.off_button_left_offset||0));
		x(s+".chatcenter_layout.status.left",w[0]);
		x(s+".msgcenter_layout.status.left",w[0]);
		x(s+".chatcenter_layout.divider.left",w[0]);
		x(s+".msgcenter_layout.divider.left",w[0]);
		x(s+".chatcenter_layout.divider.css",c.divider_css);
		x(s+".msgcenter_layout.divider.css",c.divider_css);
		if(FCChatConfig.global)FCChatConfig.global.template_overrides();
	}
}
}());