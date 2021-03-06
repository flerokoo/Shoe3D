package three;

import js.html.*;

@:native("THREE.Plane")
extern class Plane
{
	function new(?normal:Vector3, ?constant:Float) : Void;

	var normal : Vector3;
	var constant : Float;

	function set(normal:Vector3, constant:Float) : Plane;
	function setComponents(x:Float, y:Float, z:Float, w:Float) : Plane;
	function setFromNormalAndCoplanarPoint(normal:Vector3, point:Vector3) : Plane;
	function setFromCoplanarPoints(a:Vector3, b:Vector3, c:Vector3) : Plane;
	function copy(plane:Plane) : Plane;
	function normalize() : Plane;
	function negate() : Plane;
	function distanceToPoint(point:Vector3) : Float;
	function distanceToSphere(sphere:Sphere) : Float;
	function projectPoint(point:Vector3, ?optionalTarget:Vector3) : Vector3;
	function orthoPoint(point:Vector3, ?optionalTarget:Vector3) : Vector3;
	function isIntersectionLine(line:Line3) : Bool;
	function intersectLine(line:Line3, ?optionalTarget:Vector3) : Vector3;
	function coplanarPoint(?optionalTarget:Bool) : Vector3;
	function applyMatrix4(matrix:Matrix4, ?optionalNormalMatrix:Matrix3) : Plane;
	function translate(offset:Vector3) : Plane;
	function equals(plane:Plane) : Bool;
	function clone() : Plane;
}