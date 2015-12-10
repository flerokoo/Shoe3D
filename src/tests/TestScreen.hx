package tests;
import shoe3d.component.MeshDisplay;
import shoe3d.core.GameObject;
import shoe3d.screen.GameScreen;
import shoe3d.System;
import three.AmbientLight;
import three.BoxGeometry;
import three.DirectionalLight;
import three.Geometry;
import three.MeshPhongMaterial;

/**
 * ...
 * @author as
 */
class TestScreen extends GameScreen
{

	@:keep
	public function new() 
	{
		super();
		
		var msh = new MeshDisplay( new BoxGeometry(1, 1, 1), new MeshPhongMaterial( { color : 0xF7CF33 } ) );		
		var go = new GameObject().addComponent(msh);
		
		go.rotateX( 0.34 );
		go.rotateY( 1.34 );
		go.rotateZ( 2.25 );
		
		gameScene.add( go );
		
		var l = new AmbientLight(0xffffff);
		gameScene.add( l );
		var dl = new DirectionalLight( 0x2E8FFC, 0.8 );
		dl.rotateX( 0.45 );
		dl.rotateX( 0.74 );
		dl.rotateX( 1.74 );
		gameScene.add( dl  );
		
		System.renderer.camera.position.z = 5;
	}
	
}