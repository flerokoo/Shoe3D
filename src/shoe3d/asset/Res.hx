package shoe3d.asset;
import shoe3d.asset.AssetPack.GeomDef;
import shoe3d.asset.AssetPack.TexDef;

/**
 * ...
 * @author as
 */
class Res
{

	static var _packMap:Map<String,AssetPack>;
	
	
	public static function registerPack( pack:AssetPack, ?name:String ) 
	{
		if ( _packMap == null ) _packMap = new Map();
		_packMap.set( name == null || name == '' ? getRandomName() : name, pack );
	}
	
	static function getRandomName():String
	{
		var e = 'abcdefgh0123456789';
		var r = '';
		while ( r.length < 30 ) r += e.charAt( Math.floor( Math.random() * e.length ) );
		return r;
	}
	
	public static function getTexDef( name:String ):TexDef
	{		
		if ( _packMap == null ) throw 'No asset packs';
		for ( i in _packMap )
		{
			var ret = i.getTexDef( name, false );
			if ( ret != null) return ret;
		}
		
		throw 'No texDef $name found';
		return null;	
	}
	
	public static function getGeomDef( name:String ):GeomDef
	{
		if ( _packMap == null ) throw 'No asset packs';
		for ( i in _packMap )
		{
			var ret = i.getGeomDef( name, false );
			if ( ret != null) return ret;
		}
		
		throw 'No geomDef $name found';
		return null;	
	}
	
}