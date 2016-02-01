package shoe3d.util;

/**
 * ...
 * @author as
 */
class SMath
{
	public static inline var PI:Float = 3.141592653589793;
	public static inline var HALF_PI:Float = PI / 2 ;
	public static inline var TWO_PI:Float = PI * 2 ;
	public static inline var toRADIANS:Float = PI / 180;
	public static inline var toDEGREES:Float = 180 / PI;
	
	public static inline var B = 4 / PI;
	public static inline var C = -4 / (PI*PI);
	public static inline var P = 0.225;

	public static inline function lerp( t:Float, a:Float, b:Float) 
	{
		return a + (b - a) * t;
	}
	
	public static inline function lerpClamped( t:Float, a:Float, b:Float )
	{
		return a + (b - a) * clamp01( t );
	}
	
	public static function clamp( t:Float, a:Float, b:Float )
	{
		return Math.max( a, Math.min( b, t ) );
	}
	
	public static inline function clamp01(t:Float)
	{
		return clamp( t, 0, 1 );
	}
	
	public static inline function inRange( t:Float, a:Float, b:Float )
	{
		return t >= a && t <= b;
	}
	
	public static inline function inRangeStrict( t:Float, a:Float, b:Float )
	{
		return t > a && t < b;
	}
	
	public static inline function fuzzyEqual( a:Float, b:Float, epsilon:Float = 0.0001 )
	{
		return fabs(a - b) <= epsilon;
	}
	
	public static inline function fabs( a:Float ) 
	{
		return a < 0 ? -a : a;
	}
	
	/**
	 * Sine approximation technique.
	 * 
	 * @author Nick from http://www.devmaster.net/forums/showthread.php?t=5784
	 * @param	x
	 */
	public static inline function fsin(x:Float )
	{
		var y = B * x + C * x * fabs(x);
		
		return P * (y * fabs(y) - y) + y;
	}
	
	public static inline function fcos(x:Float):Float
	{
		x = x + HALF_PI;
		if (x > PI)
			x -= TWO_PI;
		var y = B * x + C * x * fabs(x);
		
		return P * (y * fabs(y) - y) + y;
	}
}