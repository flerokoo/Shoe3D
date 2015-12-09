package js.three;

import js.html.*;

/**
 * parameters is an object with one or more properties defining the material's appearance.
 */
typedef MeshBasicMaterialParameters =
{
	>MaterialParameters,

	@:optional var color : Int;
	@:optional var map : Texture;
	@:optional var lightMap : Texture;
	@:optional var specularMap : Texture;
	@:optional var alphaMap : Texture;
	@:optional var envMap : Texture;
	@:optional var combine : Combine;
	@:optional var reflectivity : Float;
	@:optional var refractionRatio : Float;
	@:optional var fog : Bool;
	@:optional var shading : Shading;
	@:optional var wireframe : Bool;
	@:optional var wireframeLinewidth : Float;
	@:optional var wireframeLinecap : String;
	@:optional var wireframeLinejoin : String;
	@:optional var vertexColors : Colors;
	@:optional var skinning : Bool;
	@:optional var morphTargets : Bool;
}