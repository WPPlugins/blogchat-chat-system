/*
*DefaultMenu Class
*/
(function() {

var $ = jGo.$;

jGo.DefaultMenu = function() {
    jGo.Menu.apply(this, arguments);
    this.type = 'DefaultMenu';

    this.eventsEnabled = true;
    this.isOpen = false;
    this.noHide=false;

    this.parent;
    this.target;
    this.frame;

    this.style;
    this.fixed;
    this.mobile;
    
    this.getDefault = function() {
        return jGo.DefaultMenu.prototype;
    };

    this.err = function() {
        alert("Method not found.");
    };
};

jGo.DefaultMenu.prototype = new jGo.Menu();

var TMp = jGo.DefaultMenu.prototype;

//Create it
TMp.create = function(id, p){
	this.style = $.extend({},p[0]);
	//Correct for scale factor
	this.style.css['font-size']=Math.round(jGo.util.eN(this.style.css['font-size'])*(jGo._['scalefactor']||1))+'px';
	var s = this.style;
	//var left = s.left || (p[3].offset().left+p[3].width()+s.offsetLeft-(p[4][0]===document.body?'0':jGo.util.eN(p[4].offset().left)));
	//var top = s.top || (p[3].offset().top+s.offsetTop-(p[4][0]===document.body?'0':jGo.util.eN(p[4].offset().top)));
	this.target=p[3];
    this.parent=p[4];
    this.fixed=p[5];
    this.mobile=p[6];
	//var forecolor = (s.opacity!=1)?s.color:'transparent';
	var outerClass = 'jGo_app jGo_myapp jGo_em defaultmenu'+id;
	var content ="<div style='position:relative'>"+p[1]+"</div>";
	this.frame=$(document.createElement('div')).addClass(outerClass).attr('id', 'jGo_defaultmenuF' + id).css({position:(this.fixed?'fixed':'absolute'),display:'none','z-index':jGo.config.max_z_index}).css(s.css).html(content);
	this.parent.append(this.frame);
	this.target.onEvent('mousedown', this, 'onMouseDown', '');
	this.target.onEvent('touchstart', this, 'onMouseDown', '');
	this.frame.onEvent('mousedown', this, 'onMouseDown', '');
	this.frame.onEvent('touchstart', this, 'onMouseDown', '');
	
	this.id=id;
};

//Event handlers
TMp.onMouseDown = function(e){
	this.noHide=true;
};

TMp.mouseOff = function(e){
	var root = (document.body.scrollHeight>=document.documentElement.scrollHeight)?document.body:document.documentElement;
	var scroll = (root.scrollLeft)?root.scrollLeft:0;
	if(!e.pageX||(scroll+root.clientWidth)>e.pageX||root.clientWidth==0){
		if(!this.noHide)this.hide();
		this.noHide=false;
	}
};

//Manipulation
TMp.position = function(){
	var s = this.style.position,
 	t = this.target,
	p = this.parent,
	offset = 48,
	right_margin=25,
	bottom_margin=20,
	displayLeft = 0;
	var uPosX = (s.left || (t.offset().left + Math.round(s.offsetLeft*(jGo._['scalefactor']||1))-(p[0]===document.body?'0':jGo.util.eN(p.offset().left)))) - 9;
	var uPosY = (s.top || (t.offset().top+(this.fixed?-$(document).scrollTop():0)+Math.round(s.offsetTop*(jGo._['scalefactor']||1))-(p[0]===document.body?'0':jGo.util.eN(p.offset().top)))) - 9;

    var height = this.frame.height();
    var width = this.frame.width();
    
    var screen_left = jGo.util.getSWidth();
    var menu_left = width + right_margin + uPosX + (p[0]===document.body?0:jGo.util.eN(p.offset().left));
    if (screen_left < menu_left && menu_left > width && !this.mobile) {
        displayLeft = 1;
    }
    var screen_height = $(window).scrollTop() +(this.fixed?-$(document).scrollTop():0)+ jGo.util.getSHeight();
    var menu_bottom = height + uPosY + (p[0]===document.body?0:jGo.util.eN(p.offset().top));
    if(screen_height - bottom_margin < menu_bottom){
    	uPosY -= (menu_bottom - screen_height + bottom_margin);
    };
 
    if (jGo.browser.browser != 'Explorer') {
        if (displayLeft == 0) {
            this.frame[0].style.left = uPosX + 'px';
        } else {
            this.frame[0].style.left = 'auto';
            this.frame[0].style.left = (uPosX + offset - width) + 'px';
        }
        this.frame[0].style.top = uPosY + 'px';
    } else {
        if (displayLeft == 0) {
            this.frame[0].style.pixelLeft = uPosX;
        } else {
            this.frame[0].style.pixelLeft = uPosX + offset - width;
        }
        this.frame[0].style.pixelTop = uPosY;
    }
};

TMp.show = function() {
   	jGo.onEvent('mousedown','defaultmenu'+this.id,this,'mouseOff');
   	jGo.onEvent('touchstart','defaultmenu'+this.id,this,'mouseOff');
	this.position();
	this.frame.css("display","block");
   	this.isOpen=true;
	this.noHide=false;
};
TMp.hide = function() {
    jGo.UI.removeHandler('mousedown','defaultmenu'+this.id);
    jGo.UI.removeHandler('touchstart','defaultmenu'+this.id);
    this.frame.css("display","none");
    this.isOpen=false;
};
TMp.close = function() {
    this.frame.empty();
	this.frame.remove();
	this.target.removeEventHandler('mousedown');
	this.target.removeEventHandler('touchstart');
    jGo.UI.removeHandler('mousedown','defaultmenu'+this.id);
    jGo.UI.removeHandler('touchstart','defaultmenu'+this.id);
	this.isOpen=false;
    return true;
};
TMp.destroy=function(){return false;};

/*
 *  Menu Controller Subclass
 *  Applies proper mouse event control to a menu
 */

/*
 * id - a unique identifier for the controller
 * target - the dom element used to toggle the menu
 * menu - the dom element representing the container for the menu
 * obj - the javascript object which will control the menus toggle
 * toggleFunction - a function which is applied to physically toggle the menu (resides in obj)
 * control_target (optional) - should the controller handle the toggling when the target is clicked
 * 
 * it is assumed that you will hide the menu by setting the menu "display:none" or "visibility:hidden"
 */
jGo.DefaultMenuController = function(id,target,menu,obj,toggleFunction,control_target){
	this.id=id;
	this.no_hide=false;
	this.target=$(target);
	this.menu=$(menu);
	this.obj = obj;
	this.control_target = control_target || false;
	this.toggleFunction=toggleFunction;
	this.enableControl();
};

var DMC = jGo.DefaultMenuController.prototype;

DMC.mouseOn = function(e){
	this.no_hide=true;
};
DMC.mouseDown = function(e){
	var root = (document.body.scrollHeight>=document.documentElement.scrollHeight)?document.body:document.documentElement;
	var scroll = (root.scrollLeft)?root.scrollLeft:0;
	if(!e.pageX||(scroll+root.clientWidth)>e.pageX||root.clientWidth==0){
		if(!this.no_hide&&this.is_open())this.toggle(true);
	}
	this.no_hide=false;
};
DMC.toggle = function(){
	if(arguments[0]==true||this.control_target)this.obj[this.toggleFunction]();
};
DMC.is_open = function(){
	return !($(this.menu).css("display")=="none"||$(this.menu).css("visibility")=="hidden");
};
DMC.enableControl = function(){
	this.target.onEvent('mousedown', this, 'mouseOn', '');
	this.menu.onEvent('mousedown', this, 'mouseOn', '');
	jGo.onEvent('mousedown','menucontroller'+this.id,this,'mouseDown');
	this.target.onEvent('touchstart', this, 'mouseOn', '');
	this.menu.onEvent('touchstart', this, 'mouseOn', '');
	jGo.onEvent('touchstart','menucontroller'+this.id,this,'mouseDown');
};
DMC.disableControl = function() {
	this.target.removeEventHandler('mousedown');
	this.menu.removeEventHandler('mousedown');
    jGo.UI.removeHandler('mousedown','menucontroller'+this.id);
    this.target.removeEventHandler('touchstart');
	this.menu.removeEventHandler('touchstart');
    jGo.UI.removeHandler('touchstart','menucontroller'+this.id);
};
})();

//Class Initialization
jGo.UI.registerWidgetClass(jGo.DefaultMenu,'DefaultMenu','complex.menus');
jGo.scripts.onLoad('jGo.DefaultMenu.js');