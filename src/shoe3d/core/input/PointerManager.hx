package shoe3d.core.input;
import shoe3d.component.Element2D;
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
		if ( _isDown ) return;
		
		var hit:Element2D = null;
		
		submitMove( viewX, viewY, source );
		_isDown = true;
		
		
		//
		prepare(viewX, viewY, hit, source);
		
		down.emit( _sharedEvent );
	}
	
	function submitMove(viewX :Float, viewY :Float, source :EventSource)
	{
		if (viewX == _x && viewY == _y) return;
		
		var hit:Element2D = null;
		
		prepare(viewX, viewY, hit, source);
		
		move.emit( _sharedEvent );
	}
	
	function submitUp(viewX :Float, viewY :Float, source :EventSource)
	{
		if ( _isDown ) return;
		
		var hit:Element2D = null;
		
		submitMove( viewX, viewY, source );
		_isDown = false;
		
		prepare(viewX, viewY, hit, source);
		up.emit(_sharedEvent);
	}
	
    private function prepare (viewX :Float, viewY :Float, hit :Element2D, source :EventSource)
    {
        _x = viewX;
        _y = viewY;
        _sharedEvent.set(_sharedEvent.id+1, viewX, viewY, hit, source);
    }
	
}