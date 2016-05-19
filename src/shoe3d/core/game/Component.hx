package shoe3d.core.game;

/**
 * ...
 * @author as
 */
@:autoBuild(shoe3d.core.ComponentBuilder.build())
@:componentBase
@:allow(shoe3d)
class Component
{

	public var owner:GameObject;
	private var _started:Bool = false;
	public var name (get, null) :String;
	
	
	public function new() 
	{
		
	}
	
	public function onUpdate() {
		
	}
	
	public function onLateUpdate() {
		
	}
	
	public function onStart() {
		
	}
	
	public function onEnable() {
		
	}
	
	public function onAdded() {
		
	}
	
	public function onRemoved() {
		
	}
	
    private function get_name () :String
    {
        return null; // see ComponentBuilder
    }
	
}