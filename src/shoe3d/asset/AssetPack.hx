package shoe3d.asset;
import soundjs.SoundManager;
import three.Geometry;
import three.GeometryLoader;
import three.GeometryUtils;
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
	private var _geomMap:Map<String,Geometry>;
	private var _soundMap:Map<String,String>; // map just to check if sound belongs to this asset pack
	
	public function new(  ) 
	{
		_texMap = new Map();
		_fileMap = new Map();
		_soundMap = new Map();
		_geomMap = new Map();
	}
	
	public function getTexture( name:String, required:Bool = true ) 
	{
		var ret = _texMap.get( name );
		if ( ret == null && required ) throw 'No texture with name=$name';
		return ret;
	}
	
	public function getSound( name:String, required:Bool = true )
	{
		if ( ! _soundMap.exists( name ) )
			if ( required ) 
				throw 'No sound with name=$name'
			else
				return null;
		return SoundManager.createInstance( name );
	}
	
	public function getFile( name:String, required:Bool = true ) 
	{
		var ret = _fileMap.get( name );
		if ( ret == null && required ) throw 'No file with name=$name';
		return ret;
	}
	
	public function getGeometry( name:String, required:Bool = true )
	{
		var ret = _geomMap.get( name );
		if ( ret == null && required ) throw 'No file with name=$name';
		return ret;
	}
	
	public function createGeometryFromFile( filename:String, geometryname:String )
	{
		
	}
}