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
import three.MeshBasicMaterial;
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

	var geom:Geometry;
	var texDef:TexDef;
	var mesh:Mesh;
	var material:MeshBasicMaterial;
	
	public function new( textureName:String ) 
	{
		super();
		
		texDef = Res.getTexDef( textureName );
		geom = new PlaneGeometry(0, 0, 1, 1);
		material = new MeshBasicMaterial( { transparent: true } );	
		mesh = new Mesh( geom, material );
		
		redefineSprite();
		
		
		
	}
	
	function redefineSprite()
	{	
		if ( texDef == null ) return;
		
		var w = texDef.width;
		var h = texDef.height;
		var uv = texDef.uv;
		
		
		
		geom.uvsNeedUpdate = true;	
		geom.verticesNeedUpdate = true;
		
		geom.vertices = [
			new Vector3( -w/2, h/2 ),
			new Vector3( w/2, h/2 ),
			new Vector3( -w/2, -h/2 ),
			new Vector3( w/2, -h/2 )
		];
		
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
		material.map = texDef.texture;
	}
	
	
	public function setTexture( tex:TexDef ) 
	{
		texDef = tex;
		redefineSprite();
	}
	
	override public function onAdded()
	{
		/*if ( sprite != null ) {
			owner.transform.add( sprite );
			trace( sprite.material.map.image );
		}*/
		owner.transform.add( mesh );
		//owner.transform.add( new AmbientLight( 0xffffff ) );
	}
	
}