package shoe3d.core;
import haxe.Timer;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class Time
{

	public static var dt(default, null):Float;
	public static var timeSinceGameStart(default, null):Float;
	public static var timeSinceScreenShow(default, null):Float;
	
	private static var _gameStartTime:Float;
	private static var _lastUpdateTime:Float;
	private static var _screenShowTime:Float;
	
	public function new() 
	{
		
	}
	
	private static function init() {
		_lastUpdateTime = _gameStartTime = Timer.stamp();
	}
	
	public static function update() {
		var cur = Timer.stamp();
		
		dt = cur - _lastUpdateTime;		
		timeSinceGameStart = cur - _gameStartTime;		
		timeSinceScreenShow = cur - _screenShowTime;
		
		if ( dt > 1 ) dt = 1;
		if ( dt < 0 ) dt = 0;
		
		_lastUpdateTime = cur;
		
	}
	
	private static function onScreenLoad() 
	{
		_screenShowTime = Timer.stamp();
	}
	
	private static function now():Float
	{
		return (untyped Date).now() / 1000;
	}
	
}