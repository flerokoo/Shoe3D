package shoe3d.component.script.action;
import shoe3d.core.Time;

/**
 * ...
 * @author as
 */
class Delay implements Action
{

	var _delay:Float = 0.0;
	var _cur:Float = 0;
	
	public function new( delay:Float ) 
	{
		_delay = delay;
	}
	
	public function start()
	{
		_cur = _delay;
	}
	
	public function update(dt:Float )
	{
		_cur -= dt;
		return _cur <= 0;		
	}
	
}