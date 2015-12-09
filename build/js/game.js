(function () { "use strict";
var com = {};
com.Main = function() {
};
com.Main.__name__ = true;
com.Main.main = function() {
	shoe3d.System;
	console.log("START");
	var g1 = new shoe3d.core.GameObject();
	var c1 = new shoe3d.core.Component();
	g1.add(c1);
};
com.Main.prototype = {
	__class__: com.Main
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
var shoe3d = {};
shoe3d.System = function() { };
shoe3d.System.__name__ = true;
shoe3d.System.init = function() {
};
shoe3d.core = {};
shoe3d.core.Component = function() {
	this._started = false;
};
shoe3d.core.Component.__name__ = true;
shoe3d.core.Component.prototype = {
	onUpdate: function() {
	}
	,onLateUpdate: function() {
	}
	,onStart: function() {
	}
	,onEnable: function() {
	}
	,onAdded: function() {
	}
	,onRemoved: function() {
	}
	,__class__: shoe3d.core.Component
};
shoe3d.core.GameObject = function() {
	this.transform = new shoe3d.core.Transform();
};
shoe3d.core.GameObject.__name__ = true;
shoe3d.core.GameObject.prototype = {
	update: function() {
	}
	,addChild: function(child) {
		var k = null;
		if(this.firstChild != null) {
			k = this.firstChild;
			while(k._next != null) k = k._next;
			k._next = child;
		} else this.firstChild = child;
		child.setParent(this);
		return this;
	}
	,removeChild: function(child) {
		if(child == this.firstChild) this.firstChild = this.firstChild._next; else {
			var k = this.firstChild._next;
			var p = this.firstChild;
			while(k != child) {
				p = k;
				k = k._next;
			}
			p._next = k._next;
		}
		child.parent = null;
		return this;
	}
	,add: function(component) {
		if(this.firstComponent != null) {
			var k = this.firstComponent;
			while(k._next != null) k = k._next;
			k._next = component;
		} else this.firstComponent = component;
		component.owner = this;
		return this;
	}
	,has: function(cl) {
		var k = this.firstComponent;
		while(k != null) {
			if(js.Boot.__instanceof(k,cl)) return true;
			k = k._next;
		}
		return false;
	}
	,remove: function(component) {
		if(component == this.firstComponent) this.firstComponent = this.firstComponent._next; else {
			var k = this.firstComponent._next;
			var p = this.firstComponent;
			while(k != component) {
				p = k;
				k = k._next;
			}
			p._next = k._next;
		}
		component.owner = null;
		component.onRemoved();
		return this;
	}
	,setParent: function(go,append) {
		if(append == null) append = true;
		if(go != null) go.addChild(this); else if(this.parent != null) this.parent.removeChild(this);
		return this;
	}
	,get_numChildren: function() {
		var n = 0;
		var k = this.firstChild;
		while(k != null) {
			n++;
			k = k._next;
		}
		return n;
	}
	,__class__: shoe3d.core.GameObject
};
shoe3d.core.Transform = function() {
	this.rotation = new THREE.Quaternion();
	this.position = new THREE.Vector3();
};
shoe3d.core.Transform.__name__ = true;
shoe3d.core.Transform.prototype = {
	__class__: shoe3d.core.Transform
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
com.Main.main();
})();
