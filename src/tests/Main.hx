package tests;

import haxe.Timer;
import haxe.unit.TestRunner;
import haxe.unit.TestStatus;
import js.Browser;
import js.html.DivElement;
import js.Lib;
import shoe3d.component.S3Mesh;
import shoe3d.core.game.GameObject;
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
		System.screen.addScreen( "game2", TestScreen2 );
		
		System.screen.show( "game" );
		System.showFPSMeter();
		//Timer.delay( function() System.screen.show("game2") , 1100 );
		
		//System.window.mode = Default;
		//System.window.setSize( 600, 600 );
		
		System.start();
		System.loadFolderFromAssets( 'biba' );
		System.renderer.showStats();
		
		
	}
	
	static function createConsole() {
		console = Browser.document.createDivElement();
		//Browser.document.body.appendChild( console );
		trace2("CONSOLE CREATED");
	}
	
	public static function trace2( a:Dynamic ) {
		console.innerHTML = console.innerHTML + "<br/>" + Std.string( a );
	}
	
}