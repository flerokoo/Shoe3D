package shoe3d.component;
import shoe3d.asset.AssetPack.GeomDef;
import shoe3d.core.game.Component;
import three.Mesh;
import three.MeshPhongMaterial;
import three.Object3D;

/**
 * ...
 * @author as
 */
class GeometryDisplay extends Component
{

	var mesh:Mesh;
	
	public function new( geom:GeomDef ) 
	{
		super();
		mesh = new Mesh( 
			geom.geom, 
			geom.material != null ? geom.material : new MeshPhongMaterial( { map:geom.texDef.texture, transparent:true } ) 
			);
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