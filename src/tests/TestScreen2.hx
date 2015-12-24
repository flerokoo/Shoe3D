package tests;
import shoe3d.asset.AssetPack.GeomDef;
import shoe3d.asset.Res;
import shoe3d.component.CameraHolder;
import shoe3d.component.GeometryDisplay;
import shoe3d.component.S3Mesh;
import shoe3d.component.RandomRotator;
import shoe3d.core.game.GameObject;
import shoe3d.core.Layer;
import shoe3d.screen.GameScreen;
import shoe3d.System;
import shoe3d.util.UVTools;
import three.AmbientLight;
import three.BoxGeometry;
import three.DirectionalLight;
import three.Geometry;
import three.MeshPhongMaterial;
import three.Vector3;

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
		
		var texDef = Res.getTexDef("main_pattern");
		var geom = new BoxGeometry( 2, 1, 0.5 );
		UVTools.setGeometryUVFromTexDef( geom, texDef);
		var platformGeomDef:GeomDef = {
			geom: geom,
			texDef: texDef,
			material: new MeshPhongMaterial( { map:texDef.texture } )
		}
		
		var layer1 = newLayer("platforms");		
		//var layer2 = newLayer("hero");
		
		
		for ( i in 0...10 ) {
			var pl = new GameObject();
			pl.add( new GeometryDisplay( platformGeomDef ) );
			pl.transform.position.set( Math.random() * 10 - 5, 0, Math.random() * 10 - 5 );
			layer1.addChild( pl );
		}
		
		var dl = new DirectionalLight( 0x8EEAFD, 0.7 );
		dl.rotateY( 3.14 / 2);
		layer1.add( dl );
		layer1.add( new AmbientLight( 0xffffff ) );	
		
		
		layer1.camera.position.set( 0, 10, 0 );
		layer1.camera.lookAt( new Vector3(0, 0, 0));
		layer1.camera.up = new Vector3(0, 0, 1);
		//layer2.setCamera( layer1.camera );
		
	}
	
}