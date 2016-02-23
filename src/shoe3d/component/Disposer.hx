package shoe3d.component;
import shoe3d.core.game.Component;
import shoe3d.util.Disposable;

/**
 * ...
 * @author as
 */
class Disposer extends Component
{

	var a:Array<Disposable>;
	
	public function new() 
	{
		a = [];
	}
	
	public function add( d:Disposable ) 
	{
		a.push(d)
		return this;
	}
	
	override public function dispose()
	{
		for ( d in a ) d.dispose();
		a  = [];
		return this;
	}
	
	public function remove( d:Disposable )
	{
		return a.remove(d);
	}
	
	override public function onRemoved()
	{
		dispose();
	}
}