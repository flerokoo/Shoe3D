package tests;

import haxe.unit.TestRunner;
import haxe.unit.TestStatus;
import js.Browser;
import js.html.DivElement;
import js.Lib;
import shoe3d.component.MeshDisplay;
import shoe3d.core.GameObject;
import shoe3d.System;
import three.AmbientLight;
import three.BoxGeometry;
import three.DirectionalLight;
import three.MeshPhongMaterial;
import three.PerspectiveCamera;
import three.Scene;
import three.WebGLRenderer;

/**
 * ...
 * @author as
 */
class Main 
{
	
	static var console:DivElement;
	
	static function main() 
	{
		createConsole();
		
		var test1 = new GeneralTest();
		
		var runner = new TestRunner();
		runner.add( test1);
		runner.run();
		
		trace2(runner.result);
		
		System.init();
		
		System.screen.addScreen( "game", TestScreen );
		System.screen.show( "game" );
		
		System.start();
		
		
	}
	
	static function createConsole() {
		console = Browser.document.createDivElement();
		Browser.document.body.appendChild( console );
		trace2("CONSOLE CREATED");
	}
	
	static function trace2( a:Dynamic ) {
		console.innerHTML = console.innerHTML + "<br/>" + Std.string( a );
	}
	
}