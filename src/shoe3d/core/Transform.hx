package shoe3d.core;
import js.three.Quaternion;
import js.three.Vector3;

/**
 * ...
 * @author as
 */
class Transform
{
	public var rotation:Quaternion;
	public var position:Vector3;
	
	
	
	public function new() 
	{
		rotation = new Quaternion();
		position = new Vector3();
	}
	
}