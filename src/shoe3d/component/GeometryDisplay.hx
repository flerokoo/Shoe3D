package shoe3d.component;
import shoe3d.asset.AssetPack.GeomDef;
import shoe3d.core.game.Component;
import three.Mesh;
import three.MeshPhongMaterial;
import three.Object3D;
import three.Shading;

/**
 * ...
 * @author as
 */
class GeometryDisplay extends Component
{

	var mesh:Mesh;
	
	public function new( geom:Dynamic ) 
	{
		super();
		
		if( Std.is( geom, GeomDef ) ) {
			mesh = new Mesh( 
				geom.geom, 
				geom.material != null ? geom.material : new MeshPhongMaterial( { map:geom.texDef.texture, transparent:true } ) 
				);
		} else if ( Std.is( geom, Mesh ) ) {
			mesh = geom;
		} else {
			throw 'Error';
		}
			

	}
	
	override public function onAdded() 
	{
		owner.transform.add( mesh );
	}
	
	override public function onRemoved()
	{
		owner.transform.remove( mesh );
	}
}