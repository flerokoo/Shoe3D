package shoe3d.screen;
import js.html.Screen;
import shoe3d.component.CameraHolder;
import shoe3d.component.RandomRotator;
import shoe3d.core.game.GameObject;
import shoe3d.core.Layer;
import shoe3d.core.UILayer;
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
		#if debug
		Assert.that( layers.indexOf( lr ) < 0, "Layer(${scr.name}) is already on the scene" );
		#end
		layers.push( lr );
		return this;
	}
	
	public function newLayer( ?name:String ):Layer
	{
		var layer = new Layer( name );
		layer.addPerspectiveCamera();
		addLayer( layer );
		return layer;
	}
	
	public function newUILayer( ?name:String ):UILayer
	{
		var layer = new UILayer( name );
		layer.addOrthoCamera();
		addLayer( layer );
		return layer;
	}
	
}