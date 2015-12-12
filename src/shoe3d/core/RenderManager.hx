package shoe3d.core;
import js.Browser;
import js.html.DivElement;
import three.OrthographicCamera;
import three.PerspectiveCamera;
import three.WebGLRenderer;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class RenderManager
{

	public static var container:DivElement;
	public static var renderer:WebGLRenderer;
	public static var camera:PerspectiveCamera;
	public static var uiCamera:OrthographicCamera;
	
	
	private static function init() {
		
		container = Browser.document.createDivElement();
		Browser.document.body.appendChild( container );	
		
		
		renderer = new WebGLRenderer();
		renderer.setSize( 800, 600);			
		container.appendChild( renderer.domElement );
		
		renderer.setClearColor(0xF28313);
		renderer.autoClear = false;		
		uiCamera = new OrthographicCamera( -1, 1, 10, -10 , 0.1, 1000 );
		
	}
	
	private static function render() 
	{
		
		renderer.clear( );
	
		for ( layer in System.screen._currentScreen.layers )
				if( layer.camera != null /*&& layer.visible*/ )
					renderer.render( layer, layer.camera );
	}
	
}