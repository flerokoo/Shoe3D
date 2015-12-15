package shoe3d.core;
import js.html.DivElement;
import shoe3d.util.Info;
import shoe3d.util.signal.ZeroSignal;
import js.Browser;
import js.html.CanvasElement;
import shoe3d.util.Value;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class WindowManager
{
	private static var _prePublicResize(default,null):ZeroSignal;
	public static var resize(default,null):ZeroSignal;
	public static var orientation(default, null):Value<Orientation>;
	public static var mode(default, set):WindowMode = Fill;
	public static var width(get, null):Int = 640;
	public static var height(get, null):Int = 800;

	public static function init() 
	{
		_prePublicResize = new ZeroSignal();
		resize = new ZeroSignal();
		orientation = new Value( Portrait );
		
		Browser.window.addEventListener( "orientationchange", function(_) callLater( onOrientationChange ) );
		Browser.window.addEventListener( "resize", function(_) callLater( onResize ) );
		
		updateOrientation();	
		
	}
	
	private static function onResize()
	{
		
		
		updateLayout();
		
		_prePublicResize.emit();
		
		resize.emit();
	}
	
	private static function onOrientationChange() 
	{
		
		updateLayout();		
		
		_prePublicResize.emit();
		
		updateOrientation() ;
	}
	
	private static function updateOrientation() 
	{
		orientation.set( 
			switch( (untyped Browser.window).orientation ) {
				case -90, 90,270,-270: Landscape;
				default: Portrait;
			} );	
	}
	
	private static function updateLayout () 
	{
		resetStyle();
		
		var canvas:CanvasElement = RenderManager.renderer.domElement;
		var div:DivElement = RenderManager.container;
		
		if ( mode == Fill || Info.isMobileBrowser() ) 
		{
			Browser.document.body.style.padding = "0";
			div.style.margin = "0";
			div.style.width = Browser.window.innerWidth + "px";
			div.style.height = Browser.window.innerHeight + "px";
			RenderManager.renderer.setSize( Browser.window.innerWidth, Browser.window.innerHeight );
			
		}
		else 
		{
			
			div.style.width = width+ "px";
			div.style.height = height+ "px";
			RenderManager.renderer.setSize( width, height );
			Browser.document.body.style.padding = "0.06px";
			
			var marginTop = Math.floor( Math.max( 0, (Browser.window.innerHeight - height ) / 2 ) );
			div.style.margin = marginTop + "px auto 0";
			
			trace("OK", marginTop + "px auto 0");
		}
	}
		
	private static function resetStyle()
	{
		Browser.document.body.style.margin = "0";
		Browser.document.body.style.padding = "0";
		Browser.document.body.style.width = "100%";
		Browser.document.body.style.height = "100%";
		
		
			/*Browser.document.body.style.marginBottom =
			Browser.document.body.style.marginLeft =
			Browser.document.body.style.marginRight =
			Browser.document.body.style.marginTop =*/
	}
		
	private static function hideMobileBrowser()
	{
		
	}
	
	private static function callLater( fn:Void->Void, delay:Int = 300 ) 
	{
		Browser.window.setTimeout( fn, delay );
	}

	static function set_mode(value:WindowMode):WindowMode 
	{
		mode = value;
		updateLayout();		
		return mode;
	}
	
	static function get_width() 
	{
		switch( mode ) {
			case Fill:
				return Browser.window.innerWidth;
			case Default:
				return width;
		}
	}
	
	static function get_height() 
	{
		switch( mode ) {
			case Fill:
				return Browser.window.innerHeight;
			case Default:
				return height;
		}
	}
	
	static public function setSize( w:Int, h:Int, autoSetMode:Bool = true ) 
	{
		width = w;
		height = h;
		if ( autoSetMode ) mode = Default;
		updateLayout();
	}
	
}

enum Orientation { Portrait; Landscape; }

enum WindowMode { Fill;  Default; }