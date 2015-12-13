package shoe3d.component;
import js.html.ImageElement;
import shoe3d.core.Component;
import three.ImageLoader;
import three.ImageUtils;
import three.LoadingManager;
import three.Mapping;
import three.Sprite;
import three.SpriteMaterial;
import three.Texture;

/**
 * ...
 * @author as
 */
class S3Sprite extends Component
{

	public var sprite:Sprite;
	
	public function new( ?mat:SpriteMaterial ) 
	{
		super();
		
		//var tex = ImageUtils.loadTexture( 'assets/button1.png' );
		//mat = new SpriteMaterial( {map:tex} );
		
		var mgr = new LoadingManager();
		var l = new ImageLoader( mgr );
		l.load( 'assets/button1.png', function( img:ImageElement) {
			var tex = new Texture( img );
			
			sprite = new Sprite( new SpriteMaterial({ map: tex }) );
			if ( owner != null ) {
				trace('addFrom');
				owner.transform.add( sprite );
			}
		} );
		
		
		//sprite = new Sprite( mat );
		
	}
	
	
	
	override public function onAdded()
	{
		if ( sprite != null ) {
			owner.transform.add( sprite );
			trace('add');
		}
	}
	
}