
/*
 * FCChat Blogchat Embed
 *
 * Copyright (c) 2014 Robert Beach (fastcatsoftware.com)
 *
 * Date: 2014-07-15
 */

function fcchat(){
    // config ref
    var config = FCChatConfig;

    this.init = function(){
        jGo.$("#" + config.chatbox.embed.tag_id)[(config.chatbox.embed.before?'before':'after')]("<div style='" + config.chatbox.css.container_spacing + ";background-color:transparent;width:" +
        	(jGo.blogdim.width+2*config.chatbox.css.horizontal_alignment) + "px;'><h2 style='"+config.chatbox.css.label+"'>"+config.chatbox.label_txt+"</h2><div style='background-color:transparent;" +
        	config.chatbox.css.container_css + ";padding:"+config.chatbox.css.padding+";'>" +
        	"<iframe id='fc_bc_iframe' frameborder='0' height='" + jGo.blogdim.height + "px' width='" +
        	jGo.blogdim.width + "px' scrolling='no'src='" + config.dir + "html/chat/blogchat.html?embed=true&room_offset=60' align='center' scrolling='none'; style='width:" + jGo.blogdim.width + "px;'> </iframe></div></div>");
    };
};

//Initialize Blogchat
fcchat.prototype = jGo.UI;
var fc_blogchat= new fcchat();
fc_blogchat.init();
