package shoe3d.component;
import shoe3d.core.game.Component;
import three.Color;
import three.Geometry;
import three.Mesh;
import three.MeshBasicMaterial;
import three.PlaneGeometry;
import three.Side;

/**
 * ...
 * @author as
 */
class FillSprite extends Component
{
	var mesh:Mesh;
	var geom:Geometry;
	var material:MeshBasicMaterial;
	public var width(default, set):Float = 0;
	public var height(default, set):Float = 0;
	public var color(default, set):Int = 0;
	
	public function new( width:Float, height:Float, ?color:UInt ) 
	{
		super();
		
		geom = new PlaneGeometry(width, height, 1, 1);
		material = new MeshBasicMaterial( { transparent: false, side: Side.DoubleSide } );	
		mesh = new Mesh( geom, material );	
		
		this.width = width;
		this.height = height;
		this.color = color == null ? 0xffff00 : color;
	}
	
	function redefineSprite()
	{	

		var w = width;
		var h = height;		
		
		//geom.uvsNeedUpdate = true;	
		geom.verticesNeedUpdate = true;

		geom.vertices[0].set( -w / 2, h / 2, 0 );
		geom.vertices[1].set( w / 2, h / 2, 0 );
		geom.vertices[2].set( -w / 2, -h / 2, 0 );
		geom.vertices[3].set( w / 2, -h / 2, 0 );
		

		/*uvs[0][0].set( 0, 1 );
		uvs[0][1].set(0, 0 );
		uvs[0][2].set( 1, 1 );
		
		uvs[1][0].set( 0,0 );
		uvs[1][1].set( 1, 0 );
		uvs[1][2].set( 1, 1 );*/
		
	}
	
	override public function onAdded()
	{
		owner.transform.add( mesh );		
	}
	
	override public function onRemoved()
	{ 
		owner.transform.remove( mesh );
	}
	
	function set_width(value:Float):Float 
	{
		width = value;
		redefineSprite();
		return width;
	}
	
	function set_height(value:Float):Float 
	{
		height = value;
		redefineSprite();
		return height;
	}
	
	function set_color(value:Int):Int 
	{
		color = value;
		material.color = new Color( value );
		return color;
	}
}