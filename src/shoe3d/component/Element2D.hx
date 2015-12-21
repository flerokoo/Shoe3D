package shoe3d.component;
import shoe3d.core.game.Component;
import shoe3d.util.math.Rectangle;

/**
 * ...
 * @author as
 */
class Element2D extends Component
{

	public function new() 
	{
		super();
	}
	
	public function getBounds():Rectangle
	{
		return new Rectangle();
	}
	
}