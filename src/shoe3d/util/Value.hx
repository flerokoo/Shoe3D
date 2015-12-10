package shoe3d.util;
import shoe3d.util.DoubleSignal;

/**
 * ...
 * @author as
 */

#if js
//@:generic
#end

class Value<T>
{

	private var __:T;
	public var _(get, set):T;
	public var change(default, null):DoubleSignal<Value<T>,T>;
	
	
	
	public function new( initial:T ) 
	{
		__ = initial;
		change = new DoubleSignal();
	}
	
	public function set( to:T, noUpdate:Bool = false ):Value<T>
	{
		if ( noUpdate )
			__ = to;
		else
			_ = to;
		return this;
	}
	
	function get__():T 
	{
		return _self;
	}
	
	function set__(value:T):T 
	{
		var old = _self;
		_self = value;
		change.emit( this, old );
		return _self;
	}
	
}