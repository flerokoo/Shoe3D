package shoe3d.core.input;
import shoe3d.component.Element2D;

/**
 * ...
 * @author as
 */
class PointerEvent
{
	public var viewX (default, null) :Float = 0;
    public var viewY (default, null) :Float = 0;
    public var hit (default, null) :Element2D = null;
    public var source (default, null) :EventSource = null;	
    public var id (default, null) :Int = 0;
	@:allow(shoe3d) var _stopped :Bool;
	
    @:allow(shoe3d) function new ()
    {
    }
	
	@:allow(shoe3d) function set (id :Int, viewX :Float, viewY :Float, hit :Element2D, source :EventSource)
    {
        this.id = id;
        this.viewX = viewX;
        this.viewY = viewY;
        this.hit = hit;
        this.source = source;
        _stopped = false;
    }
	
	inline public function stopPropagation ()
    {
        _stopped = true;
    }
	
	
	
}