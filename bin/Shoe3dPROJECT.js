(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
var haxe = {};
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.CallStack = function() { };
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.Log = function() { };
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.ds = {};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,__class__: haxe.ds.StringMap
};
haxe.unit = {};
haxe.unit.TestCase = function() {
};
haxe.unit.TestCase.__name__ = ["haxe","unit","TestCase"];
haxe.unit.TestCase.prototype = {
	currentTest: null
	,setup: function() {
	}
	,tearDown: function() {
	}
	,print: function(v) {
		haxe.unit.TestRunner.print(v);
	}
	,assertTrue: function(b,c) {
		this.currentTest.done = true;
		if(b == false) {
			this.currentTest.success = false;
			this.currentTest.error = "expected true but was false";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertFalse: function(b,c) {
		this.currentTest.done = true;
		if(b == true) {
			this.currentTest.success = false;
			this.currentTest.error = "expected false but was true";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertEquals: function(expected,actual,c) {
		this.currentTest.done = true;
		if(actual != expected) {
			this.currentTest.success = false;
			this.currentTest.error = "expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "'";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,__class__: haxe.unit.TestCase
};
haxe.unit.TestResult = function() {
	this.m_tests = new List();
	this.success = true;
};
haxe.unit.TestResult.__name__ = ["haxe","unit","TestResult"];
haxe.unit.TestResult.prototype = {
	m_tests: null
	,success: null
	,add: function(t) {
		this.m_tests.add(t);
		if(!t.success) this.success = false;
	}
	,toString: function() {
		var buf = new StringBuf();
		var failures = 0;
		var $it0 = this.m_tests.iterator();
		while( $it0.hasNext() ) {
			var test = $it0.next();
			if(test.success == false) {
				buf.b += "* ";
				if(test.classname == null) buf.b += "null"; else buf.b += "" + test.classname;
				buf.b += "::";
				if(test.method == null) buf.b += "null"; else buf.b += "" + test.method;
				buf.b += "()";
				buf.b += "\n";
				buf.b += "ERR: ";
				if(test.posInfos != null) {
					buf.b += Std.string(test.posInfos.fileName);
					buf.b += ":";
					buf.b += Std.string(test.posInfos.lineNumber);
					buf.b += "(";
					buf.b += Std.string(test.posInfos.className);
					buf.b += ".";
					buf.b += Std.string(test.posInfos.methodName);
					buf.b += ") - ";
				}
				if(test.error == null) buf.b += "null"; else buf.b += "" + test.error;
				buf.b += "\n";
				if(test.backtrace != null) {
					if(test.backtrace == null) buf.b += "null"; else buf.b += "" + test.backtrace;
					buf.b += "\n";
				}
				buf.b += "\n";
				failures++;
			}
		}
		buf.b += "\n";
		if(failures == 0) buf.b += "OK "; else buf.b += "FAILED ";
		buf.b += Std.string(this.m_tests.length);
		buf.b += " tests, ";
		if(failures == null) buf.b += "null"; else buf.b += "" + failures;
		buf.b += " failed, ";
		buf.b += Std.string(this.m_tests.length - failures);
		buf.b += " success";
		buf.b += "\n";
		return buf.b;
	}
	,__class__: haxe.unit.TestResult
};
haxe.unit.TestRunner = function() {
	this.result = new haxe.unit.TestResult();
	this.cases = new List();
};
haxe.unit.TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe.unit.TestRunner.print = function(v) {
	var msg = js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) {
		msg = msg.split("\n").join("<br/>");
		d.innerHTML += StringTools.htmlEscape(msg) + "<br/>";
	} else if(typeof process != "undefined" && process.stdout != null && process.stdout.write != null) process.stdout.write(msg); else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
haxe.unit.TestRunner.customTrace = function(v,p) {
	haxe.unit.TestRunner.print(p.fileName + ":" + p.lineNumber + ": " + Std.string(v) + "\n");
};
haxe.unit.TestRunner.prototype = {
	result: null
	,cases: null
	,add: function(c) {
		this.cases.add(c);
	}
	,run: function() {
		this.result = new haxe.unit.TestResult();
		var $it0 = this.cases.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.runCase(c);
		}
		haxe.unit.TestRunner.print(this.result.toString());
		return this.result.success;
	}
	,runCase: function(t) {
		var old = haxe.Log.trace;
		haxe.Log.trace = haxe.unit.TestRunner.customTrace;
		var cl = Type.getClass(t);
		var fields = Type.getInstanceFields(cl);
		haxe.unit.TestRunner.print("Class: " + Type.getClassName(cl) + " ");
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe.unit.TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					Reflect.callMethod(t,field,new Array());
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe.unit.TestRunner.print(".");
					} else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe.unit.TestRunner.print("W");
					}
				} catch( $e0 ) {
					if( js.Boot.__instanceof($e0,haxe.unit.TestStatus) ) {
						var e = $e0;
						haxe.unit.TestRunner.print("F");
						t.currentTest.backtrace = haxe.CallStack.toString(haxe.CallStack.exceptionStack());
					} else {
					var e1 = $e0;
					haxe.unit.TestRunner.print("E");
					if(e1.message != null) t.currentTest.error = "exception thrown : " + Std.string(e1) + " [" + Std.string(e1.message) + "]"; else t.currentTest.error = "exception thrown : " + Std.string(e1);
					t.currentTest.backtrace = haxe.CallStack.toString(haxe.CallStack.exceptionStack());
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
		haxe.unit.TestRunner.print("\n");
		haxe.Log.trace = old;
	}
	,__class__: haxe.unit.TestRunner
};
haxe.unit.TestStatus = function() {
	this.done = false;
	this.success = false;
};
haxe.unit.TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe.unit.TestStatus.prototype = {
	done: null
	,success: null
	,error: null
	,method: null
	,classname: null
	,posInfos: null
	,backtrace: null
	,__class__: haxe.unit.TestStatus
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
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
shoe3d.core = {};
shoe3d.core.RenderManager = function() { };
shoe3d.core.RenderManager.__name__ = ["shoe3d","core","RenderManager"];
shoe3d.core.RenderManager.init = function() {
	shoe3d.core.RenderManager.renderer = new THREE.WebGLRenderer();
	shoe3d.core.RenderManager.renderer.setSize(800,600);
	window.document.body.appendChild(shoe3d.core.RenderManager.renderer.domElement);
	shoe3d.core.RenderManager.renderer.setClearColor(15893267);
	shoe3d.core.RenderManager.renderer.autoClear = false;
	shoe3d.core.RenderManager.uiCamera = new THREE.OrthographicCamera(-1,1,10,-10,0.1,1000);
};
shoe3d.core.RenderManager.render = function() {
	shoe3d.core.RenderManager.renderer.clear();
	shoe3d.core.RenderManager.renderer.render(shoe3d.System.screen._currentScreen.gameScene,shoe3d.System.screen._currentScreen.cameraHandle.camera);
	shoe3d.core.RenderManager.renderer.render(shoe3d.System.screen._currentScreen.uiScene,shoe3d.core.RenderManager.uiCamera);
};
shoe3d.screen = {};
shoe3d.screen.ScreenManager = function() { };
shoe3d.screen.ScreenManager.__name__ = ["shoe3d","screen","ScreenManager"];
shoe3d.screen.ScreenManager.init = function() {
	shoe3d.screen.ScreenManager._transitions = new haxe.ds.StringMap();
	shoe3d.screen.ScreenManager._screens = new haxe.ds.StringMap();
	shoe3d.screen.ScreenManager._base = new shoe3d.core.GameObject();
	shoe3d.screen.ScreenManager.defaultTransition = new shoe3d.screen.transition.Transition();
};
shoe3d.screen.ScreenManager.show = function(name,changeFn) {
	shoe3d.util.Assert.that(shoe3d.screen.ScreenManager._screens.exists(name),"Screen not exists: " + name);
	shoe3d.screen.ScreenManager._targetScreen = Type.createInstance(shoe3d.screen.ScreenManager._screens.get(name),[]);
	if(shoe3d.screen.ScreenManager._currentScreen != null) {
		var transition;
		if(shoe3d.screen.ScreenManager._transitions.exists(shoe3d.screen.ScreenManager._currentScreenName + ">>" + name)) transition = shoe3d.screen.ScreenManager._transitions.get(shoe3d.screen.ScreenManager._currentScreenName + ">>" + name); else transition = shoe3d.screen.ScreenManager.defaultTransition;
		transition.start(shoe3d.screen.ScreenManager._currentScreen,shoe3d.screen.ScreenManager._targetScreen);
	} else shoe3d.screen.ScreenManager._currentScreen = shoe3d.screen.ScreenManager._targetScreen;
};
shoe3d.screen.ScreenManager.addScreen = function(name,scr) {
	if(shoe3d.screen.ScreenManager._screens == null) shoe3d.screen.ScreenManager._screens = new haxe.ds.StringMap();
	shoe3d.screen.ScreenManager._screens.set(name,scr);
};
shoe3d.core.Time = function() {
};
shoe3d.core.Time.__name__ = ["shoe3d","core","Time"];
shoe3d.core.Time.init = function() {
	shoe3d.core.Time.lastUpdateTime = shoe3d.core.Time.gameStartTime = haxe.Timer.stamp();
};
shoe3d.core.Time.update = function() {
	var cur = haxe.Timer.stamp();
	shoe3d.core.Time.dt = cur - shoe3d.core.Time.lastUpdateTime;
	shoe3d.core.Time.lastUpdateTime = cur;
	shoe3d.core.Time.timeSingleGameStart = cur - shoe3d.core.Time.gameStartTime;
};
shoe3d.core.Time.prototype = {
	__class__: shoe3d.core.Time
};
shoe3d.core.WindowManager = function() { };
shoe3d.core.WindowManager.__name__ = ["shoe3d","core","WindowManager"];
shoe3d.core.WindowManager.init = function() {
};
shoe3d.System = function() { };
shoe3d.System.__name__ = ["shoe3d","System"];
shoe3d.System.init = function() {
	shoe3d.core.WindowManager.init();
	shoe3d.core.RenderManager.init();
	shoe3d.screen.ScreenManager.init();
	shoe3d.core.Time.init();
	shoe3d.System.loop = new shoe3d.core.MainLoop();
};
shoe3d.System.start = function() {
	shoe3d.System.loop.start();
};
shoe3d.System.get_root = function() {
	return shoe3d.screen.ScreenManager._base;
};
shoe3d.core.Component = function() {
	this._started = false;
};
shoe3d.core.Component.__name__ = ["shoe3d","core","Component"];
shoe3d.core.Component.prototype = {
	owner: null
	,_started: null
	,onUpdate: function() {
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
shoe3d.component = {};
shoe3d.component.CameraHandle = function() {
	shoe3d.core.Component.call(this);
	this.camera = new THREE.PerspectiveCamera(60,1.3333333333333333,0.1,1000);
};
shoe3d.component.CameraHandle.__name__ = ["shoe3d","component","CameraHandle"];
shoe3d.component.CameraHandle.__super__ = shoe3d.core.Component;
shoe3d.component.CameraHandle.prototype = $extend(shoe3d.core.Component.prototype,{
	camera: null
	,onAdded: function() {
		this.owner.transform.add(this.camera);
	}
	,__class__: shoe3d.component.CameraHandle
});
shoe3d.component.MeshDisplay = function(geom,mat) {
	shoe3d.core.Component.call(this);
	this.geometry = geom;
	this.material = mat;
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	if(this.owner != null) this.owner.transform.add(this.mesh);
};
shoe3d.component.MeshDisplay.__name__ = ["shoe3d","component","MeshDisplay"];
shoe3d.component.MeshDisplay.__super__ = shoe3d.core.Component;
shoe3d.component.MeshDisplay.prototype = $extend(shoe3d.core.Component.prototype,{
	geometry: null
	,material: null
	,mesh: null
	,onAdded: function() {
		this.owner.transform.add(this.mesh);
	}
	,__class__: shoe3d.component.MeshDisplay
});
shoe3d.component.RandomRotator = function() {
	shoe3d.core.Component.call(this);
};
shoe3d.component.RandomRotator.__name__ = ["shoe3d","component","RandomRotator"];
shoe3d.component.RandomRotator.__super__ = shoe3d.core.Component;
shoe3d.component.RandomRotator.prototype = $extend(shoe3d.core.Component.prototype,{
	onUpdate: function() {
		this.owner.transform.rotation.x += 0.02;
	}
	,__class__: shoe3d.component.RandomRotator
});
shoe3d.core.ComponentContainer = function() { };
shoe3d.core.ComponentContainer.__name__ = ["shoe3d","core","ComponentContainer"];
shoe3d.core.ComponentContainer.prototype = {
	components: null
	,__class__: shoe3d.core.ComponentContainer
};
shoe3d.core.GameObject = function(name) {
	this.name = name;
	this.components = [];
	this.children = [];
	this.transform = new THREE.Object3D();
};
shoe3d.core.GameObject.__name__ = ["shoe3d","core","GameObject"];
shoe3d.core.GameObject.__interfaces__ = [shoe3d.core.ComponentContainer];
shoe3d.core.GameObject.prototype = {
	components: null
	,children: null
	,transform: null
	,name: null
	,addComponent: function(component) {
		this.components.push(component);
		component.owner = this;
		component.onAdded();
		return this;
	}
	,hasComponent: function(cl) {
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(i,cl)) return true;
		}
		return false;
	}
	,removeComponent: function(component) {
		var i = HxOverrides.indexOf(this.components,component,0);
		if(i >= 0) {
			this.components.splice(i,1);
			component.onRemoved();
		}
		return this;
	}
	,addChild: function(child) {
		this.children.push(child);
		this.transform.add(child.transform);
	}
	,removeChild: function(child) {
		HxOverrides.remove(this.children,child);
		this.transform.remove(child.transform);
	}
	,onAdded: function() {
	}
	,onRemoved: function() {
	}
	,numComponents: null
	,get_numComponents: function() {
		return this.components.length;
	}
	,__class__: shoe3d.core.GameObject
};
shoe3d.core.GameScene = function() {
	THREE.Scene.call(this);
	this.gameObjects = [];
};
shoe3d.core.GameScene.__name__ = ["shoe3d","core","GameScene"];
shoe3d.core.GameScene.__super__ = THREE.Scene;
shoe3d.core.GameScene.prototype = $extend(THREE.Scene.prototype,{
	gameObjects: null
	,addChild: function(child) {
		this.gameObjects.push(child);
		THREE.Scene.prototype.add.call(this,child.transform);
	}
	,removeChild: function(child) {
		HxOverrides.remove(this.gameObjects,child);
		THREE.Scene.prototype.remove.call(this,child.transform);
	}
	,__class__: shoe3d.core.GameScene
});
shoe3d.core.MainLoop = function() {
};
shoe3d.core.MainLoop.__name__ = ["shoe3d","core","MainLoop"];
shoe3d.core.MainLoop.prototype = {
	start: function() {
		this.update();
	}
	,update: function(flt) {
		shoe3d.System.time.update();
		var _g = 0;
		var _g1 = shoe3d.screen.ScreenManager._currentScreen.gameScene.gameObjects;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			this.updateGameObject(i);
		}
		var _g2 = 0;
		var _g11 = shoe3d.screen.ScreenManager._currentScreen.uiScene.gameObjects;
		while(_g2 < _g11.length) {
			var i1 = _g11[_g2];
			++_g2;
			this.updateGameObject(i1);
		}
		this.render();
		window.requestAnimationFrame($bind(this,this.update));
		return true;
	}
	,render: function() {
		shoe3d.System.renderer.render();
	}
	,updateGameObject: function(go) {
		var _g = 0;
		var _g1 = go.components;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(!i._started) {
				i.onStart();
				i._started = true;
			}
			i.onUpdate();
		}
		var _g2 = 0;
		var _g11 = go.children;
		while(_g2 < _g11.length) {
			var child = _g11[_g2];
			++_g2;
			this.updateGameObject(child);
		}
	}
	,__class__: shoe3d.core.MainLoop
};
shoe3d.screen.GameScreen = function() {
	this.gameScene = new shoe3d.core.GameScene();
	this.uiScene = new shoe3d.core.GameScene();
	this.cameraHandle = new shoe3d.component.CameraHandle();
	this.gameScene.addChild(new shoe3d.core.GameObject().addComponent(this.cameraHandle));
};
shoe3d.screen.GameScreen.__name__ = ["shoe3d","screen","GameScreen"];
shoe3d.screen.GameScreen.prototype = {
	gameScene: null
	,uiScene: null
	,cameraHandle: null
	,__class__: shoe3d.screen.GameScreen
};
shoe3d.screen.transition = {};
shoe3d.screen.transition.Transition = function() {
};
shoe3d.screen.transition.Transition.__name__ = ["shoe3d","screen","transition","Transition"];
shoe3d.screen.transition.Transition.prototype = {
	_holder: null
	,start: function(currentScreen,targetScreen) {
		shoe3d.screen.ScreenManager._currentScreen = targetScreen;
	}
	,setHolder: function(holder) {
		this._holder = holder;
	}
	,end: function() {
	}
	,__class__: shoe3d.screen.transition.Transition
};
shoe3d.util = {};
shoe3d.util.Assert = function() { };
shoe3d.util.Assert.__name__ = ["shoe3d","util","Assert"];
shoe3d.util.Assert.that = function(cond,msg) {
	if(!cond) shoe3d.util.Assert.fail(msg);
};
shoe3d.util.Assert.fail = function(msg) {
	throw msg;
};
var tests = {};
tests.GeneralTest = function() {
	haxe.unit.TestCase.call(this);
};
tests.GeneralTest.__name__ = ["tests","GeneralTest"];
tests.GeneralTest.__super__ = haxe.unit.TestCase;
tests.GeneralTest.prototype = $extend(haxe.unit.TestCase.prototype,{
	__class__: tests.GeneralTest
});
tests.Main = function() { };
tests.Main.__name__ = ["tests","Main"];
tests.Main.main = function() {
	tests.Main.createConsole();
	var test1 = new tests.GeneralTest();
	var runner = new haxe.unit.TestRunner();
	runner.add(test1);
	runner.run();
	tests.Main.trace2(runner.result);
	shoe3d.System.init();
	shoe3d.System.screen.addScreen("game",tests.TestScreen);
	shoe3d.System.screen.addScreen("game2",tests.TestScreen2);
	shoe3d.System.screen.show("game");
	haxe.Timer.delay(function() {
		shoe3d.System.screen.show("game2");
	},1100);
	shoe3d.System.start();
};
tests.Main.createConsole = function() {
	var _this = window.document;
	tests.Main.console = _this.createElement("div");
	window.document.body.appendChild(tests.Main.console);
	tests.Main.trace2("CONSOLE CREATED");
};
tests.Main.trace2 = function(a) {
	tests.Main.console.innerHTML = tests.Main.console.innerHTML + "<br/>" + Std.string(a);
};
tests.TestScreen = function() {
	shoe3d.screen.GameScreen.call(this);
	var msh = new shoe3d.component.MeshDisplay(new THREE.BoxGeometry(1,1,1),new THREE.MeshPhongMaterial({ color : 16240435}));
	var go = new shoe3d.core.GameObject("out").addComponent(msh);
	var go2 = new shoe3d.core.GameObject("INSIDE").addComponent(new shoe3d.component.MeshDisplay(new THREE.BoxGeometry(0.5,0.5,0.5)));
	tests.Main.trace2(go2.components.length);
	go.addChild(go2);
	go2.transform.position.z = 1.5;
	this.gameScene.addChild(go);
	var l = new THREE.AmbientLight(16777215);
	this.gameScene.add(l);
	var dl = new THREE.DirectionalLight(3051516,0.8);
	dl.rotateX(0.45);
	dl.rotateX(0.74);
	dl.rotateX(1.74);
	this.gameScene.add(dl);
	this.cameraHandle.owner.transform.position.z = 5;
};
tests.TestScreen.__name__ = ["tests","TestScreen"];
tests.TestScreen.__super__ = shoe3d.screen.GameScreen;
tests.TestScreen.prototype = $extend(shoe3d.screen.GameScreen.prototype,{
	__class__: tests.TestScreen
});
tests.TestScreen2 = function() {
	shoe3d.screen.GameScreen.call(this);
	var msh = new shoe3d.component.MeshDisplay(new THREE.BoxGeometry(1,1,1),new THREE.MeshPhongMaterial({ color : 16240435}));
	var go = new shoe3d.core.GameObject("out").addComponent(msh);
	var go2 = new shoe3d.core.GameObject("INSIDE").addComponent(new shoe3d.component.MeshDisplay(new THREE.BoxGeometry(0.9,0.9,0.9)));
	tests.Main.trace2(go2.components.length);
	go.addChild(go2);
	go2.transform.position.z = 1.5;
	this.gameScene.addChild(go);
	var l = new THREE.AmbientLight(16777215);
	this.gameScene.add(l);
	var dl = new THREE.DirectionalLight(3051516,0.8);
	dl.rotateX(0.45);
	dl.rotateX(0.74);
	dl.rotateX(1.74);
	this.gameScene.add(dl);
	this.cameraHandle.owner.transform.position.z = 5;
};
tests.TestScreen2.__name__ = ["tests","TestScreen2"];
tests.TestScreen2.__super__ = shoe3d.screen.GameScreen;
tests.TestScreen2.prototype = $extend(shoe3d.screen.GameScreen.prototype,{
	__class__: tests.TestScreen2
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
shoe3d.screen.ScreenManager._currentScreenName = "";
shoe3d.System.time = shoe3d.core.Time;
shoe3d.System.screen = shoe3d.screen.ScreenManager;
shoe3d.System.window = shoe3d.core.WindowManager;
shoe3d.System.renderer = shoe3d.core.RenderManager;
tests.Main.main();
})();

//# sourceMappingURL=Shoe3dPROJECT.js.map