package three;

/**
 * ...
 * @author as
 */
@:native("THREE.AnimationClip")
extern class AnimationClip
{
	public var name:String;
	public var tracks:Array<Dynamic>;
	public var duration:Float;
	
	public function new(name:String, ?duration:Float, ?tracks:Dynamic );
	public function optimize():AnimationClip;
	public function trim():AnimationClip;
	public function getAt(time:Float):Dynamic; // replace dynamic to key

}