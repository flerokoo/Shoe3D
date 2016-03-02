package tests;
import js.Browser;
import js.html.Event;
import shoe3d.asset.AssetPack.GeomDef;
import shoe3d.asset.Res;
import shoe3d.component.CameraHolder;
import shoe3d.component.GeometryDisplay;
import shoe3d.component.S3Mesh;
import shoe3d.component.RandomRotator;
import shoe3d.core.game.GameObject;
import shoe3d.core.input.KeyCodes;
import shoe3d.core.input.PointerEvent;
import shoe3d.core.Layer;
import shoe3d.core.Time;
import shoe3d.screen.GameScreen;
import shoe3d.System;
import shoe3d.util.UVTools;
import three.AmbientLight;
import three.Animation;
import three.AnimationAction;
import three.AnimationData;
import three.AnimationLoopType;
import three.AnimationMixer;
import three.BoxGeometry;
import three.DirectionalLight;
import three.Geometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.MeshPhongMaterial;
import three.SkinnedMesh;
import three.TextureFilter;
import three.Vector3;

/**
 * ...
 * @author as
 */
class TestScreen2 extends GameScreen
{
	var skm:Dynamic;
	@:keep
	public function new() 
	{
		super();
		
		var texDef = Res.getTexDef("main_pattern");
		var geom = new BoxGeometry( 2, 1, 0.5 );
		UVTools.setGeometryUVFromTexDef( geom, texDef);	

		var platformGeomDef:GeomDef = new GeomDef(
			geom,
			texDef,
			new MeshPhongMaterial( { map:texDef.texture } )
		);
		
		var layer1 = newLayer("platforms");		
		//var layer2 = newLayer("hero");
		
		
		for ( i in 0...10 ) {
			var pl = new GameObject();
			pl.add( new GeometryDisplay( platformGeomDef ) );
			pl.transform.position.set( Math.random() * 10 - 5, 0, Math.random() * 10 - 5 );
			layer1.addChild( pl );
		}
		
		var dl = new DirectionalLight( 0x8EEAFD, 0.8 );
		dl.position.set(10, 5, 10  );
		dl.lookAt( new Vector3(0, 0, 0) );
		layer1.scene.add( dl );
		layer1.scene.add( new AmbientLight( 0xffffff ) );	
		
		
		var anim = new GameObject();
		var skm = new SkinnedMesh( Main.pack.getGeometry("anim2"), new MeshPhongMaterial({color: 0x0AA6E9, skinning: true}) );
		anim.transform.add( skm );		
		layer1.addChild( anim );
		this.skm = skm;
		
		//trace(untyped skm.geometry.animations[0]);
		
		var t:AnimationAction = getIdleAction();
		trace( t.clip.tracks );
		
		//var clip = untyped __js__(" new THREE.AnimationClip( 'nam', -1, skm.geometry.animations[0].tracks )" );
		var act = untyped __js__(" new THREE.AnimationAction( skm.geometry.animations[0] )");
		act.timeScale = 10;
		act.loop = untyped __js__("THREE.LoopOnce");
		mixer = new AnimationMixer( skm );
		action = act;
		mixer.play( untyped act );
		//mixer.addEventListener('loop', function (a) { trace("LOOP"); trace(a); }  );
		//mixer.addEventListener('finished', function (a) { trace("FINISHED"); trace(a); }  );
		
		var idle = createActionFromTracks( "Idle", untyped skm.geometry.animations, AnimationLoopType.LoopPingPong, 1 ) ;
		var kick = createActionFromTracks( "LKick", untyped skm.geometry.animations, AnimationLoopType.LoopOnce, 1 ) ;
		
		idle.timeScale = 2;
		kick.timeScale = 5;
		
		//trace( untyped skm.geometry.animations );
		
		mixer.addAction( idle );
		
		
		layer1.camera.position.set( 10, 10, 10 );
		layer1.camera.lookAt( new Vector3(0, 0, 0));
		layer1.camera.lookAt( anim.transform.position );
		layer1.camera.up = new Vector3(0, 0, 1);
		//layer2.setCamera( layer1.camera );
		
		var last = idle;
		
		trace(AnimationLoopType.LoopPingPong);
		
		var crossed = false;
		var click = function ( e ) {
			crossed = true;
			trace("CROSSFADE");		
			mixer.removeAllActions();
			var to = getKickAction();
			//mixer.play( last );
			mixer.play( to );
			mixer.crossFade( last, to, 0.3, false );
			last = kick;
		};
		var evt:AnimationEvent;
		
		
		System.input.mouse.up.connect( click );
		
		var loop = function(e:AnimationEvent) {
				if (e.action == idle || ! crossed) return;
				crossed = false;
				//mixer.removeEventListener( "loop", loop );
				//trace("FINISHED", e.action.clip.name);			
				mixer.removeAllActions();
				var to = getIdleAction();
				var from = getKickAction();
				//mixer.play( last );
				mixer.play( to );
				mixer.crossFade( last, to, 0.3, false );	
				
			};
		
		mixer.addEventListener( Finished , loop);
		
		var end = function(e:AnimationEvent) trace(e.type, e.action.clip.name );
		
		mixer.addEventListener( Finished, end );
		mixer.addEventListener( Loop, end );
		
		
	}
	
	var action:Dynamic;
	var mixer:AnimationMixer;
	
	function createActionFromTracks( name:String, tracks:Array<Dynamic>, loop:Dynamic, weight:Float = 1, scale:Float = 1 ) {
		for ( i in tracks ) {
			if ( i.name == name )
				return  untyped __js__('new THREE.AnimationAction( i, 0, scale, weight, loop);');
		}
		
		return null;
	}
	
	function getKickAction() {
		return createActionFromTracks( "LKick", untyped skm.geometry.animations, untyped __js__ ("THREE.LoopOnce"), 1, 5 );
	}
	
	function getIdleAction() {
		return  createActionFromTracks( "Idle", untyped skm.geometry.animations, untyped __js__ ("THREE.LoopPingPong"), 1 );
	}
	
	@:allow(shoe3d)
	override public function onUpdate()
	{
		//trace( System.input.keyboard._keyStates.get( KeyCodes.toKeyCode(A) ) );
		mixer.update( Time.dt );
		
	}
	
}