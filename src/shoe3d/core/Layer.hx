package shoe3d.core;


import shoe3d.core.game.GameObject;
import three.Camera;
import three.OrthographicCamera;
import three.PerspectiveCamera;
import three.Renderer;
import three.Scene;
import three.Vector3;
import three.WebGLRenderer;

/**
 * ...
 * @author as
 */
class Layer implements GameObjectContainer
{
	public var name:String;
	public var scene(default,null):Scene;
	public var camera(default, null):Camera;
	public var children(default, null):Array<GameObject>;
	//public var visible:Bool = true;	
	
	public function new( ?name:String ) 
	{
		this.name = name;
		scene = new Scene();
		children = [];
		System.window._prePublicResize.connect( reconfigureCamera );
	}
	
	function reconfigureCamera() 
	{
		if ( camera != null ) 
		{
			if ( Std.is( camera, PerspectiveCamera ) )
			{
				var pc = cast(camera, PerspectiveCamera);
				pc.aspect = System.window.width / System.window.height;
				pc.updateProjectionMatrix();
			}
			else if ( Std.is(camera, OrthographicCamera ) ) 
			{
				var cam = cast(camera, OrthographicCamera);
				cam.left = 0;
				cam.right = System.window.width;
				cam.top = 0;
				cam.left = System.window.height;
				cam.updateProjectionMatrix();
				
			}
		}
	}
	
	public function addChild( child:GameObject ) 
	{
		children.push( child );
		child.setLayerReferenceRecursive( this );
		scene.add( child.transform );
		return this;
	}
	
	public function removeChild( child:GameObject ) 
	{
		children.remove( child );
		child.setLayerReferenceRecursive( null );
		scene.remove( child.transform );
		return this;
	}
	
	public function setCamera( cam:Camera )
	{
		camera = cam;
		if( camera != null ) camera.up = new Vector3( 0, 1, 0);
		reconfigureCamera();
		return this;
	}
	
	public function addPerspectiveCamera():PerspectiveCamera
	{
		var pc = new PerspectiveCamera( 70, 1, .5, 100 );
		setCamera( pc );
		return pc;
	}

	public function addOrthoCamera():OrthographicCamera
	{
		var pc = new OrthographicCamera( 1, 1, 1, 1, 0.1, 1000 );
		setCamera( pc );
		return pc;
	}
	
	public function render( renderer:WebGLRenderer)
	{
		if ( camera == null ) return;
		renderer.sortObjects = true;
		renderer.render( scene, camera );
	}
	
	public function find( name:String, maxDepth = -1 ):GameObject {
		return findInContainer( this, name, maxDepth );
	}
	
	static function findInContainer( cont:GameObjectContainer, name:String, depth:Int = -1 ):GameObject {
		
		depth--;
		
		for ( i in cont.children ) 
			if( i.name == name ) 
				return i;
				
		if( depth != 0 )
		for ( i in cont.children ) {
			var ret = findInContainer( i, name, depth );
			if ( ret != null) return ret;
		}
			
		return null;
	}
}