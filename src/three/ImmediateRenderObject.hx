package three;

import js.html.*;

@:native("THREE.ImmediateRenderObject")
extern class ImmediateRenderObject extends Object3D
{
	public var material:Material;
	
	function new() : Void;

	dynamic function render(renderCallback:Dynamic) : Void;
	
	public var positionArray:Float32Array;
	public var uvArray:Float32Array;
	public var hasPositions:Bool;
	public var hasUvs:Float32Array;
	public var count:Int;
}