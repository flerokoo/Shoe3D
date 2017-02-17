package shoe3d.component.script.action;
import shoe3d.util.Assert;

/**
 * ...
 * @author as
 */
class Parallel implements Action
{

	public var actions:Array<Action>;

	
	public function new( acts:Array<Action> ) 
	{
		Assert.that( acts.length > 0 );
		actions = acts;
	}
	
	public function start():Void
	{
		for( i in actions ) i.start();
	}

	
	public function update( dt:Float ):Bool
	{
		var done = true;
		
		for ( i in actions ) {
			if ( ! i.update( dt ) ) {
				done = false;
			}
		}
		
		return done;
	}
	
}