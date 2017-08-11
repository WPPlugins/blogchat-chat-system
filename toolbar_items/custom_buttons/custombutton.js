
/*
 * Custom Button
 */

jGo.fcchat_toolbar.custombutton = function(id,s){

	var action_url = "./";
	var jQ = jGo.$;
	var z_b = jGo.config.max_z_index - 100;
	var rendered=0;
	//WP Search style template
    this.style={
    	menu_item:{
    		text:"",
    		icon:"",
    		icon_css:"",
    		text_css:"",
    		padding_left:10,
    		padding_top:jGo.fcchat_toolbar.style.toolbar_item.chatcenter_layout.info_box.padding_top
    	},
    	dialog_box:{
    		css:jGo.fcchat_toolbar.style.dialog_box.css,
    		title_box_css:jGo.fcchat_toolbar.style.dialog_box.title_box_css,
    		info_box_css:"top:40px;left:0px;",
    		content_height:260,
    		text:jGo.fcchat_toolbar.style.dialog_box.text
    	}
    };
    jGo.$.extend(true,this.style,s);
	var config =this.style;
	if(s.dialog_box){
		config.dialog_box.info_box_css+=";height:"+(s.dialog_box.height-40)+"px;";
		config.dialog_box.content_height=(s.dialog_box.height-40);
	};
	function EN(value) {
        var n = parseInt(value);
        return(n == null || isNaN(n) ? 0: n);
    };
    
    var create_menu_item = function(){
  	  return"<div class='fc_custombutton"+id+"_button' style='position: absolute;width:"+config.menu_item.width+"px;top:0px;left:0px;'>" +
  				//"<div class='fc_abbtn' >" +
  					"<a style='text-decoration:none;' "+(config.menu_item.newtab?"target=_blank":"")+" title='"+config.menu_item.text+"' href=\""+(config.menu_item.href?config.menu_item.href:"javascript:jGo.fcchat_toolbar.custombutton"+id+".tgl_dialog()")+"\" onclick=\""+(config.menu_item.onclick||"")+"\">" +
  						(config.menu_item.icon!=''?"<img style='display:block;position:absolute;top:"+ (jGo.fcchat_toolbar.style.icons_16px.top) + "px; left: "+config.menu_item.padding_left+"px;width:16px;height:16px;"+config.menu_item.icon_css+"' src='"+config.menu_item.icon+"'>":"") +
  						"<div id='jGo_custombutton"+id+"_txt_inner' style='text-decoration:none;position:absolute;top:0px;left:"+(config.menu_item.icon!=''?31:10)+"px;width:"+(config.menu_item.width-(config.menu_item.icon!=''?28:7))+"px;padding-top:"+(config.menu_item.padding_top+fc_chat.get_ie_offset())+"px;"+jGo.fcchat_toolbar.style.text+";"+config.menu_item.text_css+";'>" +config.menu_item.text+ "</div>" +
  					"</a>" +
  				//"</div>" +
  			"</div>";
  	};
  	var create_dialog = function(){
  		  dialog= "<div class='jGo_app jGo_myapp jGo_dialog' id='fc_custombutton"+id+"_dialog' style='position:absolute;display: none;visibility: visible;"+config.dialog_box.css+";text-align:left;height:"+config.dialog_box.height+"px;width:"+config.dialog_box.width+"px;top: 113px; left:210px; z-index:" + z_b + ";overflow:hidden;'>" +
  			"<div id='fc_custombutton"+id+"_dialog_title' style='position:absolute;width:"+config.dialog_box.width+"px;"+config.dialog_box.title_box_css+";overflow:hidden'><div style='padding:4px;'><span style='"+config.dialog_box.text.title_css+"'>"+config.dialog_box.title+"</span>&nbsp;&nbsp;&nbsp;<a style='"+config.dialog_box.text.link_css+"' href='javascript:jGo.fcchat_toolbar.custombutton"+id+".tgl_dialog()'>"+fc_chat.textSetter(358,'Close')+"</a></div></div>" +
  			"<div  id='fc_view_custombutton"+id+"_dialog' style='position:absolute;width:"+config.dialog_box.width+"px;"+config.dialog_box.info_box_css+";overflow:hidden'>&nbsp;&nbsp;"+fc_chat.textSetter(293,'Please wait...')+"</div></div>";
  			return dialog;
  	};
  	var render_dialog_content = function(){
  		if(rendered==0){
  			var content="<iframe onload='this.style.visibility=\"visible\";document.getElementById(\"fc_view_custombuttonbackground"+id+"_dialog\").style.display=\"none\";' src='"+config.dialog_box.iframe_src+"' frameborder=0 style='visibility:hidden;width:"+config.dialog_box.width+"px;height:"+config.dialog_box.content_height+"px'></iframe><div id='fc_view_custombuttonbackground"+id+"_dialog' style='position:absolute;top:10px;left:10px;'>&nbsp;&nbsp;"+fc_chat.textSetter(293,'Please wait...')+"</div>";
  			jQ("#fc_view_custombutton"+id+"_dialog").html(content);
  			rendered=1;
  		}
  	};
  	var append_dialog = function(content){
  		jQ(document.body).append(content);
  	};
  	var tgl_dialog = function(){
  		jGo.fcchat_toolbar.control.toggle_dialog(jQ("#fc_custombutton"+id+"_dialog"),position_dialog,render_dialog_content,200)
  	};
  	var position_dialog = function(){
  		jGo.fcchat_toolbar.control.position_dialog(jQ("#fc_custombutton"+id+"_dialog"),EN(jQ("#fc_custombutton"+id+"_toolbar_item").css("left")),config.dialog_box.width,config.dialog_box.height)
  	};
   
	this.create = function()    {return create_menu_item();};
	this.create_dialogs = function()    {return create_dialog();};
	this.append_dialogs = function(content)    {return append_dialog(content);};
	this.tgl_dialog = function()    {return tgl_dialog();};
	
	

};

//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('custombutton.js');