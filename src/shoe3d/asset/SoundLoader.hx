package shoe3d.asset;
import shoe3d.sound.Sound;
import soundjs.SoundManager;
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
		SoundManager.on("fileload", onLoad );
		SoundManager.registerSound( url, id );
	}
	
	private function onLoad( evt )
	{
		_pack._soundMap.set( _id, _url );
		_manager.itemEnd(_url);
	}
	
}