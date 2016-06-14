package shoe3d.component;
import shoe3d.core.game.Component;
import three.Geometry;
import three.Material;
import three.Mesh;
import three.MeshPhongMaterial;

/**
 * ...
 * @author as
 */
class S3Mesh extends Component
{

	public var geometry:Geometry;
	public var material:Material;
	public var mesh:Mesh;
	
	public function new( ?geom:Geometry, ?mat:Material ) 
	{
		super();
		geometry = geom;
		material = mat;
		//cast(material, MeshPhongMaterial);
		mesh = new Mesh( geometry, material );
		mesh.position.z += 100;
		if ( owner != null ) owner.transform.add( mesh );
	}
	
	override public function onAdded() 
	{
		owner.transform.add( mesh );
	}
	
}