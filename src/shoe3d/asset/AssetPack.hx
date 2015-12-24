package shoe3d.asset;
import shoe3d.util.UVTools;
import soundjs.SoundManager;
import three.Geometry;
import three.GeometryLoader;
import three.GeometryUtils;
import three.Material;
import three.MeshPhongMaterial;
import three.Texture;
import shoe3d.util.UVTools.UV;
import three.Vector2;
/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class AssetPack
{

	private var _texMap:Map<String,TexDef>;
	private var _fileMap:Map<String,File>;
	private var _geomMap:Map<String,Geometry>;
	private var _soundMap:Map<String,String>; // map just to check if sound belongs to this asset pack
	private var _atlasMap:Map<String,Atlas>;
	private var _geomDefMap:Map<String,GeomDef>;
	
	public function new(  ) 
	{
		_texMap = new Map();
		_fileMap = new Map();
		_soundMap = new Map();
		_geomMap = new Map();
		_atlasMap = new Map();
		_geomDefMap = new Map();
	}
	
	public function getAtlas( name:String )
	{
		if ( ! _atlasMap.exists( name ) ) throw 'No atlas with name=$name';
		return _atlasMap.get( name );
	}
	
	public function defineAtlas( name:String, texName:String, jsonName:String ):Atlas
	{
		if ( ! _texMap.exists( texName ) || ! _fileMap.exists(jsonName ) ) throw 'No image or json from atlas $name';
		var atlas = new Atlas( getTexDef(texName).texture, getFile(jsonName).content );
		_atlasMap.set( name, atlas );
		return atlas;
	}
	
	public function defineGeomDef( name:String, geomName:String, texDefName:String, isTransparent:Bool = false )
	{
		if ( ! _geomMap.exists( geomName ) ) throw 'No geometry with name=$geomName';
		if ( getTexDef( texDefName, false) == null) throw 'No texDef with name=$texDefName';
		
		var texd = getTexDef( texDefName );
		var geom = getGeometry( geomName );
		
		var newGeom = geom.clone();
		UVTools.setGeometryUV( newGeom, texd.uv );
		var geomDef:GeomDef = {
			geom: newGeom,
			texDef:texd,
			originalUV: geom.faceVertexUvs,
			material: new MeshPhongMaterial( {map: texd.texture, transparent: isTransparent} )
		};
		
		_geomDefMap.set( name, geomDef );
	}
	
	public function getGeomDef( name:String, required:Bool = true ) 
	{
		var ret = _geomDefMap.get( name );
		if ( ret == null && required ) throw 'No GeomDef with name=$name';
		return ret;
	}
	
	public function getTexDef( name:String, required:Bool = true ) 
	{
		var ret:TexDef = null;
		for ( i in _atlasMap )
			if ( i.exists( name ) )
				return i.get( name );
		
		ret = _texMap.get( name );
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

typedef TexDef = 
{
	texture:Texture,
	uv:UV,
	width:Int,
	height:Int
}

typedef GeomDef = 
{
	?material:Material,
	texDef:TexDef,
	geom:Geometry,
	?originalUV:Array<Array<Array<Vector2>>>
}