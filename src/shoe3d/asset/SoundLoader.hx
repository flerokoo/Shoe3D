package shoe3d.asset;
import shoe3d.sound.Sound;
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
	
	public function new( manager:LoadingManager) 
	{
		super();
		_manager = manager;		
	}
	
	public function load(url:String, onLoad:Sound->Void) : Void
	{
		_loader = new XHRLoader( _manager );
	}
	
}