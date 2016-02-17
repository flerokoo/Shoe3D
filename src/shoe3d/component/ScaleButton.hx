package shoe3d.component;
import js.html.Element;
import motion.Actuate;
import motion.easing.Quad;
import shoe3d.core.game.Component;
import shoe3d.core.input.PointerEvent;
import shoe3d.util.SMath;

/**
 * ...
 * @author as
 */
class ScaleButton extends Component
{
	
	var target:Element2D;
	var startScale = 0;
	var activeStateScale = 0.9;
	var isDown = false;
	var fn:PointerEvent->Void = null;
	var targetScale = 1.0;
	public var active:Bool = true;
	
	public function new( ?fn:PointerEvent->Void, activeStateScale = 0.9 ) 
	{
		super();
		this.activeStateScale = activeStateScale;	
		this.fn = fn;	
	}
	
	override public function onAdded()
	{
		target = owner.get(Element2D);
		target.pointerDown.connect( down );
		target.pointerUp.connect( up );
		target.pointerOut.connect( out );
	}
	
	function down( e:PointerEvent ) 
	{
		isDown = true;
		targetScale = activeStateScale;
		//Actuate.tween( owner.transform.scale, 0.18, { x: activeStateScale, y:activeStateScale } ).ease( Quad.easeOut );	
	}
	
	override public function onUpdate() 
	{
		if ( owner.transform.scale.x != targetScale )
			owner.transform.scale.x = owner.transform.scale.y = SMath.lerp( 0.3, owner.transform.scale.x, targetScale );
	}
	
	function up( e:PointerEvent )
	{
		if ( isDown ) 
		{
			isDown = false;
			if ( fn != null) fn(e);
			//Actuate.tween( owner.transform.scale, 0.18, { x: 1, y:1 } ).ease( Quad.easeOut );
			targetScale = 1;
		}
	}
	
	function out( e:PointerEvent )
	{
		if ( isDown ) 
		{
			//Actuate.tween( owner.transform.scale, 0.18, { x: 1, y:1 } ).ease( Quad.easeOut );
			targetScale = 1;
		}
	}
	
	override public function onRemoved()
	{
		
	}
	
}