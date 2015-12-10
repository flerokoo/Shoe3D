package shoe3d.screen;
import shoe3d.component.CameraHandle;
import shoe3d.component.RandomRotator;
import shoe3d.core.GameObject;
import shoe3d.core.GameScene;
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
	public var gameScene(default, null):GameScene;
	public var uiScene:GameScene;
	public var cameraHandle:CameraHandle;
	
	public function new() 
	{
		gameScene = new GameScene();
		uiScene = new GameScene();
		cameraHandle = new CameraHandle();
		gameScene.addChild( new GameObject().addComponent( cameraHandle ) );
		
	}	
	
	private function _onShow() 
	{
		
	}
	
	private function _onHide() 
	{
		
	}
	
}