package three;

import js.html.*;

@:native("THREE.ShaderLib")
extern class ShaderLib implements Dynamic<Shader>
{
	static var basic : Shader;
	static var cube : Shader;
	static var dashed : Shader;
	static var depth : Shader;	
	static var distanceRGBA : Shader;	
	static var equirect : Shader;	
	static var lambert : Shader;	
	static var normal : Shader;	
	static var phong : Shader;	
	static var physical : Shader;	
	static var points : Shader;	
	static var standart : Shader;	
}