package shoe3d.component.script.action;
import motion.Actuate;
import motion.actuators.GenericActuator.IGenericActuator;
import motion.easing.Cubic;
import motion.easing.IEasing;
import motion.easing.Linear;
import motion.easing.Quad;

/**
 * ...
 * @author as
 */
class ActuateAction implements Action
{

	var _obj:Dynamic;
	var _dur:Dynamic;
	var _par:Dynamic;
	var _complete:Bool = false;
	var _ease:IEasing = Cubic.easeOut;
	public function new( obj:Dynamic, duration:Float, params:Dynamic ) 
	{
		_obj = obj;
		_dur = duration;
		_par = params;
	}
	
	public function ease( easing:IEasing)
	{
		_ease = easing;
		return this;
	}
	
	public function start():Void
	{
		_complete = false;
		Actuate.tween( _obj, _dur, _par ).onComplete( complete ).ease( _ease );
	}
	
	function complete()
	{
		_complete = true;
	}
	
	public function update( dt:Float ):Bool
	{ 
		return _complete;
	}
	
}