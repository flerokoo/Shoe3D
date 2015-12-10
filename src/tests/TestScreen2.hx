package tests;
import shoe3d.component.MeshDisplay;
import shoe3d.component.RandomRotator;
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
class TestScreen2 extends GameScreen
{

	@:keep
	public function new() 
	{
		super();
		
		var msh = new MeshDisplay( new BoxGeometry(1, 1, 1), new MeshPhongMaterial( { color : 0xF7CF33 } ) );		
		var go = new GameObject("out")
			.addComponent(msh)
			//.addComponent( new RandomRotator() )
			;
		
		/*go.transform.rotateX( 0.34 );
		go.transform.rotateY( 1.34 );
		go.transform.rotateZ( 2.25 );*/
		
		
		var go2 = new GameObject( "INSIDE" )
			.addComponent( new MeshDisplay( new BoxGeometry(0.9, 0.9, 0.9) ) )
			//.addComponent( new RandomRotator() )
			;
		Main.trace2(go2.components.length);
		go.addChild( go2 );
		go2.transform.position.z = 1.5;
		
		gameScene.addChild( go );
		
		var l = new AmbientLight(0xffffff);
		gameScene.add( l );
		var dl = new DirectionalLight( 0x2E8FFC, 0.8 );
		dl.rotateX( 0.45 );
		dl.rotateX( 0.74 );
		dl.rotateX( 1.74 );
		gameScene.add( dl  );
		
		cameraHandle.owner.transform.position.z = 5;
	}
	
}