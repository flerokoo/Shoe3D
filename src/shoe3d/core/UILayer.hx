package shoe3d.core;
import shoe3d.util.Assert;
import three.Camera;
import three.OrthographicCamera;
import three.Vector3;

/**
 * ...
 * @author as
 */
class UILayer extends Layer
{
	
	override function reconfigureCamera() 
	{
		if ( camera != null ) 
		{
			var cam = cast( camera, OrthographicCamera );
			
			cam.left = 0;
			cam.right = System.window.width;
			cam.top = 0;
			cam.left = System.window.height;
			cam.position.set( 0, 0, 500 );
			cam.lookAt( new Vector3(0, 0, 0) );
			cam.updateProjectionMatrix();
		}
	}

	public function new(?name) 
	{
		super(name);
	}
	
	override public function setCamera( cam:Camera )
	{
		#if debug
		Assert.that( Std.is(cam, OrthographicCamera ), "UILayer allows only ortho camera" );
		#end
		
		camera = cam;
		camera.up = new Vector3( 0, 0, 1);
		reconfigureCamera();
		return this;
	}
	
}