package shoe3d.util;

/**
 * ...
 * @author as
 */
@:allow(shoe3d) 
class Log
{
	
	#if debug
	public static var _sys:Array<String> = [];
	
	public static function warn( msg:String ) {
		untyped __js__("console").warn( msg );
	}
	
	public static function log( msg:String ) {
		untyped __js__("console").log( msg );
	}
	
	public static function sys(msg:String) {
		_sys.push( msg );
	}
	
	public static function printSys() 
	{
		for ( i in _sys )
			log( i );
	}
	
	#else
	public static inline function warn( msg:String ) { }
	public static inline function log( msg:String ) { }
	public static function sys(msg:String) {}	
	public static function printSys() {}	
	#end
}