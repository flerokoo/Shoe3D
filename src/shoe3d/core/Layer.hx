package shoe3d.core;
import shoe3d.component.CameraHolder;
import three.Camera;
import three.Scene;
import three.Vector3;

/**
 * ...
 * @author as
 */
class Layer extends Scene 
{
	
	public var camera(default, null):Camera;
	public var gameObjects(default, null):Array<GameObject>;
	//public var visible:Bool = true;	
	
	public function new( ?name:String ) 
	{
		super();
		this.name = name;
		gameObjects = [];
	}
	
	public function addChild( child:GameObject ) 
	{
		gameObjects.push( child );
		child.setLayerReferenceRecursive( this );
		super.add( child.transform );
		return this;
	}
	
	public function removeChild( child:GameObject ) 
	{
		gameObjects.remove( child );
		child.setLayerReferenceRecursive( null );
		super.remove( child.transform );
		return this;
	}
	
	public function setCamera( cam:Camera )
	{
		camera = cam;
		camera.up = new Vector3( 0, 0, 1);
		return this;
	}
	

}