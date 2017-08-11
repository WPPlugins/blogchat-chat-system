/*
 *jGo javascript-OS (work in progress)
 *Copyright (C) 2012 Robert Beach (www.fastcatsoftware.com)
 *
 */

/**
 * Creates a new jGo namespace
 * 
 */

var _jGo = window["jGo"], jGo = {};

/**
 * jGO.config -- configuration
 * 
 */

jGo.config = {
	version : 2.0,
	path : FCChatConfig.dir + "jGo",
	z_index_base: 21477,
	max_z_index : 2147483647
};

( function() {

	// jGo Private members

	// Aliases
	var assets = 'assets', events = 'events', eventHandlers = 'eventHandlers', widgets = 'widgets', type = 'type', path = 'path', simple = 'simple', elements = 'elements', complex = 'complex', enabled = 'enabled',

	// Application Environment
	OS = {
		// Members
		assets : {
			browser : {},
			scripts : {
				_class : {},
				external : {}
			},
			z_index_base :jGo.config.z_index_base
		},

		events : {
			enabled :true,
			
			//onEvent - all events in jGo are funneled through this function
			onEvent : function(event) {
				//Do the pre-event handlers, cancel event if necessary
				if (_e.enabled && _e.eventManager('pre',event)) {
					
					//Call the event dispatcher to handle the primary event
					_e.dispatchEvent(event);
						
					//Do the post-event handlers
					_e.eventManager('post', event)
				}
			},
			
			eventManager : function(action,event){
				if(!_e[eventHandlers][action]){
					return true;
				}else{
					return _e.eventProcessor(action, 'all', event) &&	
						   _e.eventProcessor(action, event.type, event);
				}
			},
			
			eventProcessor : function(action, type, event) {
				var e =_e[eventHandlers][action];
				if(e[type]){
					e=e[type];
				}else{
					return true;
				}
				for ( var fn = e.length-1; fn >= 0; fn--) {
					if (event.data[0] == e[fn][1] || e[fn][1]==jGo) {
						if (e[fn][2](event)=='StopPropagation') {
							return false;
						}
					}
				}
				return true;
			},
			
			dispatchEvent : function() {
				var args = arguments;
				if (args[0].data) {
					var obj = args[0].data[0], fn = args[0].data[1];
					obj[fn].apply(obj, args);
				}
			},
			
			// eventhandlers format [name, scope, function]
			eventHandlers : {
				//action
				pre:{
					//type
					all:[]
				}
				/* action
				post:{
					//type
					all:[]
				}
				*/
			}
		},

		widgets : {
			enabled :true,
			classes : {},
			type : {
				simple : {
					elements : {}
				},
				complex : {
					groups : {},
					windows : {
						MAX :50,
						enabled :true
					},
					controls : {
						enabled :true
					},
					dialogs : {
						enabled :true
					},
					menus : {
						enabled :true
					},
					buttons : {
						enabled :true
					}
				}
			}
		},

		interfaces : {
			selectable : {
				selectableElements :0,
				selectedObject :null,
				members : {},
				add : function(w) {
					if (OS.checkTemplate(w,
							[ 'isSelected', 'setZPos', 'getZPos', 'decZPos',
									'select', 'deselect', 'close' ],
							'selectable interface')) {
						_s.members[w.type] = {};
					}
				},
				onSelect : function(target) {
					var e = _s.selectHandlers;
					for ( var fn in e) {
						if(e.hasOwnProperty(fn)){
							e[fn][1].call(_s, target);
						}
					}
				},
				onClose : function(target) {
					var e = _s.closeHandlers;
					for ( var fn in e) {
						if(e.hasOwnProperty(fn)){
							e[fn][1].call(_s, target);
						}
					}
				},
				selectHandlers : [ [
						'default',
						function(target) {
							if (_s.selectedObject != null) {
								_s.selectedObject.deselect();
								_s.selectedObject.isSelected = false;
							}
							for ( var n in _s.members) {
								if(_s.members.hasOwnProperty(n)){
									for ( var ent in _w.classes[n][path][n]) {
										if(_w.classes[n][path][n].hasOwnProperty(ent)){
											if (Number(_w.classes[n][path][n][ent]
													.getZPos()) > Number(target
													.getZPos())) {
												_w.classes[n][path][n][ent].decZPos();
											}
										}
									}
								}
							}
							target.setZPos(_en.z_index_base
									+ 2*_s.selectableElements);
							target.isSelected = true;
							_s.selectedObject = target;
						} ] ],
				closeHandlers : [ [
						'default',
						function(target) {
							_s.selectableElements--;
							if (target.isSelected == true) {
								_s.selectedObject = null;
							}
							for( var n in _s.members){
								if(_s.members.hasOwnProperty(n)){
									for ( var ent in _w.classes[n][path][n]) {
										if(_w.classes[n][path][n].hasOwnProperty(ent)){
											if (Number(_w.classes[n][path][n][ent]
													.getZPos()) > Number(target
													.getZPos())) {
												_w.classes[n][path][n][ent].decZPos();
											}
										}
									}
								}
							}
						} ] ]
			}
		},
		
		hooks : {},

		// Methods
		checkTemplate : function(w, template, group) {
			for (ent in template) {
				if(template.hasOwnProperty(ent)){
					if (!(template[ent] in w)) {
						throw Error("Cannot be added to " + group
								+ ". Class must implement the " + template[ent]
								+ " property.");
						return false;
					}
				}
			}
			return true;
		}

	},

	// Shortcuts
	_en = OS[assets], _w = OS[widgets], _e = OS[events], _s = OS.interfaces.selectable;

	/**
	 * core objects
	 * 
	 */

	// UI
	( function() {

		// Inject array attributes
		var arrayAttributes = {
			length :0,
			set : function(elem) {
				return Array.prototype.push.call(this, elem);
			}
		},

		// Event capture
		capture = {
			//click: true,
			dblclick :true,
			mouseup :true,
			mousedown :true,
			mousemove :true,
			touchstart:true
		};

		jGo.UI = {

			path :jGo.config.path || "/jGo",

			makeEnumerable : function(w) {
				jGo.$.extend(w, arrayAttributes);
			},

			// Events
			//onclick : function(e){
			//},
			ondoubleclick : function(e) {
			},
			onmousedown : function(e) {
			},
			onmouseup : function(e) {
			},
			onmousemove : function(e) {
			},
			ontouchstart : function(e) {
			},

			// Aplication Interface
			
			//Depricated use jGo.onEvent instead
			EventHandler : function(type, name, scope, obj, method) {
				if (!capture[type]) {
					jGo.$(document).eventHandler(type, this, 'on' + type);
				}
				this.addEventHandler(type, name, obj, method, scope);
			},
			
			addEventHandler : function(type, name, obj, method, scope, pos) {
				if(!scope)scope=jGo.UI; //interface scope
				if(!pos)pos='pre';
				var e = _e[eventHandlers][pos];
				if(e){
					if(e[type]){
						for ( var fn in e[type]) {
							if(e[type].hasOwnProperty(fn)){
								if (e[type][fn][0] == name) {
									return false;
								}
							}
						}
					}else{
						e[type]=[];
					}
				}else{
					e = {};
					e[type]=[];
				}
				e[type].splice(e[type].length, 0, [ name, scope, jGo.util.bind(obj, obj[method]) ]);
			},
			
			removeHandler : function(type, name, pos) {
				if(!pos)pos='pre';
				var e = _e[eventHandlers][pos][type];
				for ( var fn in e) {
					if(e.hasOwnProperty(fn)){
						if (e[fn][0] == name) {
							e.splice(fn, 1);
						}
					}
				}
			},

			enableEvents : function(en) {
				_e[enabled] = en;
			},

			get : function(e, id) {
				if (e == 'widget') {
					return _w[id]
				} else if (e == 'element') {
					return _w[type][simple][element][id]
				} else {
					return _w[type][complex][e][id]
				}
			},

			set : function(e, widget) {
				if (e == 'widget') {
					return _w.set(widget)
				} else if (e == 'element') {
					return _w[type][simple][element].set(widget)
				} else {
					return _w[type][complex][e].set(widget)
				}
			},

			registerWidgetClass : function(classType, name, classpath) {
				var w = new classType();
				if (OS.checkTemplate(w, [ 'id', 'type', 'enabled', 'create',
						'destroy' ], 'widget')) {
					var pathArray = classpath.split('.');
					var obj = _w[type];
					for (ent in pathArray) {
						if(pathArray.hasOwnProperty(ent)){
							obj = obj[pathArray[ent]];
						}
					}
					obj[name] = [];
					_w.classes[name] = {};
					_w.classes[name].path = obj;
					_w.classes[name].classType = classType;
				}
			},

			isRegistered : function(name1) {
				return (_w.classes[name1] != null);
			},

			addToSelectableInterface : function(classType) {
				var w = new classType();
				_s.add(w);
			},
			
			getNextId : function(n) {
				var id = 0;
				while (true) {
					if (_w.classes[n][path][n][id] == null) {
						break;
					}
					id++;
				}
				return id;
			},
			
			createWidget : function(n, params) {
				var id = jGo.UI.getNextId(n);
				var w;
				if (id > _w.classes[n][path][n].MAX) {
					return null;
				} else {
					w = new _w.classes[n].classType();
					_w.classes[n][path][n][id] = w;
					w.create(id, params);
					if (w.type in _s.members) {
						if(_s.members.hasOwnProperty(w.type)){
							_s.selectableElements++;
							w.setZPos(_en.z_index_base + 2*_s.selectableElements);
							var fn = w.select;
							w.select = ( function(obj, fn) {
								return function() {
									_s.onSelect(obj);
									fn.apply(obj, arguments);
								};
							})(w, fn);
							w.select();
							fn = w.close;
							w.close = ( function(obj, fn) {
								return function() {
									_s.onClose(obj);
									fn.apply(obj, arguments);
								};
							})(w, fn);
						}
					}

					w.destroy = function() {
						jGo.UI.destroyWidget(this);
					};
				}
				return w;
			},

			destroyWidget : function(w) {
				if (w.type in _s.members) {
					if(_s.members.hasOwnProperty(w.type)){
						_s.selectableElements--;
					}
				}
				delete _w.classes[w.type][path][w.type][w.id];
			},

			classesLoaded :false,

			setClassesLoaded : function() {
				this.classesLoaded = true;
			},

			// Initialization
			init : function() {
				var doc = jGo.$(document);
				//doc.eventHandler('click', this, 'onclick');
				doc.eventHandler('dblclick', this, 'ondoubleclick');
				doc.eventHandler('mousedown', this, 'onmousedown');
				doc.eventHandler('mouseup', this, 'onmouseup');
				doc.eventHandler('mousemove', this, 'onmousemove');
				doc.eventHandler('touchstart', this, 'ontouchstart');
			}
		}
	})();

	// jQuery
	
	//Taken from the migration plugin
	jGo.uaMatch = function( ua ) {
		ua = ua.toLowerCase();

		var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
			/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
			[];

		return {
			browser: match[ 1 ] || "",
			version: match[ 2 ] || "0"
		};
	};

	// Don't clobber any existing jQuery.browser in case it's different
	if ( !jQuery.browser ) {
		var matched = jGo.uaMatch( navigator.userAgent );
		var browser = {};

		if ( matched.browser ) {
			browser[ matched.browser ] = true;
			browser.version = matched.version;
		}

		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
			browser.webkit = true;
		} else if ( browser.webkit ) {
			browser.safari = true;
		}

		jQuery.browser = browser;
	}

	jGo.$ = jQuery.noConflict(true);

	jGo.$.fn
			.extend( {
				_moveLeftRight : function(x) {
					// will only move if the elements position is set to
					// absolute or relative.
					return this.each( function() {
						this.style.left = x + "px";
					});
				},
				eventHandler : function() {
					if (this[0] == document
							&& (arguments[0] != jGo.UI && arguments[1] != jGo.UI)) {
						throw Error('Do not use eventHandler to bind events to the document object, use jGo.UI.EventHandler');
					}
					var args = Array.prototype.slice.call(arguments);
					var type = (typeof args[1] == 'string') ? args.splice(0, 1,
							this) : args.splice(0, 1);
					type = type.toString();
					return this.bind(type, args, OS.events.onEvent);
				},
				//Version 2.0 prefered method of attaching event handler to dom object
				onEvent : function() {
					var args = Array.prototype.slice.call(arguments);
					var type = (typeof args[1] == 'string') ? args.splice(0, 1,
							this) : args.splice(0, 1);
					type = type.toString();
					return this.bind(type, args, OS.events.onEvent);
				},
				removeEventHandler : function(type) {
					return this.unbind(type, OS.events.onEvent);
				},
				uncheck : function() {
					return this.each( function() {
						this.checked = false;
					});
				}
			});

	// util

	( function() {
		jGo.util = {
			eN : function(value) {
				var n = parseInt(value);
				return (n == null || isNaN(n) ? 0 : n);
			},
			returnElementCoordinates:function(el,fixed) {
		        var coords = {};
		        coords.x = coords.y = 0;
		        coords.x = jGo.$(el).offset().left - (fixed?jGo.$(document).scrollLeft():0);
		        coords.y = jGo.$(el).offset().top - (fixed?jGo.$(document).scrollTop():0);
		        return coords;
		    },
			trim : function(s) {
		        return s.replace(/^\s+|\s+$/g,"");
		    },
			getSHeight : function() {
				var b = document.body, d = document.documentElement;
				var mH = 0;
				if (typeof (window.innerWidth) == 'number') {
					mH = window.innerHeight;
				} else if (d && (d.clientWidth || d.clientHeight)) {
					mH = d.clientHeight;
				} else if (b && (b.clientWidth || b.clientHeight)) {
					mH = b.clientHeight;
				}
				return mH;
			},
			getSWidth : function() {
				var b = document.body, d = document.documentElement;
				var mW = 0;
				if (typeof (window.innerWidth) == 'number') {
					mW = window.innerWidth;
				} else if (d && (d.clientWidth || d.clientHeight)) {
					mW = d.clientWidth;
				} else if (b && (b.clientWidth || b.clientHeight)) {
					mW = b.clientWidth;
				}
				return mW;
			},
		    getInnerHeight : function() {
				var innerHeight = 0;
				if( typeof( window.innerWidth ) == 'number' && window.innerHeight!=0) {
				//Non-IE
				    innerHeight = Math.min(window.innerHeight,jGo.$(window).height());
				} else if( document.documentElement &&  document.documentElement.clientHeight && document.documentElement.clientHeight !=0) {
				    //IE 6+ in 'standards compliant mode'
				    innerHeight = Math.min(document.documentElement.clientHeight,jGo.$(window).height());
				} else{
					innerHeight = jGo.$(window).height();
				}
				return innerHeight;
			},
			extractFromCSSString : function(prop,str) {
				var s = str.split(";");
				for(var i=0;i<s.length;i++){
					if(s[i].indexOf(prop)==0){
						return s[i].split(":")[1];
					}
				}
				return "";
			},
			
			/* Overrides API */
			getObj:function(a,b,d){var c=window;for(var i=0;i<b.length-d;i++){c=c[b[i]]}return c},
			setOption:function(a,d){try{var b=a.split(".");var c= jGo.util.getObj(a,b,1);c[b[b.length-1]]=d}catch(e){}},
			mergeOption:function(a,d){try{var b=a.split(".");var c = jGo.util.getObj(a,b,1);c[b[b.length-1]]+=d}catch(e){}},
			mergeBlock:function(a,d){try{var b=a.split(".");var c=jGo.util.getObj(a,b,0);jGo.$.extend(true,c,d)}catch(e){}},
			getCSSProp:function(a,d,g){try{var b=a.split(".");var c;c=jGo.util.getObj(a,b,1);var f=((c[b[b.length-1]].split(d+":"))[1].split(";"))[0];return (g?jGo.util.eN(f):f)}catch(e){}},

			bind : function(obj, method) {
				return function() {
					return method.apply(obj, arguments);
				};
			}
		};
	})();

	// event

	jGo.event = {
		addLoadListener : function(fn) {
			if (typeof window.addEventListener != 'undefined') {
				window.addEventListener('load', fn, false);
			} else if (typeof document.addEventListener != 'undefined') {
				document.addEventListener('load', fn, false);
			} else if (typeof window.attachEvent != 'undefined') {
				window.attachEvent('onload', fn);
			} else {
				var oldfn = window.onload;
				if (typeof window.onload != 'function') {
					window.onload = fn;
				} else {
					window.onload = function() {
						oldfn();
						fn();
					};
				}
			}
		}
	};
	
	//Version 2.0 prefered method of attaching application wide event handler
	jGo.onEvent = function(type, name, obj, method, scope, pos){
			jGo.UI.addEventHandler(type, name, obj, method, scope, pos);
	};
	
	// Generic Handles
	jGo._={};
	
	//Hooks
	jGo.hooks = {
		addHook : function(type, name, obj, method) {
			var h = OS.hooks;
			
			if(h[type]){
				for ( var fn in h[type]) {
					if(h[type].hasOwnProperty(fn)){
						if (h[type][fn][0] == name) {
							return false;
						}
					}
				}
			}else{
				h[type]=[];
			}
			
			h[type].splice(h[type].length, 0, [name, jGo.util.bind(obj, obj[method]) ]);
		},
		removeHook : function(type, name) {
			var h = OS.hooks[type];
			for ( var fn in h) {
				if(h.hasOwnProperty(fn)){
					if (h[fn][0] == name) {
						h.splice(fn, 1);
					}
				}
			}
		},
		doHooks:function(type,args) {
			var h = OS.hooks[type];
			if(h){
				for ( var fn = h.length-1; fn >= 0; fn--) {
					h[fn][1](args);
				}
			}
		}
	};
	
	// scripts

	jGo.scripts = {
		load : function(path, name, mode, obj, callback, data, writemode) {
			if (!OS.assets.scripts.external[name]) {
				OS.assets.scripts.external[name] = {
					fns :[{obj:obj,fn:callback,data:data}]
				};
				if(!writemode){
					this.loadScript(path + name, mode);
				}
			}
		},
		importClass : function(name, mode, obj, callback, data, writemode) {
			if (!OS.assets.scripts._class[name]) {
				var url = jGo.UI.path + "/js/" + name;
				OS.assets.scripts._class[name] = {
					fns :[{obj:obj,fn:callback,data:data}]
				};
				if(!writemode){
					this.loadScript(url, mode);
				}
			}
		},
		loadScript : function(url, mode) {
			if (mode == 'static')
				document.write("<script type='text/javaScript' src='" + url
						+ "'></script>");
			if (mode == 'dynamic') {
				var headID = document.getElementsByTagName("head")[0];
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = url;
				headID.appendChild(newScript);
			}
		},
		onLoad : function(name, type) {
			var s = (type && type == "external") ? OS.assets.scripts.external[name]
					: OS.assets.scripts._class[name];
			if (s){
				s.loaded = 1;
				for (x in s.fns){
					if(s.fns.hasOwnProperty(x)){
						if(s.fns[x].fn){
							s.fns[x].fn.call(s.fns[x].obj,s.fns[x].data);
						}
					}
				}
				if(type && type == "external"){
					OS.assets.scripts.external[name].fns = [];
				}else{
					OS.assets.scripts._class[name].fns = [];
				}
			}
		},
		loadState : function(name, type) {
			var s = (type && type == "external") ? OS.assets.scripts.external[name]
					: OS.assets.scripts._class[name];
			if (!s)
				return "not.loaded";
			if (!s.loaded)
				return "load.called";
			return "loaded";
		},
		addCallback : function(name, type, obj, callback, data){
			var s = (type && type == "external") ? OS.assets.scripts.external[name]
					: OS.assets.scripts._class[name];
			s.fns.push({obj:obj,fn:callback,data:data});
		}
	};

	// flash

	jGo.flash = {
		getFlash : function(name) {
			if (navigator.appName.indexOf("Microsoft") > -1) {
				return window[name + 'Object'];
			} else if (document.getElementById) {
				return document.getElementById(name + 'Embed');
			} else {
				return null;
			}
		},
		writeFlash : function(name, id, w, h, base, bgcolor, wmode, flashvars) {
			if (!w)
				w = '100%';
			if (!h)
				h = '100%';
			if (!base)
				base = '';
			if (!bgcolor)
				bgcolor = '#ffffff';
			if (!flashvars)
				flashvars = '';
			return ('<object '
					+ 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
					+ 'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" '
					+ 'width="'
					+ w
					+ '" height="'
					+ h
					+ '" '
					+ 'id="'
					+ name
					+ id
					+ 'Object"> '
					+ '<param name="allowFullScreen" value="true" />'
					+ '<param name="allowScriptAccess" value="always" /> '
					+ '<param name="base" value="'
					+ base
					+ '." /> '
					+ '<param name="align" value="left" /> '
					+ '<param name="movie" value="'
					+ base
					+ name
					+ '.swf" /> '
					+ '<param name="wmode" value="'
					+ wmode
					+ '" /> '
					+ '<param name="flashvars" value="'
					+ flashvars
					+ '" /> '
					+ '<param name="quality" value="high" /> '
					+ '<param name="bgcolor" value="'
					+ bgcolor
					+ '" /> '
					+ '<param name="scale" value="showAll" /> '
					+ '<embed '
					+ 'id="'
					+ name
					+ id
					+ 'Embed"'
					+ 'src="'
					+ base
					+ name
					+ '.swf" allowFullScreen="true" '
					+ 'quality="high" '
					+ 'bgcolor="'
					+ bgcolor
					+ '" '
					+ 'wmode="'
					+ wmode
					+ '" '
					+ 'flashvars="'
					+ flashvars
					+ '" '
					+ 'width="'
					+ w
					+ '" height="'
					+ h
					+ '" '
					+ 'align="left" '
					+ 'base="'
					+ base
					+ '." '
					+ 'scale="showAll" '
					+ 'allowScriptAccess="always" '
					+ 'type="application/x-shockwave-flash" swLiveConnect="true"'
					+ 'pluginspage="http://www.macromedia.com/go/getflashplayer" /> ' + '</object>');
		}
	};

})();

