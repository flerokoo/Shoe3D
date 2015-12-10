package shoe3d;
import shoe3d.core.GameObject;
import shoe3d.core.MainLoop;
import shoe3d.core.RenderManager;
import shoe3d.core.Time;
import shoe3d.core.WindowManager;
import shoe3d.screen.ScreenManager;
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
	
	private static var loop:MainLoop;
	//private static var _baseScene:Scene;
	
	public static function init() {
		//_baseScene = new Scene();
		WindowManager.init();
		RenderManager.init();
		ScreenManager.init();
		Time.init();
		
		loop = new MainLoop();
				
	}
	
	public static function start() {
		
		loop.start();
	}
	
	
	
	public static var root(get, null):GameObject;		
	static function get_root():GameObject  return ScreenManager._base;
	
}