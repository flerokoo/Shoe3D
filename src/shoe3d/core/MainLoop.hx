package shoe3d.core;
import js.Browser;
import shoe3d.screen.ScreenManager;

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
		

		
		for ( layer in ScreenManager._currentScreen.layers )
			for( i in layer.gameObjects )
				updateGameObject( i );	
			
		render();
		
		Browser.window.requestAnimationFrame( update );
		return true;
	}
	
	function render() 
	{
		System.renderer.render();
	}
	
	
	
	public function updateGameObject( go:GameObject ) 
	{
		for ( i in go.components ) {
			
			if ( ! i._started ) {
				i.onStart();
				i._started = true;
			}
				
			i.onUpdate();
		}
			
		
		for ( child in go.children )		
			updateGameObject( child );
		
	}
	
}