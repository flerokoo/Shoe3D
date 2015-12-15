package shoe3d.asset;
import three.Texture;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class AssetPack
{

	private var _texMap:Map<String,Texture>;
	private var _fileMap:Map<String,File>;
	private var _soundMap:Map<String,File>;
	
	public function new(  ) 
	{
		_texMap = new Map();
		_fileMap = new Map();
		_soundMap = new Map();
	}
	
	public function getTexture( name:String, required:Bool = true ) 
	{
		var ret = _texMap.get( name );
		if ( ret == null && required ) throw 'No texture with name=$name';
		return ret;
	}
	
	public function getSound( name:String, required:Bool = true )
	{
		var ret = _soundMap.get( name );
		if ( ret == null && required ) throw 'No sound with name=$name';
		return ret;
	}
	
	public function getFile( name:String, required:Bool = true ) 
	{
		var ret = _fileMap.get( name );
		if ( ret == null && required ) throw 'No file with name=$name';
		return ret;
	}
	
}