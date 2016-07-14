package shoe3d.core;
import ext.RenderStats;
import js.Browser;
import js.html.DivElement;
import shoe3d.screen.ScreenManager;
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

	public static var clearColor:Int = 0x3D2E2E;
	public static var container:DivElement;
	public static var renderer:WebGLRenderer;
	
	
	private static var stats:RenderStats;
	
	private static function init() 
	{		
		container = Browser.document.createDivElement();
		Browser.document.body.appendChild( container );			
		
		renderer = new WebGLRenderer({antialias:false});
		renderer.setSize( 800, 600);			
		container.appendChild( renderer.domElement );
		
		
		renderer.autoClear = false;				
	}
	
	private static function render() 
	{		
		renderer.setClearColor(clearColor);
		renderer.clear( );
		if ( System.screen._currentScreen != null  ) {
			if( System.screen._currentScreen.layers != null )
				for ( layer in System.screen._currentScreen.layers )
					if( layer.visible ) layer.render( renderer );
					//if( layer.camera != null /*&& layer.visible*/ )
						//renderer.render( layer, layer.camera );
		}
		if ( stats != null ) stats.update( renderer );		
	}
	
	public static function showStats()
	{
		if ( stats == null ) 
		{
			stats = new RenderStats();
			stats.domElement.style.position = "absolute";
			stats.domElement.style.left = "0px";
			stats.domElement.style.bottom = "0px";						
		}		
		Browser.document.body.appendChild( stats.domElement );
	}
	
}