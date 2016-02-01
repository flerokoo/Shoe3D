package three;

import js.html.*;

@:native("THREE.ImmediateRenderObject")
extern class ImmediateRenderObject extends Object3D
{
	public var material:Material;
	
	function new() : Void;

	function render(renderCallback:Dynamic) : Void;
}