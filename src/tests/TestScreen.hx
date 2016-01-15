package tests;
import js.Browser;
import js.html.ImageElement;
import shoe3d.asset.Res;
import shoe3d.component.CameraHolder;
import shoe3d.component.GeometryDisplay;
import shoe3d.component.S3Mesh;
import shoe3d.component.RandomRotator;
import shoe3d.component.S3Mesh;
import shoe3d.component.S3Mesh;
import shoe3d.component.Sprite2D;
import shoe3d.core.game.GameObject;
import shoe3d.core.Layer;
import shoe3d.screen.GameScreen;
import shoe3d.System;
import soundjs.SoundManager;
import three.AmbientLight;
import three.BoxGeometry;
import three.BufferGeometry;
import three.Color;
import three.DirectionalLight;
import three.Geometry;
import three.ImageLoader;
import three.LoadingManager;
import three.MeshPhongMaterial;
import three.OrthographicCamera;
import three.PerspectiveCamera;
import three.SphereGeometry;
import three.Sprite;
import three.SpriteMaterial;
import three.Texture;
import three.TextureLoader;
import three.Three;
import three.Vector3;

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
		
		/*var msh = new MeshDisplay( new BoxGeometry(1, 1, 1), new MeshPhongMaterial( { color : 0xF7CF33 } ) );		
		var go = new GameObject("out")
			.addComponent(msh)
			//.addComponent( new RandomRotator() )
			;
		
		go.transform.rotateX( 0.34 );
		go.transform.rotateY( 1.34 );
		go.transform.rotateZ( 2.25 );
		
		
		var go2 = new GameObject( "INSIDE" )
			.addComponent( new MeshDisplay( new BoxGeometry(0.5, 0.5, 0.5) ) )
			.addComponent( new RandomRotator() )
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
		*/
		var layer = new Layer( "layer" );
		addLayer( layer );
		
		var gd = Main.pack.getGeomDef("cube");
		for ( i in 0...200 ) {
			var go = new GameObject("GO" + i)
				//.add( new MeshDisplay( new SphereGeometry( Math.random() * 0.5 + 1, 12, 12 ) , new MeshPhongMaterial({color: cast (0xffffff * Math.random()) }) ) );
				.add(  new GeometryDisplay( gd )	);
			go.transform.position.x = Math.random() * 40 - 20;
			go.transform.position.y = Math.random() * 40 - 20;
			go.transform.position.z = Math.random() * 40 - 20;
			go.transform.rotateX( Math.random() * 3.14 );
			go.transform.rotateY( Math.random() * 3.14 );
			go.transform.rotateZ( Math.random() * 3.14 );
			
			layer.addChild( go );
		}
		
		var dl = new DirectionalLight( 0x8EEAFD, 0.7 );
		dl.rotateX( 0.9 );
		dl.rotateY( 0.5 );
		dl.rotateZ( 0.2);
		layer.add( dl );
		layer.add( new AmbientLight( 0xffffff ) );
		
		layer.addChild(
			new GameObject().add( new CameraHolder() )
			);	
			
		layer.setCamera( new PerspectiveCamera( 60, 800 / 600, 0.1, 1000 ) );
		
		
		
		
		
		var ui = newLayer2D("UILAYER");		
		var g2d = new GameObject("SPRITETEST");		
		var spr = new Sprite2D( 'logo' );
		spr.setScale( 0.5 );
		//spr.setAnchor( 0, 0 );
		//spr.setTexture( Res.getTexDef( 'button_gameplay_level_menu' ) );
		g2d.add( spr );		
		//g2d.transform.rotateZ( 0.5 );
		ui.addChild( g2d );		
		//g2d.transform.position.set( 0, 0, 0 );
		
		var mgr = new LoadingManager();
		var l = new TextureLoader( mgr );

		
		
		var cc = cast(ui.camera, OrthographicCamera );
		
		
		
		
		
		/*cc.left = -10;
		cc.right = -cc.left;
		cc.top = 10;
		cc.bottom = -cc.top;
		cc.far = 1000;
		cc.near = 0.1;
		cc.updateProjectionMatrix();
		
		cc.position.set( 0, 0, 900 );
		cc.lookAt( new Vector3(0, 0, 0) );*/
		
		//cc.updateMatrix();
		//cc.updateProjectionMatrix();
		//Main.pack.getSound("tnt").play();
		
	}
	
}