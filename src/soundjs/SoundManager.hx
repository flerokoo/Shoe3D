package soundjs;
import three.EventDispatcher;

/**
 * ...
 * @author as
 */
@:native("createjs.Sound")
extern class SoundManager 
{
	public static var muted:Bool;
	public static function registerSound( src:String, id:String):Dynamic;
	public static function removeSound( id:String ):Dynamic;
	public static function on( event:String, listener:Dynamic ):Dynamic;
	public static function off( event:String, listener:Dynamic ):Dynamic;
	public static function createInstance( id:String, ?startTime:Float, ?duration:Float ):AbstractSoundInstance;
	
}