package shoe3d.core;
import three.Scene;

/**
 * ...
 * @author as
 */
class GameScene extends Scene implements GameObjectContainer
{
	public var components:Array<Component>;

	public function new() 
	{
		super();
		components = [];
	}
	
}