package shoe3d.screen;
import js.html.Screen;
import shoe3d.component.CameraHolder;
import shoe3d.component.RandomRotator;
import shoe3d.core.GameObject;
import shoe3d.core.Layer;
import shoe3d.util.Assert;
import three.Object3D;
import three.PerspectiveCamera;
import three.Scene;

/**
 * ...
 * @author as
 */
@:allow("shoe3d")
class GameScreen
{	
	public var layers(default,null):Array<Layer>;
		
	public function new() 
	{
		layers = [];		
	}	
	
	public function onShow() 
	{
		
	}
	
	public function onHide() 
	{
		
	}
	
	public function addLayer( lr:Layer ) 
	{
		Assert.that( layers.indexOf( lr ) < 0, "Layer(${scr.name}) is already on the scene" );
		layers.push( lr );
		return this;
	}
	
	
}