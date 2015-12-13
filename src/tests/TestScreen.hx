package tests;
import js.Browser;
import js.html.ImageElement;
import shoe3d.component.CameraHolder;
import shoe3d.component.S3Mesh;
import shoe3d.component.RandomRotator;
import shoe3d.component.S3Mesh;
import shoe3d.component.S3Mesh;
import shoe3d.component.S3Sprite;
import shoe3d.core.GameObject;
import shoe3d.core.Layer;
import shoe3d.screen.GameScreen;
import shoe3d.System;
import three.AmbientLight;
import three.BoxGeometry;
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
		
		
		for ( i in 0...400 ) {
			var go = new GameObject("GO" + i)
				//.add( new MeshDisplay( new SphereGeometry( Math.random() * 0.5 + 1, 12, 12 ) , new MeshPhongMaterial({color: cast (0xffffff * Math.random()) }) ) );
				.add( new S3Mesh( new BoxGeometry( Math.random() * 0.5 + 1, Math.random() * 0.5 + 1, Math.random() * 0.5 + 1 ) , new MeshPhongMaterial({color: cast (0xffffff * Math.random()) }) ) );
			go.transform.position.x = Math.random() * 40 - 20;
			go.transform.position.y = Math.random() * 40 - 20;
			go.transform.position.z = Math.random() * 40 - 20;
			
			layer.addChild( go );
		}
		
		layer.add( new DirectionalLight( 0x8EEAFD, 0.7 ) );
		layer.add( new AmbientLight( 0xffffff ) );
		
		layer.addChild(
			new GameObject().add( new CameraHolder() )
			);	
			
		layer.setCamera( new PerspectiveCamera( 60, 800 / 600, 0.1, 1000 ) );
		
		
		
		
		
		var ui = newUILayer("UILAYER");		
		var g2d = new GameObject("SPRITETEST");		
		var spr = new S3Sprite();
		//g2d.add( spr );		
		ui.addChild( g2d );		
		//g2d.transform.position.set( 0, 0, 0 );
		
		var mgr = new LoadingManager();
		var l = new TextureLoader( mgr );
		l.load( '/assets/button1.png', function( img ) {
					
			var sprite:Sprite = null;
			var mat:SpriteMaterial = null;
			//var mat = new SpriteMaterial( { map: img } );
			untyped __js__("mat = new THREE.SpriteMaterial({map:img});");
			sprite = new Sprite( mat );
			
			trace('addFromwww');
			ui.add( sprite );
			
		} );
		
		ui.add( new AmbientLight( 0xffffff ) );
		
		var cc = cast(ui.camera, OrthographicCamera );
		cc.left = -10;
		cc.right = -cc.left;
		cc.top = 10;
		cc.bottom = -cc.top;
		cc.updateProjectionMatrix();
		
		cc.position.set( 10, 10, 100 );
		cc.lookAt( new Vector3(0, 0, 0) );
		cc.updateMatrix();
		cc.updateProjectionMatrix();
		
		
	}
	
}