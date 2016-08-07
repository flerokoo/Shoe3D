package shoe3d.core.game;
import shoe3d.util.Disposable;

/**
 * ...
 * @author as
 */
@:autoBuild(shoe3d.core.ComponentBuilder.build())
@:componentBase
@:allow(shoe3d)
class Component implements Disposable
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
	
	public function onStop() 
	{
		
	}
	
	public function dispose() 
	{
		if ( owner != null )
			owner.remove( this );
	}
	
    private function get_name () :String
    {
        return null; // see ComponentBuilder
    }
	
}