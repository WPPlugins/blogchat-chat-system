/*
 * Social media menu item
 */

jGo.fcchat_toolbar.social_media = {};

//Social media style template
jGo.fcchat_toolbar.social_media.style={
	//media controls which sites are listed and their order of appearance.
	//Each site represented in media must have corresponding sitecode entry below.
	media:["facebook","twitter","google","stumbleupon","linkedin","digg"], 
	menu_item:{
		width:52,
		button:{
			left:10
		}
	},
	dialog_box:{
		width:200,
		height:323,
		css:jGo.fcchat_toolbar.style.dialog_box.css,
		title_box_css:jGo.fcchat_toolbar.style.dialog_box.title_box_css,
		info_box_css:"top:40px;left:0px;height:283px;",
		text:jGo.fcchat_toolbar.style.dialog_box.text
	}
};

//Social media functions
(function () {
	
	var jQ = jGo.$;
	var z_b = jGo.config.max_z_index - 100;
	var basedir = FCChatConfig.dir;
	var rendered=0;
	var sitecode={};
	var config =jGo.fcchat_toolbar.social_media.style;
	var media = config.media;
	var url = encodeURIComponent(window.location.href);
	
	//Facebook
    sitecode.facebook = function(pos){
    	return "<div style='position:absolute;top:3px;left:10px'><b>Facebook</b></div>" +
    	"<iframe onload='this.style.visibility=\"visible\";' src='//www.facebook.com/plugins/like.php?href="+url+"&amp;send=false&amp;layout=button_count&amp;width=130&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21'" +
		"scrolling='no' frameborder='0' style='position:absolute;top:0px;left:70px;border:none; visibility:hidden; overflow:hidden; width:130px; height:21px;' allowTransparency='true'></iframe>";
    };
	//Twitter
    sitecode.twitter = function(pos){
    	return "<div style='position:absolute;top:3px;left:10px'><b>Twitter</b></div>" +
		"<iframe onload='this.style.visibility=\"visible\";' title='Twitter For Websites: Tweet Button' style='position:absolute;visibility:hidden;width:130px;top:0px;left:60px;height: 20px;' class='twitter-share-button' data-count='horizontal' src='https://platform.twitter.com/widgets/tweet_button.html?id=twitter_tweet_button_0&amp;lang=en&amp;related=twitterapi&amp;text=Tweet%20Button' allowtransparency='true' scrolling='no' frameborder='0'></iframe>";
    };
	//Google +1
    sitecode.google = function(pos){
    	return "<div style='position:absolute;top:3px;left:10px'><b>Google</b></div>" +
    			"<div style='position:absolute;top:2px;left:60px;overflow:hidden; width:130px; height:25px;'>"+
    			"<script type='text/javascript' src='https://apis.google.com/js/plusone.js'></script>"+
    			"<g:plusone size='small' annotation='inline' width='130'></g:plusone>"+
				"</div>";

    };
	//StumbleUpon
    sitecode.stumbleupon = function(pos){
    	return "<div style='position:absolute;top:3px;left:10px'><b>StumbleUpon</b></div>" +
    	"<iframe onload='this.style.visibility=\"visible\";' src='"+basedir+"html/su.html?url="+url+"'" +
		"scrolling='no' frameborder='0' style='position:absolute;visibility:hidden;top:-7px;left:85px;border:none; overflow:hidden; width:115px; height:25px;' allowTransparency='true'></iframe>";
    };
	//LinkedIn
    sitecode.linkedin = function(pos){
    	return "<div style='position:absolute;top:3px;left:10px'><b>LinkedIn</b></div>" +
    	"<iframe onload='this.style.visibility=\"visible\";' src='"+basedir+"html/linkedin.html?url="+url+"'" +
		"scrolling='no' frameborder='0' style='position:absolute;visibility:hidden;top:-7px;left:60px;border:none; overflow:hidden; width:130px; height:30px;' allowTransparency='true'></iframe>";
    };
	//Digg
    sitecode.digg = function(pos){
    	return "<div style='position:absolute;top:3px;left:10px'><b>Digg this</b></div>" +
    	"<iframe onload='this.style.visibility=\"visible\";' src='"+basedir+"html/digg.html?url="+url+"'" +
		"scrolling='no' frameborder='0' style='position:absolute;visibility:hidden;top:-7px;left:65px;border:none; overflow:hidden; width:130px; height:30px;' allowTransparency='true'></iframe>";
    };
	
	function EN(value) {
        var n = parseInt(value);
        return(n == null || isNaN(n) ? 0: n);
    };
   
	jGo.fcchat_toolbar.social_media.create = function()    {return create_menu_item();};
	jGo.fcchat_toolbar.social_media.create_dialogs = function()    {return create_dialog();};
	jGo.fcchat_toolbar.social_media.append_dialogs = function(content)    {return append_dialog(content);};
	jGo.fcchat_toolbar.social_media.tgl_dialog = function()    {return tgl_dialog();};
	
	var create_menu_item = function(){
	  return"<div class='fc_share_button' style='position: absolute;width:"+config.menu_item.width+"px;top:"+ (jGo.fcchat_toolbar.style.icons_16px.top) + "px; left: "+config.menu_item.button.left+"px;'>" +
			"<div class='fc_abbtn' ><a title='"+fc_chat.textSetter(343,'Share')+"' href='javascript:jGo.fcchat_toolbar.social_media.tgl_dialog()' ><img src='"+basedir+"current_skin/twitter.png'><img src='"+basedir+"current_skin/facebook.png'>&nbsp;</a></div></div>";
	};
	var create_dialog = function(){
		  dialog= "<div class='jGo_app jGo_myapp jGo_dialog' id='fc_social_media_dialog' style='position:absolute;display: none;visibility: visible;"+config.dialog_box.css+";text-align:left;height:"+config.dialog_box.height+"px;width:"+config.dialog_box.width+"px;top: 113px; left:210px; z-index:" + z_b + ";overflow:hidden;'>" +
			"<div id='fc_social_media_dialog_title' style='position:absolute;width:"+config.dialog_box.width+"px;"+config.dialog_box.title_box_css+";overflow:hidden'><div style='padding:4px;'><span style='"+config.dialog_box.text.title_css+"'>"+fc_chat.textSetter(343,'Share')+"</span>&nbsp;&nbsp;&nbsp;<a style='"+config.dialog_box.text.link_css+"' href='javascript:jGo.fcchat_toolbar.social_media.tgl_dialog()'>"+fc_chat.textSetter(360,'Close')+"</a></div></div>" +
			"<div  id='fc_view_social_media_dialog' style='position:absolute;width:"+config.dialog_box.width+"px;"+config.dialog_box.info_box_css+";overflow:auto'></div></div>";
			return dialog;
	};
	var render_dialog_content = function(){
		if(rendered==0){
			var content="<div style='padding:3px;overflow:auto;"+config.dialog_box.text.css+";line-height:120%'>&nbsp;"+fc_chat.textSetter(344,'Share this site with others')+":<br>";
			var n=1;
			for (var site in media) {
		    	if(media.hasOwnProperty(site)){
		    		content+="<div style='position:absolute;top:"+(n*30)+"px;left:0px;width:200px;height:30px'>" + sitecode[media[site]]() + "</div>";
		    		n++;
		    	}
		    }
			jQ("#fc_view_social_media_dialog").html(content);
			rendered=1;
		}
	};
	var append_dialog = function(content){
		jQ(document.body).append(content);
	};
	var tgl_dialog = function(){
		jGo.fcchat_toolbar.control.toggle_dialog(jQ("#fc_social_media_dialog"),position_dialog,render_dialog_content,200);
	};
	var position_dialog = function(){
		jGo.fcchat_toolbar.control.position_dialog(jQ("#fc_social_media_dialog"),EN(jQ("#fc_social_media_toolbar_item").css("left")),config.dialog_box.width,config.dialog_box.height)
	};

})();

//Class Initialization
if(jGo.scripts)jGo.scripts.onLoad('social_media.js');