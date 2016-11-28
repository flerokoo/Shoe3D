package three;

/**
 * ...
 * @author as
 */
@:native("THREE.Points")
extern class Points extends Object3D
{

	public function new( geometry:Geometry, ?material:Material );
	
	
	public var geometry:Geometry;
	public var material:Material;
	
	
	
}