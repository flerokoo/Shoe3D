package shoe3d.screen.transition;
import shoe3d.core.GameObject;
import shoe3d.screen.GameScreen;
import three.Scene;

/**
 * ...
 * @author as
 */
class Transition
{

	private var _holder:GameObject;
	
	public function new() 
	{
		
	}
	
	public function start( currentScreen:GameScreen, targetScreen:GameScreen ) 
	{
		_holder.remove( currentScreen.scene );
		_holder.add( targetScreen.scene );
	}
	
	public function setHolder( holder:GameObject ) 
	{
		_holder = holder;
	}
	
	public function end() 
	{
		
	}
	
}