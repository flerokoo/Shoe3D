package three;

/**
 * ...
 * @author as
 */
@:native("THREE.AnimationMixer")
extern class AnimationMixer
{	
	
	public var root:Dynamic;
	public var time:Float;
	public var timeScale:Float;
	public var actions:Array<AnimationAction>;
	
	
	public function new( root:Dynamic );
	public function addAction( action:AnimationAction ):Void;
	public function removeAllActions():AnimationMixer;
	public function removeAction( action:AnimationAction ):AnimationMixer;
	public function findActionByName( name:String ):AnimationAction;
	public function play( action:AnimationAction, ?fadeIn:Float ):AnimationMixer;
	public function fadeIn( action:AnimationAction, duration:Float ):AnimationMixer;
	public function warp( action:AnimationAction, startTimeScale:Float, endTimeScale:Float, duration:Float ):AnimationMixer;
	public function crossFade( from:AnimationAction, to:AnimationAction, duration:Float, warp:Bool = false ):AnimationMixer;
	public function update( dt:Float ):AnimationMixer;
	
	public function addEventListener( type:String, handler:Dynamic ):Void;
	public function removeEventListener( type:String, handler:Dynamic ):Void;
	public function hasEventListener( type:String, handler:Dynamic ):Void;
}