package shoe3d.screen;
import shoe3d.core.game.GameObject;
import shoe3d.core.Time;
import shoe3d.screen.transition.Transition;
import shoe3d.util.Assert;
import three.Scene;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class ScreenManager
{
	private static var _currentScreenName:String = "";
	private static var _currentScreen:GameScreen = null;
	private static var _targetScreen:GameScreen = null;
	public static var defaultTransition:Transition;
	private static var _transitions:Map<String,Transition>;
	private static var _screens:Map<String,Class<GameScreen>>;
	private static var _base:GameObject;
	
	public static var width(default, null):Int = 0;
	public static var height(default, null):Int = 0;
	
	private static function init() 
	{
		_transitions = new Map();
		_screens = new Map();
		_base = new GameObject();
		defaultTransition = new Transition();
		//defaultTransition.setHolder(_base);
		//System._baseScene.add( _base );
	}
	
	public static function show( name:String, ?changeFn:Void->Void ) 
	{
		#if debug
		Assert.that( _screens.exists( name ), "Screen not exists: " + name );
		#else
		if ( ! _screens.exists( name ) ) return;
		#end
		_targetScreen = Type.createInstance( _screens.get( name ), [] );
		if ( _currentScreen != null ) 
		{			
			var transition:Transition = _transitions.exists( _currentScreenName + ">>" + name ) 
				?  _transitions.get( _currentScreenName + ">>" + name ) 
				: defaultTransition;
				
			transition.start( _currentScreen, _targetScreen );
		} 
		else 
		{
			//_base.add( _targetScreen.scene );
			_currentScreen = _targetScreen;
			if ( changeFn != null ) changeFn();
			_currentScreen.onShow();
		}
		
		Time.onScreenLoad();
		
	}
	
	public static function addScreen( name:String, scr:Class<GameScreen> ) 
	{
		if ( _screens == null ) _screens = new Map();
		_screens.set( name, scr );
	}
	
	/**
	 * Sets original game size (usually game is designed for 
	 * @param	w Width of the game
	 * @param	h Height of the game
	 */
	public static function setSize( w:Int, h:Int )
	{
		width = w;
		height = h;
	}
	
}