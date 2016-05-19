package shoe3d.component;
import shoe3d.core.game.Component;
import shoe3d.core.input.KeyCodes;
import shoe3d.util.Assert;
import three.Camera;
import three.Vector3;

/**
 * ...
 * @author as
 */
class CameraCopter extends Component
{

	public var camera:Camera;
	public var speedMultiplier:Float;
	
	public function new( cam:Camera, speedMul:Float = 1 ) 
	{
		super();
		
		Assert.that(cam != null, "Camera shouldn't be null" );
		camera = cam;
		speedMultiplier = speedMul;
	}
	
	override public function onUpdate() 
	{
		if ( System.input.keyboard.isDown( Numpad4 ) )
			camera.translateX( -0.1 * speedMultiplier );
				
		if ( System.input.keyboard.isDown( Numpad6 ) )
			camera.translateX( 0.1 * speedMultiplier );
				
		if ( System.input.keyboard.isDown( Numpad8 ) )
			camera.translateZ( -0.1 * speedMultiplier );
				
		if ( System.input.keyboard.isDown( Numpad5 ) )
			camera.translateZ( 0.1 * speedMultiplier );
				
		if ( System.input.keyboard.isDown( NumpadAdd ) )
			camera.translateY( -0.1 * speedMultiplier );
				
		if ( System.input.keyboard.isDown( NumpadSubtract ) )
			camera.translateY( 0.1 * speedMultiplier );
				
		if ( System.input.keyboard.isDown( Numpad7 ) )
			camera.rotateY( Math.PI * 0.01 );
			
		if ( System.input.keyboard.isDown( Numpad9 ) )
			camera.rotateY( -Math.PI * 0.01 );
			
		camera.matrixAutoUpdate = true;
	}
	
}