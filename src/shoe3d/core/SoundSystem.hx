package shoe3d.core;
import shoe3d.util.Value;
import soundjs.SoundManager;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class SoundSystem
{

	public static var muted(default, null):Value<Bool>;
	
	static function init() {
		muted = new Value(false);
		muted.change.connect( function(a, b) {
			SoundManager.muted = a;
		});
		return true;
	}
	
	public static function play( id:String, volume:Float, loop:Int = 1 ) {
		return SoundManager.play( id, { volume:volume, loop:loop } );		
	}
	
}