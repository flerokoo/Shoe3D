package shoe3d.component;
import shoe3d.core.game.Component;
import three.AmbientLight;

/**
 * ...
 * @author as
 */
class LightAmbient extends Component
{
	var light:AmbientLight;
	
	public function new( ?hex:Int ) 
	{
		super();
		light = new AmbientLight( hex );
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		owner.transform.add( light );
	}
	
	override public function onRemoved() 
	{
		super.onRemoved();
		owner.transform.remove( light );
	}
	
}