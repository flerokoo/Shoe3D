package tests;

import haxe.Timer;
import haxe.unit.TestRunner;
import haxe.unit.TestStatus;
import js.Browser;
import js.html.DivElement;
import js.Lib;
import shoe3d.asset.AssetPack;
import shoe3d.component.S3Mesh;
import shoe3d.core.game.GameObject;
import shoe3d.screen.BasicPreloader;
import shoe3d.System;
import shoe3d.util.Log;
import shoe3d.util.Tools;
import soundjs.SoundManager;
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
@:expose
class Main 
{
	static public var pack:AssetPack;
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
		
		//System.window.setSize( 640, 800 );
		
		System.showFPSMeter();
		//Timer.delay( function() System.screen.show("game2") , 1100 );
		
		//System.window.mode = Default;
		//System.window.setSize( 600, 600 );
		
		BasicPreloader.loadFolderFromAssets( 'biba', 
		//System.loadFolderFromAssets( 'biba', 
		function(pc) 
		{
			Browser.window.console.log("COMPLETE");
			Main.pack = pc;
			Main.pack.createAtlas( 'main', 'sprites', 'sprites.txt' );
			Main.pack.createGeomDef( 'mesh', 'model1', 'logo');
			Main.pack.createGeomDef( 'cube', 'cube', 'main_pattern').setTransparent();
			var mat = cast( Main.pack.createGeomDef( 'boy', 'boy', 'boy_tex').setTransparent().material, MeshPhongMaterial);
			
			System.input.pointer.up.connect( function(e) {
				//mat.normalMap = Main.pack.getTexDef('boy_norm').texture;			
				//mat.normalScale.x == 1 ? mat.normalScale.set(10, 10) : mat.normalScale.set(1, 1);
				mat.shininess = mat.shininess == 0 ? 100: 0;
				mat.needsUpdate = true;
				
				trace(mat.normalMap != null );
			});
			
			System.renderer.showStats();		
			System.screen.addScreen( "game", TestScreen );
			System.screen.addScreen( "game2", TestScreen2 );
			System.screen.show( "game" );				
		});
		
		
		Log.printSys();
		
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