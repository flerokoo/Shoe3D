package shoe3d.core;
import js.Browser;
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

	static var renderer:WebGLRenderer;
	public static var camera:PerspectiveCamera;
	public static var uiCamera:OrthographicCamera;
	
	
	private static function init() {
		renderer = new WebGLRenderer();
		renderer.setSize( 800, 600);
		Browser.document.body.appendChild( renderer.domElement );
		
		camera =  new PerspectiveCamera( 60, 800 / 600, 0.1 , 1000 );
		uiCamera = new OrthographicCamera( -1, 1, 10, -10 , 0.1, 1000 );
		
	}
	
	private static function render() {
		renderer.render( System.screen._currentScreen.gameScene, camera );
		renderer.render( System.screen._currentScreen.uiScene, uiCamera );
	}
	
}