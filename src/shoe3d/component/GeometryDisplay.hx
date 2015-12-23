package shoe3d.component;
import shoe3d.asset.AssetPack.GeomDef;
import shoe3d.core.game.Component;
import three.Mesh;
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
		mesh = new Mesh( geom.geom, geom.phongMaterial );
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