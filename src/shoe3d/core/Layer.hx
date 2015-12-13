package shoe3d.core;
import shoe3d.component.CameraHolder;
import three.Camera;
import three.OrthographicCamera;
import three.PerspectiveCamera;
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
		System.window._prePublicResize.connect( reconfigureCamera );
	}
	
	function reconfigureCamera() 
	{
		if ( camera != null ) 
		{
			if ( Std.is( camera, PerspectiveCamera ) )
			{
				var pc = cast(camera, PerspectiveCamera);
				pc.aspect = System.window.width / System.window.height;
				pc.updateProjectionMatrix();
			}
			else if ( Std.is(camera, OrthographicCamera ) ) 
			{
				var cam = cast(camera, OrthographicCamera);
				cam.left = 0;
				cam.right = System.window.width;
				cam.top = 0;
				cam.left = System.window.height;
				cam.updateProjectionMatrix();
			}
		}
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
		reconfigureCamera();
		return this;
	}
	
	public function addPerspectiveCamera():PerspectiveCamera
	{
		var pc = new PerspectiveCamera( 60, 1, 0.1, 1000 );
		setCamera( pc );
		return pc;
	}

	public function addOrthoCamera():OrthographicCamera
	{
		var pc = new OrthographicCamera( 1, 1, 1, 1, 0.1, 1000 );
		setCamera( pc );
		return pc;
	}
	
}