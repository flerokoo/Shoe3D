package shoe3d.component;
import js.html.Float32Array;
import js.html.ImageElement;
import shoe3d.asset.Atlas.TexDef;
import shoe3d.asset.Res;
import shoe3d.core.game.Component;
import tests.Main;
import three.AmbientLight;
import three.BufferAttribute;
import three.Face3;
import three.Geometry;
import three.ImageLoader;
import three.ImageUtils;
import three.LoadingManager;
import three.Mapping;
import three.Mesh;
import three.MeshPhongMaterial;
import three.PlaneGeometry;
import three.Sprite;
import three.SpriteMaterial;
import three.Texture;
import three.TextureLoader;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author as
 */
class Sprite2D extends Element2D
{

	public var geom:Geometry;
	public var texDef:TexDef;
	public var mesh:Mesh;
	
	public function new( textureName:String ) 
	{
		super();
		
		//var tex = ImageUtils.loadTexture( 'assets/button1.png' );
		//mat = new SpriteMaterial( {map:tex} );
		
		/*var mgr = new LoadingManager();
		var l = new TextureLoader( mgr );
		l.load( 'assets/button1.png', function( tex ) {
				
			sprite = new Sprite( new SpriteMaterial({ map: tex }) );
			if ( owner != null ) {
				trace('addFrom');
				owner.transform.add( sprite );
				trace( cast(sprite.material.map.image, ImageElement).width );
			}
			sprite.scale.set( 256, 256 , 1);
			var spr = sprite;
			untyped __js__('spr.geometry.getAttribute("uv").dynamic = true;');
			sprite.geometry.getAttribute("uv").array = [[0.5, 0.5, 1, 0.5, 1, 1, 0, 1]];
			sprite.geometry.addAttribute("uv", new BufferAttribute( new Float32Array([0.5, 0.5, 1, 0.5, 1, 1, 0, 1]), 2) );
			
			trace(sprite.geometry.getAttribute("uv") );
			
		} );*/
		
		
		//sprite = new Sprite( mat );
		
		/*var tex = Main.pack.getTexture("ASD");
		tex.image
		var geom = new Geometry();*/
		
		texDef = Res.getTexDef( textureName ); 
		redefineGeom();
		
		mesh = new Mesh( 
			geom, 
			new MeshPhongMaterial( { transparent: true, map: texDef.texture } ) 
			);
			
	}
	
	function redefineGeom()
	{
		/*if ( geom == null ) geom = new Geometry();
		var w = texDef.texture.naturalWidth;
		var h = texDef.texture.naturalHeight;
		
		
		geom.vertices = [
			new Vector3( -w/2, h/2, 0 ),
			new Vector3( w/2, h/2, 0 ),
			new Vector3( -w/2, -h/2, 0 ),
			new Vector3( w/2, h/2, 0 )
		];
		
		geom.faces = [
			new Face3( 0, 2, 1, new Vector3( 0, 0, 1 ) ),
			new Face3( 2, 1, 3, new Vector3( 0, 0, 1 ) )
		];
		
		geom.faceVertexUvs = [[[
			new Vector2( 0, 1 ),
			new Vector2( 0, 0 ),
			new Vector2( 1, 1 ),
			new Vector2( 0, 0 ),
			new Vector2( 1, 0 ),
			new Vector2( 1, 1 )
		]]];
		
		geom.elementsNeedUpdate = true;
		geom.uvsNeedUpdate = true;
		geom.verticesNeedUpdate = true;*/
		
		
		
		
		
		
		
		
		var w = texDef.width;
		var h = texDef.height;
		
		if( geom == null ) geom = new PlaneGeometry( w, h, 1, 1 );
		
		
		geom.uvsNeedUpdate = true;	
		geom.verticesNeedUpdate = true;
		
		geom.vertices = [
			new Vector3( -w/2, h/2 ),
			new Vector3( w/2, h/2 ),
			new Vector3( -w/2, -h/2 ),
			new Vector3( w/2, -h/2 )
		];
		
		/*geom.faceVertexUvs = [[
			[
				new Vector2( 1, 1 ),
				new Vector2( 0, 1 ),
				new Vector2( 1, 0 )
			],
			[
				new Vector2( 0, 1 ),
				new Vector2( 0, 0 ),
				new Vector2( 1, 0 )
			]
		]];*/
		
		var uv = texDef.uv;
		
		/*geom.faceVertexUvs = [[
			[
				new Vector2( uv.umax, uv.vmax ),
				new Vector2( uv.umin, uv.vmax ),
				new Vector2( uv.umax, uv.vmin )
			],
			[
				new Vector2( uv.umin, uv.vmax ),
				new Vector2( uv.umin, uv.vmin ),
				new Vector2( uv.umax, uv.vmin )
			]
		]];*/
		trace(geom.faceVertexUvs);
		
		geom.faceVertexUvs = [[
			[
				new Vector2( uv.umin, uv.vmax ),
				new Vector2( uv.umin, uv.vmin ),
				new Vector2( uv.umax, uv.vmax )
			],
			[
				new Vector2( uv.umin, uv.vmin ),
				new Vector2( uv.umax, uv.vmin ),
				new Vector2( uv.umax, uv.vmax )
			]
		]];
		
	}
	
	
	
	override public function onAdded()
	{
		/*if ( sprite != null ) {
			owner.transform.add( sprite );
			trace( sprite.material.map.image );
		}*/
		owner.transform.add( mesh );
		owner.transform.add( new AmbientLight( 0xffffff ) );
	}
	
}