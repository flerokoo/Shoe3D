package shoe3d.core;
import shoe3d.util.Assert;
import three.Camera;
import three.OrthographicCamera;
import three.Vector3;
import three.WebGLRenderer;

/**
 * ...
 * @author as
 */
class Layer2D extends Layer
{
	public var pointerEnabled:Bool = false;
	
	
	override function reconfigureCamera() 
	{
		if ( camera != null ) 
		{
			var cam = cast( camera, OrthographicCamera );
			
			var scale = 0.005;
			scale = 1;
			/*cam.left = -System.window.width / 2  *  scale;
			cam.right = System.window.width / 2  *  scale;
			cam.top = System.window.height / 2  *  scale;
			cam.bottom = -System.window.height / 2  *  scale;*/
			
			cam.left = 0;			
			cam.right = System.window.width;
			
			cam.top = System.window.height;
			cam.bottom = 0;
			
			cam.bottom = 0;
			cam.top = System.window.height;
			
			cam.far = 2001;
			cam.near = 0.5;
			
			
			//-----new
			cam.bottom = System.window.height;
			cam.top = 0;
			
			
			cam.position.set( 0, 0, 2000 );
			cam.up = new Vector3( 0, 1, 0 );
			cam.lookAt( new Vector3(0, 0, 0) );
			
			cam.updateMatrix();
			cam.updateProjectionMatrix();
			
		}
	}

	override public function render( renderer:WebGLRenderer ) 
	{
		if ( camera == null ) return;
		renderer.sortObjects = false;
		renderer.clearDepth();
		renderer.render( scene, camera );
	}
	
	public function new(?name) 
	{
		super(name);
	}
	
	override public function setCamera( cam:Camera )
	{
		Assert.that( Std.is(cam, OrthographicCamera ), "UILayer allows only ortho camera" );		
		camera = cam;
		camera.up = new Vector3( 0, 1, 0);
		reconfigureCamera();
		return this;
	}
	
}