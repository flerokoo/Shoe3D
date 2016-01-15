package shoe3d.core;
import haxe.Timer;
import js.Browser;
import js.html.RequestAnimationFrameCallback;
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
	private var _paused:Bool = true;
	private var _skipFrame:Bool = false;
	private var _totalUpdateTime:Float = 0;
	
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

		System.window.hidden.change.connect( function(hidden, _) {
			if ( ! hidden ) skipFrame();
		} );
		
		
	}
	
	public function start() 
	{
		var updateFrame = null;
		updateFrame = function(t) {
			update();
			Browser.window.requestAnimationFrame( updateFrame );
			return true;
		};
		Browser.window.requestAnimationFrame( updateFrame );
	}
	
	public function update(  ) 
	{
		if ( System.window.hidden._ ) return;
		if ( _skipFrame ) {
			_skipFrame = false;			
			return;
		}
		
		
		System.time.update();
		
		var startTime = Time.now();		
		_frames++;
		if ( ScreenManager._currentScreen != null ) 
		{
			ScreenManager._currentScreen.onUpdate();
			for ( layer in ScreenManager._currentScreen.layers )
				for ( i in layer.gameObjects )
				{
					updateGameObject( i );
				}
		}
					
		var middleTime = Time.now();
		updateTime = middleTime - startTime;	
		
		render();		
		
		renderTime = Time.now() - middleTime;
		frameTime = Time.now() - startTime;
		_totalUpdateTime += frameTime;		
		FPS = 1 / frameTime;		
		// TODO Fix average FPS measurement
		averageFPS = 1 / (_totalUpdateTime/(_frames-1));
		
		_frame.emit( Time.dt );	
		
	}
	
	function skipFrame()
	{
		_skipFrame = true;
		Time._lastUpdateTime = Time.now();
	}
	
	function getTimingString():String
	{
		return "U" + round(updateTime * 1000) + "&Tab;R" + round(renderTime * 1000) + " =&Tab;" + round(frameTime * 1000);
	}
	
	function getFPSString():String
	{
		return "FPS: A" + round(averageFPS, 10, 5) + " C" + round( FPS, 10 ,5 );
	}
	
	function round( f:Float, m:Int = 100, l:Int = 4 ) 
	{
		var ret = Math.round( f * m ) / m;
		var str = Std.string(ret);
		if ( str.indexOf('.') >= 0 )
			while ( str.length <  l )
				str += '0';
		else
		{
			str += '.';
			while (str.length <  l )
				str += '0';
		}
		
		return str;
	}
	
	function render() 
	{
		System.renderer.render();
	}
	
	/*function pause()
	{
		_paused = true;
	}*/
	
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