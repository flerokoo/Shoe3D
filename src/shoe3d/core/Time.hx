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
	private static var gameStartTime:Float;
	private static var lastUpdateTime:Float;
	
	public function new() 
	{
		
	}
	
	private static function init() {
		lastUpdateTime = gameStartTime = Timer.stamp();
	}
	
	public static function update() {
		var cur = Timer.stamp();
		
		dt = cur - lastUpdateTime;
		lastUpdateTime = cur;
		
		timeSinceGameStart = cur - gameStartTime;
		
	}
	
}