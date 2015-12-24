package shoe3d.core.input;
import shoe3d.util.signal.SingleSignal;
import three.Vector2;

/**
 * ...
 * @author as
 */
@:allow(shoe3d)
class PointerManager
{
	
	public var supported (get, null) :Bool;

    public var down (default, null) :SingleSignal<PointerEvent>;
    public var move (default, null) :SingleSignal<PointerEvent>;
    public var up (default, null) :SingleSignal<PointerEvent>;

    public var x (get, null) :Float;
    public var y (get, null) :Float;

	private static var _sharedEvent = new PointerEvent();
    private static var _scratchPoint = new Vector2();

    private var _x :Float;
    private var _y :Float;
    private var _isDown :Bool;
	
	public function new() 
	{
		down = new SingleSignal();
		move = new SingleSignal();
		up = new SingleSignal();
	}
	
	public function get_supported () :Bool
    {
        return true;
    }
	
	public function get_x () :Float
    {
        return _x;
    }

    public function get_y () :Float
    {
        return _y;
    }

    public function isDown () :Bool
    {
        return _isDown;
    }
	
	function submitDown(viewX :Float, viewY :Float, source :EventSource)
	{
		
	}
	
	function submitMove(viewX :Float, viewY :Float, source :EventSource)
	{
		
	}
	
	function submitUp(viewX :Float, viewY :Float, source :EventSource)
	{
		
	}
	
}