package three;

/**
 * ...
 * @author as
 */
@:native("THREE.PointsMaterial")
extern class PointsMaterial extends Material
{

	/**
	 * 
	 * @param	parameters {color:Int, map:Texture, size:Float, sizeAttenuation:Bool, vertexColors:*, fog:Bool}
	 */
	public function new( parameters:Dynamic );
	
	public var color:Int;
	public var map:Texture;
	public var size:Float;
	public var sizeAttenuation:Bool;
	public var vertexColors:Dynamic;
	public var fog:Bool;
}