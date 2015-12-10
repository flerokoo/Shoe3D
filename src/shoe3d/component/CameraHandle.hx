package shoe3d.component;
import shoe3d.core.Component;
import three.Camera;
import three.PerspectiveCamera;

/**
 * ...
 * @author as
 */
class CameraHandle extends Component
{

	public var camera:PerspectiveCamera;
	
	public function new() 
	{
		super();
		camera = new PerspectiveCamera( 60, 800 / 600, 0.1, 1000 );
	}
	
	override public function onAdded() 
	{
		owner.transform.add( camera );
	}
	
}