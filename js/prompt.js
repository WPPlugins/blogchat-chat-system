
/*
 * User Prompt
 */

//Prompt functions
jGo.fcchat_toolbar.prompt = {};

//Style template
jGo.fcchat_toolbar.prompt.style={
	dialog_box:{
		width:330,
		left_shift:110,
		height:85,
		bubble:{
			css:jGo.fcchat_toolbar.style.css+";margin:12px;",
			triangle_color:jGo.util.extractFromCSSString("triangle-color",jGo.fcchat_toolbar.style.css),
			text:jGo.fcchat_toolbar.style.text+";font-size:12px",
			link_text:jGo.fcchat_toolbar.style.toolbar_item.text.link_css+";font-size:12px",
			hide_icon:{
				css:jGo.fcchat_toolbar.style.icon_tray.hide_icon.css+";font-size:14px;"
			}
		}
	}
};

(function () {
	var jQ = jGo.$;
	var z_b = jGo.config.max_z_index;
	var basedir = FCChatConfig.dir;
	var rendered=0;
	var config =jGo.fcchat_toolbar.prompt.style;
	
	function EN(value) {
        var n = parseInt(value);
        return(n == null || isNaN(n) ? 0: n);
    };
   
	jGo.fcchat_toolbar.prompt.create = function() {return create_menu_item();};
	jGo.fcchat_toolbar.prompt.create_dialogs = function() {return create_dialog();};
	jGo.fcchat_toolbar.prompt.render_promo = function(username) {return render_promo(username);};
	jGo.fcchat_toolbar.prompt.append_dialogs = function(content) {return append_dialog(content);};
	jGo.fcchat_toolbar.prompt.tgl_dialog = function() {return tgl_dialog();};
	
	var create_menu_item = function(){
	};
	var create_dialog = function(){
		  config.dialog_box.width+=fc_chat.textSetter(0,0,'promo_width_offset');
		  dialog= "<div class='jGo_app jGo_myapp jGo_dialog ' id='fc_prompt_dialog' style='border:0px solid black;display: none;visibility: visible;width:"+config.dialog_box.width+"px;top: 113px; left:210px; z-index:" + (z_b) + ";overflow:hidden;'>" +
		  		  "<div class='fc_prompt_cont fc-triangle-right"+(FCChatConfig.toolbar_position.substr(0,1)=='t'?' top':'')+"' style='"+config.dialog_box.bubble.css+"'>" +
		  		  "<div id='fc_prompt_content' style='"+config.dialog_box.bubble.text+"'></div>"+ 
		  		  "</div>"+
		  	      "</div>";
			return dialog;
	};
	var render_promo = function(username){
		if(rendered==0){
			var content="<div style='position:relative;top:0px;float:right;'><a style='"+config.dialog_box.bubble.hide_icon.css+"' HREF='javascript:void' onclick='fc_chat.promo_close();return false;'>x</a>&nbsp;&nbsp;</div>"+fc_chat.textSetter(364,'Hi, your chat name is ')+username+".<br><a style='"+config.dialog_box.bubble.link_text+"' href='javascript:fc_chat.promo_change_name()'>"+fc_chat.textSetter(365,'Create new name')+"</a>&nbsp;&nbsp;<a style='"+config.dialog_box.bubble.link_text+"' href='javascript:void()' onclick='fc_chat.promo_close();return false;'>"+fc_chat.textSetter(366,'No thanks')+"</a>";
			jQ("#fc_prompt_content").html(content);
			rendered=1;
		}
	};
	var append_dialog = function(content){
		jQ(document.body).append(content);
	};
	var tgl_dialog = function(){
		jGo.fcchat_toolbar.control.toggle_dialog(jQ("#fc_prompt_dialog"),position_dialog,null,2000)
	};
	var position_dialog = function(){
		jGo.fcchat_toolbar.control.position_dialog(jQ("#fc_prompt_dialog"),jGo.fcchat_toolbar.control.getCurrentWidth()-(FCChatConfig.toolbar_position.indexOf('left')!=-1?config.dialog_box.left_shift:0),config.dialog_box.width,config.dialog_box.height)
	};
})();

//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('prompt.js');