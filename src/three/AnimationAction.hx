package three;

/**
 * ...
 * @author as
 */
@:native("THREE.AnimationAction")
extern class AnimationAction
{

	public var clip(default,null):AnimationClip;
	public var startTime:Float;
	public var timeScale:Float;
	public var weight:Float;
	public var loopCount:Int;
	public var enabled:Bool;
	public var actionTime:Float;
	public var clipTime:Float;
	
	
	
	public function new( clip:AnimationClip, ?startTime:Float, ?timeScale:Float, ?weight:Float, ?loop:AnimationLoopType );
	public function syncWith( action:AnimationAction ):AnimationAction;
	public function warpToDuration( duration:Float):AnimationAction;
	public function update( dt:Float ):Dynamic;
	
	
}