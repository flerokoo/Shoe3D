package shoe3d;
import js.Browser;
import js.html.DivElement;
import shoe3d.asset.AssetPack;
import shoe3d.asset.AssetPackLoader;
import shoe3d.asset.Res;
import shoe3d.core.game.GameObject;
import shoe3d.core.InputManager;
import shoe3d.core.MainLoop;
import shoe3d.core.RenderManager;
import shoe3d.core.StorageSystem;
import shoe3d.core.Time;
import shoe3d.core.WindowManager;
import shoe3d.screen.ScreenManager;
import shoe3d.util.GameConsole;
import shoe3d.util.promise.Promise;
import shoe3d.util.StringHelp;
import shoe3d.util.Value;
import three.Scene;

/**
 * ...
 * @author as
 */
@:allow( shoe3d )
class System
{
	
	public static var time(default, null) = Time;
	public static var screen(default, null) = ScreenManager;
	public static var window(default, null) = WindowManager;
	public static var renderer(default, null) = RenderManager;
	public static var input(default, null) = InputManager;
	public static var storage(default, null) = StorageSystem;
	public static var updateInfoEveryNthFrame:Int = 6;
	
	private static var _infoFrameCounter:Int = 0;
	private static var _info:DivElement;
	private static var _loop:MainLoop;
	private static var _showFPS:Bool = false;
	
	//private static var _baseScene:Scene;
	
	
	public static function init( originalWidth:Int = 640, originalHeight = 800) 
	{
		//_baseScene = new Scene();
		GameConsole.init();
		WindowManager.init();
		RenderManager.init();
		ScreenManager.init();
		Time.init();		
		InputManager.init();
		StorageSystem.init();
		
		ScreenManager.setSize( originalWidth, originalHeight );
		window.updateLayout();
		
		
		_loop = new MainLoop();
		_loop._frame.connect( clearInfoBox );
		_loop.start();
		
		#if Actuate
		WindowManager.hidden.change.connect( function( cur, prev ) {
			if ( cur == true ) 
				motion.Actuate.pauseAll()
			else
				motion.Actuate.resumeAll();
		});
		#end
	}
	
	static private function clearInfoBox( ?dt:Float ) 
	{
		
		#if debug
		_infoFrameCounter ++;
		if ( _infoFrameCounter >= updateInfoEveryNthFrame ) _infoFrameCounter = 0;
		
		if ( _info != null && _infoFrameCounter == 0 ) _info.innerHTML = "";		
		
		if( _showFPS ) addInfo( _loop.getFPSString() );
		if ( _showFPS ) addInfo( _loop.getTimingString() );
		
		
		
		#end
	}
	
	public static function start() 
	{
		
		
	}
	
	public static function showFPSMeter() 
	{
		if ( _info == null ) showInfoBox();
		_showFPS = true;
	}
	
	public static function showInfoBox() 
	{
		#if debug
		_info = Browser.document.createDivElement();
		_info.style.position = "absolute";
		_info.style.top = "0px";
		_info.style.left = "0px";
		_info.style.backgroundColor = "black";
		_info.style.opacity = "0.7";
		_info.style.padding = "5px 3px";
		_info.style.color = "red";
		_info.style.fontSize = "9px";
		_info.style.fontWeight = "bold";
		_info.style.fontFamily = "Helvetica, Arial, sans-serif";
		_info.style.lineHeight = "15px";
		_info.style.width = "100px";
		Browser.document.body.appendChild( _info );
		#end
	}
	
	public static function hideInfoBox() 
	{
		#if debug
		if ( _info != null )
			Browser.document.body.removeChild( _info );
			#end
	}
	
	public static function loadFolderFromAssets( folder:String, ?onSuccess:AssetPack->Void, ?onProgress:Float->Void, ?registerThisPackWithName:String ):Promise<AssetPack>
	{
		var ldr = new AssetPackLoader();
		
		for ( i in AssetPackLoader.localPacks )
			if ( i.pack == folder ) {
				ldr.add( i.name, i.path, i.bytes );
			}
		
		var promise = ldr.start( onSuccess, onProgress );
		
		promise.success.connect(
				function(pack:AssetPack)
					Res.registerPack( pack, registerThisPackWithName ),
					true
					).once();
		return promise;		
	}
	
	#if debug
	public static function addInfo( text:Dynamic, breakLine:Bool = true ) 
	{
		
		if ( _info != null && _infoFrameCounter == 0 ) {
			_info.innerHTML += (breakLine && _info.innerHTML != '' ? '<br/>' : "" ) + Std.string(text);
		}
		
	}
	#else
	public static inline function addInfo( text:Dynamic, breakLine:Bool = true ) {}
	#end
	
	
	public static var root(get, null):GameObject;		
	static function get_root():GameObject  return ScreenManager._base;
	
}