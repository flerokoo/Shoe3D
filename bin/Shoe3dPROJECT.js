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
Math.__name__ = ["Math"];
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
haxe.Timer = function() { };
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
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
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var shoe3d = {};
shoe3d.core = {};
shoe3d.core.RenderManager = function() { };
shoe3d.core.RenderManager.__name__ = ["shoe3d","core","RenderManager"];
shoe3d.core.RenderManager.init = function() {
	var _this = window.document;
	shoe3d.core.RenderManager.container = _this.createElement("div");
	window.document.body.appendChild(shoe3d.core.RenderManager.container);
	shoe3d.core.RenderManager.renderer = new THREE.WebGLRenderer();
	shoe3d.core.RenderManager.renderer.setSize(800,600);
	shoe3d.core.RenderManager.container.appendChild(shoe3d.core.RenderManager.renderer.domElement);
	shoe3d.core.RenderManager.renderer.setClearColor(15893267);
	shoe3d.core.RenderManager.renderer.autoClear = false;
	shoe3d.core.RenderManager.uiCamera = new THREE.OrthographicCamera(-1,1,10,-10,0.1,1000);
};
shoe3d.core.RenderManager.render = function() {
	shoe3d.core.RenderManager.renderer.clear();
	var _g = 0;
	var _g1 = shoe3d.System.screen._currentScreen.layers;
	while(_g < _g1.length) {
		var layer = _g1[_g];
		++_g;
		if(layer.camera != null) shoe3d.core.RenderManager.renderer.render(layer,layer.camera);
	}
	if(shoe3d.core.RenderManager.stats != null) shoe3d.core.RenderManager.stats.update(shoe3d.core.RenderManager.renderer);
};
shoe3d.core.RenderManager.showStats = function() {
	if(shoe3d.core.RenderManager.stats == null) {
		shoe3d.core.RenderManager.stats = new THREEx.RendererStats();
		shoe3d.core.RenderManager.stats.domElement.style.position = "absolute";
		shoe3d.core.RenderManager.stats.domElement.style.left = "0px";
		shoe3d.core.RenderManager.stats.domElement.style.bottom = "0px";
	}
	window.document.body.appendChild(shoe3d.core.RenderManager.stats.domElement);
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
	shoe3d.core.Time.timeSinceGameStart = cur - shoe3d.core.Time.gameStartTime;
};
shoe3d.core.Time.prototype = {
	__class__: shoe3d.core.Time
};
shoe3d.core.WindowMode = { __ename__ : true, __constructs__ : ["Fill","Default"] };
shoe3d.core.WindowMode.Fill = ["Fill",0];
shoe3d.core.WindowMode.Fill.__enum__ = shoe3d.core.WindowMode;
shoe3d.core.WindowMode.Default = ["Default",1];
shoe3d.core.WindowMode.Default.__enum__ = shoe3d.core.WindowMode;
shoe3d.core.WindowManager = function() { };
shoe3d.core.WindowManager.__name__ = ["shoe3d","core","WindowManager"];
shoe3d.core.WindowManager.init = function() {
	shoe3d.core.WindowManager._prePublicResize = new shoe3d.util.ZeroSignal();
	shoe3d.core.WindowManager.resize = new shoe3d.util.ZeroSignal();
	shoe3d.core.WindowManager.orientation = new shoe3d.util.Value(shoe3d.core.Orientation.Portrait);
	window.addEventListener("orientationchange",function(_) {
		shoe3d.core.WindowManager.callLater(shoe3d.core.WindowManager.onOrientationChange);
	});
	window.addEventListener("resize",function(_1) {
		shoe3d.core.WindowManager.callLater(shoe3d.core.WindowManager.onResize);
	});
	shoe3d.core.WindowManager.updateOrientation();
};
shoe3d.core.WindowManager.onResize = function() {
	shoe3d.core.WindowManager.updateLayout();
	shoe3d.core.WindowManager._prePublicResize.emit();
	shoe3d.core.WindowManager.resize.emit();
};
shoe3d.core.WindowManager.onOrientationChange = function() {
	shoe3d.core.WindowManager.updateLayout();
	shoe3d.core.WindowManager._prePublicResize.emit();
	shoe3d.core.WindowManager.updateOrientation();
};
shoe3d.core.WindowManager.updateOrientation = function() {
	shoe3d.core.WindowManager.orientation.set((function($this) {
		var $r;
		var _g = window.orientation;
		$r = (function($this) {
			var $r;
			switch(_g) {
			case -90:case 90:case 270:case -270:
				$r = shoe3d.core.Orientation.Landscape;
				break;
			default:
				$r = shoe3d.core.Orientation.Portrait;
			}
			return $r;
		}($this));
		return $r;
	}(this)));
};
shoe3d.core.WindowManager.updateLayout = function() {
	shoe3d.core.WindowManager.resetStyle();
	var canvas = shoe3d.core.RenderManager.renderer.domElement;
	var div = shoe3d.core.RenderManager.container;
	if(shoe3d.core.WindowManager.mode == shoe3d.core.WindowMode.Fill) {
		window.document.body.style.padding = "0";
		div.style.margin = "0";
		div.style.width = window.innerWidth + "px";
		div.style.height = window.innerHeight + "px";
		shoe3d.core.RenderManager.renderer.setSize(window.innerWidth,window.innerHeight);
	} else {
		div.style.width = shoe3d.core.WindowManager.get_width() + "px";
		div.style.height = shoe3d.core.WindowManager.get_height() + "px";
		shoe3d.core.RenderManager.renderer.setSize(shoe3d.core.WindowManager.get_width(),shoe3d.core.WindowManager.get_height());
		window.document.body.style.padding = "0.06px";
		var marginTop = Math.floor(Math.max(0,(window.innerHeight - shoe3d.core.WindowManager.get_height()) / 2));
		div.style.margin = marginTop + "px auto 0";
		haxe.Log.trace("OK",{ fileName : "WindowManager.hx", lineNumber : 92, className : "shoe3d.core.WindowManager", methodName : "updateLayout", customParams : [marginTop + "px auto 0"]});
	}
};
shoe3d.core.WindowManager.resetStyle = function() {
	window.document.body.style.margin = "0";
	window.document.body.style.padding = "0";
	window.document.body.style.width = "100%";
	window.document.body.style.height = "100%";
};
shoe3d.core.WindowManager.hideMobileBrowser = function() {
};
shoe3d.core.WindowManager.callLater = function(fn,delay) {
	if(delay == null) delay = 300;
	window.setTimeout(fn,delay);
};
shoe3d.core.WindowManager.set_mode = function(value) {
	shoe3d.core.WindowManager.mode = value;
	shoe3d.core.WindowManager.updateLayout();
	return shoe3d.core.WindowManager.mode;
};
shoe3d.core.WindowManager.get_width = function() {
	var _g = shoe3d.core.WindowManager.mode;
	switch(_g[1]) {
	case 0:
		return window.innerWidth;
	case 1:
		return shoe3d.core.WindowManager.width;
	}
};
shoe3d.core.WindowManager.get_height = function() {
	var _g = shoe3d.core.WindowManager.mode;
	switch(_g[1]) {
	case 0:
		return window.innerHeight;
	case 1:
		return shoe3d.core.WindowManager.height;
	}
};
shoe3d.core.WindowManager.setSize = function(w,h,autoSetMode) {
	if(autoSetMode == null) autoSetMode = true;
	shoe3d.core.WindowManager.width = w;
	shoe3d.core.WindowManager.height = h;
	if(autoSetMode) shoe3d.core.WindowManager.set_mode(shoe3d.core.WindowMode.Default);
	shoe3d.core.WindowManager.updateLayout();
};
shoe3d.System = function() { };
shoe3d.System.__name__ = ["shoe3d","System"];
shoe3d.System.init = function() {
	shoe3d.core.WindowManager.init();
	shoe3d.core.RenderManager.init();
	shoe3d.screen.ScreenManager.init();
	shoe3d.core.Time.init();
	shoe3d.System.window.updateLayout();
	shoe3d.System.loop = new shoe3d.core.MainLoop();
};
shoe3d.System.start = function() {
	shoe3d.System.loop.start();
};
shoe3d.System.showFPSMeter = function() {
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
shoe3d.component.CameraHolder = function() {
	shoe3d.core.Component.call(this);
};
shoe3d.component.CameraHolder.__name__ = ["shoe3d","component","CameraHolder"];
shoe3d.component.CameraHolder.__super__ = shoe3d.core.Component;
shoe3d.component.CameraHolder.prototype = $extend(shoe3d.core.Component.prototype,{
	camera: null
	,onAdded: function() {
	}
	,onUpdate: function() {
		if(this.owner.layer != null && this.owner.layer.camera != null) {
			this.owner.layer.camera.position.set(Math.cos(shoe3d.core.Time.timeSinceGameStart),Math.sin(shoe3d.core.Time.timeSinceGameStart),0).multiplyScalar(50);
			this.owner.layer.camera.lookAt(new THREE.Vector3(0,0,0));
		}
	}
	,__class__: shoe3d.component.CameraHolder
});
shoe3d.component.RandomRotator = function() {
	this.t = 0;
	shoe3d.core.Component.call(this);
};
shoe3d.component.RandomRotator.__name__ = ["shoe3d","component","RandomRotator"];
shoe3d.component.RandomRotator.__super__ = shoe3d.core.Component;
shoe3d.component.RandomRotator.prototype = $extend(shoe3d.core.Component.prototype,{
	t: null
	,onUpdate: function() {
		this.owner.transform.position.set(Math.cos(shoe3d.core.Time.timeSinceGameStart),Math.sin(shoe3d.core.Time.timeSinceGameStart),0).multiplyScalar(20);
		this.owner.transform.lookAt(this.owner.transform.worldToLocal(new THREE.Vector3(0,0,0)));
	}
	,__class__: shoe3d.component.RandomRotator
});
shoe3d.component.S3Mesh = function(geom,mat) {
	shoe3d.core.Component.call(this);
	this.geometry = geom;
	this.material = mat;
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	if(this.owner != null) this.owner.transform.add(this.mesh);
};
shoe3d.component.S3Mesh.__name__ = ["shoe3d","component","S3Mesh"];
shoe3d.component.S3Mesh.__super__ = shoe3d.core.Component;
shoe3d.component.S3Mesh.prototype = $extend(shoe3d.core.Component.prototype,{
	geometry: null
	,material: null
	,mesh: null
	,onAdded: function() {
		this.owner.transform.add(this.mesh);
	}
	,__class__: shoe3d.component.S3Mesh
});
shoe3d.component.S3Sprite = function(mat) {
	var _g = this;
	shoe3d.core.Component.call(this);
	var mgr = new THREE.LoadingManager();
	var l = new THREE.ImageLoader(mgr);
	l.load("assets/button1.png",function(img) {
		var tex = new THREE.Texture(img);
		_g.sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map : tex}));
		if(_g.owner != null) {
			haxe.Log.trace("addFrom",{ fileName : "S3Sprite.hx", lineNumber : 35, className : "shoe3d.component.S3Sprite", methodName : "new"});
			_g.owner.transform.add(_g.sprite);
		}
	});
};
shoe3d.component.S3Sprite.__name__ = ["shoe3d","component","S3Sprite"];
shoe3d.component.S3Sprite.__super__ = shoe3d.core.Component;
shoe3d.component.S3Sprite.prototype = $extend(shoe3d.core.Component.prototype,{
	sprite: null
	,onAdded: function() {
		if(this.sprite != null) {
			this.owner.transform.add(this.sprite);
			haxe.Log.trace("add",{ fileName : "S3Sprite.hx", lineNumber : 51, className : "shoe3d.component.S3Sprite", methodName : "onAdded"});
		}
	}
	,__class__: shoe3d.component.S3Sprite
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
	,layer: null
	,parent: null
	,add: function(component) {
		this.components.push(component);
		component.owner = this;
		component.onAdded();
		return this;
	}
	,has: function(cl) {
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(i,cl)) return true;
		}
		return false;
	}
	,remove: function(component) {
		var i = HxOverrides.indexOf(this.components,component,0);
		if(i >= 0) {
			this.components.splice(i,1);
			component.onRemoved();
		}
		return this;
	}
	,get: function(cl) {
		var ret = null;
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(i,cl)) ret = i;
		}
		return ret;
	}
	,addChild: function(child) {
		this.children.push(child);
		child.parent = this;
		child.setLayerReferenceRecursive(this.layer);
		this.transform.add(child.transform);
	}
	,removeChild: function(child) {
		HxOverrides.remove(this.children,child);
		child.parent = null;
		child.setLayerReferenceRecursive(null);
		this.transform.remove(child.transform);
	}
	,getChild: function(i) {
		if(this.children[i] == null) throw "No child at specified index i=" + i;
		return this.children[i];
	}
	,onAdded: function() {
	}
	,onRemoved: function() {
	}
	,setLayerReferenceRecursive: function(l) {
		this.layer = l;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.setLayerReferenceRecursive(l);
		}
	}
	,numComponents: null
	,get_numComponents: function() {
		return this.components.length;
	}
	,__class__: shoe3d.core.GameObject
};
shoe3d.core.Layer = function(name) {
	THREE.Scene.call(this);
	this.name = name;
	this.gameObjects = [];
	shoe3d.System.window._prePublicResize.connect($bind(this,this.reconfigureCamera));
};
shoe3d.core.Layer.__name__ = ["shoe3d","core","Layer"];
shoe3d.core.Layer.__super__ = THREE.Scene;
shoe3d.core.Layer.prototype = $extend(THREE.Scene.prototype,{
	camera: null
	,gameObjects: null
	,reconfigureCamera: function() {
		if(this.camera != null) {
			if(js.Boot.__instanceof(this.camera,THREE.PerspectiveCamera)) {
				var pc;
				pc = js.Boot.__cast(this.camera , THREE.PerspectiveCamera);
				pc.aspect = shoe3d.System.window.get_width() / shoe3d.System.window.get_height();
				pc.updateProjectionMatrix();
			} else if(js.Boot.__instanceof(this.camera,THREE.OrthographicCamera)) {
				var cam;
				cam = js.Boot.__cast(this.camera , THREE.OrthographicCamera);
				cam.left = 0;
				cam.right = shoe3d.System.window.get_width();
				cam.top = 0;
				cam.left = shoe3d.System.window.get_height();
				cam.updateProjectionMatrix();
			}
		}
	}
	,addChild: function(child) {
		this.gameObjects.push(child);
		child.setLayerReferenceRecursive(this);
		THREE.Scene.prototype.add.call(this,child.transform);
		return this;
	}
	,removeChild: function(child) {
		HxOverrides.remove(this.gameObjects,child);
		child.setLayerReferenceRecursive(null);
		THREE.Scene.prototype.remove.call(this,child.transform);
		return this;
	}
	,setCamera: function(cam) {
		this.camera = cam;
		this.camera.up = new THREE.Vector3(0,0,1);
		this.reconfigureCamera();
		return this;
	}
	,addPerspectiveCamera: function() {
		var pc = new THREE.PerspectiveCamera(60,1,0.1,1000);
		this.setCamera(pc);
		return pc;
	}
	,addOrthoCamera: function() {
		var pc = new THREE.OrthographicCamera(1,1,1,1,0.1,1000);
		this.setCamera(pc);
		return pc;
	}
	,__class__: shoe3d.core.Layer
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
		var _g1 = shoe3d.screen.ScreenManager._currentScreen.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = layer.gameObjects;
			while(_g2 < _g3.length) {
				var i = _g3[_g2];
				++_g2;
				this.updateGameObject(i);
			}
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
shoe3d.core.UILayer = function(name) {
	shoe3d.core.Layer.call(this,name);
};
shoe3d.core.UILayer.__name__ = ["shoe3d","core","UILayer"];
shoe3d.core.UILayer.__super__ = shoe3d.core.Layer;
shoe3d.core.UILayer.prototype = $extend(shoe3d.core.Layer.prototype,{
	reconfigureCamera: function() {
		if(this.camera != null) {
			var cam;
			cam = js.Boot.__cast(this.camera , THREE.OrthographicCamera);
			cam.left = 0;
			cam.right = shoe3d.System.window.get_width();
			cam.top = 0;
			cam.left = shoe3d.System.window.get_height();
			cam.position.set(0,0,500);
			cam.lookAt(new THREE.Vector3(0,0,0));
			cam.updateProjectionMatrix();
		}
	}
	,setCamera: function(cam) {
		shoe3d.util.Assert.that(js.Boot.__instanceof(cam,THREE.OrthographicCamera),"UILayer allows only ortho camera");
		this.camera = cam;
		this.camera.up = new THREE.Vector3(0,0,1);
		this.reconfigureCamera();
		return this;
	}
	,__class__: shoe3d.core.UILayer
});
shoe3d.core.Orientation = { __ename__ : true, __constructs__ : ["Portrait","Landscape"] };
shoe3d.core.Orientation.Portrait = ["Portrait",0];
shoe3d.core.Orientation.Portrait.__enum__ = shoe3d.core.Orientation;
shoe3d.core.Orientation.Landscape = ["Landscape",1];
shoe3d.core.Orientation.Landscape.__enum__ = shoe3d.core.Orientation;
shoe3d.screen.GameScreen = function() {
	this.layers = [];
};
shoe3d.screen.GameScreen.__name__ = ["shoe3d","screen","GameScreen"];
shoe3d.screen.GameScreen.prototype = {
	layers: null
	,onShow: function() {
	}
	,onHide: function() {
	}
	,addLayer: function(lr) {
		shoe3d.util.Assert.that(HxOverrides.indexOf(this.layers,lr,0) < 0,"Layer(${scr.name}) is already on the scene");
		this.layers.push(lr);
		return this;
	}
	,newLayer: function(name) {
		var layer = new shoe3d.core.Layer(name);
		layer.addPerspectiveCamera();
		this.addLayer(layer);
		return layer;
	}
	,newUILayer: function(name) {
		var layer = new shoe3d.core.UILayer(name);
		layer.addOrthoCamera();
		this.addLayer(layer);
		return layer;
	}
	,__class__: shoe3d.screen.GameScreen
};
shoe3d.screen.transition = {};
shoe3d.screen.transition.Transition = function() {
};
shoe3d.screen.transition.Transition.__name__ = ["shoe3d","screen","transition","Transition"];
shoe3d.screen.transition.Transition.prototype = {
	start: function(currentScreen,targetScreen,fn) {
		targetScreen.onHide();
		if(fn != null) fn();
		targetScreen.onShow();
		shoe3d.screen.ScreenManager._currentScreen = targetScreen;
		this.end();
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
shoe3d.util.Sentinel = function(signal,fn) {
	this.isOnce = false;
	this._signal = signal;
	this._fn = fn;
	this.isOnce = false;
};
shoe3d.util.Sentinel.__name__ = ["shoe3d","util","Sentinel"];
shoe3d.util.Sentinel.prototype = {
	isOnce: null
	,_next: null
	,_fn: null
	,_signal: null
	,once: function() {
		this.isOnce = true;
		return this;
	}
	,dispose: function() {
		if(this._signal != null) {
			this._signal.disconnectInner(this);
			this._signal = null;
			this._fn = null;
		}
	}
	,__class__: shoe3d.util.Sentinel
};
shoe3d.util.Signal = function() {
};
shoe3d.util.Signal.__name__ = ["shoe3d","util","Signal"];
shoe3d.util.Signal.prototype = {
	_head: null
	,connectInner: function(callback,highPriority) {
		if(highPriority == null) highPriority = false;
		var sentinel = new shoe3d.util.Sentinel(this,callback);
		if(this._head == shoe3d.util.Signal.DUMMY) throw "Can't connect to signal when dispatching";
		if(this._head == null) this._head = sentinel; else if(highPriority) {
			sentinel._next = this._head;
			this._head = sentinel;
		} else {
			var last = this._head;
			while(last._next != null) last = last._next;
			last._next = sentinel;
		}
		return sentinel;
	}
	,disconnectInner: function(sentinel) {
		if(this._head == shoe3d.util.Signal.DUMMY) throw "Can't connect to signal when dispatching";
		var last = this._head;
		var prev = null;
		while(last != null) {
			if(last == sentinel) {
				if(prev == null) this._head = this._head._next; else prev._next = last._next;
				return;
			}
			prev = last;
			last = last._next;
		}
	}
	,isDispatching: function() {
		return this._head == shoe3d.util.Signal.DUMMY;
	}
	,__class__: shoe3d.util.Signal
};
shoe3d.util.DoubleSignal = function() {
	shoe3d.util.Signal.call(this);
};
shoe3d.util.DoubleSignal.__name__ = ["shoe3d","util","DoubleSignal"];
shoe3d.util.DoubleSignal.__super__ = shoe3d.util.Signal;
shoe3d.util.DoubleSignal.prototype = $extend(shoe3d.util.Signal.prototype,{
	connect: function(callback,highPriority) {
		if(highPriority == null) highPriority = false;
		return this.connectInner(callback,highPriority);
	}
	,emit: function(arg1,arg2) {
		if(this._head == shoe3d.util.Signal.DUMMY) throw "Can't emit when dispatching";
		var last = this._head;
		while(last != null) {
			last._fn(arg1,arg2);
			if(last.isOnce) last.dispose();
			last = last._next;
		}
	}
	,__class__: shoe3d.util.DoubleSignal
});
shoe3d.util.Value = function(initial) {
	this.__ = initial;
	this.change = new shoe3d.util.DoubleSignal();
};
shoe3d.util.Value.__name__ = ["shoe3d","util","Value"];
shoe3d.util.Value.prototype = {
	__: null
	,change: null
	,set: function(to,noUpdate) {
		if(noUpdate == null) noUpdate = false;
		if(noUpdate) this.__ = to; else this.set__(to);
		return this;
	}
	,get__: function() {
		return this.__;
	}
	,set__: function(value) {
		var old = this.get__();
		this.__ = value;
		this.change.emit(this,old);
		return this.get__();
	}
	,__class__: shoe3d.util.Value
};
shoe3d.util.ZeroSignal = function() {
	shoe3d.util.Signal.call(this);
};
shoe3d.util.ZeroSignal.__name__ = ["shoe3d","util","ZeroSignal"];
shoe3d.util.ZeroSignal.__super__ = shoe3d.util.Signal;
shoe3d.util.ZeroSignal.prototype = $extend(shoe3d.util.Signal.prototype,{
	connect: function(callback,callbackhighPriority) {
		if(callbackhighPriority == null) callbackhighPriority = false;
		return this.connectInner(callback,callbackhighPriority);
	}
	,emit: function() {
		if(this._head == shoe3d.util.Signal.DUMMY) throw "Can't emit when dispatching";
		var last = this._head;
		while(last != null) {
			last._fn();
			if(last.isOnce) last.dispose();
			last = last._next;
		}
	}
	,__class__: shoe3d.util.ZeroSignal
});
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
	shoe3d.System.start();
	shoe3d.System.renderer.showStats();
};
tests.Main.createConsole = function() {
	var _this = window.document;
	tests.Main.console = _this.createElement("div");
	tests.Main.trace2("CONSOLE CREATED");
};
tests.Main.trace2 = function(a) {
	tests.Main.console.innerHTML = tests.Main.console.innerHTML + "<br/>" + Std.string(a);
};
tests.TestScreen = function() {
	shoe3d.screen.GameScreen.call(this);
	var layer = new shoe3d.core.Layer("layer");
	this.addLayer(layer);
	var _g = 0;
	while(_g < 400) {
		var i = _g++;
		var go = new shoe3d.core.GameObject("GO" + i).add(new shoe3d.component.S3Mesh(new THREE.BoxGeometry(Math.random() * 0.5 + 1,Math.random() * 0.5 + 1,Math.random() * 0.5 + 1),new THREE.MeshPhongMaterial({ color : 16777215 * Math.random()})));
		go.transform.position.x = Math.random() * 40 - 20;
		go.transform.position.y = Math.random() * 40 - 20;
		go.transform.position.z = Math.random() * 40 - 20;
		layer.addChild(go);
	}
	layer.add(new THREE.DirectionalLight(9366269,0.7));
	layer.add(new THREE.AmbientLight(16777215));
	layer.addChild(new shoe3d.core.GameObject().add(new shoe3d.component.CameraHolder()));
	layer.setCamera(new THREE.PerspectiveCamera(60,1.3333333333333333,0.1,1000));
	var ui = this.newUILayer("UILAYER");
	var g2d = new shoe3d.core.GameObject("SPRITETEST");
	var spr = new shoe3d.component.S3Sprite();
	ui.addChild(g2d);
	var mgr = new THREE.LoadingManager();
	var l = new THREE.TextureLoader(mgr);
	l.load("/assets/button1.png",function(img) {
		var sprite = null;
		var mat = null;
		mat = new THREE.SpriteMaterial({map:img});;
		sprite = new THREE.Sprite(mat);
		haxe.Log.trace("addFromwww",{ fileName : "TestScreen.hx", lineNumber : 120, className : "tests.TestScreen", methodName : "new"});
		ui.add(sprite);
	});
	ui.add(new THREE.AmbientLight(16777215));
	var cc;
	cc = js.Boot.__cast(ui.camera , THREE.OrthographicCamera);
	cc.left = -10;
	cc.right = -cc.left;
	cc.top = 10;
	cc.bottom = -cc.top;
	cc.updateProjectionMatrix();
	cc.position.set(10,10,100);
	cc.lookAt(new THREE.Vector3(0,0,0));
	cc.updateMatrix();
	cc.updateProjectionMatrix();
};
tests.TestScreen.__name__ = ["tests","TestScreen"];
tests.TestScreen.__super__ = shoe3d.screen.GameScreen;
tests.TestScreen.prototype = $extend(shoe3d.screen.GameScreen.prototype,{
	__class__: tests.TestScreen
});
tests.TestScreen2 = function() {
	shoe3d.screen.GameScreen.call(this);
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
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
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
shoe3d.core.WindowManager.mode = shoe3d.core.WindowMode.Fill;
shoe3d.core.WindowManager.width = 640;
shoe3d.core.WindowManager.height = 800;
shoe3d.System.time = shoe3d.core.Time;
shoe3d.System.screen = shoe3d.screen.ScreenManager;
shoe3d.System.window = shoe3d.core.WindowManager;
shoe3d.System.renderer = shoe3d.core.RenderManager;
shoe3d.util.Signal.DUMMY = new shoe3d.util.Sentinel(null,null);
tests.Main.main();
})();

//# sourceMappingURL=Shoe3dPROJECT.js.map