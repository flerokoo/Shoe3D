package shoe3d.component;
import shoe3d.core.game.Component;
import three.AmbientLight;
import three.DirectionalLight;

/**
 * ...
 * @author as
 */
class LightDirectional extends Component
{
	var light:DirectionalLight;
	
	public function new( ?hex:Int, ?intensity:Float ) 
	{
		super();
		light = new DirectionalLight( hex, intensity );
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