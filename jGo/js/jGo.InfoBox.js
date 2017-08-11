/*
* InfoBox Class
* a simple information box
*/
(function() {

var $ = jGo.$;

jGo.InfoBox = function() {
	jGo.Control.apply(this, arguments);
    this.type = 'InfoBox';

    this.parent;
    this.frame;
    this.style;
    this.debug="DEBUG";
    this.fixed=false;
    this.fadeInt=200;
    this.fadeTimer=10000;
    this.fadeTimeout;
    this.menuController;
    
    this.getDefault = function() {
        return jGo.InfoBox.prototype;
    };

    this.err = function() {
        alert("Method not found.");
    };
};

jGo.InfoBox.prototype = new jGo.Control();

var proto = jGo.InfoBox.prototype;

//Create it
/*
 *  id - id of the element
 *  args user passed arguments
 *  	args[0] = the parent element
 *  	args[1] = the style object should have a css prop
 *  	args[2] = fixed or not
 *      args[3] = fade interval
 *      args[4] = fade timeout
 *  	args[3] = connect to menu control
 */
proto.create = function(id, args){
    this.parent=args[0];
	var s = this.style = $.extend({},args[1]);
    this.fixed=(args[2]!=null?args[2]:true);
    this.fadeInt=args[3] || 200;
    this.fadeTimer=(args[4]!=null?args[4]:10000);
    var menucontrol = (args[5]!=null?args[5]:true);
	var outerClass = 'jGo_app jGo_myapp jGo_em infobox'+id;
	this.frame=$('<div></div>').addClass(outerClass).attr('id', 'jGo_infoboxF' + id).css({position:(this.fixed?'fixed':'absolute'),display:'none','z-index':jGo.config.max_z_index});
	this.parent.append(this.frame);
	if(menucontrol){
		//connect to menu control
		this.menuController = new jGo.DefaultMenuController('infobox_controller'+id,null,this.frame[0],this,'hide');
	}
	this.id=id;
};
/*
 *  fill
 *  	content - stuff you put in the infobox
 */
proto.fill = function(content,debug){
	if(debug){
		this.debug+="</br>" + content;
		content=this.debug;
	};
	//Correct for scale factor
	var css = $.extend({},this.style.css);
	css['font-size']=Math.round(jGo.util.eN(this.style.css['font-size'])*(jGo._['scalefactor']||1))+'px';
	this.frame.html("<div id='jGo_infobox_content" + this.id + "'>"+content+"</div>").css(css);
};
/*
 *  show
 *  	parent - (optional) change the parent element
 *  	top - (optional) top offset to the parent element
 *  	left - (optional) left offset tot the parent element
 */
proto.show = function(parent,top,left) {
	var frame= this.frame;
	clearTimeout(this.fadeTimout);
	frame.css({display:"none"});
	if(parent){this.parent=parent;parent.append(frame)};
	top = top || 0;
	left = left || 0;
	frame.css({"top":top+"px","left":left+"px"});
	var _t=this;
	if(this.fadeTimer!=0)this.fadeTimout = setTimeout(function(){_t.fade_out()}, this.fadeTimer);
	this.frame.fadeIn(this.fadeInt);
};
proto.fade_out = function(){
	this.frame.fadeOut(this.fadeInt);
};
proto.hide = function() {
    this.frame.css("display","none");
};
proto.remove=function(){
	this.menuController.disableControl();
	this.frame.empty();
	this.frame.remove();
	return true;
};
proto.destroy=function(){
	return false;
};
})();

//Class Initialization
jGo.UI.registerWidgetClass(jGo.InfoBox,'InfoBox','complex.controls');
jGo.scripts.onLoad('jGo.InfoBox.min.js');