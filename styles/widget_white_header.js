/*
 * WIDGET STYLE TEMPLATE
 *
 * This file controls aspects of FCChat's layout and appearance.
 * 
 * In this file comments are preceded by double slashes ie.
 *      //THIS IS A COMMENT
 *      
 * Refer to the product manual for info regarding how to effectively make changes to the
 * style template:
 * 
 * http://www.fastcatsoftware.com/chat/manual.htmk
 * 
 * To use this template, edit FCChat/config/config.js as follows:
 * 
 *  //STYLE
 *	widget_style_template:"widget_default_sidebar.js",
 * 
 * If you create a decent style template. Please email us the template at 
 * support@fastcatsoftware.com
 */
(function(){

	var widget_base_font = "font-family:arial;font-size:12px;color:#444444;";
	var mobile_scrolling = "-moz-overflow-scrolling: touch;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;";
	FCChatConfig.styles.widget={
		control:{
			top:0, //for absolute positioning
			left:310, //"     "
			width:680,
			height:35,
			align_dialogs:false,
			css:"background-color:#eeeeee;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius:5px;",
			logo:{
				top:9,
				left:10,
				css:""
			},
			title_box:{
				top:6,
				left:30,
				width:90,
				height:30,
				css:"background-color:transparent;",
				text:{
					css:widget_base_font+";font-weight:bold;font-size:12px;color:#777777;"
				}
			},
			status:{
				css:""
			},
			buttons:{
				top:6,
				left:120,
				width:140,
				height:25,
				default_css:widget_base_font+";text-decoration:none;",
				states:{
					link_css:"color:rgb(22, 125, 200);",
					hover_css:"color:darkblue;",
					disabled_css:"color:#aaaaaa;"
				},
				full_page_button:{
					css:""
				},
				on_off_button:{
					css:"margin-left:20px;"
				}
			},
			info_box:{
				top:6,
				left:260,
				width:450,
				height:25,
				css:"background-color:transparent;",
				linebreak:"",
				text:{
					css:widget_base_font,
					alert_css:widget_base_font+"font-weight:bold;color:green;",
					info_css:widget_base_font+"color:#444444;"
				}
			}	
	    },
		online_box:{
			top:43,
			left:180,
			toolbar_offset:3,
			width:(jGo.mobile?280:230),
			height:(jGo.mobile?348:343),
			css:jGo.fcchat_toolbar.style.dialog_box.css,
			title_box_css:jGo.fcchat_toolbar.style.dialog_box.title_box_css,
			greeting_box_css:"top:3.333em;left:0em;height:3.333em;border-top:.083em solid #cccccc;border-bottom:.083em dotted #444444;",
			greeting_box_link:jGo.fcchat_toolbar.style.dialog_box.text.secondary_link_css,
			list_box_css:"top:6.833em;left:0em;height:16.083em;"+mobile_scrolling,
			list_divider_css:jGo.fcchat_toolbar.style.dialog_box.list_divider_css,
			info_box_css:"top:22.917em;left:0em;height:5.583em;border-top:.083em dotted #444444;",
			text:jGo.fcchat_toolbar.style.dialog_box.text
		},
		new_messages_box:{
			top:43,
			left:0,
			toolbar_offset:3,
			width:280,
			height:(jGo.mobile?348:343),
			css:jGo.fcchat_toolbar.style.dialog_box.css,
			title_box_css:jGo.fcchat_toolbar.style.dialog_box.title_box_css,
			greeting_box_css:"top:3.333em;left:0em;height:3.333em;border-top:.083em solid #cccccc;border-bottom:.083em dotted #444444;",
			greeting_box_link:jGo.fcchat_toolbar.style.dialog_box.text.secondary_link_css,
			view_msg_box_css:"top:6.833em;left:0em;height:16.083em;margin-top:.333em;"+mobile_scrolling,
			send_msg_box_css:"top:22.917em;left:0em;height:5.583em;border-top:.083em dotted #444444;",
			input_css:"font-size:1em;height:1.5em !important;padding:0em;background-color:white !important;border:.083em solid silver !important;margin-left:.12525em !important;color:#44444 !important;",
			text:jGo.fcchat_toolbar.style.dialog_box.text,
			msg_interrupt:{
				css:"background-color:#ededff;",
				respond_css:"font-size:8pt;color:#528DC4;text-decoration:none;",
				close_css:"color:gray;font-stretch:wider;font-size:8pt;font-weight:bold;text-decoration:none;"
			}
		},
		friends_box:{
			top:43,
			left:180,
			toolbar_offset:3,
			width:(jGo.mobile?280:230),
			height:(jGo.mobile?348:343),
			css:jGo.fcchat_toolbar.style.dialog_box.css,
			title_box_css:jGo.fcchat_toolbar.style.dialog_box.title_box_css,
			greeting_box_css:"top:3.333em;left:0em;height:3.333em;border-top:.083em solid #cccccc;border-bottom:.083em dotted #444444;",
			greeting_box_link:jGo.fcchat_toolbar.style.dialog_box.text.secondary_link_css,
			list_box_css:"top:6.833em;left:0em;height:16.083em;"+mobile_scrolling,
			list_divider_css:jGo.fcchat_toolbar.style.dialog_box.list_divider_css,
			info_box_css:"top:22.917em;left:0em;height:5.583em;border-top:.083em dotted #444444;;",
			text:jGo.fcchat_toolbar.style.dialog_box.text
		},
		chatrooms_box:{
			top:43,
			left:240,
			width:(jGo.mobile?280:400),
			height:(jGo.mobile?348:343),
			css:jGo.fcchat_toolbar.style.dialog_box.css,
			title_box_css:jGo.fcchat_toolbar.style.dialog_box.title_box_css,
			list_box_css:"top:3.333em;left:0em;height:25.167em;border-top:.083em solid #cccccc;"+mobile_scrolling,
			text:jGo.fcchat_toolbar.style.dialog_box.text,
			selected_color:"lightblue",
			hover_color:"#e6e6e6",
			background_color:"transparent",
			separator:".083em solid #dddddd",
			room_name_font_css:"font-size:1.167em;font-weight:bold;color:#444444;",
			font_css:"color:#444444;font-family:arial;font-weight:normal;font-size:1em;",
			count_font_css:"font-size:1.167em;color:blue;font-weight:bold;",
			disabled_room_name_font_css:"font-size:1.167em;font-weight:bold;color:#8888aa;",
			room_passwords:{
				font:{
					textfield_description_css:"font-family:arial;font-size:1em;color:#darkgray;font-style:italic;font-weight:bold;"
				},
				textfield_css:"background-color:white;border:.083em solid #444444;padding:.417em;color:#444444"
			}
		},
		login_panel:{
			top:43,
			left:5,
			box_shadow:"0em 0em 1em .167em rgba(0,0,0,0.5)",
			background_color:"#eeeeee",
			border:".167em solid gray",
			font:{
				textfield_description_css:{"font-family":"arial","font-size":"1.083em",color:"black","font-style":"italic","font-weight":"bold"},
				smalltext_css:{"margin-right":".833em","font-family":"arial","font-size":"1.083em",color:"black"}
			},
			textfield_css:"background-color:#dddddd !important;color:#444444 !important;width:15em !important;height:1.5em !important;"
		}
	};
	/*Apply style overrides*/
	FCChatConfig.overrides.widget_overrides();	
})();
