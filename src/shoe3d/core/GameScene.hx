package shoe3d.core;
import three.Scene;

/**
 * ...
 * @author as
 */
class GameScene extends Scene 
{
	
	public var gameObjects:Array<GameObject>;
	
	public function new() 
	{
		super();
		gameObjects = [];
	}
	
	public function addChild( child:GameObject ) 
	{
		gameObjects.push( child );
		super.add( child.transform );
	}
	
	public function removeChild( child:GameObject ) 
	{
		gameObjects.remove( child );
		super.remove( child.transform );
	}
	
}