package three;

import js.html.Event;
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
	
	public function addEventListener( type:AnimationEventType, handler:AnimationEvent->Void ):Void;
	public function removeEventListener( type:AnimationEventType, handler:AnimationEvent->Void  ):Void;
	public function hasEventListener( type:AnimationEventType, handler:AnimationEvent->Void  ):Void;
}

@:enum
abstract AnimationEventType(String) {
	/**
	 * Fired on actions with LoopOnce
	 */
	var Finished = "finished";
	/**
	 * Fired on actions with LoopRepeat and LoopPingPong;
	 */
	var Loop = "loop";
}

extern class AnimationEvent
{
	public var action(default, null):AnimationAction;
	public var direction(default, null):Float;
	public var target(default, null):AnimationMixer;
	public var type(default, null):AnimationEventType;
}