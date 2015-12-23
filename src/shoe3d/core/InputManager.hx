package shoe3d.core;
import js.Browser;
import js.html.CanvasElement;
import js.html.DivElement;
import js.html.MouseEvent;
import shoe3d.core.input.MouseManager;
import shoe3d.core.input.PointerManager;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class InputManager
{

	public static var pointer(default, null):PointerManager;
	public static var mouse(default, null):MouseManager;
	
	static var _canvas:CanvasElement;
	static var _div:DivElement;
	static var _lastTouchTime:Float = 0;
	
	public static function init()
	{
		pointer = new PointerManager( );
		mouse = new MouseManager( );
		
		_canvas = System.renderer.renderer.domElement;
		_div = System.renderer.container;
		
		// MOUSE SYSTEM
		var onMouse = function(event:MouseEvent) 
		{
			if ( event.timeStamp - _lastTouchTime < 1000 )
			{
                // filter events emulated by browser: http://www.w3.org/TR/touch-events/#mouse-events
				return;
			}
			
			var bounds = _canvas.getBoundingClientRect();
			var x = getX( event, bounds );
			var y = getY( event, bounds );
			
			switch( event.type ) {
				case "mousedown":
					if ( event.target == _canvas ) {
						event.preventDefault();
						mouse.submitDown( x, y, event.button );
						_canvas.focus();
					}
				case "mousemove":
					mouse.submitMove( x, y );
				case "mouseup":
					mouse.submitUp(x, y, event.button);
				case "mousewheel", "DOMMouseScroll":
					var vel = (event.type == "mousewheel" ? (untyped event).wheelDelta / 40 : -event.detail );
					if ( mouse.submitScroll(x, y, vel))
						event.preventDefault();
			}
		};
		
		Browser.window.addEventListener("mousedown", onMouse, false );
		Browser.window.addEventListener("mouseup", onMouse, false );
		Browser.window.addEventListener("mousemove", onMouse, false );
		_canvas.addEventListener("mousewheel", onMouse, false );
		_canvas.addEventListener("DOMMouseScroll", onMouse, false );
		_canvas.addEventListener("contextmenu", function(e) e.preventDefault() , false );
		
		// TOUCH SYSTEM
		
	}
	
	private static inline function getX (event :Dynamic, bounds :Dynamic) :Float
    {
        return (event.clientX - bounds.left)*System.window.width/bounds.width;
    }

    private static inline function getY (event :Dynamic, bounds :Dynamic) :Float
    {
        return (event.clientY - bounds.top)*System.window.height/bounds.height;
    }
}