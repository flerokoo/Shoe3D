package tests;
import js.Browser;
import js.html.ArrayBuffer;
import js.html.Float32Array;
import js.html.ImageElement;
import shoe3d.asset.Res;
import shoe3d.component.AutoPosition;
import shoe3d.component.CameraHolder;
import shoe3d.component.Element2D;
import shoe3d.component.FillSprite;
import shoe3d.component.GeometryDisplay;
import shoe3d.component.ProgressBar;
import shoe3d.component.S3Mesh;
import shoe3d.component.RandomRotator;
import shoe3d.component.S3Mesh;
import shoe3d.component.S3Mesh;
import shoe3d.component.ScaleButton;
import shoe3d.component.ImageSprite;
import shoe3d.core.game.GameObject;
import shoe3d.core.input.MouseEvent;
import shoe3d.core.input.PointerEvent;
import shoe3d.core.Layer;
import shoe3d.core.Layer2D;
import shoe3d.screen.GameScreen;
import shoe3d.sound.Sound;
import shoe3d.System;
import shoe3d.util.Tools;
import soundjs.SoundManager;
import three.AmbientLight;
import three.BoxGeometry;
import three.BufferGeometry;
import three.Color;
import three.DirectionalLight;
import three.Geometry;
import three.ImageLoader;
import three.ImmediateRenderObject;
import three.LoadingManager;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshPhongMaterial;
import three.MeshPhongMaterialParameters;
import three.OrthographicCamera;
import three.PerspectiveCamera;
import three.RawShaderMaterial;
import three.Shading;
import three.Side;
import three.SphereGeometry;
import three.SpotLight;
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

	var layer2d:Layer2D;
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
		layer.scene.castShadow = true;
		layer.scene.receiveShadow = true;
		//layer.scene.overrideMaterial = new MeshPhongMaterial({color:0xCAB435});
		//System.renderer.renderer.sortObjects = false;
		var gd = Main.pack.getGeomDef("boy");
		//gd.material.depthTest = false;
		//gd.material.depthWrite = false;
		//gd.material.transparent = false;
		//layer.overrideMaterial = new MeshPhongMaterial( { transparent: false, depthWrite: true, depthTest: false, color: 0x6C0000 } );
		gd.material = new MeshPhongMaterial( { map: gd.texDef.texture } );
		//trace( cast(gd.material, MeshPhongMaterial).);
		trace( cast(gd.material, MeshPhongMaterial).reflectivity = 1000  );
		
		for ( i in 0...10 ) {
			var go = new GameObject("GO" + i)
				//.add( new MeshDisplay( new SphereGeometry( Math.random() * 0.5 + 1, 12, 12 ) , new MeshPhongMaterial({color: cast (0xffffff * Math.random()) }) ) );
				.add(  new GeometryDisplay( gd )	);
			go.transform.position.x = Math.random() * 40 - 20;
			go.transform.position.y = Math.random() * 40 - 20;
			go.transform.position.z = Math.random() * 40 - 20;
			go.transform.rotateX( Math.random() * 3.14 );
			go.transform.rotateY( Math.random() * 3.14 );
			go.transform.rotateZ( Math.random() * 3.14 );
			
			/*if ( Math.random() < 0.5 )
				go.transform.renderOrder = 100000000
			else
				go.transform.renderOrder = 1;*/
				
			//go.transform.add( new Mesh( Main.pack.getGeometry("boy"), new MeshPhongMaterial( { color:0x449E18 } ) ) );	
				
			//go.transform.renderOrder = i * 10;
			layer.addChild( go );
		}
		
		//var dl = new DirectionalLight( 0x8EEAFD, 0.7 );
		var dl = new SpotLight(0xFFFFFF, 0.5, 10000, 40 );
		dl.target.position.set(0, 0, 0);
		dl.position.set( 30, 30, 30 );
		dl.rotateX( 0.9 );
		dl.rotateY( 0.5 );
		dl.rotateZ( 0.2);
		dl.castShadow = true;
	
		layer.scene.add( dl );
		layer.scene.add( new AmbientLight( 0xffffff ) );
		
		layer.addChild(
			new GameObject().add( new CameraHolder() )
			);	
			
		layer.setCamera( new PerspectiveCamera( 60, 800 / 600, 0.1, 1000 ) );
		
		

		
		
		var ui = layer2d = newLayer2D("UILAYER", true);		
		var g2d = new GameObject("SPRITETEST");		
		var spr = new ImageSprite( 'logo' );
		//spr.setScale( 0.5 );
		//spr.setAnchor( 0, 0 );
		//spr.setTexture( Res.getTexDef( 'button_gameplay_level_menu' ) );
		g2d.add( spr );		
		//g2d.transform.rotateZ( 0.5 );
		//ui.addChild( g2d );		
		//g2d.transform.position.set( 0, 0, 0 );
		
		var mgr = new LoadingManager();
		var l = new TextureLoader( mgr );

		
		
		
		
		//io.render( function( a, b, c) trace(a, b, c) );
		
		
		var cc = cast(ui.camera, OrthographicCamera );
		
		var a:Array<ImageSprite> = [];
		var cont = new GameObject().add( new AutoPosition().setAsOnScreenContainer() );
		layer2d.addChild( cont );
		for ( i in 0...3 )
		{
			//a[i] = addSprite( i == 155 ? a[0].owner : layer2d );			
			a[i] = addSprite( cont );			
		}
		
		//a[0].owner.transform.scale.set( 1.2, 1.2, 1 );
		//untyped a[0].alpha._ = 0.7;
		//a[1].alpha._ = 0.5;
		
		System.input.mouse.move.connect( function(e:MouseEvent) {
			//trace( a[0].contains( e.viewX, e.viewY ), a[1].contains( e.viewX, e.viewY ), a[2].contains( e.viewX, e.viewY ) );
		});
		
		/*System.input.pointer.down.connect( function (e:PointerEvent) {
			trace("SYSTEM>PDOWN", e.hit != null );
		} );*/
		
		var addL = function( e:Element2D, name:String ) {
			e.pointerUp.connect( function(e:PointerEvent) trace("UP " + name) );					
			e.pointerIn.connect( function(e:PointerEvent) trace("IN " + name)  );
			e.pointerOut.connect( function(e:PointerEvent) trace("OUT " + name)  );
			e.pointerDown.connect( function(e:PointerEvent) trace("DOWN " + name)  );
		}
		
		for ( i in 0...a.length ) 
		{
			a[i].pointerUp.connect( function(e:PointerEvent) {
				trace("UP" + i) ;
				//SoundManager.muted = ! SoundManager.muted ;
				
			} );
			
			a[i].pointerIn.connect( function(e:PointerEvent) trace("IN" + i)  );
			a[i].pointerOut.connect( function(e:PointerEvent) trace("OUT" + i)  );
			a[i].pointerDown.connect( function(e:PointerEvent) trace("DOWN" + i)  );
			//e.stopPropagation();
		}
		
		a[0].owner.add( new AutoPosition().setPos( 0.5, 0.5, 640/4 ) );
		
		
		var progress = new ProgressBar( "game_pattern" );
		addL(progress, "PROGRESS");
		var pgo = new GameObject().add( progress );
		pgo.transform.position.set( 400, 400, 0 );
		layer2d.addChild( pgo );
		
		System._loop._frame.connect( function(d) 
		{			
			//progress.progress += - 0.005;
			progress.progress = 0.01;
		});
		
		var fss = new FillSprite( 300, 100, 0xff00ff );
		layer2d.addChild( new GameObject().add( fss ) );
		fss.owner.transform.position.set( 300, 300, 0);
		/*var s1 = addSprite().owner;
		var s2 = addSprite().owner;
		var s3 = addSprite().owner;*/
		
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
		//Main.pack.getSound("music").play() ;
		
		var ir = new ImmediateRenderObject();
		var b = "precision mediump float;\nprecision mediump int;\n";		
		var mat = new RawShaderMaterial( {
			uniforms: {
				map: {
					type: "t",
					value: a
				}
			},
			//attributes: {},
			vertexShader: b + "	uniform mat4 modelViewMatrix;	uniform mat4 projectionMatrix;	attribute vec2 position;	attribute vec4 color;	attribute vec2 uv;	varying vec4 vColor;	varying vec2 vUv;	void main() {		vColor = color;		vUv = uv;		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);	}",
			fragmentShader: b + "	varying vec4 vColor; varying vec2 vUv; uniform sampler2D map;		void main() {		gl_FragColor = vColor * texture2D(map, vUv);	}",
			depthTest: false,
			depthWrite: false,
			transparent: true,
			side : Side.DoubleSide
		});
		untyped mat.map = Main.pack.getTexDef("logo").texture;
		ir.material = mat;
		untyped ir.render = function (cb) {
			
			untyped ir.positionArray = new Float32Array( [ 
				0, 0, 0, 
				0, 100, 0, 
				100, 100, 100 
				] );
			untyped ir.uvArray = new Float32Array( [ 
				0, 0, 0, 
				0, 1, 0, 
				1, 1, 1 
				] );
			untyped ir.hasPositions = true;
			untyped ir.hasUvs = true;
			untyped ir.count = 3;
			cb(ir);
		};
		
		layer2d.scene.add( ir );
	}
	
	override public function onUpdate()
	{
		
	}
	
	var last = -1;	
	var io:three.ImmediateRenderObject;
	function addSprite( owner:Dynamic = null, name:String = '' )
	{
		
		var tn = name == '' ? Tools.getRandomFromArray( ['button_play' ] ) : name;
		var go = new GameObject()
			.add( new ImageSprite( tn ) );
			//.add( new ScaleButton( function(e:PointerEvent) e.hit.owner.transform.rotateZ( 0.2 ) ) );
		go.transform.position.set( last * 250 + 300  , 250 * last + 300 , go.transform.position.z );
		//go.transform.position.multiplyScalar( 0 );
		
		//go.transform.scale.x = Math.random() * 0.5 * 0 + 0.5;
		//go.transform.scale.y = Math.random() * 0.5 + 0.5;
		
		go.transform.scale.set( (last+2) * 0.05 * 0 + 1, (last+2) * 0.05 * 0 + 1, 1 );
		
		last != 0  
			?	go.transform.position.set( 400 + 0 * last, 400 + 200 * last, 0 )
			: 	go.transform.position.set( 0, 50, 0 );
		go.transform.position.set( 200 + 0 * last, 400 + 200 * last, 0 );
		//go.get(Sprite2D).anchorX = Math.random() * 200 - 100;
		//go.get(Sprite2D).anchorY = Math.random() * 200 - 100;
		
		last += 1;
		
		if ( owner != null )
			owner.addChild( go );
		return go.get(ImageSprite);
	}
	
}