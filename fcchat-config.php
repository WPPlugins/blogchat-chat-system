<?php
//Default configuration for the chat

function fcchat_widget_options() {
  	return array(
		"title"=>array("value"=>"Chat","type"=>"text","quote"=>"1","sz"=>"20","desc"=>"Chat Widget Title"),
		"cmntcon"=>array("value"=>"","type"=>"comment","desc"=>"CONNECTION INFO"),
		"chat_id"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"20","desc"=>"The Chat ID you received on activation."),
		"host"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"20","desc"=>"The host value you received on activation."),
		
		"cmntgreet"=>array("value"=>"","type"=>"comment","desc"=>"BRANDING"),
		
		"small_logo"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"A 16x16 (approx) logo for your site. Insert the full path to the image file. ie. http://www.mysite.com/image.png"),
		"big_logo"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"A 80x80 (approx) logo for your site.  Insert the full path to the image file. ie. http://www.mysite.com/image.png"),
		"widget_title"=>array("value"=>"ChatCenter","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"The title displayed on the embedded widget."),
		"branding_bar_title"=>array("value"=>"Yourdomain Chat","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"Title displayed on the branding bar. Add the branding bar to the toolbar by inserting 'fullpage:logo' into <strong>toolbar_items</strong> field below"),
		"branding_bar_width"=>array("value"=>"140","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Width of the branding bar."),
		"startText"=>array("value"=>"Click here to join our chat.","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"Text displayed by the widget when it starts up."),
		"loginText"=>array("value"=>"Please sign in to join our chat.","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"Text displayed by the login panel when user integration is enabled."),
		"autoGreet"=>array("value"=>"Wellcome!! ","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"A message that is displayed when a user opens the ChatCenter window."),
		"full_page_loading"=>array("value"=>"BLOGCHAT will load momentarily.","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"Text displayed when the full page chat is loading."),
		"full_page_login"=>array("value"=>"Welcome to <span style='color:#a3b3ff'>BLOGCHAT</span>. Sign in to enter.","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"Text displayed if the full page chat requires signin."),
		
		"cmntperm"=>array("value"=>"","type"=>"comment","desc"=>"PERMISSIONS"),
		"require_login"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Guests are required to login to gain access to the chat."),
		"guests_can_chat"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"If no, guests may not send chats in the rooms (they can still observe)."),
		"guests_can_video_chat"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Allow guest accounts to use the video chat."),
		"show_guests"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Show guest accounts by default."),
		"videoconerence_only_in_designated_rooms"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Videoconferencing can be accessed only in rooms designated for video chat."),
		
		"cmntcms"=>array("value"=>"","type"=>"comment","desc"=>"USER ACCOUNT INTEGRATION"),
		"user_integration_bridge"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"Sets up user integration. Refer to the User Guide for info on how to set up user integration."),
		"login_redirect"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"The URL of your site's login page. The user will be redirected here if they have not signed in."),
		
		"cmntboxes"=>array("value"=>"","type"=>"comment","desc"=>"ONLINE, NEW MESSAGES, AND FRIENDS DIALOGS"),
		"alignment"=>array("value"=>"auto","type"=>"radio2","ops"=>array(array("value"=>"left","desc"=>"Left alignment of widget dialogs. For when the widget is in the right sidebar"),array("value"=>"right","desc"=>"Right alignment of widget dialogs. For when the widget is in the left sidebar"),array("value"=>"auto","desc"=>"Automatically detect alignment")), "quote"=>"1","desc"=>""),
		
		"cmntlang"=>array("value"=>"","type"=>"comment","desc"=>"LANGUAGE TEMPLATE"),
		"language_template"=>array("value"=>"english.js","type"=>"text","quote"=>"1","sz"=>"30","desc"=>"Templates located in the <strong>fcchat/languages/</strong> folder. Make sure the language file exists before editing."),
		
		"cmntstyle"=>array("value"=>"","type"=>"comment","desc"=>"STYLE TEMPLATES"),
		"templates"=>array(
"value"=>"alldomains:{
	widget:'widget_white_header.js',
	toolbar:'toolbar_white.js',
	application_window:'chatcenter_white.js'
}","type"=>"textarea","desc"=>"Templates located in the <strong>fcchat/styles/</strong> folder. There are three templates. One for the embedded widget, one for the toolbar, and one for the application window. It is recommended that you copy the original contents of this field and save them to a safe location. That way, you can restore the contents of this field if you make a mistake."),

		"cmntstyling"=>array("value"=>"","type"=>"comment","desc"=>"QUICK STYLING"),
		"quickstyling"=>array(
"value"=>"alldomains:{
	widget:{
		background_css:'',
		width_prop_offsets:'0:0:0', /*title : buttons : info box*/
		height_offset:0, 
		text_top_offset:0, 
		height_prop_offsets:'0:0:0', /*title : buttons : info box*/
		width_offset:0, 
		logo_top_offset:0,
		logo_left_offset:0,
		logo_css:'',
		title_css:'',
		full_page_button_css:'',
		off_button_css:'',
		infobox_css:'',
		base_font_css:'',
		title_font_css:'',
		alert_css:'',
		link_css:'',
		link_hover_css:'',
		link_disabled_css:'',
		info_css:''
	},
	toolbar:{
		background_css:'',
		divider_css:'',
		width_prop_offsets:'0:0:0', /*info box : buttons : minimized*/
		text_top_offset:0, 
		off_button_left_offset:0,
		base_font_css:'',
		alert_css:'',
		link_css:'',
		link_hover_css:'',
		link_disabled_css:'',
		info_css:''
	},
	dialog:{
		background_css:'',
		title_background_css:'',
		title_css:'',
		link_css:''
	},
	application_window:{
		frame_color:'',
		background_color:'',
		panel_color:'',
		title_css:''
	},
	full_page_css_obj:{
	}
}","type"=>"textarea","desc"=>"Read the quickstyling tutorial in the User Guide before editing. It is strongly recommended that you copy the original contents of this field and save them to a safe location. That way, you can restore the contents of this field if you make a mistake."),
		
		"cmntover"=>array("value"=>"","type"=>"comment","desc"=>"TEMPLATE OVERRIDES"),
		"template_overrides"=>array("value"=>"","type"=>"textarea","desc"=>"You may use the following area to make changes to the style and language templates. <br><br>You may also customize your templates by editing the template files directly. However, when you do so, your changes will be lost when you upgrade the chat to a new version. (Unless, of course, you make backup copies of the templates before upgrading, and then transfer your changes manually to the new templates when the upgrade is complete). <br><br>In contrast, when you use the Template Overrides section provided below to customize your templates, the changes will carry over when you upgrade the chat.<br><br>
To effectively use template overrides, you will need to read this tutorial: <a target=_blank href='http://www.fastcatsoftware.com/wp3.3/?p=7'>How to customize your chat with the template overrides function</a>."),
		
		"cmntemb"=>array("value"=>"","type"=>"comment","desc"=>"EMBEDDED WIDGET OPTIONS (options for the widget box that appears in the sidebar)"),
		"absolute_positioning"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Position the widget at a fixed location on the page? If yes, you must set the page coordinates in the widget style template file, either directly or by using <strong>template_overrides</strong> above."),
		"control_visible"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Do you want to display the sidebar widget?"),
		"control_padding"=>array("value"=>"0px","type"=>"text","quote"=>"1","sz"=>"20","desc"=>"Puts some spacing around your widget. In 'px' (pixels)."),
		
		"cmnttool"=>array("value"=>"","type"=>"comment","desc"=>"GENERAL TOOLBAR OPTIONS (options for the fixed toolbar)"),
		"show_toolbar"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Display the fixed toolbar?"),
		
		"cmntdesktool"=>array("value"=>"","type"=>"comment","desc"=>"DESKTOP/LAPTOP TOOLBAR OPTIONS"),
		"toolbar_layout"=>array("value"=>"0","type"=>"radio2","ops"=>array(array("value"=>"0","desc"=>"Compact"),array("value"=>"1","desc"=>"Full width")), "quote"=>"0","desc"=>""),
		"toolbar_position"=>array("value"=>"bottomright","type"=>"radio2","ops"=>array(array("value"=>"bottomright","desc"=>"Bottom right"),array("value"=>"bottomleft","desc"=>"Bottom left"),array("value"=>"topright","desc"=>"Top right"),array("value"=>"topleft","desc"=>"Top left")), "quote"=>"1","desc"=>""),
		"toolbar_insert_top_spacer"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Add a spacer at the top of the page to shift page elements down. For use when the toolbar is displayed at the top of the page."),
		"toolbar_items"=>array("value"=>"['friendscenter','social_media']","type"=>"text","quote"=>"0","sz"=>"80","desc"=>"A list of items to place in the toolbar. The list MUST include 'friendscenter'. Refer to the User Guide or Product Manual for available items. Place brackets around the list. Each item must be in single quotes."),
		"toolbar_default_display"=>array("value"=>"1","type"=>"radio2","ops"=>array(array("value"=>"0","desc"=>"Minimized"),array("value"=>"1","desc"=>"Normal")), "quote"=>"0","desc"=>""),
		"custom_buttons"=>array("value"=>"","type"=>"textarea","desc"=>"Allows you to add your own customized buttons to the toolbar. Read the tutorial in the User Guide on adding custom buttons before editing this field."),
		
		"cmntmob"=>array("value"=>"","type"=>"comment","desc"=>"MOBILE TOOLBAR OPTIONS"),
		"mobile_toolbar_mode"=>array("value"=>"2","type"=>"radio2","ops"=>array(array("value"=>"0","desc"=>"Simplified"),array("value"=>"1","desc"=>"Regular"),array("value"=>"2","desc"=>"Auto choose, based on device width.")), "quote"=>"0","desc"=>""),
		
		"use_mobile_banner"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Enable the resizable toolbar mode customized for small screen devices."),
		"mobile_banner_position"=>array("value"=>"topleft","type"=>"radio2","ops"=>array(array("value"=>"bottomleft","desc"=>"Bottom left"),array("value"=>"topleft","desc"=>"Top left")), "quote"=>"1","desc"=>""),
		"mobile_banner_scale_factor"=>array("value"=>"1","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Resize the banner."),
		"mobile_banner_exclude"=>array("value"=>"/none/i","type"=>"text","quote"=>"0","sz"=>"100","desc"=>"A regex containing a list of devices to exclude from this mode. ie. /iphone|ipad|ipod/i"),
		
		"use_fixed_toolbar"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Enable the fixed toolbar mode for mobile devices."),
		"fixed_toolbar_position"=>array("value"=>"topleft","type"=>"radio2","ops"=>array(array("value"=>"bottomleft","desc"=>"Bottom left"),array("value"=>"topleft","desc"=>"Top left")), "quote"=>"1","desc"=>""),
		"fixed_toolbar_insert_top_spacer"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Add a spacer at the top of the page to shift page elements down. For use when the toolbar is displayed at the top of the page."),
		"fixed_toolbar_exclude"=>array("value"=>"/none/i","type"=>"text","quote"=>"0","sz"=>"100","desc"=>"A regex containing a list of devices to exclude from this mode. ie. /iphone|ipad|ipod/i"),
		
		"use_static_banner"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Enable a fallback mode for mobile devices that do not fully support fixed positioning. In this mode, the toobar will be inserted at the top of the page, and will scroll with the page."),
		"static_banner_height"=>array("value"=>"35","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Height of the banner."),
		"static_banner_offset_top"=>array("value"=>"0","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Placement of the banner with respect to the top of the page."),
		"static_banner_exclude"=>array("value"=>"/none/i","type"=>"text","quote"=>"0","sz"=>"100","desc"=>"A regex containing a list of devices to exclude from this mode. ie. /iphone|ipad|ipod/i"),
		
		"cmntmoblarge"=>array("value"=>"","type"=>"comment","desc"=>"MOBILE TABLET/LARGE DISPLAY OPTIONS"),
		"large_device_toolbar_items"=>array("value"=>"['friendscenter','social_media']","type"=>"text","quote"=>"0","sz"=>"80","desc"=>"A list of items to place in the toolbar. The list MUST include 'friendscenter'. Refer to the User Guide or Product Manual for available items. Place brackets around the list. Each item must be in single quotes."),
		
		"cmntmobsmall"=>array("value"=>"","type"=>"comment","desc"=>"MOBILE PHONE/SMALL DISPLAY"),
		"small_device_toolbar_items"=>array("value"=>"['friendscenter','social_media']","type"=>"text","quote"=>"0","sz"=>"80","desc"=>"A list of items to place in the toolbar. The list MUST include 'friendscenter'. Refer to the User Guide or Product Manual for available items. Place brackets around the list. Each item must be in single quotes."),
		
		"cmntwmodes"=>array("value"=>"","type"=>"comment","desc"=>"CHATCENTER WINDOW MODES"),
		"chatcenter_layout"=>array("value"=>"0","type"=>"radio2","ops"=>array(array("value"=>"0","desc"=>"Chat rooms and messages"),array("value"=>"1","desc"=>"Messages only")), "quote"=>"0","desc"=>""),
		"show_online_panel"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Show the online panel in the ChatCenter."),
		"open_chatcenter_in_new_tab"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Launch the ChatCenter into a new tab when a user tries to open it."),
		"allow_split_screen_mode"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Allow split screen mode."),
		
		"cmntwsz"=>array("value"=>"","type"=>"comment","desc"=>"CHATCENTER WINDOW SIZE"),
		"window_width"=>array("value"=>"853","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The width of the ChatCenter window."),
		"window_height_offset"=>array("value"=>"-160","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The height offset of the ChatCenter window relative the default height."),
		"chat_room_height_offset"=>array("value"=>"90","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The height offset of the chat room panel relative the default height."),
		
		"cmntchat"=>array("value"=>"","type"=>"comment","desc"=>"CHAT ROOM PARAMS"),
		"skip_roomlist"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"When set to true, clicking on the 'Chat Rooms' button will directly load the default chatroom (identified by default_room_index below) without displaying the room list. In addition, the full page chat will automatically load into the default room, instead of first displaying the room list."),
		"default_room_index"=>array("value"=>"0","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The index of the default room. This is NOT the position in the room list. To determine the index of a room. Go to the FCChat administration panel, and select 'Read/Refresh config file' in the bottom right corner. Look for the 'roomindex' variable for the desired room."),
		"disabled_rooms"=>array("value"=>"[]","type"=>"text","quote"=>"0","sz"=>"80","desc"=>"A list of rooms to be disabled. After disabling a room, you may enable it on a page by page basis. To do this, you must override this variable on the page in question, by inserting Javascript code into the page which includes the line FCChatConfig.disabled_rooms=[]; The code must be inserted after the FCChat configuration code has loaded."),
		"disabled_room_msg"=>array("value"=>"You must be a member to enter this room.","type"=>"text","quote"=>"1","sz"=>"80","desc"=>""),
		"hidden_rooms"=>array("value"=>"[]","type"=>"text","quote"=>"0","sz"=>"80","desc"=>"A list of rooms to be hidden from the user. After hiding a room, you may enable it on a page by page basis. To do this, you must override this variable on the page in question, by inserting Javascript code into the page which includes the line FCChatConfig.hidden_rooms=[]; The code must be inserted after the FCChat configuration code has loaded."),
		"room_message_limit"=>array("value"=>"300","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Maximum number of room messages allowed before the room will auto-adjust."),
		"min_room_messages"=>array("value"=>"50","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The number of messages left in the room after an auto-adjust."),
		"max_chat_size"=>array("value"=>"2000","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The maximum size of a single chat message."),
		
		"cmntchatbox"=>array("value"=>"","type"=>"comment","desc"=>"CHATBOX"),
		"chatbox"=>array(
"value"=>"enabled:true,
		mode:1, /*0 - sitewide, 1 - page discussion*/
		require_tag:false,
		embed:{
			tag_id:'comments',
			before:true
		},
		layout:{
			mode:2, /* 0 - horizontal, 1 -vertical, 2 - autodetect */
			auto_detect_width_transition:570
		},
		width:{
			desktop:590, /*min 580*/
			tablet:590,
			mobile:290
		},
		height:{ /*min 390*/
			desktop:450,
			tablet:450,
			mobile:450 
		},
		resize:{
			enable:true,
			increment:50,
			min_height:400,
			max_height:700
		},
		css:{
			loading:'font-family:arial;font-size:14px;font-weight:bold;color:lightblue',
			container_spacing:'margin-left:auto;margin-right:auto;margin-bottom:30px;',
			container_css:'background-color:#fff;border: 1px solid #eee;border-radius:4px;-webkit-box-shadow:0px 0px 4px 2px rgba(0,0,0,0.2);box-shadow:0px 0px 4px 2px rgba(0,0,0,0.2);',
			horizontal_alignment:11, 
			padding:'10px 10px',
			label:'font-size:16px;font-family:arial;font-weight:bold;color:#a3b3ff;'
		},
		label_txt:'Chat',
		loading_txt:'Chat Loading...Please Wait...',
		sitewide:{
			full_page:true,
			topic:'',
			desc:'',
			button_width:140,
			button_text:'Chatbox',
			title_text:'Live Comments',
			chatroom_text:'Chat:',
			connected_text:'Connected: ',
			viewing_text:'Viewing'
		},
		page_discussion:{
			button_width:140,
			button_text:'This Topic',
			title_text:'Live Comments',
			chatroom_text:'Chat about this page:',
			connected_text:'Viewing this page: ',
			viewing_text:'Active',
			use_querystring_in_url:true,
			use_page_title:true,
			lock_all_discussions:false
		},
		dialog_width:500,
		hide_chatroom_info:true,
		hide_eye:false","type"=>"textarea","desc"=>"Settings for the chatbox. Refer to http://http://www.fastcatsoftware.com/chat/userguide/chatbox.asp"),

		"cmntfpu"=>array("value"=>"","type"=>"comment","desc"=>"FULL PAGE URL"),
		"full_page_url"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"Changes the location of the full page chat. Read the tutorial in the User Guide on changing the location of the chat page before editing."),
		
		"cmntenv"=>array("value"=>"","type"=>"comment","desc"=>"ENVIRONMENTAL SETTINGS"),
		"default_on"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"The chat is enabled by default?"),
		"set_tab"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Set the browser tab as an alert when new chats arrive."),
		"no_chat_history"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Do not show chat history pages."),
		"showTyping"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Display the word 'typing' when a user is typing a message."),
		"display_timestamp"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Show the date and time of new chat messages by default."),
		"sounds_on"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Use sound effects by default."),
		"room_alerts_on"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Room alerts are enabled by default."),
		"mobile_regex"=>array("value"=>"/iphone|ipod|android|mobile|blackberry|bb10|mini|windows\sce|palm/i","type"=>"text","quote"=>"0","sz"=>"100","desc"=>"A regex containing a list of known mobile identifiers. This regex is matched against the browsers useragent string."),
		"tablet_regex"=>array("value"=>"/ipad|tablet/i","type"=>"text","quote"=>"0","sz"=>"100","desc"=>"A regex containing a list of known tablet identifiers. This regex is matched against the browsers useragent string."),
		"fixed_support_regex"=>array("value"=>"/cpu os [6-9]|iphone os [6-9]|android [4-9]|bb10|(?=.*blackberry)(?=.*version\/[7-9])/i","type"=>"text","quote"=>"0","sz"=>"100","desc"=>"A regex which attempts to match devices with full support for fixed positioning. This regex is matched against the browsers useragent string."),
		
		"cmntpromo"=>array("value"=>"","type"=>"comment","desc"=>"USER PROMPT"),
		"prompt_user"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Prompt user to sign in to the chat when they first come to your site."),
		"prompt_nickname"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Prompt guest user to add a nickname. Or, alternatively, sign in."),
		
		"cmntfb"=>array("value"=>"","type"=>"comment","desc"=>"FACEBOOK CONNECT"),
		"facebook_connect"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Allow Facebook connect."),
		"fb_connection_url"=>array("value"=>"http://chat.fastcatsoftware.com:8080","type"=>"text","quote"=>"1","sz"=>"60","desc"=>"The default Facebook connection url."),
		
		"cmntcnt"=>array("value"=>"","type"=>"comment","desc"=>"COUNTRY FLAGS"),
		"show_country_flags"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>""),
		"ipinfodb_api_key"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"Get your free api key from http://ipinfodb.com/register.php."),
		
		"cmntprof"=>array("value"=>"","type"=>"comment","desc"=>"PROFILES"),
		"import_profiles"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"URL of the profile page. Read the tutorial in the User Guide on importing profiles before editing."),
		
		"cmntimav"=>array("value"=>"","type"=>"comment","desc"=>"IMAGES / AVATARS"),
		"upload_images_enabled"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Allow uploading of images."),
		"allow_crossdomain_images"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Allow users to post links to images from a different domain."),
		"current_domain"=>array("value"=>"fastcatsoftware.com","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"The current domain."),
		"import_default_avatar"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"When user integration is enabled, the users site account avatar will be used. (if possible)."),
		"script_type"=>array("value"=>"php","type"=>"radio2","ops"=>array(array("value"=>"php","desc"=>"PHP"),array("value"=>"asp","desc"=>"ASP")),"quote"=>"1","desc"=>""),
		"avatars_dir"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"The directory in which avatars are placed."),
		"images_dir"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"The directory in which uploaded images are placed."),
		"smileys_dir"=>array("value"=>"","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"The directory in which smileys are placed."),
		"avatar_sz"=>array("value"=>"18","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The default height of avatars."),
		"change_avatar"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Allow users to change their avatar."),
		"show_avatar_in_chats"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Display user's avatar in chat messages."),
		
		"cmntgame"=>array("value"=>"","type"=>"comment","desc"=>"GAMES"),
		"allow_games"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Allow games."),
		"game_ids"=>array("value"=>"[2,1,256,325,86,6,254,1822,607,1723,225,4,1607,102,327,274,3,26,6346,562,1840,557,29,255,272,2227,5286,567,15,1658,64,3177,330,329,273,11,1661,12]","type"=>"text","quote"=>"0","sz"=>"180","desc"=>"A comma separated list of game IDs. List must be enclosed in square brackets. Game IDS should match game names in language template file"),
		
		"cmntsml"=>array("value"=>"","type"=>"comment","desc"=>"SMILEY LIST"),
		"smiley_list"=>array("value"=>"[['smile.png', 'smile','32'],['bigsmile.png', 'bigsmile','32'],['cry.png', 'cry','32'],['wink.png', 'wink','32'],['nod.gif', 'nod','50'],['pout.gif', 'pout','50'],['whap.gif', 'whap','50'],['sry.gif', 'sorry','50'],['fny.gif', 'funny','50'],['ow.gif', 'ouch','50'],['trb.gif', 'trembling','50'],['jp.gif', 'jackpot','50'],['pumping_iron.gif', 'pumping_iron','50'],['bdm.gif', 'badmonkey','50'],['cough.gif', 'cough','50'],['proud.gif', 'proud','50'],['bear.gif', 'clappingbear','50'],['sm18.gif', '-)','15'],['sm2.gif','angel','24'],['sm3.gif','alien','15'],['sm4.gif','dracula','20'],['sm5.gif','devil','16'],['sm6.gif','bashfull','18'],['sm7.gif','bug','26'],['sm8.gif','chicken','23'],['sm9.gif','cool','23'],['sm10.gif','rockon','28'],['sm11.gif','hat','22'],['sm12.gif','runningdog','36'],['sm13.gif','reindeer','30'],['sm14.gif','frog','15'],['sm15.gif','pig','18'],['sm16.gif','reddevil','21'],['sm17.gif','whip','28'],['sm1.gif','hmmm','18']]","type"=>"text","quote"=>"0","sz"=>"180","desc"=>"Smiley list. Refer to product manual for instructions on how to correctly format this list."),
		"smiley_columns"=>array("value"=>"4","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Number of columns in the smiley dialog box."),
		
		"cmntsmlold"=>array("value"=>"","type"=>"comment","desc"=>"OLD SMILEY LIST: DEPRICATED"),
		"smileys"=>array("value"=>"[['sm1.gif', ':-)','18',],['sm2.gif',':-)0','24'],['sm3.gif',':-)1','15'],['sm4.gif',':-)2','20'],['sm5.gif',':-)3','16'],['sm6.gif',':-)4','18'],['sm7.gif',':-)5','26'],['sm8.gif',':-)6','23'],['sm9.gif',':-)7','23'],['sm10.gif',':-)8','28'],['sm11.gif',':-)9','22'],['sm12.gif',':-)10','36'],['sm13.gif',':-)11','30'],['sm14.gif',':-)12','15'],['sm15.gif',':-)13','18'],['sm16.gif',':-)14','21'],['sm17.gif',':-)15','28'],['sm18.gif',':-)16','15']]","type"=>"text","quote"=>"0","sz"=>"180","desc"=>"Old Smiley list. Depricated. Refer to product manual for instructions on how to correctly format this list."),
		
		"cmntvid"=>array("value"=>"","type"=>"comment","desc"=>"VIDEO"),
		"video_enabled"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Enable video."),
		"video_access_level"=>array("value"=>"3","type"=>"radio2","ops"=>array(array("value"=>"0","desc"=>"None"),array("value"=>"1","desc"=>"Private only"),array("value"=>"2","desc"=>"Public only"),array("value"=>"3","desc"=>"Private and Public")),"quote"=>"0","desc"=>""),
		"max_video_streams"=>array("value"=>"100","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"The maximum number of simultaneous video streams."),
		"capture_width"=>array("value"=>"160","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Camera capture width."),
		"capture_height"=>array("value"=>"120","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Camera capture height."),
		"hd_capture_width"=>array("value"=>"320","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"HD Camera capture width."),
		"hd_capture_height"=>array("value"=>"240","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"HD Camera capture height."),
		"fps"=>array("value"=>"8","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Frames per second."),
		"quality"=>array("value"=>"95","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"Camera quality setting."),
		"show_a_v_icon"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Show an icon in the room list that indicates that a particular room supports video chat."),
		
		"cmnttrans"=>array("value"=>"","type"=>"comment","desc"=>"TRANSLATOR"),
		"trans_enabled"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Enable the translator."),
		"trans_default_on"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Translator activated by default."),
		"trans_default_language_code"=>array("value"=>"en","type"=>"text","quote"=>"1","sz"=>"20","desc"=>"Language code for the default language."),
		"trans_url"=>array("value"=>"http://api.microsofttranslator.com/V2/Ajax.svc/","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"URL for the translator."),
		"trans_appid"=>array("value"=>"4690BC25149C7E7E98E4A356B8C807D6A7132424","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"Application id for the translator."),
		
		"cmnttranslit"=>array("value"=>"","type"=>"comment","desc"=>"TRANSLITERATION"),
		"transliteration_enabled"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Enable the transliterator."),
		
		"cmntcook"=>array("value"=>"","type"=>"comment","desc"=>"COOKIES"),
		"cookie_expires"=>array("value"=>"1","type"=>"radio2","ops"=>array(array("value"=>"0","desc"=>"End of session"),array("value"=>"1","desc"=>"Never")),"quote"=>"0","desc"=>""),
		"user_cookie"=>array("value"=>"fc_UID","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"User cookie name."),
		"session_cookie"=>array("value"=>"fc_ChatToken","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"Session cookie name."),
		"mod_cookie"=>array("value"=>"fc_ChatToken","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"Moderation cookie name."),
		"data_cookie"=>array("value"=>"fc_data","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"Data cookie name."),
		
		"cmntmisc"=>array("value"=>"","type"=>"comment","desc"=>"MISC"),
		"allow_links"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Allow links in chats."),
		"help_link"=>array("value"=>"http://www.fastcatsoftware.com/chat/manual2.2.html","type"=>"text","quote"=>"1","sz"=>"80","desc"=>"Help link."),
		"show_help_button"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Show help button."),
		"show_user_list"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Show user list."),
		"show_settings_on_open"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Show settings menu when a user first opens the ChatCenter window."),
		"pin_windows"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Pin windows."),
		"pinned_by_default"=>array("value"=>"true","type"=>"radio","quote"=>"0","desc"=>"Windows are pinned by default."),
		"preload_images"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Preload images."),
		"noshow"=>array("value"=>"false","type"=>"radio","quote"=>"0","desc"=>"Hide the chat."),
		"flashEnabled"=>array("value"=>"test","type"=>"radio2","ops"=>array(array("value"=>"test","desc"=>"Automatically detect"),array("value"=>"true","desc"=>"Enabled"),array("value"=>"false","desc"=>"Disabled")),"quote"=>"2","desc"=>"Flash Enabled."),
		"websocketEnabled"=>array("value"=>"test","type"=>"radio2","ops"=>array(array("value"=>"test","desc"=>"Automatically detect"),array("value"=>"true","desc"=>"Enabled"),array("value"=>"false","desc"=>"Disabled")),"quote"=>"2","desc"=>"Websockets Enabled."),
		"userbox_mode"=>array("value"=>"0","type"=>"radio2","ops"=>array(array("value"=>"0","desc"=>"Click to open user dialog"),array("value"=>"1","desc"=>"Hover to open user dialog")),"quote"=>"0","desc"=>"User dialog box mode."),
		"zindex_base"=>array("value"=>"20477","type"=>"text","quote"=>"0","sz"=>"20","desc"=>"z-index base."),
		"updates"=>array("value"=>"","type"=>"hidden")
	);
}

?>