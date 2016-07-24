package shoe3d.asset;
import haxe.Timer;
import js.Browser;
import shoe3d.sound.Sound;
import shoe3d.util.Tools;
import soundjs.SoundManager;
import tests.Main;
import three.Loader;
import three.LoadingManager;
import three.Three;
import three.XHRLoader;

/**
 * ...
 * @author as
 */
class SoundLoader extends Loader
{ 

	var _loader:XHRLoader;
	var _manager:LoadingManager;
	var _url:String;
	var _pack:AssetPack;
	var _id:String;
	var _loaded = false;
	var _listener:Dynamic = null;
	public function new( manager:LoadingManager) 
	{
		super();
		_manager = manager;		
	}
	
	
	public function load( url:String, id:String, pack:AssetPack) : Void
	{
		_pack = pack;
		_url = url;
		_manager.itemStart( _url );
		_id = id;
		_listener = SoundManager.on("fileload", onLoad );
		SoundManager.registerSound( url, id );
	}
	
	private function onLoad( evt )
	{			
		
		//if ( Tools.getFileNameWithoutExtensionAndPath( evt.src ) == _id ) {
		if( evt.src.indexOf( _id ) >= 0 ) {
			_pack._soundMap.set( _id, _url );
			_manager.itemEnd(_url);			
			SoundManager.off( "fileload", _listener );
		}
	}
	
}