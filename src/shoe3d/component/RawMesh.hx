package shoe3d.component;
import shoe3d.core.game.Component;
import three.Geometry;
import three.Material;
import three.Mesh;

/**
 * ...
 * @author as
 */
class RawMesh extends Component
{

	public var mesh:Mesh;
	
	public function new( geom:Geometry, ?mat:Material ) 
	{
		super();
		mesh = new Mesh(geom, mat);
	}
	
	override public function onAdded() 
	{
		super.onAdded();
		owner.add( mesh );
	}
	
	override public function onRemoved()
	{
		super.onRemoved();
		owner.remove( mesh );
	}
	
	public function setAnchor( x:Float, y:Float, z:Float )
	{
		mesh.position.set( -x, -y, -z );
		return this;
	}
	
}