/*
 * Abstract Widget Classes
 */

jGo.Widget = function() {
	this.id = 0;
	this.type = 'Widget';
	this.enabled = true;
	this.state = 1;
	this.frame = null;
	this.propertyNotFound = "Method not found.";
	this.getDefault = function() {
		return jGo.Widget.prototype;
	};
	this.err = function() {
		alert("Method not found.");
	};
};

jGo.Window = function() {
	jGo.Widget.apply(this, arguments);
	this.resizable = false;
	this.isSelected = false;
	this.getDefault = function() {
		return jGo.Window.prototype;
	};
};

jGo.Window.prototype = new jGo.Widget();

jGo.Menu = function() {
	jGo.Widget.apply(this, arguments);
	this.isSelected = false;
	this.getDefault = function() {
		return jGo.Menu.prototype;
	};
};

jGo.Menu.prototype = new jGo.Widget();

jGo.Control = function() {
	jGo.Widget.apply(this, arguments);
	this.isSelected = false;
	this.getDefault = function() {
		return jGo.Control.prototype;
	};
};

jGo.Control.prototype = new jGo.Widget();

/*
 * Clean up
 */

if (!window.jQuery)
	window.jQuery = jGo.$;
if (!window.$)
	window.$ = jGo.$;
if (!_jGo || _jgo.config.version < jGo.config.version) {
	jGo.UI.init();
} else {
	jGo = _jGo;
}