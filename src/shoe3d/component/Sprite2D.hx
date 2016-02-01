package shoe3d.component;
import js.Browser;
import js.html.Float32Array;
import js.html.ImageElement;
import shoe3d.asset.AssetPack.TexDef;
import shoe3d.asset.Res;
import shoe3d.core.game.Component;
import shoe3d.util.Assert;
import shoe3d.util.math.Rectangle;
import shoe3d.util.SMath;
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
import three.Side;
import three.Sprite;
import three.SpriteMaterial;
import three.Texture;
import three.TextureFilter;
import three.TextureLoader;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author as
 */
class Sprite2D extends Element2D
{
	var mesh:Mesh;
	var geom:Geometry;
	var texDef:TexDef;
	var material:MeshBasicMaterial;
	public var anchorX(default, set):Float = 0;
	public var anchorY(default, set):Float = 0;

	public function new( textureName:String ) 
	{
		super();
		
		texDef = Res.getTexDef( textureName );
		geom = new PlaneGeometry(0, 0, 1, 1);
		material = new MeshBasicMaterial( { transparent: true, side: Side.DoubleSide } );	
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
		
		/*geom.vertices = [
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
		]];		*/
		
		geom.vertices[0].set( -w / 2, h / 2, 0 );
		geom.vertices[1].set( w / 2, h / 2, 0 );
		geom.vertices[2].set( -w / 2, -h / 2, 0 );
		geom.vertices[3].set( w / 2, -h / 2, 0 );
		
		var uvs = geom.faceVertexUvs[0];
		uvs[0][0].set( uv.umin, uv.vmax );
		uvs[0][1].set( uv.umin, uv.vmin );
		uvs[0][2].set( uv.umax, uv.vmax );
		
		uvs[1][0].set( uv.umin, uv.vmin );
		uvs[1][1].set( uv.umax, uv.vmin );
		uvs[1][2].set( uv.umax, uv.vmax );
		
		
		material.map = texDef.texture;
	}
	
	public function setAnchor( x:Float = 0, y:Float = 0 )
	{
		anchorX = x;
		anchorY = y;
	}
	
	public function setTexture( tex:TexDef ) 
	{
		Assert.that(tex != null, "Texture is null" );
		texDef = tex;
		redefineSprite();
	}
	
	function updateAnchor()
	{
		mesh.position.x = -anchorX;
		mesh.position.y = -anchorY;
	}
	
	override public function onAdded()
	{
		owner.transform.add( mesh );		
	}
	
	override public function onRemoved()
	{ 
		owner.transform.remove( mesh );
	}
	
	function set_anchorY(value:Float):Float 
	{
		anchorY = value;
		updateAnchor();
		return anchorY;
	}
	
	function set_anchorX(value:Float):Float 
	{
		anchorX = value;
		updateAnchor();
		return anchorX;
	}
	
	public function setScale( s:Float ) 
	{
		//mesh.scale.set( s, s, 1);
		owner.transform.scale.set( s, s, 1 );
	}
		
	
	public override function contains( x:Float, y:Float ):Bool
	{
		y = System.window.height - y;
		var v = mesh.worldToLocal( new Vector3( x, y, 0 ) );
		x = v.x;
		y = v.y;		
		return ( 	texDef.width * 0.5 >= SMath.fabs(x) &&
					texDef.height * 0.5 >= SMath.fabs(y) );
	}
	
	public function setScaleXY( sx:Float, sy:Float ) 
	{
		//mesh.scale.set( sx, sy, 1);
		owner.transform.scale.set( sx, sy, 1);
	}
	
	override function setLevel( level:Float ):Element2D
	{
		mesh.renderOrder = level;
		return this;
	}
	
	override function setPremultipliedAlpha( alpha:Float ):Element2D
	{
		material.opacity = alpha;
		return this;
	}
}