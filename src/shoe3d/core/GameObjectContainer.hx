package shoe3d.core;
import three.Object3D;

/**
 * ...
 * @author as
 */
interface GameObjectContainer
{

	public var children:Array<Object3D>;
	public var components:Array<Component>;
	
}