package shoe3d.core;
import js.html.DivElement;
import shoe3d.util.HtmlUtils;
import shoe3d.util.Info;
import shoe3d.util.Log;
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
	public static var hidden(default, null):Value<Bool>;
	
	
	public static function init() 
	{
		hidden = new Value( false );
		_prePublicResize = new ZeroSignal();
		resize = new ZeroSignal();
		orientation = new Value( Portrait );
		
		Browser.window.addEventListener( "orientationchange", function(_) callLater( onOrientationChange ) );
		Browser.window.addEventListener( "resize", function(_) callLater( onResize ) );
		
		
		
		// HIDDEN API
		var api = HtmlUtils.loadExtension("hidden", Browser.window );
		
		if ( api.value != null ) {
			var onVisibilityChange = function(e) {
				hidden._ = Reflect.field( Browser.document, api.field );
			};
			
			onVisibilityChange(null);
			
			Browser.document.addEventListener(api.prefix + "visibilitychange", onVisibilityChange, false );
			Log.sys( "Visibility API supported" );
		} else {
			
			var onPageTransition = function (e) {
				hidden._ = e.type == 'pagehide';
			}
			Browser.window.addEventListener("pageshow", onPageTransition, false);
			Browser.window.addEventListener("pagehide", onPageTransition, false);
			Log.sys( "No Visibility API. Using pageshow/pagehide fallback" );
		}
		

		
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
		var isMobile = Info.isMobileBrowser();
		
		if ( mode == Fill || isMobile ) 
		{
			Browser.document.body.style.padding = "0";
			div.style.margin = "0";
			
			
			var ratio = Browser.window.devicePixelRatio ;
			if ( Math.max( Browser.window.innerWidth, Browser.window.innerHeight) * ratio > 2300 && isMobile ) ratio = 1;
			RenderManager.renderer.setSize( Browser.window.innerWidth * ratio, Browser.window.innerHeight * ratio );	
			
			div.style.width = canvas.style.width = Browser.window.innerWidth + "px";
			div.style.height = canvas.style.height = Browser.window.innerHeight + "px";		
		}
		else 
		{
			
			div.style.width = width+ "px";
			div.style.height = height+ "px";
			RenderManager.renderer.setSize( width, height );
			Browser.document.body.style.padding = "0.06px";
			
			var marginTop = Math.floor( Math.max( 0, (Browser.window.innerHeight - height ) / 2 ) );
			div.style.margin = marginTop + "px auto 0";			
		}
	}
		
	private static function resetStyle()
	{
		Browser.document.body.style.margin = "0";
		Browser.document.body.style.padding = "0";
		Browser.document.body.style.width = "100%";
		Browser.document.body.style.height = "100%";
		
		RenderManager.container.style.padding = "0px";
		
			/*Browser.document.body.style.marginBottom =
			Browser.document.body.style.marginLeft =
			Browser.document.body.style.marginRight =
			Browser.document.body.style.marginTop =*/
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