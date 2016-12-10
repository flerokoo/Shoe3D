package spe;
import three.Blending;
import three.Texture;
import three.Vector2;

/**
 * ...
 * @author as
 */
typedef GroupParameters = {
	texture: {
		value:Texture,
		?frames:Vector2,
		?frameCount:Int,
		?loop:Int
	},
	?fixedTimeStep:Float,
	?hasPerspective:Bool,
	?colorize:Bool,
	?blending:Blending,
	?transparent:Bool,
	?alphaTest:Float,
	?depthWrite:Bool,
	?depthTest:Bool,
	?fog:Bool,
	?scale:Float,
	?maxParticleCount:Int
}