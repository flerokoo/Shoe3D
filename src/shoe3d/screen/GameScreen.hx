package shoe3d.screen;
import shoe3d.core.GameObject;
import shoe3d.core.GameScene;
import three.Object3D;
import three.Scene;

/**
 * ...
 * @author as
 */
@:allow("shoe3d")
class GameScreen
{
	
	public var scene:GameScene;
	public var gameScene:GameScene;
	public var uiScene:GameScene;
	
	public function new() 
	{
		scene = new GameScene();
		gameScene = new GameScene();
		uiScene = new GameScene();
		
		scene.add( gameScene );
		scene.add( uiScene );
	}
	
}