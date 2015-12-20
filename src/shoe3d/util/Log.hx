package shoe3d.util;

/**
 * ...
 * @author as
 */
class Log
{
	#if debug
	public static function warn( msg:String ) {
		untyped __js__("console").warn( msg );
	}
	
	
	#else
	public static inline function warn( msg:String ) {}
	#end
}