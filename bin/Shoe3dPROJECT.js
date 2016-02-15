(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
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
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
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
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
var Std = function() { };
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
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
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; };
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
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.IntMap
};
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
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
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
shoe3d.core.InputManager = function() { };
shoe3d.core.InputManager.__name__ = ["shoe3d","core","InputManager"];
shoe3d.core.InputManager.init = function() {
	shoe3d.core.InputManager.pointer = new shoe3d.core.input.PointerManager();
	shoe3d.core.InputManager.mouse = new shoe3d.core.input.MouseManager();
	shoe3d.core.InputManager.touch = new shoe3d.core.input.TouchManager();
	shoe3d.core.InputManager.keyboard = new shoe3d.core.input.KeyboardManager();
	shoe3d.core.InputManager._canvas = shoe3d.System.renderer.renderer.domElement;
	shoe3d.core.InputManager._div = shoe3d.System.renderer.container;
	var onMouse = function(event) {
		if(event.timeStamp - shoe3d.core.InputManager._lastTouchTime < 1000) return;
		var bounds = shoe3d.core.InputManager._canvas.getBoundingClientRect();
		var x = (event.clientX - bounds.left) * shoe3d.System.window.get_width() / bounds.width;
		var y = (event.clientY - bounds.top) * shoe3d.System.window.get_height() / bounds.height;
		var _g = event.type;
		switch(_g) {
		case "mousedown":
			if(event.target == shoe3d.core.InputManager._canvas) {
				event.preventDefault();
				shoe3d.core.InputManager.mouse.submitDown(x,y,event.button);
				shoe3d.core.InputManager._canvas.focus();
			}
			break;
		case "mousemove":
			shoe3d.core.InputManager.mouse.submitMove(x,y);
			break;
		case "mouseup":
			shoe3d.core.InputManager.mouse.submitUp(x,y,event.button);
			break;
		case "mousewheel":case "DOMMouseScroll":
			var vel;
			if(event.type == "mousewheel") vel = event.wheelDelta / 40; else vel = -event.detail;
			if(shoe3d.core.InputManager.mouse.submitScroll(x,y,vel)) event.preventDefault();
			break;
		}
	};
	window.addEventListener("mousedown",onMouse,false);
	window.addEventListener("mouseup",onMouse,false);
	window.addEventListener("mousemove",onMouse,false);
	shoe3d.core.InputManager._canvas.addEventListener("mousewheel",onMouse,false);
	shoe3d.core.InputManager._canvas.addEventListener("DOMMouseScroll",onMouse,false);
	shoe3d.core.InputManager._canvas.addEventListener("contextmenu",function(e) {
		e.preventDefault();
	},false);
	var isStandartTouch = typeof(window.ontouchstart) != "undefined";
	var isMsTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1 );
	if(isStandartTouch || isMsTouch) {
		if(isStandartTouch) shoe3d.core.InputManager.touch.maxPoints = 4; else shoe3d.core.InputManager.touch.maxPoints = window.navigator.msMaxTouchPoints;
		var onTouch = function(e1) {
			var changedTouches;
			if(isStandartTouch) changedTouches = e1.changedTouches; else changedTouches = [e1];
			var bounds1 = e1.target.getBoundingClientRect();
			shoe3d.core.InputManager._lastTouchTime = e1.timeStamp;
			var _g1 = e1.type;
			switch(_g1) {
			case "touchstart":case "MSPointerDown":case "pointerdown":
				e1.preventDefault();
				if(shoe3d.util.HtmlUtils.HIDE_MOBILE_BROWSER) shoe3d.util.HtmlUtils.hideMobileBrowser();
				var _g11 = 0;
				while(_g11 < changedTouches.length) {
					var t = changedTouches[_g11];
					++_g11;
					var x1 = (t.clientX - bounds1.left) * shoe3d.System.window.get_width() / bounds1.width;
					var y1 = (t.clientY - bounds1.top) * shoe3d.System.window.get_height() / bounds1.height;
					var id;
					id = (isStandartTouch?t.identifier:t.pointerId) | 0;
					shoe3d.core.InputManager.touch.submitDown(id,x1,y1);
				}
				break;
			case "touchmove":case "MSPointerMove":case "pointermove":
				e1.preventDefault();
				var _g12 = 0;
				while(_g12 < changedTouches.length) {
					var t1 = changedTouches[_g12];
					++_g12;
					var x2 = (t1.clientX - bounds1.left) * shoe3d.System.window.get_width() / bounds1.width;
					var y2 = (t1.clientY - bounds1.top) * shoe3d.System.window.get_height() / bounds1.height;
					var id1;
					id1 = (isStandartTouch?t1.identifier:t1.pointerId) | 0;
					shoe3d.core.InputManager.touch.submitMove(id1,x2,y2);
				}
				break;
			case "touchend":case "touchcancel":case "MSPointerUp":case "pointerup":
				var _g13 = 0;
				while(_g13 < changedTouches.length) {
					var t2 = changedTouches[_g13];
					++_g13;
					var x3 = (t2.clientX - bounds1.left) * shoe3d.System.window.get_width() / bounds1.width;
					var y3 = (t2.clientY - bounds1.top) * shoe3d.System.window.get_height() / bounds1.height;
					var id2;
					id2 = (isStandartTouch?t2.identifier:t2.pointerId) | 0;
					shoe3d.core.InputManager.touch.submitUp(id2,x3,y3);
				}
				break;
			}
		};
		if(window.navigator.userAgent.toLowerCase().indexOf("samsung") >= 0) window.addEventListener("touchstart",function(e2) {
		});
		if(isStandartTouch) {
			shoe3d.core.InputManager._canvas.addEventListener("touchstart",onTouch,false);
			shoe3d.core.InputManager._canvas.addEventListener("touchmove",onTouch,false);
			shoe3d.core.InputManager._canvas.addEventListener("touchend",onTouch,false);
			shoe3d.core.InputManager._canvas.addEventListener("touchcancel",onTouch,false);
		} else {
			shoe3d.core.InputManager._canvas.addEventListener("MSPointerDown",onTouch,false);
			shoe3d.core.InputManager._canvas.addEventListener("MSPointerMove",onTouch,false);
			shoe3d.core.InputManager._canvas.addEventListener("MSPointerUp",onTouch,false);
		}
	} else shoe3d.core.InputManager.touch._disabled = true;
	shoe3d.core.InputManager.keyboard = new shoe3d.core.input.KeyboardManager();
	var onKey = function(event1) {
		var _g2 = event1.type;
		switch(_g2) {
		case "keydown":
			if(shoe3d.core.InputManager.keyboard.submitDown(event1.keyCode)) event1.preventDefault();
			break;
		case "keyup":
			shoe3d.core.InputManager.keyboard.submitUp(event1.keyCode);
			break;
		}
	};
	window.addEventListener("keydown",onKey,false);
	window.addEventListener("keyup",onKey,false);
};
shoe3d.core.InputManager.getX = function(event,bounds) {
	return (event.clientX - bounds.left) * shoe3d.System.window.get_width() / bounds.width;
};
shoe3d.core.InputManager.getY = function(event,bounds) {
	return (event.clientY - bounds.top) * shoe3d.System.window.get_height() / bounds.height;
};
shoe3d.core.RenderManager = function() { };
shoe3d.core.RenderManager.__name__ = ["shoe3d","core","RenderManager"];
shoe3d.core.RenderManager.init = function() {
	var _this = window.document;
	shoe3d.core.RenderManager.container = _this.createElement("div");
	window.document.body.appendChild(shoe3d.core.RenderManager.container);
	shoe3d.core.RenderManager.renderer = new THREE.WebGLRenderer();
	shoe3d.core.RenderManager.renderer.setSize(800,600);
	shoe3d.core.RenderManager.container.appendChild(shoe3d.core.RenderManager.renderer.domElement);
	shoe3d.core.RenderManager.renderer.autoClear = false;
};
shoe3d.core.RenderManager.render = function() {
	shoe3d.core.RenderManager.renderer.setClearColor(shoe3d.core.RenderManager.clearColor);
	shoe3d.core.RenderManager.renderer.clear();
	if(shoe3d.System.screen._currentScreen != null) {
		var _g = 0;
		var _g1 = shoe3d.System.screen._currentScreen.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			layer.render(shoe3d.core.RenderManager.renderer);
		}
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
	shoe3d.screen.ScreenManager._base = new shoe3d.core.game.GameObject();
	shoe3d.screen.ScreenManager.defaultTransition = new shoe3d.screen.transition.Transition();
};
shoe3d.screen.ScreenManager.show = function(name,changeFn) {
	shoe3d.util.Assert.that(shoe3d.screen.ScreenManager._screens.exists(name),"Screen not exists: " + name);
	shoe3d.screen.ScreenManager._targetScreen = Type.createInstance(shoe3d.screen.ScreenManager._screens.get(name),[]);
	if(shoe3d.screen.ScreenManager._currentScreen != null) {
		var transition;
		if(shoe3d.screen.ScreenManager._transitions.exists(shoe3d.screen.ScreenManager._currentScreenName + ">>" + name)) transition = shoe3d.screen.ScreenManager._transitions.get(shoe3d.screen.ScreenManager._currentScreenName + ">>" + name); else transition = shoe3d.screen.ScreenManager.defaultTransition;
		transition.start(shoe3d.screen.ScreenManager._currentScreen,shoe3d.screen.ScreenManager._targetScreen);
	} else {
		shoe3d.screen.ScreenManager._currentScreen = shoe3d.screen.ScreenManager._targetScreen;
		if(changeFn != null) changeFn();
		shoe3d.screen.ScreenManager._currentScreen.onShow();
	}
	shoe3d.core.Time.onScreenLoad();
};
shoe3d.screen.ScreenManager.addScreen = function(name,scr) {
	if(shoe3d.screen.ScreenManager._screens == null) shoe3d.screen.ScreenManager._screens = new haxe.ds.StringMap();
	shoe3d.screen.ScreenManager._screens.set(name,scr);
};
shoe3d.screen.ScreenManager.setSize = function(w,h) {
	shoe3d.screen.ScreenManager.width = w;
	shoe3d.screen.ScreenManager.height = h;
};
shoe3d.core.Time = function() {
};
shoe3d.core.Time.__name__ = ["shoe3d","core","Time"];
shoe3d.core.Time.init = function() {
	var performance = window.performance;
	var hasPerformance = performance != null && shoe3d.util.HtmlUtils.polyfill("now",performance);
	if(hasPerformance) {
		shoe3d.core.Time.now = function() {
			return performance.now() / 1000;
		};
		shoe3d.util.Log.sys("Using window.performance timer");
	} else {
		shoe3d.core.Time.now = shoe3d.core.Time._now;
		shoe3d.util.Log.sys("No window.performance, using system date");
	}
	shoe3d.core.Time._lastUpdateTime = shoe3d.core.Time._gameStartTime = shoe3d.core.Time.now();
};
shoe3d.core.Time.update = function() {
	var cur = shoe3d.core.Time.now();
	shoe3d.core.Time.dt = cur - shoe3d.core.Time._lastUpdateTime;
	shoe3d.core.Time.timeSinceGameStart = cur - shoe3d.core.Time._gameStartTime;
	shoe3d.core.Time.timeSinceScreenShow = cur - shoe3d.core.Time._screenShowTime;
	if(shoe3d.core.Time.dt > 1) shoe3d.core.Time.dt = 1;
	if(shoe3d.core.Time.dt < 0) shoe3d.core.Time.dt = 0;
	shoe3d.core.Time._lastUpdateTime = cur;
};
shoe3d.core.Time.onScreenLoad = function() {
	shoe3d.core.Time._screenShowTime = shoe3d.core.Time.now();
};
shoe3d.core.Time._now = function() {
	return Date.now() / 1000;
};
shoe3d.core.Time.prototype = {
	__class__: shoe3d.core.Time
};
shoe3d.core.WindowMode = { __ename__ : true, __constructs__ : ["Fill","Default"] };
shoe3d.core.WindowMode.Fill = ["Fill",0];
shoe3d.core.WindowMode.Fill.toString = $estr;
shoe3d.core.WindowMode.Fill.__enum__ = shoe3d.core.WindowMode;
shoe3d.core.WindowMode.Default = ["Default",1];
shoe3d.core.WindowMode.Default.toString = $estr;
shoe3d.core.WindowMode.Default.__enum__ = shoe3d.core.WindowMode;
shoe3d.core.WindowManager = function() { };
shoe3d.core.WindowManager.__name__ = ["shoe3d","core","WindowManager"];
shoe3d.core.WindowManager.init = function() {
	shoe3d.core.WindowManager.hidden = new shoe3d.util.Value(false);
	shoe3d.core.WindowManager._prePublicResize = new shoe3d.util.signal.ZeroSignal();
	shoe3d.core.WindowManager.resize = new shoe3d.util.signal.ZeroSignal();
	shoe3d.core.WindowManager.orientation = new shoe3d.util.Value(shoe3d.core.Orientation.Portrait);
	window.addEventListener("orientationchange",function(_) {
		shoe3d.core.WindowManager.callLater(shoe3d.core.WindowManager.onOrientationChange);
	});
	window.addEventListener("resize",function(_1) {
		shoe3d.core.WindowManager.callLater(shoe3d.core.WindowManager.onResize);
	});
	var api = shoe3d.util.HtmlUtils.loadExtension("hidden",window);
	if(api.value != null) {
		var onVisibilityChange = function(e) {
			shoe3d.core.WindowManager.hidden.set__(Reflect.field(window.document,api.field));
		};
		onVisibilityChange(null);
		window.document.addEventListener(api.prefix + "visibilitychange",onVisibilityChange,false);
		shoe3d.util.Log.sys("Visibility API supported");
	} else {
		var onPageTransition = function(e1) {
			shoe3d.core.WindowManager.hidden.set__(e1.type == "pagehide");
		};
		window.addEventListener("pageshow",onPageTransition,false);
		window.addEventListener("pagehide",onPageTransition,false);
		shoe3d.util.Log.sys("No Visibility API. Using pageshow/pagehide fallback");
	}
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
	var isMobile = shoe3d.util.Info.isMobileBrowser();
	if(shoe3d.core.WindowManager.mode == shoe3d.core.WindowMode.Fill || isMobile) {
		window.document.body.style.padding = "0";
		div.style.margin = "0";
		var ratio = window.devicePixelRatio;
		if(Math.max(window.innerWidth,window.innerHeight) * ratio > 2300 && isMobile) ratio = 1;
		shoe3d.core.RenderManager.renderer.setSize(window.innerWidth * ratio,window.innerHeight * ratio);
		div.style.width = canvas.style.width = window.innerWidth + "px";
		div.style.height = canvas.style.height = window.innerHeight + "px";
	} else {
		div.style.width = shoe3d.core.WindowManager.get_width() + "px";
		div.style.height = shoe3d.core.WindowManager.get_height() + "px";
		shoe3d.core.RenderManager.renderer.setSize(shoe3d.core.WindowManager.get_width(),shoe3d.core.WindowManager.get_height());
		window.document.body.style.padding = "0.06px";
		var marginTop = Math.floor(Math.max(0,(window.innerHeight - shoe3d.core.WindowManager.get_height()) / 2));
		div.style.margin = marginTop + "px auto 0";
	}
};
shoe3d.core.WindowManager.resetStyle = function() {
	window.document.body.style.margin = "0";
	window.document.body.style.padding = "0";
	window.document.body.style.width = "100%";
	window.document.body.style.height = "100%";
	shoe3d.core.RenderManager.container.style.padding = "0px";
	shoe3d.core.RenderManager.container.style.overflow = "hidden";
	shoe3d.core.RenderManager.container.style.position = "relative";
	shoe3d.core.RenderManager.container.style.msTouchAction = "none";
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
shoe3d.core.WindowManager.setSize = function(w,h,fit) {
	if(fit == null) fit = false;
	shoe3d.core.WindowManager.width = w;
	shoe3d.core.WindowManager.height = h;
	shoe3d.core.WindowManager.set_mode(shoe3d.core.WindowMode.Default);
	shoe3d.core.WindowManager.updateLayout();
};
shoe3d.System = function() { };
shoe3d.System.__name__ = ["shoe3d","System"];
shoe3d.System.init = function(originalWidth,originalHeight) {
	if(originalHeight == null) originalHeight = 800;
	if(originalWidth == null) originalWidth = 640;
	shoe3d.System.W = originalWidth;
	shoe3d.System.H = originalHeight;
	shoe3d.core.WindowManager.init();
	shoe3d.core.RenderManager.init();
	shoe3d.screen.ScreenManager.init();
	shoe3d.core.Time.init();
	shoe3d.core.InputManager.init();
	shoe3d.System.window.updateLayout();
	shoe3d.System._loop = new shoe3d.core.MainLoop();
	shoe3d.System._loop._frame.connect(shoe3d.System.clearInfoBox);
	shoe3d.System._loop.start();
};
shoe3d.System.clearInfoBox = function(dt) {
	shoe3d.System._infoFrameCounter++;
	if(shoe3d.System._infoFrameCounter >= shoe3d.System.updateInfoEveryNthFrame) shoe3d.System._infoFrameCounter = 0;
	if(shoe3d.System._info != null && shoe3d.System._infoFrameCounter == 0) shoe3d.System._info.innerHTML = "";
	if(shoe3d.System._showFPS) shoe3d.System.addInfo(shoe3d.System._loop.getFPSString());
	if(shoe3d.System._showFPS) shoe3d.System.addInfo(shoe3d.System._loop.getTimingString());
};
shoe3d.System.start = function() {
};
shoe3d.System.showFPSMeter = function() {
	if(shoe3d.System._info == null) shoe3d.System.showInfoBox();
	shoe3d.System._showFPS = true;
};
shoe3d.System.showInfoBox = function() {
	var _this = window.document;
	shoe3d.System._info = _this.createElement("div");
	shoe3d.System._info.style.position = "absolute";
	shoe3d.System._info.style.top = "0px";
	shoe3d.System._info.style.left = "0px";
	shoe3d.System._info.style.backgroundColor = "black";
	shoe3d.System._info.style.opacity = "0.7";
	shoe3d.System._info.style.padding = "5px 3px";
	shoe3d.System._info.style.color = "red";
	shoe3d.System._info.style.fontSize = "9px";
	shoe3d.System._info.style.fontWeight = "bold";
	shoe3d.System._info.style.fontFamily = "Helvetica, Arial, sans-serif";
	shoe3d.System._info.style.lineHeight = "15px";
	shoe3d.System._info.style.width = "100px";
	window.document.body.appendChild(shoe3d.System._info);
};
shoe3d.System.hideInfoBox = function() {
	if(shoe3d.System._info != null) window.document.body.removeChild(shoe3d.System._info);
};
shoe3d.System.loadFolderFromAssets = function(folder,onSuccess,onProgress,registerThisPackWithName) {
	var ldr = new shoe3d.asset.AssetPackLoader();
	ldr.add("button1","assets/button1.png",0);
	ldr.add("button2","assets/button1.png",0);
	ldr.add("index","index.html",0);
	ldr.add("tnt","assets/tnt.ogg",0);
	ldr.add("model1","assets/model1.geom",0);
	ldr.add("cube","assets/cube.geom",0);
	ldr.add("sprites","assets/sprites.png",0);
	ldr.add("sprites.txt","assets/sprites.txt",0);
	ldr.add("anim","assets/test_anim.geom",0);
	ldr.add("anim2","assets/test_anim2.geom",0);
	var promise = ldr.start(onSuccess,onProgress);
	promise.success.connect(function(pack) {
		shoe3d.asset.Res.registerPack(pack,registerThisPackWithName);
	}).once();
	return promise;
};
shoe3d.System.addInfo = function(text,breakLine) {
	if(breakLine == null) breakLine = true;
	if(shoe3d.System._info != null && shoe3d.System._infoFrameCounter == 0) shoe3d.System._info.innerHTML += (breakLine && shoe3d.System._info.innerHTML != ""?"<br/>":"") + Std.string(text);
};
shoe3d.System.get_root = function() {
	return shoe3d.screen.ScreenManager._base;
};
shoe3d.asset = {};
shoe3d.asset.AssetFormat = { __ename__ : true, __constructs__ : ["PNG","JPG","GIF","JXR","WEBP","MP3","M4A","OPUS","OGG","WAV","AAC","GEOM","RAW"] };
shoe3d.asset.AssetFormat.PNG = ["PNG",0];
shoe3d.asset.AssetFormat.PNG.toString = $estr;
shoe3d.asset.AssetFormat.PNG.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.JPG = ["JPG",1];
shoe3d.asset.AssetFormat.JPG.toString = $estr;
shoe3d.asset.AssetFormat.JPG.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.GIF = ["GIF",2];
shoe3d.asset.AssetFormat.GIF.toString = $estr;
shoe3d.asset.AssetFormat.GIF.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.JXR = ["JXR",3];
shoe3d.asset.AssetFormat.JXR.toString = $estr;
shoe3d.asset.AssetFormat.JXR.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.WEBP = ["WEBP",4];
shoe3d.asset.AssetFormat.WEBP.toString = $estr;
shoe3d.asset.AssetFormat.WEBP.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.MP3 = ["MP3",5];
shoe3d.asset.AssetFormat.MP3.toString = $estr;
shoe3d.asset.AssetFormat.MP3.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.M4A = ["M4A",6];
shoe3d.asset.AssetFormat.M4A.toString = $estr;
shoe3d.asset.AssetFormat.M4A.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.OPUS = ["OPUS",7];
shoe3d.asset.AssetFormat.OPUS.toString = $estr;
shoe3d.asset.AssetFormat.OPUS.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.OGG = ["OGG",8];
shoe3d.asset.AssetFormat.OGG.toString = $estr;
shoe3d.asset.AssetFormat.OGG.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.WAV = ["WAV",9];
shoe3d.asset.AssetFormat.WAV.toString = $estr;
shoe3d.asset.AssetFormat.WAV.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.AAC = ["AAC",10];
shoe3d.asset.AssetFormat.AAC.toString = $estr;
shoe3d.asset.AssetFormat.AAC.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.GEOM = ["GEOM",11];
shoe3d.asset.AssetFormat.GEOM.toString = $estr;
shoe3d.asset.AssetFormat.GEOM.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetFormat.RAW = ["RAW",12];
shoe3d.asset.AssetFormat.RAW.toString = $estr;
shoe3d.asset.AssetFormat.RAW.__enum__ = shoe3d.asset.AssetFormat;
shoe3d.asset.AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
shoe3d.asset.AssetEntry.__name__ = ["shoe3d","asset","AssetEntry"];
shoe3d.asset.AssetEntry.prototype = {
	name: null
	,url: null
	,format: null
	,bytes: null
	,__class__: shoe3d.asset.AssetEntry
};
shoe3d.asset.AssetPack = function() {
	this._texMap = new haxe.ds.StringMap();
	this._fileMap = new haxe.ds.StringMap();
	this._soundMap = new haxe.ds.StringMap();
	this._geomMap = new haxe.ds.StringMap();
	this._atlasMap = new haxe.ds.StringMap();
	this._geomDefMap = new haxe.ds.StringMap();
};
shoe3d.asset.AssetPack.__name__ = ["shoe3d","asset","AssetPack"];
shoe3d.asset.AssetPack.prototype = {
	_texMap: null
	,_fileMap: null
	,_geomMap: null
	,_soundMap: null
	,_atlasMap: null
	,_geomDefMap: null
	,getAtlas: function(name) {
		if(!this._atlasMap.exists(name)) throw "No atlas with name=" + name;
		return this._atlasMap.get(name);
	}
	,defineAtlas: function(name,texName,jsonName) {
		if(!this._texMap.exists(texName) || !this._fileMap.exists(jsonName)) throw "No image or json from atlas " + name;
		var atlas = new shoe3d.asset.Atlas(this.getTexDef(texName).texture,this.getFile(jsonName).content);
		this._atlasMap.set(name,atlas);
		return atlas;
	}
	,defineGeomDef: function(name,geomName,texDefName,isTransparent) {
		if(isTransparent == null) isTransparent = false;
		if(!this._geomMap.exists(geomName)) throw "No geometry with name=" + geomName;
		if(this.getTexDef(texDefName,false) == null) throw "No texDef with name=" + texDefName;
		var texd = this.getTexDef(texDefName);
		var geom = this.getGeometry(geomName);
		var newGeom = geom.clone();
		shoe3d.util.UVTools.setGeometryUV(newGeom,texd.uv);
		var geomDef = { geom : newGeom, texDef : texd, originalUV : geom.faceVertexUvs, material : new THREE.MeshPhongMaterial({ map : texd.texture, transparent : isTransparent})};
		this._geomDefMap.set(name,geomDef);
	}
	,getGeomDef: function(name,required) {
		if(required == null) required = true;
		var ret = this._geomDefMap.get(name);
		if(ret == null && required) throw "No GeomDef with name=" + name;
		return ret;
	}
	,getTexDef: function(name,required) {
		if(required == null) required = true;
		var ret = null;
		var $it0 = this._atlasMap.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			if(i.exists(name)) return i.get(name);
		}
		ret = this._texMap.get(name);
		if(ret == null && required) throw "No texture with name=" + name;
		return ret;
	}
	,getSound: function(name,required) {
		if(required == null) required = true;
		if(!this._soundMap.exists(name)) {
			if(required) throw "No sound with name=" + name; else return null;
		}
		return createjs.Sound.createInstance(name);
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		var ret = this._fileMap.get(name);
		if(ret == null && required) throw "No file with name=" + name;
		return ret;
	}
	,getGeometry: function(name,required) {
		if(required == null) required = true;
		var ret = this._geomMap.get(name);
		if(ret == null && required) throw "No file with name=" + name;
		return ret;
	}
	,createGeometryFromFile: function(filename,geometryname) {
	}
	,__class__: shoe3d.asset.AssetPack
};
shoe3d.asset.AssetPackLoader = function() {
	this._loading = false;
	this._pack = new shoe3d.asset.AssetPack();
	this._entries = [];
};
shoe3d.asset.AssetPackLoader.__name__ = ["shoe3d","asset","AssetPackLoader"];
shoe3d.asset.AssetPackLoader.detectImageFormats = function(ret) {
	var formats = [shoe3d.asset.AssetFormat.PNG,shoe3d.asset.AssetFormat.JPG,shoe3d.asset.AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) ret(formats);
	};
	var webp;
	var _this = window.document;
	webp = _this.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(shoe3d.asset.AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr;
	var _this1 = window.document;
	jxr = _this1.createElement("img");
	jxr.onload = jxr.onerror = function(_1) {
		if(jxr.width == 1) formats.unshift(shoe3d.asset.AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
};
shoe3d.asset.AssetPackLoader.detectAudioFormats = function() {
	var audio;
	var _this = window.document;
	audio = _this.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) {
		shoe3d.util.Log.warn("Audio is not supported at all in this browser!");
		return [];
	}
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Windows Phone)\\b","");
	var userAgent = window.navigator.userAgent;
	if(blacklist.match(userAgent) && false) {
		shoe3d.util.Log.warn("HTML5 audio is blacklisted for this browser " + userAgent);
		return [];
	}
	var types = [{ format : shoe3d.asset.AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : shoe3d.asset.AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : shoe3d.asset.AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : shoe3d.asset.AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : shoe3d.asset.AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
};
shoe3d.asset.AssetPackLoader.getSupportedFormatsAsync = function(fn) {
	if(shoe3d.asset.AssetPackLoader._supportedFormats == null) shoe3d.asset.AssetPackLoader.detectImageFormats(function(imgFormats) {
		shoe3d.asset.AssetPackLoader._supportedFormats = imgFormats.concat(shoe3d.asset.AssetPackLoader.detectAudioFormats()).concat([shoe3d.asset.AssetFormat.RAW,shoe3d.asset.AssetFormat.GEOM]);
		fn(shoe3d.asset.AssetPackLoader._supportedFormats);
	}); else fn(shoe3d.asset.AssetPackLoader._supportedFormats);
};
shoe3d.asset.AssetPackLoader.pickBestEntry = function(entries,handler) {
	shoe3d.asset.AssetPackLoader.getSupportedFormatsAsync(function(formats) {
		var _g = 0;
		while(_g < formats.length) {
			var format = formats[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < entries.length) {
				var entry = entries[_g1];
				++_g1;
				if(entry.format == format) {
					handler(entry);
					return;
				}
			}
		}
		handler(null);
	});
};
shoe3d.asset.AssetPackLoader.prototype = {
	_entries: null
	,_pack: null
	,_loading: null
	,_entriesToLoad: null
	,_entriesToPick: null
	,_manager: null
	,_onCompleteCallback: null
	,_onProgressChangeCallback: null
	,_promise: null
	,add: function(name,url,bytes,format) {
		if(format == null) format = this.getFormat(url);
		this._entries.push(new shoe3d.asset.AssetEntry(name,url,format,bytes));
	}
	,getFormat: function(url) {
		var extension = shoe3d.util.StringHelp.getUrlExtension(url);
		if(extension != null) {
			var _g = extension.toLowerCase();
			switch(_g) {
			case "jpg":case "jpeg":
				return shoe3d.asset.AssetFormat.JPG;
			case "png":
				return shoe3d.asset.AssetFormat.PNG;
			case "m4a":
				return shoe3d.asset.AssetFormat.M4A;
			case "mp3":
				return shoe3d.asset.AssetFormat.MP3;
			case "ogg":
				return shoe3d.asset.AssetFormat.OGG;
			case "opus":
				return shoe3d.asset.AssetFormat.OPUS;
			case "wav":
				return shoe3d.asset.AssetFormat.WAV;
			case "aac":
				return shoe3d.asset.AssetFormat.AAC;
			case "geom":
				return shoe3d.asset.AssetFormat.GEOM;
			}
		} else throw "No asset format: " + url;
		return shoe3d.asset.AssetFormat.RAW;
	}
	,start: function(onComplete,onProgress) {
		var _g = this;
		if(this._loading) throw "This asset pack is already loading";
		this._loading = true;
		this._onCompleteCallback = onComplete;
		this._onProgressChangeCallback = onProgress;
		var groups = new haxe.ds.StringMap();
		var _g1 = 0;
		var _g11 = this._entries;
		while(_g1 < _g11.length) {
			var i = _g11[_g1];
			++_g1;
			if(!groups.exists(i.name)) groups.set(i.name,[]);
			groups.get(i.name).push(i);
		}
		this._entriesToLoad = [];
		this._entriesToPick = new shoe3d.util.Value(Lambda.count(groups));
		this._entriesToPick.change.connect(function(cur,prev) {
			if(cur <= 0) _g.load();
		});
		var $it0 = groups.keys();
		while( $it0.hasNext() ) {
			var groupName = $it0.next();
			var groupName1 = [groupName];
			var group = groups.get(groupName1[0]);
			shoe3d.asset.AssetPackLoader.pickBestEntry(group,(function(groupName1) {
				return function(e) {
					if(e == null) throw "Asset format is not supported: " + groupName1[0] + " ";
					_g._entriesToLoad.push(e);
					var _g12 = _g._entriesToPick;
					var _g2 = _g12.get__();
					_g12.set__(_g2 - 1);
					_g2;
				};
			})(groupName1));
		}
		return this._promise = new shoe3d.util.promise.Promise();
	}
	,load: function() {
		var _g3 = this;
		createjs.Sound.alternateExtensions = ["aac"];
		this._manager = new THREE.LoadingManager($bind(this,this.onCompletePack),$bind(this,this.onProgress));
		var _g = 0;
		var _g1 = this._entriesToLoad;
		while(_g < _g1.length) {
			var e = [_g1[_g]];
			++_g;
			var _g2 = e[0].format;
			switch(_g2[1]) {
			case 1:case 0:case 2:
				new THREE.TextureLoader(this._manager).load(e[0].url,(function(e) {
					return function(tex) {
						_g3.onLoadTexture(tex,e[0]);
					};
				})(e));
				break;
			case 5:case 6:case 7:case 8:case 9:
				new shoe3d.asset.SoundLoader(this._manager).load(e[0].url,e[0].name,this._pack);
				break;
			case 11:
				new THREE.XHRLoader(this._manager).load(e[0].url,(function(e) {
					return function(data) {
						_g3.onLoadGeometry(data,e[0]);
					};
				})(e));
				break;
			default:
				new THREE.XHRLoader(this._manager).load(e[0].url,(function(e) {
					return function(data1) {
						_g3.onLoadData(data1,e[0]);
					};
				})(e));
			}
		}
	}
	,onProgress: function(nm,a,b) {
		this._promise.progress.set__(a / b);
		if(this._onProgressChangeCallback != null) this._onProgressChangeCallback(this._promise.progress.get__());
	}
	,onCompletePack: function() {
		this._promise.set_result(this._pack);
		if(this._onCompleteCallback != null) this._onCompleteCallback(this._pack);
	}
	,onLoadTexture: function(tex,e) {
		tex.minFilter = THREE.LinearFilter;
		tex.magFilter = THREE.LinearFilter;
		this._pack._texMap.set(e.name,{ texture : tex, uv : { umin : 0, vmin : 0, umax : 1, vmax : 1}, width : tex.image.width != null?tex.image.width:tex.image.naturalWidth, height : tex.image.height != null?tex.image.height:tex.image.naturalHeight});
		if(tex.image.width != null) tex.naturalWidth = tex.image.width; else tex.naturalWidth = tex.image.naturalWidth;
		if(tex.image.height != null) tex.naturalHeight = tex.image.height; else tex.naturalHeight = tex.image.naturalHeight;
	}
	,onLoadSound: function(data,e) {
		haxe.Log.trace(data,{ fileName : "AssetPackLoader.hx", lineNumber : 274, className : "shoe3d.asset.AssetPackLoader", methodName : "onLoadSound"});
		haxe.Log.trace("SND LOAD",{ fileName : "AssetPackLoader.hx", lineNumber : 276, className : "shoe3d.asset.AssetPackLoader", methodName : "onLoadSound"});
	}
	,onLoadGeometry: function(data,e) {
		var parser = new THREE.JSONLoader();
		this._pack._geomMap.set(e.name,parser.parse(JSON.parse(data)).geometry);
	}
	,onLoadData: function(data,e) {
		var value = new shoe3d.asset.File(data);
		this._pack._fileMap.set(e.name,value);
	}
	,__class__: shoe3d.asset.AssetPackLoader
};
shoe3d.asset.AtlasType = { __ename__ : true, __constructs__ : ["ShoeBox","TexturePacker","Auto"] };
shoe3d.asset.AtlasType.ShoeBox = ["ShoeBox",0];
shoe3d.asset.AtlasType.ShoeBox.toString = $estr;
shoe3d.asset.AtlasType.ShoeBox.__enum__ = shoe3d.asset.AtlasType;
shoe3d.asset.AtlasType.TexturePacker = ["TexturePacker",1];
shoe3d.asset.AtlasType.TexturePacker.toString = $estr;
shoe3d.asset.AtlasType.TexturePacker.__enum__ = shoe3d.asset.AtlasType;
shoe3d.asset.AtlasType.Auto = ["Auto",2];
shoe3d.asset.AtlasType.Auto.toString = $estr;
shoe3d.asset.AtlasType.Auto.__enum__ = shoe3d.asset.AtlasType;
shoe3d.asset.Atlas = function(image,json) {
	this._texMap = new haxe.ds.StringMap();
	this.image = image;
	if(json != null) this.parseJSON(json);
	var $it0 = this._texMap.keys();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		haxe.Log.trace("" + i + " => " + Std.string(this._texMap.get(i).uv),{ fileName : "Atlas.hx", lineNumber : 40, className : "shoe3d.asset.Atlas", methodName : "new"});
	}
};
shoe3d.asset.Atlas.__name__ = ["shoe3d","asset","Atlas"];
shoe3d.asset.Atlas.prototype = {
	image: null
	,_texMap: null
	,addSubTexture: function(name,rect) {
		var value = { uv : this.UVfromRectangle(rect), texture : this.image, width : rect.width, height : rect.height};
		this._texMap.set(name,value);
		return this;
	}
	,UVfromRectangle: function(rect) {
		if(this.image == null) throw "Image is null";
		haxe.Log.trace(this.image.naturalWidth,{ fileName : "Atlas.hx", lineNumber : 53, className : "shoe3d.asset.Atlas", methodName : "UVfromRectangle", customParams : [this.image.naturalHeight]});
		return { umin : rect.x / this.image.naturalWidth, vmin : (this.image.naturalHeight - rect.y - rect.height) / this.image.naturalHeight, umax : (rect.x + rect.width) / this.image.naturalWidth, vmax : (this.image.naturalHeight - rect.y) / this.image.naturalHeight};
	}
	,parseJSON: function(json,type) {
		if(type == shoe3d.asset.AtlasType.TexturePacker) this.parseTexturePacker(json); else if(type == shoe3d.asset.AtlasType.ShoeBox) this.parseShoeBox(json); else if(type == shoe3d.asset.AtlasType.Auto || type == null) {
			var a = JSON.parse(json);
			if(Object.prototype.hasOwnProperty.call(a,"frames") && Object.prototype.hasOwnProperty.call(a,"meta")) {
				if((Reflect.field(a,"frames") instanceof Array) && Reflect.field(a,"frames").__enum__ == null) this.parseTexturePacker(json); else if(Std["is"](Reflect.field(a,"frames"),Dynamic)) this.parseShoeBox(json);
			}
		}
		return this;
	}
	,parseTexturePacker: function(json) {
		var a = null;
		try {
			a = JSON.parse(json);
		} catch( e ) {
			throw "Can' parse json";
		}
		if(!Object.prototype.hasOwnProperty.call(a,"frames") && !Object.prototype.hasOwnProperty.call(a,"meta")) throw "Wrong JSON Format";
		var frames = Reflect.field(a,"frames");
		var _g = 0;
		while(_g < frames.length) {
			var o = frames[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(o,"filename") && Object.prototype.hasOwnProperty.call(o,"frame")) {
				var name = Reflect.field(o,"filename");
				var frame = Reflect.field(o,"frame");
				var len = name.lastIndexOf(".");
				name = HxOverrides.substr(name,0,len);
				var value = { uv : this.UVfromRectangle(new shoe3d.util.math.Rectangle(Reflect.field(frame,"x"),Reflect.field(frame,"y"),Reflect.field(frame,"w"),Reflect.field(frame,"h"))), texture : this.image, width : Reflect.field(frame,"w"), height : Reflect.field(frame,"h")};
				this._texMap.set(name,value);
			}
		}
	}
	,parseShoeBox: function(json) {
		var a = null;
		try {
			a = JSON.parse(json);
		} catch( e ) {
			throw "Can' parse json";
		}
		if(!Object.prototype.hasOwnProperty.call(a,"frames") && !Object.prototype.hasOwnProperty.call(a,"meta")) throw "Wrong JSON Format";
		var frames = Reflect.field(a,"frames");
		var fields = Reflect.fields(frames);
		var _g = 0;
		while(_g < fields.length) {
			var name = fields[_g];
			++_g;
			var o = Reflect.field(frames,name);
			if(Object.prototype.hasOwnProperty.call(o,"frame")) {
				var frame = Reflect.field(o,"frame");
				var clearName;
				var len = name.lastIndexOf(".");
				clearName = HxOverrides.substr(name,0,len);
				var value = { uv : this.UVfromRectangle(new shoe3d.util.math.Rectangle(Reflect.field(frame,"x"),Reflect.field(frame,"y"),Reflect.field(frame,"w"),Reflect.field(frame,"h"))), texture : this.image, width : Reflect.field(frame,"w"), height : Reflect.field(frame,"h")};
				this._texMap.set(clearName,value);
			}
		}
	}
	,exists: function(name) {
		return this._texMap.exists(name);
	}
	,get: function(name) {
		return this._texMap.get(name);
	}
	,__class__: shoe3d.asset.Atlas
};
shoe3d.asset.File = function(content) {
	this.content = content;
};
shoe3d.asset.File.__name__ = ["shoe3d","asset","File"];
shoe3d.asset.File.prototype = {
	content: null
	,__class__: shoe3d.asset.File
};
shoe3d.asset.Res = function() { };
shoe3d.asset.Res.__name__ = ["shoe3d","asset","Res"];
shoe3d.asset.Res.registerPack = function(pack,name) {
	if(shoe3d.asset.Res._packMap == null) shoe3d.asset.Res._packMap = new haxe.ds.StringMap();
	var key;
	if(name == null || name == "") key = shoe3d.asset.Res.getRandomName(); else key = name;
	shoe3d.asset.Res._packMap.set(key,pack);
};
shoe3d.asset.Res.getRandomName = function() {
	var e = "abcdefgh0123456789";
	var r = "";
	while(r.length < 30) r += e.charAt(Math.floor(Math.random() * e.length));
	return r;
};
shoe3d.asset.Res.getTexDef = function(name) {
	if(shoe3d.asset.Res._packMap == null) throw "No asset packs";
	var $it0 = shoe3d.asset.Res._packMap.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		var ret = i.getTexDef(name,false);
		if(ret != null) return ret;
	}
	throw "No texDef " + name + " found";
	return null;
};
shoe3d.asset.Res.getGeomDef = function(name) {
	if(shoe3d.asset.Res._packMap == null) throw "No asset packs";
	var $it0 = shoe3d.asset.Res._packMap.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		var ret = i.getGeomDef(name,false);
		if(ret != null) return ret;
	}
	throw "No geomDef " + name + " found";
	return null;
};
shoe3d.asset.SoundLoader = function(manager) {
	THREE.Loader.call(this);
	this._manager = manager;
};
shoe3d.asset.SoundLoader.__name__ = ["shoe3d","asset","SoundLoader"];
shoe3d.asset.SoundLoader.__super__ = THREE.Loader;
shoe3d.asset.SoundLoader.prototype = $extend(THREE.Loader.prototype,{
	_loader: null
	,_manager: null
	,_url: null
	,_pack: null
	,_id: null
	,load: function(url,id,pack) {
		this._pack = pack;
		this._url = url;
		this._manager.itemStart(this._url);
		this._id = id;
		createjs.Sound.on("fileload",$bind(this,this.onLoad));
		createjs.Sound.registerSound(url,id);
	}
	,onLoad: function(evt) {
		this._pack._soundMap.set(this._id,this._url);
		this._manager.itemEnd(this._url);
	}
	,__class__: shoe3d.asset.SoundLoader
});
shoe3d.core.game = {};
shoe3d.core.game.Component = function() {
	this._started = false;
};
shoe3d.core.game.Component.__name__ = ["shoe3d","core","game","Component"];
shoe3d.core.game.Component.prototype = {
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
	,__class__: shoe3d.core.game.Component
};
shoe3d.component = {};
shoe3d.component.CameraHolder = function() {
	shoe3d.core.game.Component.call(this);
};
shoe3d.component.CameraHolder.__name__ = ["shoe3d","component","CameraHolder"];
shoe3d.component.CameraHolder.__super__ = shoe3d.core.game.Component;
shoe3d.component.CameraHolder.prototype = $extend(shoe3d.core.game.Component.prototype,{
	camera: null
	,onAdded: function() {
	}
	,onUpdate: function() {
		if(this.owner.layer != null && this.owner.layer.camera != null) {
			this.owner.layer.camera.position.set(Math.cos(shoe3d.core.Time.timeSinceGameStart * 0.2),Math.sin(shoe3d.core.Time.timeSinceGameStart * 0.2),0).multiplyScalar(20);
			this.owner.layer.camera.lookAt(new THREE.Vector3(0,0,0));
		}
	}
	,__class__: shoe3d.component.CameraHolder
});
shoe3d.component.Element2D = function() {
	this._hovering = false;
	this.pointerEnabled = true;
	shoe3d.core.game.Component.call(this);
	this.alpha = new shoe3d.util.Value(1.0);
};
shoe3d.component.Element2D.__name__ = ["shoe3d","component","Element2D"];
shoe3d.component.Element2D.hitTest = function(entity,x,y) {
	var sprite = entity.get(shoe3d.component.Element2D);
	if(sprite != null) {
		if(sprite.alpha.get__() <= 0 || !sprite.pointerEnabled) return null;
	}
	var result = shoe3d.component.Element2D.hitTestBackwards(entity.children[0],x,y);
	if(result != null) return result;
	if(sprite != null && sprite.contains(x,y)) return sprite; else return null;
};
shoe3d.component.Element2D.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = shoe3d.component.Element2D.hitTestBackwards(entity.parent != null?entity.parent.children[HxOverrides.indexOf(entity.parent.children,entity,0) + 1]:null,x,y);
		if(result != null) return result; else return shoe3d.component.Element2D.hitTest(entity,x,y);
	}
	return null;
};
shoe3d.component.Element2D.__super__ = shoe3d.core.game.Component;
shoe3d.component.Element2D.prototype = $extend(shoe3d.core.game.Component.prototype,{
	alpha: null
	,pointerUp: null
	,pointerDown: null
	,pointerMove: null
	,pointerIn: null
	,pointerOut: null
	,_pointerUp: null
	,_pointerDown: null
	,_pointerMove: null
	,_pointerIn: null
	,_pointerOut: null
	,pointerEnabled: null
	,_hovering: null
	,_hoverConnection: null
	,getBounds: function() {
		return new shoe3d.util.math.Rectangle();
	}
	,contains: function(x,y) {
		return false;
	}
	,setAlpha: function(a) {
		this.alpha.set__(a);
		return this;
	}
	,setLevel: function(level) {
		return this;
	}
	,setPremultipliedAlpha: function(alpha) {
		return this;
	}
	,onUpdate: function() {
		this.setLevel(shoe3d.component.Element2D.lastLevel++);
		shoe3d.component.Element2D.lastAlpha *= this.alpha.get__();
		this.setPremultipliedAlpha(shoe3d.component.Element2D.lastAlpha);
	}
	,getParentElement2D: function() {
		if(this.owner == null) return null;
		var e = this.owner.parent;
		while(e != null) {
			var r = e.get(shoe3d.component.Element2D);
			if(r != null) return r;
			e = e.parent;
		}
		return null;
	}
	,onPointerDown: function(e) {
		this.onHover(e);
		if(this.get_pointerDown() != null) this.get_pointerDown().emit(e);
	}
	,onHover: function(e) {
		if(this._hovering) return;
		this._hovering = true;
		if(this._pointerIn != null || this._pointerOut != null) {
			if(this._pointerIn != null) this._pointerIn.emit(e);
			this.connectHover();
		}
	}
	,connectHover: function() {
		var _g = this;
		if(this._hoverConnection != null) return;
		this._hoverConnection = shoe3d.System.input.pointer.move.connect(function(event) {
			var hit = event.hit;
			while(hit != null) {
				if(hit == _g) return;
				hit = hit.getParentElement2D();
			}
			if(_g._pointerOut != null && _g._hovering) _g._pointerOut.emit(event);
			_g._hovering = false;
			_g._hoverConnection.dispose();
			_g._hoverConnection = null;
		});
	}
	,onPointerMove: function(e) {
		this.onHover(e);
		if(this._pointerMove != null) this._pointerMove.emit(e);
	}
	,onPointerUp: function(event) {
		{
			var _g = event.source;
			switch(_g[1]) {
			case 1:
				var touchpoint = _g[2];
				if(this._pointerOut != null && this._hovering) this._pointerOut.emit(event);
				this._hovering = false;
				if(this._hoverConnection != null) {
					this._hoverConnection.dispose();
					this._hoverConnection = null;
				}
				break;
			default:
			}
		}
		if(this._pointerUp != null) this._pointerUp.emit(event);
	}
	,get_pointerDown: function() {
		if(this._pointerDown == null) this._pointerDown = new shoe3d.util.signal.SingleSignal();
		return this._pointerDown;
	}
	,get_pointerUp: function() {
		if(this._pointerUp == null) this._pointerUp = new shoe3d.util.signal.SingleSignal();
		return this._pointerUp;
	}
	,get_pointerMove: function() {
		if(this._pointerMove == null) this._pointerMove = new shoe3d.util.signal.SingleSignal();
		return this._pointerMove;
	}
	,get_pointerIn: function() {
		if(this._pointerIn == null) this._pointerIn = new shoe3d.util.signal.SingleSignal();
		return this._pointerIn;
	}
	,get_pointerOut: function() {
		if(this._pointerOut == null) this._pointerOut = new shoe3d.util.signal.SingleSignal();
		return this._pointerOut;
	}
	,__class__: shoe3d.component.Element2D
});
shoe3d.component.GeometryDisplay = function(geom) {
	shoe3d.core.game.Component.call(this);
	this.mesh = new THREE.Mesh(geom.geom,geom.material != null?geom.material:new THREE.MeshPhongMaterial({ map : geom.texDef.texture, transparent : true}));
};
shoe3d.component.GeometryDisplay.__name__ = ["shoe3d","component","GeometryDisplay"];
shoe3d.component.GeometryDisplay.__super__ = shoe3d.core.game.Component;
shoe3d.component.GeometryDisplay.prototype = $extend(shoe3d.core.game.Component.prototype,{
	mesh: null
	,onAdded: function() {
		this.owner.transform.add(this.mesh);
	}
	,onRemoved: function() {
		this.owner.transform.remove(this.mesh);
	}
	,__class__: shoe3d.component.GeometryDisplay
});
shoe3d.component.Sprite2D = function(textureName) {
	this.anchorY = 0;
	this.anchorX = 0;
	shoe3d.component.Element2D.call(this);
	this.texDef = shoe3d.asset.Res.getTexDef(textureName);
	this.geom = new THREE.PlaneGeometry(0,0,1,1);
	this.material = new THREE.MeshBasicMaterial({ transparent : true, side : THREE.DoubleSide});
	this.mesh = new THREE.Mesh(this.geom,this.material);
	this.redefineSprite();
};
shoe3d.component.Sprite2D.__name__ = ["shoe3d","component","Sprite2D"];
shoe3d.component.Sprite2D.__super__ = shoe3d.component.Element2D;
shoe3d.component.Sprite2D.prototype = $extend(shoe3d.component.Element2D.prototype,{
	mesh: null
	,geom: null
	,texDef: null
	,material: null
	,anchorX: null
	,anchorY: null
	,redefineSprite: function() {
		if(this.texDef == null) return;
		var w = this.texDef.width;
		var h = this.texDef.height;
		var uv = this.texDef.uv;
		this.geom.uvsNeedUpdate = true;
		this.geom.verticesNeedUpdate = true;
		this.geom.vertices[0].set(-w / 2,h / 2,0);
		this.geom.vertices[1].set(w / 2,h / 2,0);
		this.geom.vertices[2].set(-w / 2,-h / 2,0);
		this.geom.vertices[3].set(w / 2,-h / 2,0);
		var uvs = this.geom.faceVertexUvs[0];
		uvs[0][0].set(uv.umin,uv.vmax);
		uvs[0][1].set(uv.umin,uv.vmin);
		uvs[0][2].set(uv.umax,uv.vmax);
		uvs[1][0].set(uv.umin,uv.vmin);
		uvs[1][1].set(uv.umax,uv.vmin);
		uvs[1][2].set(uv.umax,uv.vmax);
		this.material.map = this.texDef.texture;
	}
	,setAnchor: function(x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		this.set_anchorX(x);
		this.set_anchorY(y);
	}
	,setTexture: function(tex) {
		shoe3d.util.Assert.that(tex != null,"Texture is null");
		this.texDef = tex;
		this.redefineSprite();
	}
	,updateAnchor: function() {
		this.mesh.position.x = -this.anchorX;
		this.mesh.position.y = -this.anchorY;
	}
	,onAdded: function() {
		this.owner.transform.add(this.mesh);
	}
	,onRemoved: function() {
		this.owner.transform.remove(this.mesh);
	}
	,set_anchorY: function(value) {
		this.anchorY = value;
		this.updateAnchor();
		return this.anchorY;
	}
	,set_anchorX: function(value) {
		this.anchorX = value;
		this.updateAnchor();
		return this.anchorX;
	}
	,setScale: function(s) {
		this.owner.transform.scale.set(s,s,1);
	}
	,contains: function(x,y) {
		if(this.texDef == null) return false;
		y = shoe3d.System.window.get_height() - y;
		var v = this.mesh.worldToLocal(new THREE.Vector3(x,y,0));
		x = v.x;
		y = v.y;
		return this.texDef.width * 0.5 >= (x < 0?-x:x) && this.texDef.height * 0.5 >= (y < 0?-y:y);
	}
	,setScaleXY: function(sx,sy) {
		this.owner.transform.scale.set(sx,sy,1);
	}
	,setLevel: function(level) {
		this.mesh.renderOrder = level;
		return this;
	}
	,setPremultipliedAlpha: function(alpha) {
		this.material.opacity = alpha;
		return this;
	}
	,__class__: shoe3d.component.Sprite2D
});
shoe3d.component.ProgressBar = function(textureName) {
	this.progress = 1;
	shoe3d.component.Sprite2D.call(this,textureName);
};
shoe3d.component.ProgressBar.__name__ = ["shoe3d","component","ProgressBar"];
shoe3d.component.ProgressBar.__super__ = shoe3d.component.Sprite2D;
shoe3d.component.ProgressBar.prototype = $extend(shoe3d.component.Sprite2D.prototype,{
	progressChange: null
	,progress: null
	,get_progressChange: function() {
		if(this.progressChange == null) this.progressChange = new shoe3d.util.signal.DoubleSignal();
		return this.progressChange;
	}
	,redefineSprite: function() {
		if(this.texDef == null) return;
		var w = this.texDef.width;
		var h = this.texDef.height;
		var uv = this.texDef.uv;
		this.geom.uvsNeedUpdate = true;
		this.geom.verticesNeedUpdate = true;
		this.geom.vertices[0].set(-w / 2,h / 2,0);
		this.geom.vertices[1].set(shoe3d.util.SMath.lerp(this.progress,-w / 2,w / 2),h / 2,0);
		this.geom.vertices[2].set(-w / 2,-h / 2,0);
		this.geom.vertices[3].set(shoe3d.util.SMath.lerp(this.progress,-w / 2,w / 2),-h / 2,0);
		var uvs = this.geom.faceVertexUvs[0];
		uvs[0][0].set(uv.umin,uv.vmax);
		uvs[0][1].set(uv.umin,uv.vmin);
		uvs[0][2].set(shoe3d.util.SMath.lerp(this.progress,uv.umin,uv.umax),uv.vmax);
		uvs[1][0].set(uv.umin,uv.vmin);
		uvs[1][1].set(shoe3d.util.SMath.lerp(this.progress,uv.umin,uv.umax),uv.vmin);
		uvs[1][2].set(shoe3d.util.SMath.lerp(this.progress,uv.umin,uv.umax),uv.vmax);
		this.material.map = this.texDef.texture;
	}
	,set_progress: function(value) {
		var newValue = shoe3d.util.SMath.clamp(value,0,1);
		if(newValue != this.progress && this.get_progressChange() != null) {
			var oldValue = this.progress;
			this.progress = newValue;
			this.get_progressChange().emit(newValue,oldValue);
			this.redefineSprite();
		}
		return this.progress;
	}
	,setProgress: function(v) {
		this.set_progress(v);
		return this;
	}
	,contains: function(x,y) {
		if(this.texDef == null) return false;
		y = shoe3d.System.window.get_height() - y;
		var v = this.mesh.worldToLocal(new THREE.Vector3(x,y,0));
		x = v.x;
		y = v.y;
		return x > -this.texDef.width / 2 && x < shoe3d.util.SMath.lerp(this.progress,-this.texDef.width / 2,this.texDef.width / 2) && this.texDef.height * 0.5 >= (y < 0?-y:y);
	}
	,__class__: shoe3d.component.ProgressBar
});
shoe3d.component.RandomRotator = function() {
	this.t = 0;
	shoe3d.core.game.Component.call(this);
};
shoe3d.component.RandomRotator.__name__ = ["shoe3d","component","RandomRotator"];
shoe3d.component.RandomRotator.__super__ = shoe3d.core.game.Component;
shoe3d.component.RandomRotator.prototype = $extend(shoe3d.core.game.Component.prototype,{
	t: null
	,onUpdate: function() {
		this.owner.transform.position.set(Math.cos(shoe3d.core.Time.timeSinceGameStart),Math.sin(shoe3d.core.Time.timeSinceGameStart),0).multiplyScalar(20);
		this.owner.transform.lookAt(this.owner.transform.worldToLocal(new THREE.Vector3(0,0,0)));
	}
	,__class__: shoe3d.component.RandomRotator
});
shoe3d.component.S3Mesh = function(geom,mat) {
	shoe3d.core.game.Component.call(this);
	this.geometry = geom;
	this.material = mat;
	js.Boot.__cast(this.material , THREE.MeshPhongMaterial);
	this.mesh = new THREE.Mesh(this.geometry,this.material);
	if(this.owner != null) this.owner.transform.add(this.mesh);
};
shoe3d.component.S3Mesh.__name__ = ["shoe3d","component","S3Mesh"];
shoe3d.component.S3Mesh.__super__ = shoe3d.core.game.Component;
shoe3d.component.S3Mesh.prototype = $extend(shoe3d.core.game.Component.prototype,{
	geometry: null
	,material: null
	,mesh: null
	,onAdded: function() {
		this.owner.transform.add(this.mesh);
	}
	,__class__: shoe3d.component.S3Mesh
});
shoe3d.core.ComponentContainer = function() { };
shoe3d.core.ComponentContainer.__name__ = ["shoe3d","core","ComponentContainer"];
shoe3d.core.ComponentContainer.prototype = {
	components: null
	,__class__: shoe3d.core.ComponentContainer
};
shoe3d.core.Layer = function(name) {
	this.name = name;
	this.scene = new THREE.Scene();
	this.children = [];
	shoe3d.System.window._prePublicResize.connect($bind(this,this.reconfigureCamera));
};
shoe3d.core.Layer.__name__ = ["shoe3d","core","Layer"];
shoe3d.core.Layer.prototype = {
	name: null
	,scene: null
	,camera: null
	,children: null
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
		this.children.push(child);
		child.setLayerReferenceRecursive(this);
		this.scene.add(child.transform);
		return this;
	}
	,removeChild: function(child) {
		HxOverrides.remove(this.children,child);
		child.setLayerReferenceRecursive(null);
		this.scene.remove(child.transform);
		return this;
	}
	,setCamera: function(cam) {
		this.camera = cam;
		if(this.camera != null) this.camera.up = new THREE.Vector3(0,0,1);
		this.reconfigureCamera();
		return this;
	}
	,addPerspectiveCamera: function() {
		var pc = new THREE.PerspectiveCamera(70,1,0.1,1000);
		this.setCamera(pc);
		return pc;
	}
	,addOrthoCamera: function() {
		var pc = new THREE.OrthographicCamera(1,1,1,1,0.1,1000);
		this.setCamera(pc);
		return pc;
	}
	,render: function(renderer) {
		if(this.camera == null) return;
		renderer.sortObjects = true;
		renderer.render(this.scene,this.camera);
	}
	,__class__: shoe3d.core.Layer
};
shoe3d.core.Layer2D = function(name) {
	this.pointerEnabled = false;
	shoe3d.core.Layer.call(this,name);
};
shoe3d.core.Layer2D.__name__ = ["shoe3d","core","Layer2D"];
shoe3d.core.Layer2D.__super__ = shoe3d.core.Layer;
shoe3d.core.Layer2D.prototype = $extend(shoe3d.core.Layer.prototype,{
	pointerEnabled: null
	,reconfigureCamera: function() {
		if(this.camera != null) {
			var cam;
			cam = js.Boot.__cast(this.camera , THREE.OrthographicCamera);
			var scale = 0.005;
			scale = 1;
			cam.left = 0;
			cam.right = shoe3d.System.window.get_width();
			cam.top = shoe3d.System.window.get_height();
			cam.bottom = 0;
			cam.bottom = 0;
			cam.top = shoe3d.System.window.get_height();
			cam.far = 10000;
			cam.near = 0.1;
			cam.position.set(0,0,8000);
			cam.lookAt(new THREE.Vector3(0,0,0));
			cam.updateMatrix();
			cam.updateProjectionMatrix();
		}
	}
	,render: function(renderer) {
		if(this.camera == null) return;
		renderer.sortObjects = false;
		renderer.render(this.scene,this.camera);
	}
	,setCamera: function(cam) {
		shoe3d.util.Assert.that(js.Boot.__instanceof(cam,THREE.OrthographicCamera),"UILayer allows only ortho camera");
		this.camera = cam;
		this.camera.up = new THREE.Vector3(0,1,0);
		this.reconfigureCamera();
		return this;
	}
	,__class__: shoe3d.core.Layer2D
});
shoe3d.core.MainLoop = function() {
	this.averageFPS = -1000;
	this._totalUpdateTime = 0;
	this._skipFrame = false;
	this._paused = true;
	this._frames = 0;
	var _g = this;
	this._frame = new shoe3d.util.signal.SingleSignal();
	if(!window.requestAnimationFrame) {
		__js__("window.requestAnimationFrame = (function(){window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame" + "function(callback, el){window.setTimeout(callback, 1000/60);}; })() ");
	}
	shoe3d.System.window.hidden.change.connect(function(hidden,_) {
		if(!hidden) _g.skipFrame();
	});
};
shoe3d.core.MainLoop.__name__ = ["shoe3d","core","MainLoop"];
shoe3d.core.MainLoop.prototype = {
	_frame: null
	,_frames: null
	,_paused: null
	,_skipFrame: null
	,_totalUpdateTime: null
	,frameTime: null
	,updateTime: null
	,renderTime: null
	,FPS: null
	,averageFPS: null
	,start: function() {
		var _g = this;
		var updateFrame = null;
		updateFrame = function(t) {
			_g.update();
			window.requestAnimationFrame(updateFrame);
			return true;
		};
		window.requestAnimationFrame(updateFrame);
	}
	,update: function() {
		var startTime;
		var middleTime;
		if(shoe3d.System.window.hidden.get__()) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		shoe3d.System.time.update();
		middleTime = startTime = shoe3d.core.Time.now();
		this._frames++;
		shoe3d.component.Element2D.lastLevel = 0;
		if(shoe3d.screen.ScreenManager._currentScreen != null) {
			shoe3d.screen.ScreenManager._currentScreen.onUpdate();
			var _g = 0;
			var _g1 = shoe3d.screen.ScreenManager._currentScreen.layers;
			while(_g < _g1.length) {
				var layer = _g1[_g];
				++_g;
				var _g2 = 0;
				var _g3 = layer.children;
				while(_g2 < _g3.length) {
					var i = _g3[_g2];
					++_g2;
					shoe3d.component.Element2D.lastAlpha = 1;
					this.updateGameObject(i);
				}
			}
			middleTime = shoe3d.core.Time.now();
			this.updateTime = middleTime - startTime;
			this.render();
		}
		this.renderTime = shoe3d.core.Time.now() - middleTime;
		this.frameTime = shoe3d.core.Time.now() - startTime;
		this._totalUpdateTime += this.frameTime;
		this.FPS = 1 / this.frameTime;
		this.averageFPS = 1 / (this._totalUpdateTime / (this._frames - 1));
		shoe3d.System.input.keyboard.onFrameExit();
		this._frame.emit(shoe3d.core.Time.dt);
	}
	,skipFrame: function() {
		this._skipFrame = true;
		shoe3d.core.Time._lastUpdateTime = shoe3d.core.Time.now();
	}
	,getTimingString: function() {
		return "U" + this.round(this.updateTime * 1000) + "&Tab;R" + this.round(this.renderTime * 1000) + " =&Tab;" + this.round(this.frameTime * 1000);
	}
	,getFPSString: function() {
		return "FPS: A" + this.round(this.averageFPS,10,5) + " C" + this.round(this.FPS,10,5);
	}
	,round: function(f,m,l) {
		if(l == null) l = 4;
		if(m == null) m = 100;
		var ret = Math.round(f * m) / m;
		var str;
		if(ret == null) str = "null"; else str = "" + ret;
		if(str.indexOf(".") >= 0) while(str.length < l) str += "0"; else {
			str += ".";
			while(str.length < l) str += "0";
		}
		return str;
	}
	,render: function() {
		shoe3d.System.renderer.render();
	}
	,lateUpdateGameObject: function(go) {
		var _g = 0;
		var _g1 = go.components;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(!i._started) {
				i.onStart();
				i._started = true;
			}
			i.onLateUpdate();
		}
		var _g2 = 0;
		var _g11 = go.children;
		while(_g2 < _g11.length) {
			var child = _g11[_g2];
			++_g2;
			this.lateUpdateGameObject(child);
		}
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
shoe3d.core.Orientation = { __ename__ : true, __constructs__ : ["Portrait","Landscape"] };
shoe3d.core.Orientation.Portrait = ["Portrait",0];
shoe3d.core.Orientation.Portrait.toString = $estr;
shoe3d.core.Orientation.Portrait.__enum__ = shoe3d.core.Orientation;
shoe3d.core.Orientation.Landscape = ["Landscape",1];
shoe3d.core.Orientation.Landscape.toString = $estr;
shoe3d.core.Orientation.Landscape.__enum__ = shoe3d.core.Orientation;
shoe3d.core.game.GameObject = function(name) {
	this.name = name;
	this.components = [];
	this.children = [];
	this.transform = new THREE.Object3D();
};
shoe3d.core.game.GameObject.__name__ = ["shoe3d","core","game","GameObject"];
shoe3d.core.game.GameObject.__interfaces__ = [shoe3d.core.ComponentContainer];
shoe3d.core.game.GameObject.prototype = {
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
			component.owner = null;
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
	,__class__: shoe3d.core.game.GameObject
};
shoe3d.core.input = {};
shoe3d.core.input.EventSource = { __ename__ : true, __constructs__ : ["Mouse","Touch"] };
shoe3d.core.input.EventSource.Mouse = function(e) { var $x = ["Mouse",0,e]; $x.__enum__ = shoe3d.core.input.EventSource; $x.toString = $estr; return $x; };
shoe3d.core.input.EventSource.Touch = function(e) { var $x = ["Touch",1,e]; $x.__enum__ = shoe3d.core.input.EventSource; $x.toString = $estr; return $x; };
shoe3d.core.input.Key = { __ename__ : true, __constructs__ : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Number0","Number1","Number2","Number3","Number4","Number5","Number6","Number7","Number8","Number9","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadDecimal","NumpadDivide","NumpadEnter","NumpadMultiply","NumpadSubtract","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","Left","Up","Right","Down","Alt","Backquote","Backslash","Backspace","CapsLock","Comma","Command","Control","Delete","End","Enter","Equals","Escape","Home","Insert","LeftBracket","Minus","PageDown","PageUp","Period","Quote","RightBracket","Semicolon","Shift","Slash","Space","Tab","Menu","Search","Unknown"] };
shoe3d.core.input.Key.A = ["A",0];
shoe3d.core.input.Key.A.toString = $estr;
shoe3d.core.input.Key.A.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.B = ["B",1];
shoe3d.core.input.Key.B.toString = $estr;
shoe3d.core.input.Key.B.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.C = ["C",2];
shoe3d.core.input.Key.C.toString = $estr;
shoe3d.core.input.Key.C.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.D = ["D",3];
shoe3d.core.input.Key.D.toString = $estr;
shoe3d.core.input.Key.D.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.E = ["E",4];
shoe3d.core.input.Key.E.toString = $estr;
shoe3d.core.input.Key.E.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F = ["F",5];
shoe3d.core.input.Key.F.toString = $estr;
shoe3d.core.input.Key.F.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.G = ["G",6];
shoe3d.core.input.Key.G.toString = $estr;
shoe3d.core.input.Key.G.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.H = ["H",7];
shoe3d.core.input.Key.H.toString = $estr;
shoe3d.core.input.Key.H.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.I = ["I",8];
shoe3d.core.input.Key.I.toString = $estr;
shoe3d.core.input.Key.I.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.J = ["J",9];
shoe3d.core.input.Key.J.toString = $estr;
shoe3d.core.input.Key.J.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.K = ["K",10];
shoe3d.core.input.Key.K.toString = $estr;
shoe3d.core.input.Key.K.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.L = ["L",11];
shoe3d.core.input.Key.L.toString = $estr;
shoe3d.core.input.Key.L.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.M = ["M",12];
shoe3d.core.input.Key.M.toString = $estr;
shoe3d.core.input.Key.M.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.N = ["N",13];
shoe3d.core.input.Key.N.toString = $estr;
shoe3d.core.input.Key.N.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.O = ["O",14];
shoe3d.core.input.Key.O.toString = $estr;
shoe3d.core.input.Key.O.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.P = ["P",15];
shoe3d.core.input.Key.P.toString = $estr;
shoe3d.core.input.Key.P.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Q = ["Q",16];
shoe3d.core.input.Key.Q.toString = $estr;
shoe3d.core.input.Key.Q.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.R = ["R",17];
shoe3d.core.input.Key.R.toString = $estr;
shoe3d.core.input.Key.R.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.S = ["S",18];
shoe3d.core.input.Key.S.toString = $estr;
shoe3d.core.input.Key.S.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.T = ["T",19];
shoe3d.core.input.Key.T.toString = $estr;
shoe3d.core.input.Key.T.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.U = ["U",20];
shoe3d.core.input.Key.U.toString = $estr;
shoe3d.core.input.Key.U.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.V = ["V",21];
shoe3d.core.input.Key.V.toString = $estr;
shoe3d.core.input.Key.V.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.W = ["W",22];
shoe3d.core.input.Key.W.toString = $estr;
shoe3d.core.input.Key.W.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.X = ["X",23];
shoe3d.core.input.Key.X.toString = $estr;
shoe3d.core.input.Key.X.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Y = ["Y",24];
shoe3d.core.input.Key.Y.toString = $estr;
shoe3d.core.input.Key.Y.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Z = ["Z",25];
shoe3d.core.input.Key.Z.toString = $estr;
shoe3d.core.input.Key.Z.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number0 = ["Number0",26];
shoe3d.core.input.Key.Number0.toString = $estr;
shoe3d.core.input.Key.Number0.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number1 = ["Number1",27];
shoe3d.core.input.Key.Number1.toString = $estr;
shoe3d.core.input.Key.Number1.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number2 = ["Number2",28];
shoe3d.core.input.Key.Number2.toString = $estr;
shoe3d.core.input.Key.Number2.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number3 = ["Number3",29];
shoe3d.core.input.Key.Number3.toString = $estr;
shoe3d.core.input.Key.Number3.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number4 = ["Number4",30];
shoe3d.core.input.Key.Number4.toString = $estr;
shoe3d.core.input.Key.Number4.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number5 = ["Number5",31];
shoe3d.core.input.Key.Number5.toString = $estr;
shoe3d.core.input.Key.Number5.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number6 = ["Number6",32];
shoe3d.core.input.Key.Number6.toString = $estr;
shoe3d.core.input.Key.Number6.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number7 = ["Number7",33];
shoe3d.core.input.Key.Number7.toString = $estr;
shoe3d.core.input.Key.Number7.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number8 = ["Number8",34];
shoe3d.core.input.Key.Number8.toString = $estr;
shoe3d.core.input.Key.Number8.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Number9 = ["Number9",35];
shoe3d.core.input.Key.Number9.toString = $estr;
shoe3d.core.input.Key.Number9.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad0 = ["Numpad0",36];
shoe3d.core.input.Key.Numpad0.toString = $estr;
shoe3d.core.input.Key.Numpad0.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad1 = ["Numpad1",37];
shoe3d.core.input.Key.Numpad1.toString = $estr;
shoe3d.core.input.Key.Numpad1.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad2 = ["Numpad2",38];
shoe3d.core.input.Key.Numpad2.toString = $estr;
shoe3d.core.input.Key.Numpad2.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad3 = ["Numpad3",39];
shoe3d.core.input.Key.Numpad3.toString = $estr;
shoe3d.core.input.Key.Numpad3.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad4 = ["Numpad4",40];
shoe3d.core.input.Key.Numpad4.toString = $estr;
shoe3d.core.input.Key.Numpad4.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad5 = ["Numpad5",41];
shoe3d.core.input.Key.Numpad5.toString = $estr;
shoe3d.core.input.Key.Numpad5.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad6 = ["Numpad6",42];
shoe3d.core.input.Key.Numpad6.toString = $estr;
shoe3d.core.input.Key.Numpad6.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad7 = ["Numpad7",43];
shoe3d.core.input.Key.Numpad7.toString = $estr;
shoe3d.core.input.Key.Numpad7.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad8 = ["Numpad8",44];
shoe3d.core.input.Key.Numpad8.toString = $estr;
shoe3d.core.input.Key.Numpad8.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Numpad9 = ["Numpad9",45];
shoe3d.core.input.Key.Numpad9.toString = $estr;
shoe3d.core.input.Key.Numpad9.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.NumpadAdd = ["NumpadAdd",46];
shoe3d.core.input.Key.NumpadAdd.toString = $estr;
shoe3d.core.input.Key.NumpadAdd.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.NumpadDecimal = ["NumpadDecimal",47];
shoe3d.core.input.Key.NumpadDecimal.toString = $estr;
shoe3d.core.input.Key.NumpadDecimal.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.NumpadDivide = ["NumpadDivide",48];
shoe3d.core.input.Key.NumpadDivide.toString = $estr;
shoe3d.core.input.Key.NumpadDivide.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.NumpadEnter = ["NumpadEnter",49];
shoe3d.core.input.Key.NumpadEnter.toString = $estr;
shoe3d.core.input.Key.NumpadEnter.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.NumpadMultiply = ["NumpadMultiply",50];
shoe3d.core.input.Key.NumpadMultiply.toString = $estr;
shoe3d.core.input.Key.NumpadMultiply.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.NumpadSubtract = ["NumpadSubtract",51];
shoe3d.core.input.Key.NumpadSubtract.toString = $estr;
shoe3d.core.input.Key.NumpadSubtract.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F1 = ["F1",52];
shoe3d.core.input.Key.F1.toString = $estr;
shoe3d.core.input.Key.F1.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F2 = ["F2",53];
shoe3d.core.input.Key.F2.toString = $estr;
shoe3d.core.input.Key.F2.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F3 = ["F3",54];
shoe3d.core.input.Key.F3.toString = $estr;
shoe3d.core.input.Key.F3.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F4 = ["F4",55];
shoe3d.core.input.Key.F4.toString = $estr;
shoe3d.core.input.Key.F4.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F5 = ["F5",56];
shoe3d.core.input.Key.F5.toString = $estr;
shoe3d.core.input.Key.F5.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F6 = ["F6",57];
shoe3d.core.input.Key.F6.toString = $estr;
shoe3d.core.input.Key.F6.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F7 = ["F7",58];
shoe3d.core.input.Key.F7.toString = $estr;
shoe3d.core.input.Key.F7.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F8 = ["F8",59];
shoe3d.core.input.Key.F8.toString = $estr;
shoe3d.core.input.Key.F8.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F9 = ["F9",60];
shoe3d.core.input.Key.F9.toString = $estr;
shoe3d.core.input.Key.F9.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F10 = ["F10",61];
shoe3d.core.input.Key.F10.toString = $estr;
shoe3d.core.input.Key.F10.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F11 = ["F11",62];
shoe3d.core.input.Key.F11.toString = $estr;
shoe3d.core.input.Key.F11.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F12 = ["F12",63];
shoe3d.core.input.Key.F12.toString = $estr;
shoe3d.core.input.Key.F12.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F13 = ["F13",64];
shoe3d.core.input.Key.F13.toString = $estr;
shoe3d.core.input.Key.F13.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F14 = ["F14",65];
shoe3d.core.input.Key.F14.toString = $estr;
shoe3d.core.input.Key.F14.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.F15 = ["F15",66];
shoe3d.core.input.Key.F15.toString = $estr;
shoe3d.core.input.Key.F15.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Left = ["Left",67];
shoe3d.core.input.Key.Left.toString = $estr;
shoe3d.core.input.Key.Left.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Up = ["Up",68];
shoe3d.core.input.Key.Up.toString = $estr;
shoe3d.core.input.Key.Up.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Right = ["Right",69];
shoe3d.core.input.Key.Right.toString = $estr;
shoe3d.core.input.Key.Right.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Down = ["Down",70];
shoe3d.core.input.Key.Down.toString = $estr;
shoe3d.core.input.Key.Down.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Alt = ["Alt",71];
shoe3d.core.input.Key.Alt.toString = $estr;
shoe3d.core.input.Key.Alt.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Backquote = ["Backquote",72];
shoe3d.core.input.Key.Backquote.toString = $estr;
shoe3d.core.input.Key.Backquote.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Backslash = ["Backslash",73];
shoe3d.core.input.Key.Backslash.toString = $estr;
shoe3d.core.input.Key.Backslash.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Backspace = ["Backspace",74];
shoe3d.core.input.Key.Backspace.toString = $estr;
shoe3d.core.input.Key.Backspace.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.CapsLock = ["CapsLock",75];
shoe3d.core.input.Key.CapsLock.toString = $estr;
shoe3d.core.input.Key.CapsLock.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Comma = ["Comma",76];
shoe3d.core.input.Key.Comma.toString = $estr;
shoe3d.core.input.Key.Comma.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Command = ["Command",77];
shoe3d.core.input.Key.Command.toString = $estr;
shoe3d.core.input.Key.Command.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Control = ["Control",78];
shoe3d.core.input.Key.Control.toString = $estr;
shoe3d.core.input.Key.Control.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Delete = ["Delete",79];
shoe3d.core.input.Key.Delete.toString = $estr;
shoe3d.core.input.Key.Delete.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.End = ["End",80];
shoe3d.core.input.Key.End.toString = $estr;
shoe3d.core.input.Key.End.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Enter = ["Enter",81];
shoe3d.core.input.Key.Enter.toString = $estr;
shoe3d.core.input.Key.Enter.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Equals = ["Equals",82];
shoe3d.core.input.Key.Equals.toString = $estr;
shoe3d.core.input.Key.Equals.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Escape = ["Escape",83];
shoe3d.core.input.Key.Escape.toString = $estr;
shoe3d.core.input.Key.Escape.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Home = ["Home",84];
shoe3d.core.input.Key.Home.toString = $estr;
shoe3d.core.input.Key.Home.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Insert = ["Insert",85];
shoe3d.core.input.Key.Insert.toString = $estr;
shoe3d.core.input.Key.Insert.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.LeftBracket = ["LeftBracket",86];
shoe3d.core.input.Key.LeftBracket.toString = $estr;
shoe3d.core.input.Key.LeftBracket.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Minus = ["Minus",87];
shoe3d.core.input.Key.Minus.toString = $estr;
shoe3d.core.input.Key.Minus.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.PageDown = ["PageDown",88];
shoe3d.core.input.Key.PageDown.toString = $estr;
shoe3d.core.input.Key.PageDown.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.PageUp = ["PageUp",89];
shoe3d.core.input.Key.PageUp.toString = $estr;
shoe3d.core.input.Key.PageUp.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Period = ["Period",90];
shoe3d.core.input.Key.Period.toString = $estr;
shoe3d.core.input.Key.Period.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Quote = ["Quote",91];
shoe3d.core.input.Key.Quote.toString = $estr;
shoe3d.core.input.Key.Quote.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.RightBracket = ["RightBracket",92];
shoe3d.core.input.Key.RightBracket.toString = $estr;
shoe3d.core.input.Key.RightBracket.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Semicolon = ["Semicolon",93];
shoe3d.core.input.Key.Semicolon.toString = $estr;
shoe3d.core.input.Key.Semicolon.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Shift = ["Shift",94];
shoe3d.core.input.Key.Shift.toString = $estr;
shoe3d.core.input.Key.Shift.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Slash = ["Slash",95];
shoe3d.core.input.Key.Slash.toString = $estr;
shoe3d.core.input.Key.Slash.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Space = ["Space",96];
shoe3d.core.input.Key.Space.toString = $estr;
shoe3d.core.input.Key.Space.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Tab = ["Tab",97];
shoe3d.core.input.Key.Tab.toString = $estr;
shoe3d.core.input.Key.Tab.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Menu = ["Menu",98];
shoe3d.core.input.Key.Menu.toString = $estr;
shoe3d.core.input.Key.Menu.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Search = ["Search",99];
shoe3d.core.input.Key.Search.toString = $estr;
shoe3d.core.input.Key.Search.__enum__ = shoe3d.core.input.Key;
shoe3d.core.input.Key.Unknown = function(keyCode) { var $x = ["Unknown",100,keyCode]; $x.__enum__ = shoe3d.core.input.Key; $x.toString = $estr; return $x; };
shoe3d.core.input.KeyCodes = function() { };
shoe3d.core.input.KeyCodes.__name__ = ["shoe3d","core","input","KeyCodes"];
shoe3d.core.input.KeyCodes.toKey = function(keyCode) {
	switch(keyCode) {
	case 65:
		return shoe3d.core.input.Key.A;
	case 66:
		return shoe3d.core.input.Key.B;
	case 67:
		return shoe3d.core.input.Key.C;
	case 68:
		return shoe3d.core.input.Key.D;
	case 69:
		return shoe3d.core.input.Key.E;
	case 70:
		return shoe3d.core.input.Key.F;
	case 71:
		return shoe3d.core.input.Key.G;
	case 72:
		return shoe3d.core.input.Key.H;
	case 73:
		return shoe3d.core.input.Key.I;
	case 74:
		return shoe3d.core.input.Key.J;
	case 75:
		return shoe3d.core.input.Key.K;
	case 76:
		return shoe3d.core.input.Key.L;
	case 77:
		return shoe3d.core.input.Key.M;
	case 78:
		return shoe3d.core.input.Key.N;
	case 79:
		return shoe3d.core.input.Key.O;
	case 80:
		return shoe3d.core.input.Key.P;
	case 81:
		return shoe3d.core.input.Key.Q;
	case 82:
		return shoe3d.core.input.Key.R;
	case 83:
		return shoe3d.core.input.Key.S;
	case 84:
		return shoe3d.core.input.Key.T;
	case 85:
		return shoe3d.core.input.Key.U;
	case 86:
		return shoe3d.core.input.Key.V;
	case 87:
		return shoe3d.core.input.Key.W;
	case 88:
		return shoe3d.core.input.Key.X;
	case 89:
		return shoe3d.core.input.Key.Y;
	case 90:
		return shoe3d.core.input.Key.Z;
	case 48:
		return shoe3d.core.input.Key.Number0;
	case 49:
		return shoe3d.core.input.Key.Number1;
	case 50:
		return shoe3d.core.input.Key.Number2;
	case 51:
		return shoe3d.core.input.Key.Number3;
	case 52:
		return shoe3d.core.input.Key.Number4;
	case 53:
		return shoe3d.core.input.Key.Number5;
	case 54:
		return shoe3d.core.input.Key.Number6;
	case 55:
		return shoe3d.core.input.Key.Number7;
	case 56:
		return shoe3d.core.input.Key.Number8;
	case 57:
		return shoe3d.core.input.Key.Number9;
	case 96:
		return shoe3d.core.input.Key.Numpad0;
	case 97:
		return shoe3d.core.input.Key.Numpad1;
	case 98:
		return shoe3d.core.input.Key.Numpad2;
	case 99:
		return shoe3d.core.input.Key.Numpad3;
	case 100:
		return shoe3d.core.input.Key.Numpad4;
	case 101:
		return shoe3d.core.input.Key.Numpad5;
	case 102:
		return shoe3d.core.input.Key.Numpad6;
	case 103:
		return shoe3d.core.input.Key.Numpad7;
	case 104:
		return shoe3d.core.input.Key.Numpad8;
	case 105:
		return shoe3d.core.input.Key.Numpad9;
	case 107:
		return shoe3d.core.input.Key.NumpadAdd;
	case 110:
		return shoe3d.core.input.Key.NumpadDecimal;
	case 111:
		return shoe3d.core.input.Key.NumpadDivide;
	case 108:
		return shoe3d.core.input.Key.NumpadEnter;
	case 106:
		return shoe3d.core.input.Key.NumpadMultiply;
	case 109:
		return shoe3d.core.input.Key.NumpadSubtract;
	case 112:
		return shoe3d.core.input.Key.F1;
	case 113:
		return shoe3d.core.input.Key.F2;
	case 114:
		return shoe3d.core.input.Key.F3;
	case 115:
		return shoe3d.core.input.Key.F4;
	case 116:
		return shoe3d.core.input.Key.F5;
	case 117:
		return shoe3d.core.input.Key.F6;
	case 118:
		return shoe3d.core.input.Key.F7;
	case 119:
		return shoe3d.core.input.Key.F8;
	case 120:
		return shoe3d.core.input.Key.F9;
	case 121:
		return shoe3d.core.input.Key.F10;
	case 122:
		return shoe3d.core.input.Key.F11;
	case 123:
		return shoe3d.core.input.Key.F12;
	case 37:
		return shoe3d.core.input.Key.Left;
	case 38:
		return shoe3d.core.input.Key.Up;
	case 39:
		return shoe3d.core.input.Key.Right;
	case 40:
		return shoe3d.core.input.Key.Down;
	case 18:
		return shoe3d.core.input.Key.Alt;
	case 192:
		return shoe3d.core.input.Key.Backquote;
	case 220:
		return shoe3d.core.input.Key.Backslash;
	case 8:
		return shoe3d.core.input.Key.Backspace;
	case 20:
		return shoe3d.core.input.Key.CapsLock;
	case 188:
		return shoe3d.core.input.Key.Comma;
	case 15:
		return shoe3d.core.input.Key.Command;
	case 17:
		return shoe3d.core.input.Key.Control;
	case 46:
		return shoe3d.core.input.Key.Delete;
	case 35:
		return shoe3d.core.input.Key.End;
	case 13:
		return shoe3d.core.input.Key.Enter;
	case 187:
		return shoe3d.core.input.Key.Equals;
	case 27:
		return shoe3d.core.input.Key.Escape;
	case 36:
		return shoe3d.core.input.Key.Home;
	case 45:
		return shoe3d.core.input.Key.Insert;
	case 219:
		return shoe3d.core.input.Key.LeftBracket;
	case 189:
		return shoe3d.core.input.Key.Minus;
	case 34:
		return shoe3d.core.input.Key.PageDown;
	case 33:
		return shoe3d.core.input.Key.PageUp;
	case 190:
		return shoe3d.core.input.Key.Period;
	case 222:
		return shoe3d.core.input.Key.Quote;
	case 221:
		return shoe3d.core.input.Key.RightBracket;
	case 186:
		return shoe3d.core.input.Key.Semicolon;
	case 16:
		return shoe3d.core.input.Key.Shift;
	case 191:
		return shoe3d.core.input.Key.Slash;
	case 32:
		return shoe3d.core.input.Key.Space;
	case 9:
		return shoe3d.core.input.Key.Tab;
	case 16777234:
		return shoe3d.core.input.Key.Menu;
	case 16777247:
		return shoe3d.core.input.Key.Search;
	}
	return shoe3d.core.input.Key.Unknown(keyCode);
};
shoe3d.core.input.KeyCodes.toKeyCode = function(key) {
	switch(key[1]) {
	case 0:
		return 65;
	case 1:
		return 66;
	case 2:
		return 67;
	case 3:
		return 68;
	case 4:
		return 69;
	case 5:
		return 70;
	case 6:
		return 71;
	case 7:
		return 72;
	case 8:
		return 73;
	case 9:
		return 74;
	case 10:
		return 75;
	case 11:
		return 76;
	case 12:
		return 77;
	case 13:
		return 78;
	case 14:
		return 79;
	case 15:
		return 80;
	case 16:
		return 81;
	case 17:
		return 82;
	case 18:
		return 83;
	case 19:
		return 84;
	case 20:
		return 85;
	case 21:
		return 86;
	case 22:
		return 87;
	case 23:
		return 88;
	case 24:
		return 89;
	case 25:
		return 90;
	case 26:
		return 48;
	case 27:
		return 49;
	case 28:
		return 50;
	case 29:
		return 51;
	case 30:
		return 52;
	case 31:
		return 53;
	case 32:
		return 54;
	case 33:
		return 55;
	case 34:
		return 56;
	case 35:
		return 57;
	case 36:
		return 96;
	case 37:
		return 97;
	case 38:
		return 98;
	case 39:
		return 99;
	case 40:
		return 100;
	case 41:
		return 101;
	case 42:
		return 102;
	case 43:
		return 103;
	case 44:
		return 104;
	case 45:
		return 105;
	case 46:
		return 107;
	case 47:
		return 110;
	case 48:
		return 111;
	case 49:
		return 108;
	case 50:
		return 106;
	case 51:
		return 109;
	case 52:
		return 112;
	case 53:
		return 113;
	case 54:
		return 114;
	case 55:
		return 115;
	case 56:
		return 116;
	case 57:
		return 117;
	case 58:
		return 118;
	case 59:
		return 119;
	case 60:
		return 120;
	case 61:
		return 121;
	case 62:
		return 122;
	case 63:
		return 123;
	case 64:
		return 124;
	case 65:
		return 125;
	case 66:
		return 126;
	case 67:
		return 37;
	case 68:
		return 38;
	case 69:
		return 39;
	case 70:
		return 40;
	case 71:
		return 18;
	case 72:
		return 192;
	case 73:
		return 220;
	case 74:
		return 8;
	case 75:
		return 20;
	case 76:
		return 188;
	case 77:
		return 15;
	case 78:
		return 17;
	case 79:
		return 46;
	case 80:
		return 35;
	case 81:
		return 13;
	case 82:
		return 187;
	case 83:
		return 27;
	case 84:
		return 36;
	case 85:
		return 45;
	case 86:
		return 219;
	case 87:
		return 189;
	case 88:
		return 34;
	case 89:
		return 33;
	case 90:
		return 190;
	case 91:
		return 222;
	case 92:
		return 221;
	case 93:
		return 186;
	case 94:
		return 16;
	case 95:
		return 191;
	case 96:
		return 32;
	case 97:
		return 9;
	case 98:
		return 16777234;
	case 99:
		return 16777247;
	case 100:
		var keyCode = key[2];
		return keyCode;
	}
};
shoe3d.core.input.KeyboardEvent = function() {
	this.id = 0;
};
shoe3d.core.input.KeyboardEvent.__name__ = ["shoe3d","core","input","KeyboardEvent"];
shoe3d.core.input.KeyboardEvent.prototype = {
	key: null
	,id: null
	,set: function(id,key) {
		this.id = id;
		this.key = key;
		return this;
	}
	,__class__: shoe3d.core.input.KeyboardEvent
};
shoe3d.core.input.KeyboardManager = function() {
	this.down = new shoe3d.util.signal.SingleSignal();
	this.up = new shoe3d.util.signal.SingleSignal();
	this.backButton = new shoe3d.util.signal.ZeroSignal();
	this._keyStates = new haxe.ds.IntMap();
};
shoe3d.core.input.KeyboardManager.__name__ = ["shoe3d","core","input","KeyboardManager"];
shoe3d.core.input.KeyboardManager.prototype = {
	down: null
	,up: null
	,backButton: null
	,onKey: function(key,handler) {
		return this.up.connect(function(e) {
			if(e.key == key) handler(e);
		});
	}
	,isDown: function(key) {
		return this.isCodeDown(shoe3d.core.input.KeyCodes.toKeyCode(key));
	}
	,isJustPressed: function(key) {
		return this.isCodeJustPressed(shoe3d.core.input.KeyCodes.toKeyCode(key));
	}
	,isCodeDown: function(code) {
		return this._keyStates.exists(code) && this._keyStates.get(code) != shoe3d.core.input.KeyState.Up;
	}
	,isCodeJustPressed: function(code) {
		return this._keyStates.exists(code) && this._keyStates.get(code) == shoe3d.core.input.KeyState.JustPressed;
	}
	,submitDown: function(keyCode) {
		if(keyCode == 16777238) {
			if(this.backButton.hasListeners()) {
				this.backButton.emit();
				return true;
			}
			return false;
		}
		if(!this.isCodeDown(keyCode)) {
			this._keyStates.set(keyCode,shoe3d.core.input.KeyState.JustPressed);
			shoe3d.core.input.KeyboardManager._sharedEvent.set(shoe3d.core.input.KeyboardManager._sharedEvent.id + 1,shoe3d.core.input.KeyCodes.toKey(keyCode));
			this.down.emit(shoe3d.core.input.KeyboardManager._sharedEvent);
		}
		return true;
	}
	,submitUp: function(keyCode) {
		if(this.isCodeDown(keyCode)) {
			this._keyStates.remove(keyCode);
			shoe3d.core.input.KeyboardManager._sharedEvent.set(shoe3d.core.input.KeyboardManager._sharedEvent.id + 1,shoe3d.core.input.KeyCodes.toKey(keyCode));
			this.up.emit(shoe3d.core.input.KeyboardManager._sharedEvent);
		}
	}
	,onFrameExit: function() {
		var $it0 = this._keyStates.keys();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			if(this._keyStates.get(i) == shoe3d.core.input.KeyState.JustPressed) this._keyStates.set(i,shoe3d.core.input.KeyState.Down);
		}
	}
	,_keyStates: null
	,__class__: shoe3d.core.input.KeyboardManager
};
shoe3d.core.input.KeyState = { __ename__ : true, __constructs__ : ["Down","JustPressed","Up"] };
shoe3d.core.input.KeyState.Down = ["Down",0];
shoe3d.core.input.KeyState.Down.toString = $estr;
shoe3d.core.input.KeyState.Down.__enum__ = shoe3d.core.input.KeyState;
shoe3d.core.input.KeyState.JustPressed = ["JustPressed",1];
shoe3d.core.input.KeyState.JustPressed.toString = $estr;
shoe3d.core.input.KeyState.JustPressed.__enum__ = shoe3d.core.input.KeyState;
shoe3d.core.input.KeyState.Up = ["Up",2];
shoe3d.core.input.KeyState.Up.toString = $estr;
shoe3d.core.input.KeyState.Up.__enum__ = shoe3d.core.input.KeyState;
shoe3d.core.input.MouseCursor = { __ename__ : true, __constructs__ : ["Default","Button","None"] };
shoe3d.core.input.MouseCursor.Default = ["Default",0];
shoe3d.core.input.MouseCursor.Default.toString = $estr;
shoe3d.core.input.MouseCursor.Default.__enum__ = shoe3d.core.input.MouseCursor;
shoe3d.core.input.MouseCursor.Button = ["Button",1];
shoe3d.core.input.MouseCursor.Button.toString = $estr;
shoe3d.core.input.MouseCursor.Button.__enum__ = shoe3d.core.input.MouseCursor;
shoe3d.core.input.MouseCursor.None = ["None",2];
shoe3d.core.input.MouseCursor.None.toString = $estr;
shoe3d.core.input.MouseCursor.None.__enum__ = shoe3d.core.input.MouseCursor;
shoe3d.core.input.MouseEvent = function() {
	this.id = 0;
	this.button = null;
	this.viewY = 0;
	this.viewX = 0;
};
shoe3d.core.input.MouseEvent.__name__ = ["shoe3d","core","input","MouseEvent"];
shoe3d.core.input.MouseEvent.prototype = {
	viewX: null
	,viewY: null
	,button: null
	,id: null
	,set: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
		return this;
	}
	,__class__: shoe3d.core.input.MouseEvent
};
shoe3d.core.input.MouseButton = { __ename__ : true, __constructs__ : ["Left","Right","Middle","Unknown"] };
shoe3d.core.input.MouseButton.Left = ["Left",0];
shoe3d.core.input.MouseButton.Left.toString = $estr;
shoe3d.core.input.MouseButton.Left.__enum__ = shoe3d.core.input.MouseButton;
shoe3d.core.input.MouseButton.Right = ["Right",1];
shoe3d.core.input.MouseButton.Right.toString = $estr;
shoe3d.core.input.MouseButton.Right.__enum__ = shoe3d.core.input.MouseButton;
shoe3d.core.input.MouseButton.Middle = ["Middle",2];
shoe3d.core.input.MouseButton.Middle.toString = $estr;
shoe3d.core.input.MouseButton.Middle.__enum__ = shoe3d.core.input.MouseButton;
shoe3d.core.input.MouseButton.Unknown = function(code) { var $x = ["Unknown",3,code]; $x.__enum__ = shoe3d.core.input.MouseButton; $x.toString = $estr; return $x; };
shoe3d.core.input.MouseManager = function() {
	this._cursor = shoe3d.core.input.MouseCursor.Default;
	this._buttonStates = new haxe.ds.IntMap();
	this.up = new shoe3d.util.signal.SingleSignal();
	this.down = new shoe3d.util.signal.SingleSignal();
	this.move = new shoe3d.util.signal.SingleSignal();
	this.scroll = new shoe3d.util.signal.SingleSignal();
	this._source = shoe3d.core.input.EventSource.Mouse(shoe3d.core.input.MouseManager._sharedEvent);
};
shoe3d.core.input.MouseManager.__name__ = ["shoe3d","core","input","MouseManager"];
shoe3d.core.input.MouseManager.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return shoe3d.core.input.MouseButton.Left;
	case 1:
		return shoe3d.core.input.MouseButton.Middle;
	case 2:
		return shoe3d.core.input.MouseButton.Right;
	}
	return shoe3d.core.input.MouseButton.Unknown(buttonCode);
};
shoe3d.core.input.MouseManager.toButtonCode = function(button) {
	switch(button[1]) {
	case 0:
		return 0;
	case 2:
		return 1;
	case 1:
		return 2;
	case 3:
		var buttonCode = button[2];
		return buttonCode;
	}
};
shoe3d.core.input.MouseManager.prototype = {
	up: null
	,down: null
	,move: null
	,scroll: null
	,x: null
	,y: null
	,_cursor: null
	,_buttonStates: null
	,_source: null
	,set_cursor: function(cursor) {
		var name;
		switch(cursor[1]) {
		case 0:
			name = "";
			break;
		case 1:
			name = "pointer";
			break;
		case 2:
			name = "none";
			break;
		}
		shoe3d.System.input._canvas.style.cursor = name;
		return this._cursor = cursor;
	}
	,get_cursor: function() {
		return this._cursor;
	}
	,isDown: function(button) {
		return this.isCodeDown(shoe3d.core.input.MouseManager.toButtonCode(button));
	}
	,isCodeDown: function(buttonCode) {
		return this._buttonStates.exists(buttonCode);
	}
	,submitDown: function(viewX,viewY,buttonCode) {
		if(!this._buttonStates.exists(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,shoe3d.core.input.MouseManager.toButton(buttonCode));
			shoe3d.System.input.pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(shoe3d.core.input.MouseManager._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		shoe3d.System.input.pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(shoe3d.core.input.MouseManager._sharedEvent);
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this._buttonStates.exists(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,shoe3d.core.input.MouseManager.toButton(buttonCode));
			shoe3d.System.input.pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(shoe3d.core.input.MouseManager._sharedEvent);
		}
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this.x = viewX;
		this.y = viewY;
		if(!this.scroll.hasListeners()) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,get_supported: function() {
		return true;
	}
	,prepare: function(viewX,viewY,button) {
		this.x = viewX;
		this.y = viewY;
		shoe3d.core.input.MouseManager._sharedEvent.set(shoe3d.core.input.MouseManager._sharedEvent.id + 1,viewX,viewY,button);
	}
	,__class__: shoe3d.core.input.MouseManager
};
shoe3d.core.input.PointerEvent = function() {
	this.id = 0;
	this.source = null;
	this.hit = null;
	this.viewY = 0;
	this.viewX = 0;
};
shoe3d.core.input.PointerEvent.__name__ = ["shoe3d","core","input","PointerEvent"];
shoe3d.core.input.PointerEvent.prototype = {
	viewX: null
	,viewY: null
	,hit: null
	,source: null
	,id: null
	,_stopped: null
	,set: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,stopPropagation: function() {
		this._stopped = true;
	}
	,__class__: shoe3d.core.input.PointerEvent
};
shoe3d.core.input.PointerManager = function() {
	this.down = new shoe3d.util.signal.SingleSignal();
	this.move = new shoe3d.util.signal.SingleSignal();
	this.up = new shoe3d.util.signal.SingleSignal();
};
shoe3d.core.input.PointerManager.__name__ = ["shoe3d","core","input","PointerManager"];
shoe3d.core.input.PointerManager.prototype = {
	supported: null
	,down: null
	,move: null
	,up: null
	,x: null
	,y: null
	,_x: null
	,_y: null
	,_isDown: null
	,get_supported: function() {
		return true;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,isDown: function() {
		return this._isDown;
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this.submitMove(viewX,viewY,source);
		this._isDown = true;
		var result = this.getHitAndChain(viewX,viewY);
		this.prepare(viewX,viewY,result != null?result.hit:null,source);
		if(result != null) {
			var _g = 0;
			var _g1 = result.chain;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				e.onPointerDown(shoe3d.core.input.PointerManager._sharedEvent);
				if(shoe3d.core.input.PointerManager._sharedEvent._stopped) return;
			}
		}
		this.down.emit(shoe3d.core.input.PointerManager._sharedEvent);
	}
	,getHitAndChain: function(viewX,viewY) {
		if(shoe3d.System.screen._currentScreen != null) {
			var li = shoe3d.System.screen._currentScreen.layers.length - 1;
			while(li >= 0) {
				var layer = shoe3d.System.screen._currentScreen.layers[li];
				if(js.Boot.__instanceof(layer,shoe3d.core.Layer2D) && (js.Boot.__cast(layer , shoe3d.core.Layer2D)).pointerEnabled) {
					var chain = [];
					var hit = null;
					var n = layer.children.length - 1;
					while(n >= 0) {
						var hit1 = shoe3d.component.Element2D.hitTest(layer.children[n],viewX,viewY);
						if(hit1 != null) {
							var e = hit1.owner;
							do {
								var spr = e.get(shoe3d.component.Element2D);
								if(spr != null) chain.push(spr);
								e = e.parent;
							} while(e != null);
							return { hit : hit1, chain : chain};
						}
						n--;
					}
				}
				li--;
			}
		}
		return null;
	}
	,submitMove: function(viewX,viewY,source) {
		if(viewX == this._x && viewY == this._y) return;
		var result = this.getHitAndChain(viewX,viewY);
		this.prepare(viewX,viewY,result != null?result.hit:null,source);
		if(result != null) {
			var _g = 0;
			var _g1 = result.chain;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				e.onPointerMove(shoe3d.core.input.PointerManager._sharedEvent);
				if(shoe3d.core.input.PointerManager._sharedEvent._stopped) return;
			}
		}
		this.move.emit(shoe3d.core.input.PointerManager._sharedEvent);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		var hit = null;
		this.submitMove(viewX,viewY,source);
		this._isDown = false;
		var result = this.getHitAndChain(viewX,viewY);
		this.prepare(viewX,viewY,result != null?result.hit:null,source);
		if(result != null) {
			var _g = 0;
			var _g1 = result.chain;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				e.onPointerUp(shoe3d.core.input.PointerManager._sharedEvent);
				if(shoe3d.core.input.PointerManager._sharedEvent._stopped) return;
			}
		}
		this.up.emit(shoe3d.core.input.PointerManager._sharedEvent);
	}
	,prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		shoe3d.core.input.PointerManager._sharedEvent.set(shoe3d.core.input.PointerManager._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,__class__: shoe3d.core.input.PointerManager
};
shoe3d.core.input.TouchManager = function() {
	this._disabled = false;
	this._pointMap = new haxe.ds.IntMap();
	this.up = new shoe3d.util.signal.SingleSignal();
	this.move = new shoe3d.util.signal.SingleSignal();
	this.down = new shoe3d.util.signal.SingleSignal();
	this.points = [];
	this._pointer = shoe3d.System.input.pointer;
};
shoe3d.core.input.TouchManager.__name__ = ["shoe3d","core","input","TouchManager"];
shoe3d.core.input.TouchManager.prototype = {
	up: null
	,down: null
	,move: null
	,points: null
	,maxPoints: null
	,_pointerTouch: null
	,_pointMap: null
	,_pointer: null
	,_disabled: null
	,get_supported: function() {
		return !this._disabled;
	}
	,submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new shoe3d.core.input.TouchPoint(id);
			point.set(viewX,viewY);
			this._pointMap.set(id,point);
			this.points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.set(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.set(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this.points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,__class__: shoe3d.core.input.TouchManager
};
shoe3d.core.input.TouchPoint = function(id) {
	this.id = id;
	this._source = shoe3d.core.input.EventSource.Touch(this);
};
shoe3d.core.input.TouchPoint.__name__ = ["shoe3d","core","input","TouchPoint"];
shoe3d.core.input.TouchPoint.prototype = {
	viewX: null
	,viewY: null
	,id: null
	,set: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,_source: null
	,__class__: shoe3d.core.input.TouchPoint
};
shoe3d.screen.GameScreen = function() {
	this.layers = [];
};
shoe3d.screen.GameScreen.__name__ = ["shoe3d","screen","GameScreen"];
shoe3d.screen.GameScreen.prototype = {
	layers: null
	,onUpdate: function() {
	}
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
	,newLayer2D: function(name,pointerEnabled) {
		if(pointerEnabled == null) pointerEnabled = false;
		var layer = new shoe3d.core.Layer2D(name);
		layer.addOrthoCamera();
		layer.pointerEnabled = pointerEnabled;
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
shoe3d.sound = {};
shoe3d.sound.Sound = function() {
};
shoe3d.sound.Sound.__name__ = ["shoe3d","sound","Sound"];
shoe3d.sound.Sound.prototype = {
	__class__: shoe3d.sound.Sound
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
shoe3d.util.HtmlUtils = function() { };
shoe3d.util.HtmlUtils.__name__ = ["shoe3d","util","HtmlUtils"];
shoe3d.util.HtmlUtils.loadExtension = function(name,obj) {
	if(obj == null) obj = window;
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0;
	var _g1 = shoe3d.util.HtmlUtils.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
};
shoe3d.util.HtmlUtils.hideMobileBrowser = function() {
	window.scrollTo(1,0);
};
shoe3d.util.HtmlUtils.polyfill = function(name,obj) {
	if(obj == null) obj = window;
	var value = shoe3d.util.HtmlUtils.loadExtension(name,obj).value;
	if(value == null) return false;
	obj[name] = value;
	return true;
};
shoe3d.util.Info = function() { };
shoe3d.util.Info.__name__ = ["shoe3d","util","Info"];
shoe3d.util.Info.isMobileBrowser = function() {
	return window.orientation === Number(window.orientation);
};
shoe3d.util.Log = function() { };
shoe3d.util.Log.__name__ = ["shoe3d","util","Log"];
shoe3d.util.Log.warn = function(msg) {
	console.warn(msg);
};
shoe3d.util.Log.log = function(msg) {
	console.log(msg);
};
shoe3d.util.Log.sys = function(msg) {
	shoe3d.util.Log._sys.push(msg);
};
shoe3d.util.Log.printSys = function() {
	var _g = 0;
	var _g1 = shoe3d.util.Log._sys;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		shoe3d.util.Log.log(i);
	}
};
shoe3d.util.SMath = function() { };
shoe3d.util.SMath.__name__ = ["shoe3d","util","SMath"];
shoe3d.util.SMath.lerp = function(t,a,b) {
	return a + (b - a) * t;
};
shoe3d.util.SMath.lerpClamped = function(t,a,b) {
	return a + (b - a) * shoe3d.util.SMath.clamp(t,0,1);
};
shoe3d.util.SMath.clamp = function(t,a,b) {
	return Math.max(a,Math.min(b,t));
};
shoe3d.util.SMath.clamp01 = function(t) {
	return shoe3d.util.SMath.clamp(t,0,1);
};
shoe3d.util.SMath.inRange = function(t,a,b) {
	return t >= a && t <= b;
};
shoe3d.util.SMath.inRangeStrict = function(t,a,b) {
	return t > a && t < b;
};
shoe3d.util.SMath.fuzzyEqual = function(a,b,epsilon) {
	if(epsilon == null) epsilon = 0.0001;
	return shoe3d.util.SMath.fabs(a - b) <= epsilon;
};
shoe3d.util.SMath.fabs = function(a) {
	if(a < 0) return -a; else return a;
};
shoe3d.util.SMath.fsin = function(x) {
	var y;
	y = 1.2732395447351628 * x + -0.4052847345693511 * x * (x < 0?-x:x);
	return 0.225 * (y * (y < 0?-y:y) - y) + y;
};
shoe3d.util.SMath.fcos = function(x) {
	x = x + 1.5707963267948966;
	if(x > 3.141592653589793) x -= 6.2831853071795862;
	var y;
	y = 1.2732395447351628 * x + -0.4052847345693511 * x * (x < 0?-x:x);
	return 0.225 * (y * (y < 0?-y:y) - y) + y;
};
shoe3d.util.StringHelp = function() { };
shoe3d.util.StringHelp.__name__ = ["shoe3d","util","StringHelp"];
shoe3d.util.StringHelp.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,dot + 1,null); else return null;
};
shoe3d.util.StringHelp.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	if(dot > 0) return HxOverrides.substr(fileName,0,dot); else return fileName;
};
shoe3d.util.StringHelp.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return shoe3d.util.StringHelp.getFileExtension(url);
};
shoe3d.util.StringHelp.joinPath = function(base,relative) {
	if(base.length > 0 && base.charCodeAt(base.length - 1) != 47) base += "/";
	return base + relative;
};
shoe3d.util.StringHelp.hashCode = function(str) {
	var code = 0;
	if(str != null) {
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var ii = _g1++;
			code = Std["int"](31 * code + str.charCodeAt(ii));
		}
	}
	return code;
};
shoe3d.util.Tools = function() { };
shoe3d.util.Tools.__name__ = ["shoe3d","util","Tools"];
shoe3d.util.Tools.getRandomFromArray = function(a) {
	return a[Math.floor(Math.random() * a.length)];
};
shoe3d.util.UVTools = function() { };
shoe3d.util.UVTools.__name__ = ["shoe3d","util","UVTools"];
shoe3d.util.UVTools.UVfromRectangle = function(rect,totalWidth,totalHeight) {
	shoe3d.util.Assert.that(rect != null);
	return { umin : rect.x / totalWidth, vmin : (totalHeight - rect.y - rect.height) / totalHeight, umax : (rect.x + rect.width) / totalWidth, vmax : (totalHeight - rect.y) / totalHeight};
};
shoe3d.util.UVTools.UVFromRectangles = function(rect,from) {
	shoe3d.util.Assert.that(rect != null);
	shoe3d.util.Assert.that(from != null);
	throw "NO!";
};
shoe3d.util.UVTools.setGeometryUVFromTexDef = function(geom,texDef) {
	shoe3d.util.UVTools.setGeometryUV(geom,texDef.uv);
};
shoe3d.util.UVTools.setGeometryUV = function(geom,uv) {
	geom.uvsNeedUpdate = true;
	var _g = 0;
	var _g1 = geom.faceVertexUvs;
	while(_g < _g1.length) {
		var a = _g1[_g];
		++_g;
		var _g2 = 0;
		while(_g2 < a.length) {
			var b = a[_g2];
			++_g2;
			var _g3 = 0;
			while(_g3 < b.length) {
				var c = b[_g3];
				++_g3;
				c.x = uv.umin + (uv.umax - uv.umin) * c.x;
				c.y = uv.vmin + (uv.vmax - uv.vmin) * c.y;
			}
		}
	}
};
shoe3d.util.Value = function(initial) {
	this.__ = initial;
	this.change = new shoe3d.util.signal.DoubleSignal();
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
		this.change.emit(this.__,old);
		return this.get__();
	}
	,__class__: shoe3d.util.Value
};
shoe3d.util.math = {};
shoe3d.util.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
shoe3d.util.math.Rectangle.__name__ = ["shoe3d","util","math","Rectangle"];
shoe3d.util.math.Rectangle.prototype = {
	x: null
	,y: null
	,width: null
	,height: null
	,set: function(x,y,width,height) {
		if(x != null) this.x = x;
		if(y != null) this.y = y;
		if(width != null) this.width = width;
		if(height != null) this.height = height;
	}
	,isXYInside: function(x,y) {
		var c = this.getCenter();
		return Math.abs(c.x - x) <= this.width / 2 && Math.abs(c.y - y) <= this.height / 2;
	}
	,isVector2Inside: function(v) {
		var c = this.getCenter();
		return Math.abs(c.x - v.x) <= this.width / 2 && Math.abs(c.y - v.y) <= this.height / 2;
	}
	,getCenter: function() {
		return new THREE.Vector2(this.x + this.width / 2,this.y + this.width / 2);
	}
	,__class__: shoe3d.util.math.Rectangle
};
shoe3d.util.promise = {};
shoe3d.util.promise.Promise = function() {
	this.success = new shoe3d.util.signal.SingleSignal();
	this.error = new shoe3d.util.signal.SingleSignal();
	this.progress = new shoe3d.util.Value(0);
	this._progress = 0;
};
shoe3d.util.promise.Promise.__name__ = ["shoe3d","util","promise","Promise"];
shoe3d.util.promise.Promise.prototype = {
	_result: null
	,ready: null
	,success: null
	,error: null
	,progress: null
	,_progress: null
	,get_result: function() {
		if(!this.ready) throw "Promise is not ready";
		return this._result;
	}
	,set_result: function(value) {
		if(this.ready) throw "Promise is ready";
		this._result = value;
		this.ready = true;
		this.success.emit(value);
		return this._result;
	}
	,__class__: shoe3d.util.promise.Promise
};
shoe3d.util.signal = {};
shoe3d.util.signal.Sentinel = function(signal,fn) {
	this.isOnce = false;
	this._signal = signal;
	this._fn = fn;
	this.isOnce = false;
};
shoe3d.util.signal.Sentinel.__name__ = ["shoe3d","util","signal","Sentinel"];
shoe3d.util.signal.Sentinel.prototype = {
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
	,__class__: shoe3d.util.signal.Sentinel
};
shoe3d.util.signal.Signal = function() {
};
shoe3d.util.signal.Signal.__name__ = ["shoe3d","util","signal","Signal"];
shoe3d.util.signal.Signal.prototype = {
	_head: null
	,hasListeners: function() {
		return this._head != null;
	}
	,connectInner: function(callback,highPriority) {
		if(highPriority == null) highPriority = false;
		var sentinel = new shoe3d.util.signal.Sentinel(this,callback);
		if(this._head == shoe3d.util.signal.Signal.DUMMY) throw "Can't connect to signal when dispatching";
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
		if(this._head == shoe3d.util.signal.Signal.DUMMY) throw "Can't connect to signal when dispatching";
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
		return this._head == shoe3d.util.signal.Signal.DUMMY;
	}
	,__class__: shoe3d.util.signal.Signal
};
shoe3d.util.signal.DoubleSignal = function() {
	shoe3d.util.signal.Signal.call(this);
};
shoe3d.util.signal.DoubleSignal.__name__ = ["shoe3d","util","signal","DoubleSignal"];
shoe3d.util.signal.DoubleSignal.__super__ = shoe3d.util.signal.Signal;
shoe3d.util.signal.DoubleSignal.prototype = $extend(shoe3d.util.signal.Signal.prototype,{
	connect: function(callback,highPriority) {
		if(highPriority == null) highPriority = false;
		return this.connectInner(callback,highPriority);
	}
	,emit: function(arg1,arg2) {
		if(this._head == shoe3d.util.signal.Signal.DUMMY) throw "Can't emit when dispatching";
		var last = this._head;
		while(last != null) {
			last._fn(arg1,arg2);
			if(last.isOnce) last.dispose();
			last = last._next;
		}
	}
	,__class__: shoe3d.util.signal.DoubleSignal
});
shoe3d.util.signal.SingleSignal = function() {
	shoe3d.util.signal.Signal.call(this);
};
shoe3d.util.signal.SingleSignal.__name__ = ["shoe3d","util","signal","SingleSignal"];
shoe3d.util.signal.SingleSignal.__super__ = shoe3d.util.signal.Signal;
shoe3d.util.signal.SingleSignal.prototype = $extend(shoe3d.util.signal.Signal.prototype,{
	connect: function(callback,highPriority) {
		if(highPriority == null) highPriority = false;
		return this.connectInner(callback,highPriority);
	}
	,emit: function(arg) {
		if(this._head == shoe3d.util.signal.Signal.DUMMY) throw "Can't emit when dispatching";
		var last = this._head;
		while(last != null) {
			last._fn(arg);
			if(last.isOnce) last.dispose();
			last = last._next;
		}
	}
	,__class__: shoe3d.util.signal.SingleSignal
});
shoe3d.util.signal.ZeroSignal = function() {
	shoe3d.util.signal.Signal.call(this);
};
shoe3d.util.signal.ZeroSignal.__name__ = ["shoe3d","util","signal","ZeroSignal"];
shoe3d.util.signal.ZeroSignal.__super__ = shoe3d.util.signal.Signal;
shoe3d.util.signal.ZeroSignal.prototype = $extend(shoe3d.util.signal.Signal.prototype,{
	connect: function(callback,callbackhighPriority) {
		if(callbackhighPriority == null) callbackhighPriority = false;
		return this.connectInner(callback,callbackhighPriority);
	}
	,emit: function() {
		if(this._head == shoe3d.util.signal.Signal.DUMMY) throw "Can't emit when dispatching";
		var last = this._head;
		while(last != null) {
			last._fn();
			if(last.isOnce) last.dispose();
			last = last._next;
		}
	}
	,__class__: shoe3d.util.signal.ZeroSignal
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
	shoe3d.System.showFPSMeter();
	shoe3d.System.loadFolderFromAssets("biba",function(pc) {
		tests.Main.pack = pc;
		tests.Main.pack.defineAtlas("main","sprites","sprites.txt");
		tests.Main.pack.defineGeomDef("mesh","model1","logo");
		tests.Main.pack.defineGeomDef("cube","cube","main_pattern",true);
		shoe3d.System.screen.show("game");
		shoe3d.System.start();
	});
	shoe3d.System.renderer.showStats();
	shoe3d.System.screen.addScreen("game",tests.TestScreen);
	shoe3d.System.screen.addScreen("game2",tests.TestScreen2);
	shoe3d.System.start();
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
	this.last = -1;
	shoe3d.screen.GameScreen.call(this);
	var layer = new shoe3d.core.Layer("layer");
	this.addLayer(layer);
	var gd = tests.Main.pack.getGeomDef("cube");
	var _g = 0;
	while(_g < 200) {
		var i = _g++;
		var go = new shoe3d.core.game.GameObject("GO" + i).add(new shoe3d.component.GeometryDisplay(gd));
		go.transform.position.x = Math.random() * 40 - 20;
		go.transform.position.y = Math.random() * 40 - 20;
		go.transform.position.z = Math.random() * 40 - 20;
		go.transform.rotateX(Math.random() * 3.14);
		go.transform.rotateY(Math.random() * 3.14);
		go.transform.rotateZ(Math.random() * 3.14);
		layer.addChild(go);
	}
	var dl = new THREE.DirectionalLight(9366269,0.7);
	dl.rotateX(0.9);
	dl.rotateY(0.5);
	dl.rotateZ(0.2);
	layer.scene.add(dl);
	layer.scene.add(new THREE.AmbientLight(16777215));
	layer.addChild(new shoe3d.core.game.GameObject().add(new shoe3d.component.CameraHolder()));
	layer.setCamera(new THREE.PerspectiveCamera(60,1.3333333333333333,0.1,1000));
	var ui = this.layer2d = this.newLayer2D("UILAYER",true);
	var g2d = new shoe3d.core.game.GameObject("SPRITETEST");
	var spr = new shoe3d.component.Sprite2D("logo");
	g2d.add(spr);
	var mgr = new THREE.LoadingManager();
	var l = new THREE.TextureLoader(mgr);
	var cc;
	cc = js.Boot.__cast(ui.camera , THREE.OrthographicCamera);
	var a = [];
	var _g1 = 0;
	while(_g1 < 3) {
		var i1 = _g1++;
		a[i1] = this.addSprite(i1 == 1?a[0].owner:this.layer2d);
	}
	shoe3d.System.input.mouse.move.connect(function(e) {
	});
	var addL = function(e1,name) {
		e1.get_pointerUp().connect(function(e2) {
			haxe.Log.trace("UP " + name,{ fileName : "TestScreen.hx", lineNumber : 181, className : "tests.TestScreen", methodName : "new"});
		});
		e1.get_pointerIn().connect(function(e3) {
			haxe.Log.trace("IN " + name,{ fileName : "TestScreen.hx", lineNumber : 182, className : "tests.TestScreen", methodName : "new"});
		});
		e1.get_pointerOut().connect(function(e4) {
			haxe.Log.trace("OUT " + name,{ fileName : "TestScreen.hx", lineNumber : 183, className : "tests.TestScreen", methodName : "new"});
		});
		e1.get_pointerDown().connect(function(e5) {
			haxe.Log.trace("DOWN " + name,{ fileName : "TestScreen.hx", lineNumber : 184, className : "tests.TestScreen", methodName : "new"});
		});
	};
	var _g11 = 0;
	var _g2 = a.length;
	while(_g11 < _g2) {
		var i2 = [_g11++];
		a[i2[0]].get_pointerUp().connect((function(i2) {
			return function(e6) {
				haxe.Log.trace("UP" + i2[0],{ fileName : "TestScreen.hx", lineNumber : 190, className : "tests.TestScreen", methodName : "new"});
			};
		})(i2));
		a[i2[0]].get_pointerIn().connect((function(i2) {
			return function(e7) {
				haxe.Log.trace("IN" + i2[0],{ fileName : "TestScreen.hx", lineNumber : 193, className : "tests.TestScreen", methodName : "new"});
			};
		})(i2));
		a[i2[0]].get_pointerOut().connect((function(i2) {
			return function(e8) {
				haxe.Log.trace("OUT" + i2[0],{ fileName : "TestScreen.hx", lineNumber : 194, className : "tests.TestScreen", methodName : "new"});
			};
		})(i2));
		a[i2[0]].get_pointerDown().connect((function(i2) {
			return function(e9) {
				haxe.Log.trace("DOWN" + i2[0],{ fileName : "TestScreen.hx", lineNumber : 195, className : "tests.TestScreen", methodName : "new"});
			};
		})(i2));
	}
	var progress = new shoe3d.component.ProgressBar("game_pattern");
	addL(progress,"PROGRESS");
	var pgo = new shoe3d.core.game.GameObject().add(progress);
	pgo.transform.position.set(400,400,0);
	this.layer2d.addChild(pgo);
	shoe3d.System._loop._frame.connect(function(d) {
		progress.set_progress(0.64);
	});
	var ir = new THREE.ImmediateRenderObject();
	var b = "precision mediump float;\nprecision mediump int;\n";
	var mat = new THREE.RawShaderMaterial({ uniforms : { map : { type : "t", value : a}}, vertexShader : b + "\tuniform mat4 modelViewMatrix;\tuniform mat4 projectionMatrix;\tattribute vec2 position;\tattribute vec4 color;\tattribute vec2 uv;\tvarying vec4 vColor;\tvarying vec2 vUv;\tvoid main() {\t\tvColor = color;\t\tvUv = uv;\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);\t}", fragmentShader : b + "\tvarying vec4 vColor; varying vec2 vUv; uniform sampler2D map;\t\tvoid main() {\t\tgl_FragColor = vColor * texture2D(map, vUv);\t}", depthTest : false, depthWrite : false, transparent : true, side : THREE.DoubleSide});
	mat.map = tests.Main.pack.getTexDef("logo").texture;
	ir.material = mat;
	ir.render = function(cb) {
		ir.positionArray = new Float32Array([0,0,0,0,100,0,100,100,100]);
		ir.uvArray = new Float32Array([0,0,0,0,1,0,1,1,1]);
		ir.hasPositions = true;
		ir.hasUvs = true;
		ir.count = 3;
		cb(ir);
	};
	this.layer2d.scene.add(ir);
};
tests.TestScreen.__name__ = ["tests","TestScreen"];
tests.TestScreen.__super__ = shoe3d.screen.GameScreen;
tests.TestScreen.prototype = $extend(shoe3d.screen.GameScreen.prototype,{
	layer2d: null
	,onUpdate: function() {
	}
	,last: null
	,io: null
	,addSprite: function(owner,name) {
		if(name == null) name = "";
		var tn;
		if(name == "") tn = shoe3d.util.Tools.getRandomFromArray(["logo"]); else tn = name;
		var go = new shoe3d.core.game.GameObject().add(new shoe3d.component.Sprite2D(tn));
		go.transform.position.set(this.last * 250 + 300,250 * this.last + 300,go.transform.position.z);
		go.transform.scale.set((this.last + 2) * 0.05 * 0 + 1,(this.last + 2) * 0.05 * 0 + 1,1);
		if(this.last != 0) go.transform.position.set(400 + 0 * this.last,400 + 200 * this.last,0); else go.transform.position.set(0,50,0);
		go.transform.position.set(400 + 0 * this.last,400 + 200 * this.last,0);
		this.last += 1;
		if(owner != null) owner.addChild(go);
		return go.get(shoe3d.component.Sprite2D);
	}
	,__class__: tests.TestScreen
});
tests.TestScreen2 = function() {
	var _g = this;
	shoe3d.screen.GameScreen.call(this);
	var texDef = shoe3d.asset.Res.getTexDef("main_pattern");
	var geom = new THREE.BoxGeometry(2,1,0.5);
	shoe3d.util.UVTools.setGeometryUVFromTexDef(geom,texDef);
	var platformGeomDef = { geom : geom, texDef : texDef, material : new THREE.MeshPhongMaterial({ map : texDef.texture})};
	var layer1 = this.newLayer("platforms");
	var _g1 = 0;
	while(_g1 < 10) {
		var i = _g1++;
		var pl = new shoe3d.core.game.GameObject();
		pl.add(new shoe3d.component.GeometryDisplay(platformGeomDef));
		pl.transform.position.set(Math.random() * 10 - 5,0,Math.random() * 10 - 5);
		layer1.addChild(pl);
	}
	var dl = new THREE.DirectionalLight(9366269,0.8);
	dl.position.set(10,5,10);
	dl.lookAt(new THREE.Vector3(0,0,0));
	layer1.scene.add(dl);
	layer1.scene.add(new THREE.AmbientLight(16777215));
	var anim = new shoe3d.core.game.GameObject();
	var skm = new THREE.SkinnedMesh(tests.Main.pack.getGeometry("anim2"),new THREE.MeshPhongMaterial({ color : 698089, skinning : true}));
	anim.transform.add(skm);
	layer1.addChild(anim);
	this.skm = skm;
	var t = this.getIdleAction();
	haxe.Log.trace(t.clip.tracks,{ fileName : "TestScreen2.hx", lineNumber : 83, className : "tests.TestScreen2", methodName : "new"});
	var act =  new THREE.AnimationAction( skm.geometry.animations[0] );
	act.timeScale = 10;
	act.loop = THREE.LoopOnce;
	this.mixer = new THREE.AnimationMixer(skm);
	this.action = act;
	this.mixer.play(act);
	var idle = this.createActionFromTracks("Idle",skm.geometry.animations,THREE.LoopPingPong,1);
	var kick = this.createActionFromTracks("LKick",skm.geometry.animations,THREE.LoopOnce,1);
	idle.timeScale = 2;
	kick.timeScale = 5;
	this.mixer.addAction(idle);
	layer1.camera.position.set(10,10,10);
	layer1.camera.lookAt(new THREE.Vector3(0,0,0));
	layer1.camera.lookAt(anim.transform.position);
	layer1.camera.up = new THREE.Vector3(0,0,1);
	var last = idle;
	haxe.Log.trace(THREE.LoopPingPong,{ fileName : "TestScreen2.hx", lineNumber : 114, className : "tests.TestScreen2", methodName : "new"});
	var crossed = false;
	var click = function(e) {
		crossed = true;
		haxe.Log.trace("CROSSFADE",{ fileName : "TestScreen2.hx", lineNumber : 119, className : "tests.TestScreen2", methodName : "new"});
		_g.mixer.removeAllActions();
		var to = _g.getKickAction();
		_g.mixer.play(to);
		_g.mixer.crossFade(last,to,0.3,false);
		last = kick;
	};
	var evt;
	shoe3d.System.input.mouse.up.connect(click);
	var loop = function(e1) {
		if(e1.action == idle || !crossed) return;
		crossed = false;
		_g.mixer.removeAllActions();
		var to1 = _g.getIdleAction();
		var from = _g.getKickAction();
		_g.mixer.play(to1);
		_g.mixer.crossFade(last,to1,0.3,false);
	};
	this.mixer.addEventListener("finished",loop);
	var end = function(e2) {
		haxe.Log.trace(e2.type,{ fileName : "TestScreen2.hx", lineNumber : 148, className : "tests.TestScreen2", methodName : "new", customParams : [e2.action.clip.name]});
	};
	this.mixer.addEventListener("finished",end);
	this.mixer.addEventListener("loop",end);
};
tests.TestScreen2.__name__ = ["tests","TestScreen2"];
tests.TestScreen2.__super__ = shoe3d.screen.GameScreen;
tests.TestScreen2.prototype = $extend(shoe3d.screen.GameScreen.prototype,{
	skm: null
	,action: null
	,mixer: null
	,createActionFromTracks: function(name,tracks,loop,weight,scale) {
		if(scale == null) scale = 1;
		if(weight == null) weight = 1;
		var _g = 0;
		while(_g < tracks.length) {
			var i = tracks[_g];
			++_g;
			if(i.name == name) return new THREE.AnimationAction( i, 0, scale, weight, loop);;
		}
		return null;
	}
	,getKickAction: function() {
		return this.createActionFromTracks("LKick",this.skm.geometry.animations,THREE.LoopOnce,1,5);
	}
	,getIdleAction: function() {
		return this.createActionFromTracks("Idle",this.skm.geometry.animations,THREE.LoopPingPong,1);
	}
	,onUpdate: function() {
		this.mixer.update(shoe3d.core.Time.dt);
	}
	,__class__: tests.TestScreen2
});
var three = {};
three._AnimationMixer = {};
three._AnimationMixer.AnimationEventType_Impl_ = function() { };
three._AnimationMixer.AnimationEventType_Impl_.__name__ = ["three","_AnimationMixer","AnimationEventType_Impl_"];
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
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
shoe3d.core.InputManager._lastTouchTime = 0;
shoe3d.core.RenderManager.clearColor = 4009518;
shoe3d.screen.ScreenManager._currentScreenName = "";
shoe3d.screen.ScreenManager.width = 0;
shoe3d.screen.ScreenManager.height = 0;
shoe3d.core.WindowManager.mode = shoe3d.core.WindowMode.Fill;
shoe3d.core.WindowManager.width = 640;
shoe3d.core.WindowManager.height = 800;
shoe3d.System.time = shoe3d.core.Time;
shoe3d.System.screen = shoe3d.screen.ScreenManager;
shoe3d.System.window = shoe3d.core.WindowManager;
shoe3d.System.renderer = shoe3d.core.RenderManager;
shoe3d.System.input = shoe3d.core.InputManager;
shoe3d.System.updateInfoEveryNthFrame = 6;
shoe3d.System.W = 640;
shoe3d.System.H = 640;
shoe3d.System._infoFrameCounter = 0;
shoe3d.System._showFPS = false;
shoe3d.component.Element2D.lastLevel = 0;
shoe3d.component.Element2D.lastAlpha = 1.0;
shoe3d.core.input.KeyCodes.A = 65;
shoe3d.core.input.KeyCodes.B = 66;
shoe3d.core.input.KeyCodes.C = 67;
shoe3d.core.input.KeyCodes.D = 68;
shoe3d.core.input.KeyCodes.E = 69;
shoe3d.core.input.KeyCodes.F = 70;
shoe3d.core.input.KeyCodes.G = 71;
shoe3d.core.input.KeyCodes.H = 72;
shoe3d.core.input.KeyCodes.I = 73;
shoe3d.core.input.KeyCodes.J = 74;
shoe3d.core.input.KeyCodes.K = 75;
shoe3d.core.input.KeyCodes.L = 76;
shoe3d.core.input.KeyCodes.M = 77;
shoe3d.core.input.KeyCodes.N = 78;
shoe3d.core.input.KeyCodes.O = 79;
shoe3d.core.input.KeyCodes.P = 80;
shoe3d.core.input.KeyCodes.Q = 81;
shoe3d.core.input.KeyCodes.R = 82;
shoe3d.core.input.KeyCodes.S = 83;
shoe3d.core.input.KeyCodes.T = 84;
shoe3d.core.input.KeyCodes.U = 85;
shoe3d.core.input.KeyCodes.V = 86;
shoe3d.core.input.KeyCodes.W = 87;
shoe3d.core.input.KeyCodes.X = 88;
shoe3d.core.input.KeyCodes.Y = 89;
shoe3d.core.input.KeyCodes.Z = 90;
shoe3d.core.input.KeyCodes.NUMBER_0 = 48;
shoe3d.core.input.KeyCodes.NUMBER_1 = 49;
shoe3d.core.input.KeyCodes.NUMBER_2 = 50;
shoe3d.core.input.KeyCodes.NUMBER_3 = 51;
shoe3d.core.input.KeyCodes.NUMBER_4 = 52;
shoe3d.core.input.KeyCodes.NUMBER_5 = 53;
shoe3d.core.input.KeyCodes.NUMBER_6 = 54;
shoe3d.core.input.KeyCodes.NUMBER_7 = 55;
shoe3d.core.input.KeyCodes.NUMBER_8 = 56;
shoe3d.core.input.KeyCodes.NUMBER_9 = 57;
shoe3d.core.input.KeyCodes.NUMPAD_0 = 96;
shoe3d.core.input.KeyCodes.NUMPAD_1 = 97;
shoe3d.core.input.KeyCodes.NUMPAD_2 = 98;
shoe3d.core.input.KeyCodes.NUMPAD_3 = 99;
shoe3d.core.input.KeyCodes.NUMPAD_4 = 100;
shoe3d.core.input.KeyCodes.NUMPAD_5 = 101;
shoe3d.core.input.KeyCodes.NUMPAD_6 = 102;
shoe3d.core.input.KeyCodes.NUMPAD_7 = 103;
shoe3d.core.input.KeyCodes.NUMPAD_8 = 104;
shoe3d.core.input.KeyCodes.NUMPAD_9 = 105;
shoe3d.core.input.KeyCodes.NUMPAD_ADD = 107;
shoe3d.core.input.KeyCodes.NUMPAD_DECIMAL = 110;
shoe3d.core.input.KeyCodes.NUMPAD_DIVIDE = 111;
shoe3d.core.input.KeyCodes.NUMPAD_ENTER = 108;
shoe3d.core.input.KeyCodes.NUMPAD_MULTIPLY = 106;
shoe3d.core.input.KeyCodes.NUMPAD_SUBTRACT = 109;
shoe3d.core.input.KeyCodes.F1 = 112;
shoe3d.core.input.KeyCodes.F2 = 113;
shoe3d.core.input.KeyCodes.F3 = 114;
shoe3d.core.input.KeyCodes.F4 = 115;
shoe3d.core.input.KeyCodes.F5 = 116;
shoe3d.core.input.KeyCodes.F6 = 117;
shoe3d.core.input.KeyCodes.F7 = 118;
shoe3d.core.input.KeyCodes.F8 = 119;
shoe3d.core.input.KeyCodes.F9 = 120;
shoe3d.core.input.KeyCodes.F10 = 121;
shoe3d.core.input.KeyCodes.F11 = 122;
shoe3d.core.input.KeyCodes.F12 = 123;
shoe3d.core.input.KeyCodes.F13 = 124;
shoe3d.core.input.KeyCodes.F14 = 125;
shoe3d.core.input.KeyCodes.F15 = 126;
shoe3d.core.input.KeyCodes.LEFT = 37;
shoe3d.core.input.KeyCodes.UP = 38;
shoe3d.core.input.KeyCodes.RIGHT = 39;
shoe3d.core.input.KeyCodes.DOWN = 40;
shoe3d.core.input.KeyCodes.ALT = 18;
shoe3d.core.input.KeyCodes.BACKQUOTE = 192;
shoe3d.core.input.KeyCodes.BACKSLASH = 220;
shoe3d.core.input.KeyCodes.BACKSPACE = 8;
shoe3d.core.input.KeyCodes.CAPS_LOCK = 20;
shoe3d.core.input.KeyCodes.COMMA = 188;
shoe3d.core.input.KeyCodes.COMMAND = 15;
shoe3d.core.input.KeyCodes.CONTROL = 17;
shoe3d.core.input.KeyCodes.DELETE = 46;
shoe3d.core.input.KeyCodes.END = 35;
shoe3d.core.input.KeyCodes.ENTER = 13;
shoe3d.core.input.KeyCodes.EQUALS = 187;
shoe3d.core.input.KeyCodes.ESCAPE = 27;
shoe3d.core.input.KeyCodes.HOME = 36;
shoe3d.core.input.KeyCodes.INSERT = 45;
shoe3d.core.input.KeyCodes.LEFT_BRACKET = 219;
shoe3d.core.input.KeyCodes.MINUS = 189;
shoe3d.core.input.KeyCodes.PAGE_DOWN = 34;
shoe3d.core.input.KeyCodes.PAGE_UP = 33;
shoe3d.core.input.KeyCodes.PERIOD = 190;
shoe3d.core.input.KeyCodes.QUOTE = 222;
shoe3d.core.input.KeyCodes.RIGHT_BRACKET = 221;
shoe3d.core.input.KeyCodes.SEMICOLON = 186;
shoe3d.core.input.KeyCodes.SHIFT = 16;
shoe3d.core.input.KeyCodes.SLASH = 191;
shoe3d.core.input.KeyCodes.SPACE = 32;
shoe3d.core.input.KeyCodes.TAB = 9;
shoe3d.core.input.KeyCodes.BACK = 16777238;
shoe3d.core.input.KeyCodes.MENU = 16777234;
shoe3d.core.input.KeyCodes.SEARCH = 16777247;
shoe3d.core.input.KeyboardManager._sharedEvent = new shoe3d.core.input.KeyboardEvent();
shoe3d.core.input.MouseManager._sharedEvent = new shoe3d.core.input.MouseEvent();
shoe3d.core.input.MouseManager.LEFT = 0;
shoe3d.core.input.MouseManager.MIDDLE = 1;
shoe3d.core.input.MouseManager.RIGHT = 2;
shoe3d.core.input.PointerManager._sharedEvent = new shoe3d.core.input.PointerEvent();
shoe3d.core.input.PointerManager._scratchPoint = new THREE.Vector2();
shoe3d.util.HtmlUtils.HIDE_MOBILE_BROWSER = window.top == window && new EReg("Mobile(/.*)? Safari","").match(window.navigator.userAgent);
shoe3d.util.HtmlUtils.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
shoe3d.util.Log._sys = [];
shoe3d.util.SMath.PI = 3.141592653589793;
shoe3d.util.SMath.HALF_PI = 1.5707963267948966;
shoe3d.util.SMath.TWO_PI = 6.2831853071795862;
shoe3d.util.SMath.toRADIANS = 0.017453292519943295;
shoe3d.util.SMath.toDEGREES = 57.295779513082323;
shoe3d.util.SMath.B = 1.2732395447351628;
shoe3d.util.SMath.C = -0.4052847345693511;
shoe3d.util.SMath.P = 0.225;
shoe3d.util.signal.Signal.DUMMY = new shoe3d.util.signal.Sentinel(null,null);
three._AnimationMixer.AnimationEventType_Impl_.Finished = "finished";
three._AnimationMixer.AnimationEventType_Impl_.Loop = "loop";
tests.Main.main();
})();

//# sourceMappingURL=Shoe3dPROJECT.js.map