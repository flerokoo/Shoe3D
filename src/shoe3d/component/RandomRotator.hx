package shoe3d.component;
import shoe3d.core.Component;

/**
 * ...
 * @author as
 */
class RandomRotator extends Component
{

	public function new() 
	{
		super();
	}
	
	override public function onUpdate() 
	{
		owner.transform.rotation.x += 0.02 ;
	}
	
	
	
}