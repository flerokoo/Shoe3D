package three;

/**
 * ...
 * @author as
 */
@:native("THREE.LineSegments")
extern class LineSegments extends Line
{
	public function new(geometry:Geometry, ?material:Material);
	public function isLineSegments():Bool;
	
}