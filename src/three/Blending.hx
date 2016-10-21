package three;

import js.html.*;

// blending modes
/*@:native("THREE.Blending")
extern enum Blending
{
	NoBlending;
	NormalBlending;
	AdditiveBlending;
	SubtractiveBlending;
	MultiplyBlending;
	CustomBlending;
}*/

@:enum
abstract Blending(Int) {

	var NoBlending = 0;
	var Normal = 1;
	var Multiply = 4;
	var Subtract = 3;
	var Add = 2;

}