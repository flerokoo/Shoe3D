package shoe3d.core;
import js.Browser;

/**
 * ...
 * @author as
 */
class MainLoop
{

	public function new() 
	{
		
	}
	
	public function start() 
	{
		update();
	}
	
	public function update( ?flt ) 
	{
		System.time.update();
		
		
		updateGameObject( System.screen._base );
		render();
		
		Browser.window.requestAnimationFrame( update );
		return true;
	}
	
	function render() 
	{
		System.renderer.render();
	}
	
	
	
	public function updateGameObject( go:GameObjectContainer ) 
	{
		
		for ( i in go.components ) {
			if ( ! i._started ) {
				i.onStart();
				i._started = true;
			}
				
			i.onUpdate();
		}
			
		
		for ( i in go.children )
		{
			for ( k in i.children ) updateGameObject( cast( k, GameObjectContainer ) );
		}
	}
	
}