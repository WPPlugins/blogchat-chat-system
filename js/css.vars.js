(function (){
	var fc_tb = FCChatConfig.styles.widget;
	var fc_tb_btn = fc_tb.control.buttons;
	var fc_tb_ab = fc_tb.control.info_box;
	var fc_tb_nm = fc_tb.new_messages_box;
	var fc_tb_f = fc_tb.friends_box;
	var fc_fr_tb = jGo.fcchat_toolbar.style;
	var fc_tb_pl = fc_fr_tb.toolbar_item;
	var fc_pl_btn = fc_fr_tb.toolbar_item.buttons;
	var fc_promo  = (jGo.fcchat_toolbar.prompt?jGo.fcchat_toolbar.prompt.style.dialog_box.bubble.triangle_color:'');
	var fc_cw_mp_cp = FCChatConfig.styles.chat_window.main_panel.chat_panels;
	var fc_cw_mp_sp = FCChatConfig.styles.chat_window.main_panel.side_panels;
	var fc_cwtmc=fc_cw_mp_cp.font.color.default_text_color;
	var fc_cwsnc=fc_cw_mp_cp.font.screen_name_states;
	var fc_spsnc=fc_cw_mp_sp.font.screen_name_states;
	var fc_df=FCChatConfig.default_font;
	var fc_sc_css=FCChatConfig.styles.chat_window.main_panel.send_chat_panel.css;
	var fc_uc_css=FCChatConfig.styles.chat_window.main_panel.user_pop_up_panel.send_chat_panel.css;
	var fc_o_btn = FCChatConfig.styles.chat_window.main_panel.other_buttons;
	var fc_sr_btn = FCChatConfig.styles.chat_window.main_panel.send_to_room_button;
	var fc_sp_btn = FCChatConfig.styles.chat_window.main_panel.send_private_button;
	var fc_usp_btn = FCChatConfig.styles.chat_window.main_panel.user_pop_up_panel.send_private_button;
	var fc_op_btn = FCChatConfig.styles.chat_window.main_panel.options_panel.buttons;
	var fc_widgets = FCChatConfig.styles.chat_window.main_panel.widgets.border;
	var fc_uwidgets = FCChatConfig.styles.chat_window.main_panel.user_pop_up_panel.widgets.border;
	var fc_triangle2 = FCChatConfig.styles.chat_window.main_panel.options_panel.infobox.triangle_color;
	var fc_triangle3 = FCChatConfig.styles.chat_window.main_panel.chat_panels.chat_room_panel.infobox.triangle_color;
	
	var fc_rule = "#jGo_app.jGo_myapp ";
	var fc_rule2 = ".jGo_app.jGo_myapp ";
	
	
	jGo.fcchat_toolbar.getDynamicStyles = function(){
		var check = document.createElement('div');
		var shadow = !!(0 + check.style['WebkitBoxShadow']);
		if(!shadow)shadow = !!(0 + check.style['boxShadow']);
		if(!shadow){
			jGo.fcchat_toolbar.style.css+=jGo.fcchat_toolbar.style.alt_css;
		}
		var left = (FCChatConfig.toolbar_position.indexOf('left')!=-1);
		
		var firstPart = "" +
		//Chat panels
		fc_rule +"*.fc_d1, "+fc_rule2+"*.fc_d1{-moz-overflow-scrolling: touch;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;}" +
		fc_rule +"*.fc_d1, "+fc_rule2+"*.fc_d1{font-family:"+fc_cw_mp_cp.font.family+";font-size:"+fc_cw_mp_cp.font.size+"pt;font-weight:"+fc_cw_mp_cp.font.weight+";color:"+fc_cwtmc+";}"+
		fc_rule+"*.fc_d1 *, "+fc_rule2+"*.fc_d1 *{font-family:"+fc_cw_mp_cp.font.family+";font-size:"+fc_cw_mp_cp.font.size+"pt;font-weight:"+fc_cw_mp_cp.font.weight+";color:"+fc_cwtmc+";}"+
		fc_rule+"*.fc_d1 div, "+fc_rule2+"*.fc_d1 div{border:0px;}"+
		fc_rule+"*.fc_d1 a, "+fc_rule2+"*.fc_d1 a{color:"+fc_cw_mp_cp.font.color.link_color+"}"+
		fc_rule+"*.fc_d1 span, "+fc_rule2+"*.fc_d1 span{color:"+fc_cwsnc.online.link+"}" +
		fc_rule+"*.fc_d1 small a, "+fc_rule2+"*.fc_d1 small a{font-size:"+(fc_cw_mp_cp.font.size+1)+"pt;}" +
		fc_rule+"*.fc_d1 i.fc_aside, "+fc_rule2+"*.fc_d1 i.fc_aside{font-size:"+(fc_cw_mp_cp.font.timestamp_size)+"pt;}" +
		
		//Side panels
		fc_rule +"*.fc_d2, "+fc_rule2+"*.fc_d2{-moz-overflow-scrolling: touch;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;}" +
		fc_rule+"*.fc_d2, "+fc_rule2+"*.fc_d2{font-family:"+fc_cw_mp_sp.font.family+";font-size:"+fc_cw_mp_sp.font.size+"pt;font-weight:"+fc_cw_mp_sp.font.weight+";color:black;}"+
		fc_rule+"*.fc_d2 *, "+fc_rule2+"*.fc_d2 *{font-family:"+fc_cw_mp_sp.font.family+";font-size:"+fc_cw_mp_sp.font.size+"pt;font-weight:"+fc_cw_mp_sp.font.weight+";}"+
		fc_rule+"*.fc_d2 small a, "+fc_rule2+"*.fc_d2 small a{font-size:"+(fc_cw_mp_sp.font.size+1)+"pt;}"+
		
		//Options panel
		fc_rule +"*.fc_d3, "+fc_rule2+"*.fc_d3{-moz-overflow-scrolling: touch;-webkit-overflow-scrolling: touch;overflow-scrolling: touch;}" +
		fc_rule+"*.fc_d3, "+fc_rule2+"*.fc_d3{font-family:arial;font-size:7pt;color:black;}"+
		fc_rule+"*.fc_d3 *, "+fc_rule2+"*.fc_d3 *{font-family:arial;font-size:7pt;}"+
		
		//Embedded widget
		fc_rule+"*.fc_d4, "+fc_rule2+"*.fc_d4{"+fc_tb_ab.css+"}"+
		fc_rule+"*.fc_d4 *, "+fc_rule2+"*.fc_d4 *{"+fc_tb_ab.text.css+"}"+
		fc_rule+"*.fc_d4 div.fc_t1 a, "+fc_rule2+"*.fc_d4 div.fc_t1 a{"+fc_tb_ab.text.link_css+"}"+
		fc_rule+"*.fc_d4 a.fc_link, "+fc_rule2+"*.fc_d4 a.fc_link{"+fc_tb_ab.text.link_css+"}"+
		fc_rule+"*.fc_d4 span.fc_alert_text, "+fc_rule2+"*.fc_d4 span.fc_alert_text{"+fc_tb_ab.text.alert_css+"}"+
		fc_rule+"*.fc_d4 span.fc_info_text, "+fc_rule2+"*.fc_d4 span.fc_info_text{"+fc_tb_ab.text.info_css+"}"+
		
		//Toolbar
		//fc_rule+"*.fc_d5, "+fc_rule2+"*.fc_d5{"+fc_fr_tb.text_size+"}"+
		fc_rule+"*.fc_d5 *, "+fc_rule2+"*.fc_d5 *{"+fc_tb_pl.text.css+"}"+
		fc_rule+"*.fc_d5 a.fc_link, "+fc_rule2+"*.fc_d5 a.fc_link{"+fc_tb_pl.text.link_css+"}"+
		fc_rule+"*.fc_d5 span.fc_alert_text, "+fc_rule2+"*.fc_d5 span.fc_alert_text{"+fc_tb_pl.text.alert_css+"}"+
		fc_rule+"*.fc_d5 span.fc_info_text, "+fc_rule2+"*.fc_d5 span.fc_info_text{"+fc_tb_pl.text.info_css+"}"+
		
		//New Message box
		fc_rule+"*.fc_d6 *, "+fc_rule2+"*.fc_d6 *{"+fc_tb_nm.text.css+"}"+
		
		//Friends box
		fc_rule+"*.fc_d7 *, "+fc_rule2+"*.fc_d7 *{"+fc_tb_f.text.css+"}"+
		
		//Chat box
		".jGo_app.jGo_myapp.jGo_em{"+fc_fr_tb.text_size+"}"+
		".jGo_app.jGo_myapp.jGo_em *{font-size:1em;}"+
		
		//Widgets border
		fc_rule+"*.fc_cborder a, "+fc_rule2+"*.fc_cborder a{"+fc_widgets.link_css+"}" +
		fc_rule+"*.fc_cborder a:link, "+fc_rule2+"*.fc_cborder a:link{}" +
		fc_rule+"*.fc_cborder a:visited, "+fc_rule2+"*.fc_cborder a:visited{}" +
		fc_rule+"*.fc_cborder a:hover, "+fc_rule2+"*.fc_cborder a:hover{"+fc_widgets.hover_css+"}" +
		fc_rule+"*.fc_cborder a.fc_cborder_dis:hover, "+fc_rule2+"*.fc_cborder a.fc_cborder_dis:hover{"+fc_widgets.link_css+"}" +
		
		//User box widgets border
		fc_rule+"*.fc_ucborder a, "+fc_rule2+"*.fc_ucborder a{"+fc_uwidgets.link_css+"}" +
		fc_rule+"*.fc_ucborder a:link, "+fc_rule2+"*.fc_ucborder a:link{}" +
		fc_rule+"*.fc_ucborder a:visited, "+fc_rule2+"*.fc_ucborder a:visited{}" +
		fc_rule+"*.fc_ucborder a:hover, "+fc_rule2+"*.fc_ucborder a:hover{"+fc_uwidgets.hover_css+"}" +
		fc_rule+"*.fc_ucborder a.fc_ucborder_dis:hover, "+fc_rule2+"*.fc_ucborder a.fc_ucborder_dis:hover{"+fc_uwidgets.link_css+"}" +
		
		
		//alert box buttons
		fc_rule+"div.fc_controlbox *.fc_abbtn a, "+fc_rule2+"div.fc_controlbox *.fc_abbtn a{"+fc_tb_btn.default_css+";}" +
		fc_rule+"div.fc_controlbox *.fc_abbtn a:link, "+fc_rule2+"div.fc_controlbox *.fc_abbtn a:link{"+fc_tb_btn.states.link_css+"}" +
		fc_rule+"div.fc_controlbox *.fc_abbtn a:visited, "+fc_rule2+"div.fc_controlbox *.fc_abbtn a:visited{"+fc_tb_btn.states.link_css+"}" +
		fc_rule+"div.fc_controlbox *.fc_abbtn a:hover, "+fc_rule2+"div.fc_controlbox *.fc_abbtn a:hover{"+fc_tb_btn.states.hover_css+"}" +
		fc_rule+"div.fc_controlbox *.fc_abbtn_dis a, "+fc_rule2+"div.fc_controlbox *.fc_abbtn_dis a{"+fc_tb_btn.default_css+"}" +
		fc_rule+"div.fc_controlbox *.fc_abbtn_dis a.fc_abbtn_disa, "+fc_rule2+"div.fc_controlbox *.fc_abbtn_dis a.fc_abbtn_disa{"+fc_tb_btn.states.disabled_css+";cursor:default;}" +
		
		//toolbar buttons
		fc_rule+"div.fc_toolbar *.fc_abbtn a, "+fc_rule2+"div.fc_toolbar *.fc_abbtn a{"+fc_pl_btn.default_css+"}" +
		fc_rule+"div.fc_toolbar *.fc_abbtn a:link, "+fc_rule2+"div.fc_toolbar *.fc_abbtn a:link{"+fc_pl_btn.states.link_css+"}" +
		fc_rule+"div.fc_toolbar *.fc_abbtn a:visited, "+fc_rule2+"div.fc_toolbar *.fc_abbtn a:visited{"+fc_pl_btn.states.link_css+"}" +
		fc_rule+"div.fc_toolbar *.fc_abbtn a:hover, "+fc_rule2+"div.fc_toolbar *.fc_abbtn a:hover{"+fc_pl_btn.states.hover_css+"}" +
		fc_rule+"div.fc_toolbar *.fc_abbtn_dis a, "+fc_rule2+"div.fc_toolbar *.fc_abbtn_dis a{"+fc_pl_btn.default_css+"}" +
		fc_rule+"div.fc_toolbar *.fc_abbtn_dis a.fc_abbtn_disa, "+fc_rule2+"div.fc_toolbar *.fc_abbtn_dis a.fc_abbtn_disa{"+fc_pl_btn.states.disabled_css+";cursor:default;}" +
		fc_rule+"div.fc_toolbar *.fc_abbtn_dis span.fc_abbtn_disa, "+fc_rule2+"div.fc_toolbar *.fc_abbtn_dis span.fc_abbtn_disa{"+fc_pl_btn.states.disabled_css+";cursor:default;}" +
		
		//options buttons
		fc_rule+"div.fc_obtn a, "+fc_rule2+"div.fc_obtn a{"+fc_o_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_obtn a:link, "+fc_rule2+"div.fc_obtn a:link{"+fc_o_btn.states.link_css+"}" +
		fc_rule+"div.fc_obtn a:visited, "+fc_rule2+"div.fc_obtn a:visited{"+fc_o_btn.states.link_css+"}" +
		fc_rule+"div.fc_obtn a:hover, "+fc_rule2+"div.fc_obtn a:hover{"+fc_o_btn.states.hover_css+"}" +
		fc_rule+"div.fc_obtn_dis a, "+fc_rule2+"div.fc_obtn_dis a{"+fc_o_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_obtn_dis a.fc_obtn_disa, "+fc_rule2+"div.fc_obtn_dis a.fc_obtn_disa{"+fc_o_btn.states.disabled_css+";cursor:default;}" +
		
		//send to room button
		fc_rule+"div.fc_srbtn a, "+fc_rule2+"div.fc_srbtn a{"+fc_sr_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_srbtn a:link, "+fc_rule2+"div.fc_srbtn a:link{"+fc_sr_btn.states.link_css+"}" +
		fc_rule+"div.fc_srbtn a:visited, "+fc_rule2+"div.fc_srbtn a:visited{"+fc_sr_btn.states.link_css+"}" +
		fc_rule+"div.fc_srbtn a:hover, "+fc_rule2+"div.fc_srbtn a:hover{"+fc_sr_btn.states.hover_css+"}" +
		fc_rule+"div.fc_srbtn_dis a, "+fc_rule2+"div.fc_srbtn_dis a{"+fc_sr_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_srbtn_dis a.fc_srbtn_disa, "+fc_rule2+"div.fc_srbtn_dis a.fc_srbtn_disa{"+fc_sr_btn.states.disabled_css+";cursor:default;}" +
		
		//send private button
		fc_rule+"div.fc_spbtn a, "+fc_rule2+"div.fc_spbtn a{"+fc_sp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_spbtn a:link, "+fc_rule2+"div.fc_spbtn a:link{"+fc_sp_btn.states.link_css+"}" +
		fc_rule+"div.fc_spbtn a:visited, "+fc_rule2+"div.fc_spbtn a:visited{"+fc_sp_btn.states.link_css+"}" +
		fc_rule+"div.fc_spbtn a:hover, "+fc_rule2+"div.fc_spbtn a:hover{"+fc_sp_btn.states.hover_css+"}" +
		fc_rule+"div.fc_spbtn_dis a, "+fc_rule2+"div.fc_spbtn_dis a{"+fc_sp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_spbtn_dis a.fc_spbtn_disa, "+fc_rule2+"div.fc_spbtn_dis a.fc_spbtn_disa{"+fc_sp_btn.states.disabled_css+";cursor:default;}" +
		
		//send private user box button
		fc_rule+"div.fc_uspbtn a, "+fc_rule2+"div.fc_uspbtn a{"+fc_usp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_uspbtn a:link, "+fc_rule2+"div.fc_uspbtn a:link{"+fc_usp_btn.states.link_css+"}" +
		fc_rule+"div.fc_uspbtn a:visited, "+fc_rule2+"div.fc_uspbtn a:visited{"+fc_usp_btn.states.link_css+"}" +
		fc_rule+"div.fc_uspbtn a:hover, "+fc_rule2+"div.fc_uspbtn a:hover{"+fc_usp_btn.states.hover_css+"}" +
		fc_rule+"div.fc_uspbtn_dis a, "+fc_rule2+"div.fc_uspbtn_dis a{"+fc_usp_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_uspbtn_dis a.fc_uspbtn_disa, "+fc_rule2+"div.fc_uspbtn_dis a.fc_uspbtn_disa{"+fc_usp_btn.states.disabled_css+";cursor:default;}" +
		
		//options buttons
		fc_rule+"div.fc_opbtn a, "+fc_rule2+"div.fc_opbtn a{"+fc_op_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_opbtn a:link, "+fc_rule2+"div.fc_opbtn a:link{"+fc_op_btn.states.link_css+"}" +
		fc_rule+"div.fc_opbtn a:visited, "+fc_rule2+"div.fc_opbtn a:visited{"+fc_op_btn.states.link_css+"}" +
		fc_rule+"div.fc_opbtn a:hover, "+fc_rule2+"div.fc_opbtn a:hover{"+fc_op_btn.states.hover_css+"}" +
		fc_rule+"div.fc_opbtn_dis a, "+fc_rule2+"div.fc_opbtn_dis a{"+fc_op_btn.default_css+";display:block;float:left;margin:0 5px 0 0;text-align:center;text-decoration:none;}" +
		fc_rule+"div.fc_opbtn_dis a.fc_opbtn_disa, "+fc_rule2+"div.fc_opbtn_dis a.fc_opbtn_disa{"+fc_op_btn.states.disabled_css+";cursor:default;}";
	
		var secondPart = firstPart +
		
		//non box-shadow model
		(!shadow?
				".jGo_app.jGo_myapp.fc_tldialog {"+fc_fr_tb.dialog_box.alt_css+"}" +
				".jGo_app.jGo_myapp.jGo_dialog {"+fc_fr_tb.dialog_box.alt_css+"}" +
				".jGo_app.jGo_myapp.jGo_dialog div.fc_prompt_cont{"+fc_fr_tb.alt_css+"}"
		:"") +
		
		//promo
		fc_rule +"*.fc-triangle-right, "+fc_rule2+"*.fc-triangle-right {position:relative;padding:15px;}"+
		fc_rule +"*.fc-triangle-right:after, "+fc_rule2+"*.fc-triangle-right:after {content:'';position:absolute;bottom:-10px;left:"+(left?50:190)+"px;border-width:10px 0 0 10px;border-style:solid;border-color:"+fc_promo+" transparent;display:block;width:0;}"+
		
		fc_rule +"*.fc-triangle-right.top, "+fc_rule2+"*.fc-triangle-right.top {position:relative;margin-top:10px;}"+
		fc_rule +"*.fc-triangle-right.top:after, "+fc_rule2+"*.fc-triangle-right.top:after {top:-10px;right:"+(left?250:50)+"px;bottom:auto;left:auto;border-width:10px 10px 0 0;border-color:transparent "+fc_promo+"}"+
		
		fc_rule +"*.fc-triangle-right2, "+fc_rule2+"*.fc-triangle-right2 {position:relative;padding:5px;}"+
		fc_rule +"*.fc-triangle-right2:after, "+fc_rule2+"*.fc-triangle-right2:after {content:'';position:absolute;bottom:-19px;left:190px;border-width:15px 0 0 15px;border-style:solid;border-color:"+fc_triangle2+" transparent;display:block;width:0;}"+
		
		fc_rule +"*.fc-triangle-right3, "+fc_rule2+"*.fc-triangle-right3 {position:relative;padding:5px;}"+
		
		fc_rule +"*.fc-triangle-right3:after, "+fc_rule2+"*.fc-triangle-right3:after {content:'';position:absolute;top:10px;left:-22px;border-width:0px 19px 10px 0;border-style:solid;border-color:transparent "+fc_triangle3+";display:block;width:0;}"+
		
		//fc_rule+"*.fc_a1:link, "+fc_rule2+"*.fc_a1:link{font-size:"+fc_cwfs+"pt;}"+
		//fc_rule+"*.fc_a1:visited, "+fc_rule2+"*.fc_a1:visited{font-size:"+fc_cwfs+"pt;}"+
		//fc_rule+"*.fc_a1:hover, "+fc_rule2+"*.fc_a1:hover{font-size:"+fc_cwfs+"pt;}"+
		fc_rule+"*.fc_online, "+fc_rule2+"*.fc_online{height:.5em;width:.5em}"+
		fc_rule+"*.fc_online2, "+fc_rule2+"*.fc_online2{height:.6em;width:.6em}"+
		fc_rule+"*.fc_onlinesp, "+fc_rule2+"*.fc_onlinesp{height:6px;width:6px}"+
		fc_rule+"*.fc_onlinesp2, "+fc_rule2+"*.fc_onlinesp2{height:8px;width:8px}"+
		
		
		//fc_rule+"*.fc_a2:link, "+fc_rule2+"*.fc_a2:link{font-family:"+fc_df+";font-size:"+fc_spfs+"pt;}"+
		//fc_rule+"*.fc_a2:visited, "+fc_rule2+"*.fc_a2:visited{font-family:"+fc_df+";font-size:"+fc_spfs+"pt;}"+
		//fc_rule+"*.fc_a2:hover, "+fc_rule2+"*.fc_a2:hover{font-family:"+fc_df+";font-size:"+fc_spfs+"pt;}"+
		
		//Side panel offline screen names
		fc_rule+"*.fc_u:link, "+fc_rule2+"*.fc_u:link{"+fc_spsnc.offline.link_css+"}"+
		fc_rule+"*.fc_u:visited, "+fc_rule2+"*.fc_u:visited{"+fc_spsnc.offline.visited_css+"}"+
		fc_rule+"*.fc_u:hover, "+fc_rule2+"*.fc_u:hover{"+fc_spsnc.offline.hover_css+"}"+
		
		//Side panel online screen naes
		fc_rule+"*.fc_uo:link, "+fc_rule2+"*.fc_uo:link{"+fc_spsnc.online.link_css+"}"+
		fc_rule+"*.fc_uo:visited, "+fc_rule2+"*.fc_uo:visited{"+fc_spsnc.online.visited_css+"}"+
		fc_rule+"*.fc_uo:hover, "+fc_rule2+"*.fc_uo:hover{"+fc_spsnc.online.hover_css+"}"+
		
		//Chat window screen names offline
		fc_rule+"*.fc_u2:link, "+fc_rule2+"*.fc_u2:link{"+fc_cwsnc.offline.link_css+"}"+
		fc_rule+"*.fc_u2:visited, "+fc_rule2+"*.fc_u2:visited{"+fc_cwsnc.offline.visited_css+"}"+
		fc_rule+"*.fc_u2:hover, "+fc_rule2+"*.fc_u2:hover{"+fc_cwsnc.offline.hover_css+"}"+
		
		//chat window screen names online
		fc_rule+"*.fc_uo2:link, "+fc_rule2+"*.fc_uo2:link{"+fc_cwsnc.online.link_css+"}"+
		fc_rule+"*.fc_uo2:visited, "+fc_rule2+"*.fc_uo2:visited{"+fc_cwsnc.online.visited_css+"}"+
		fc_rule+"*.fc_uo2:hover, "+fc_rule2+"*.fc_uo2:hover{"+fc_cwsnc.online.hover_css+"}"+
		
		//Side panel online blocked screen names
		fc_rule+"*.fc_ublk:link, "+fc_rule2+"*.fc_ublk:link{"+fc_spsnc.online.blocked.link_css+"}"+
		fc_rule+"*.fc_ublk:visited, "+fc_rule2+"*.fc_ublk:visited{"+fc_spsnc.online.blocked.visited_css+"}"+
		fc_rule+"*.fc_ublk:hover, "+fc_rule2+"*.fc_ublk:hover{"+fc_spsnc.online.blocked.hover_css+"}"+
		
		//Side panel offline blocked screen names
		fc_rule+"*.fc_ublko:link, "+fc_rule2+"*.fc_ublko:link{"+fc_spsnc.offline.blocked.link_css+"}"+
		fc_rule+"*.fc_ublko:visited, "+fc_rule2+"*.fc_ublko:visited{"+fc_spsnc.offline.blocked.visited_css+"}"+
		fc_rule+"*.fc_ublko:hover, "+fc_rule2+"*.fc_ublko:hover{"+fc_spsnc.offline.blocked.hover_css+"}"+
		
		//Chat window blocked online screen names
		fc_rule+"*.fc_ublk2:link, "+fc_rule2+"*.fc_ublk2:link{"+fc_cwsnc.online.blocked.link_css+"}"+
		fc_rule+"*.fc_ublk2:visited, "+fc_rule2+"*.fc_ublk2:visited{"+fc_cwsnc.online.blocked.visited_css+"}"+
		fc_rule+"*.fc_ublk2:hover, "+fc_rule2+"*.fc_ublk2:hover{"+fc_cwsnc.online.blocked.hover_css+"}"+
		
		//Chat window blocked offline screen names
		fc_rule+"*.fc_ublko2:link, "+fc_rule2+"*.fc_ublko2:link{"+fc_cwsnc.offline.blocked.link_css+"}"+
		fc_rule+"*.fc_ublko2:visited, "+fc_rule2+"*.fc_ublko2:visited{"+fc_cwsnc.offline.blocked.visited_css+"}"+
		fc_rule+"*.fc_ublko2:hover, "+fc_rule2+"*.fc_ublko2:hover{"+fc_cwsnc.offline.blocked.hover_css+"}"+
		
		fc_rule+"*.fc_txt, "+fc_rule2+"*.fc_txt{"+fc_sc_css+";}"+
		fc_rule+"*.fc_table, "+fc_rule2+"*.fc_table{}"+
		fc_rule+"*.fc_table td, "+fc_rule2+"*.fc_table td{font-family:"+fc_df+";font-size:9px;color:black}"+
		fc_rule+"*.fc_table div, "+fc_rule2+"*.fc_table div{font-family:"+fc_df+";font-size:9px;color:black}"+
		fc_rule+"*.fc_table a, "+fc_rule2+"*.fc_table a{font-family:"+fc_df+";font-size:9px;color:blue}"+
		fc_rule+"*.fc_table b, "+fc_rule2+"*.fc_table b{font-family:"+fc_df+";font-size:9px}"+
		fc_rule+"*.fc_table textarea, "+fc_rule2+"*.fc_table textarea{"+fc_uc_css+";width:300;height:50;z-index:302;}";
		return secondPart;
	}
}());