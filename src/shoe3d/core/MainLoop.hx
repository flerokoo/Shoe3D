package shoe3d.core;
import haxe.Timer;
import js.Browser;
import shoe3d.core.game.GameObject;
import shoe3d.screen.ScreenManager;
import shoe3d.util.signal.SingleSignal;
import shoe3d.util.signal.ZeroSignal;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class MainLoop
{

	private var _frame:SingleSignal<Float>;
	private var _frames:Int = 0;
	
	public var frameTime(default, null):Float;
	public var updateTime(default, null):Float;
	public var renderTime(default, null):Float;
	public var FPS(default, null):Float;
	public var averageFPS(default, null):Float = -1000;
	
	
	
	
	public function new() 
	{
		_frame = new SingleSignal();
		
		if ( untyped __js__("!window.requestAnimationFrame") ) 
		{			
			untyped __js__("window.requestAnimationFrame = (function(){window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame" +
			"function(callback, el){window.setTimeout(callback, 1000/60);}; })() " );
		} 

		
	}
	
	public function start() 
	{
		update();
	}
	
	public function update( ?flt ) 
	{
		var startTime = Time.now();		
		_frames++;
		System.time.update();
		if( ScreenManager._currentScreen != null )
			for ( layer in ScreenManager._currentScreen.layers )
				for( i in layer.gameObjects )
					updateGameObject( i );
					
		var middleTime = Time.now();
		updateTime = middleTime - startTime;	
		
		render();		
		
		renderTime = Time.now() - middleTime;
		frameTime = Time.now() - startTime;
		FPS = 1 / frameTime;		
		// TODO Fix average FPS measurement
		averageFPS = (averageFPS == -1000 ? FPS : FPS  );
		
		_frame.emit( Time.dt );	
		
		Browser.window.requestAnimationFrame( update );		
		
		
		return true;
	}
	
	function getTimingString():String
	{
		return "T: U" + round(updateTime * 1000) + "+R" + round(renderTime * 1000) + "=" + round(frameTime * 1000);
	}
	
	function getFPSString():String
	{
		return "FPS: A" + round(averageFPS) + " C" + round( FPS );
	}
	
	function round( f:Float, m:Int = 10 ) 
	{
		return Math.round( f * m ) / m;
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