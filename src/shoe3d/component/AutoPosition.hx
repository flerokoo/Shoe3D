package shoe3d.component;
import shoe3d.core.game.Component;
import shoe3d.util.signal.Sentinel;
import shoe3d.util.SMath;
import three.Vector3;

/**
 * ...
 * @author as
 */
class AutoPosition extends Component
{
	var conn:Sentinel;
	
	public var posX:Float = 0.5;
	public var posY:Float = 0.5;
	public var xOffset:Float = 0;
	public var yOffset:Float = 0;
	public var scaleXRatio:Float = 1;
	public var scaleYRatio:Float = 1;
	public var scaleOffsetXRatio:Float = 1;
	public var scaleOffsetYRatio:Float = 1;
	
	public function new( posX:Float = 0, posY:Float = 0 ) 
	{
		super();
		this.posX = posX;
		this.posY = posY;
	}
	
	override public function onStart() 
	{
		super.onAdded();
		conn = System.window.resize.connect( reoverlay );
		reoverlay();
	}
	
	override public function onRemoved() 
	{
		super.onRemoved();
		if ( conn != null ) conn.dispose();
	}
	
	public function reoverlay():AutoPosition
	{
		if ( owner == null ) return this;	
		if ( owner.parent == null && owner.layer == null ) return this;
		
		var base = owner.parent != null ? owner.parent.transform : owner.layer.scene;
		
		if( base != null ) {			
			var targetPos = base.worldToLocal( new Vector3(
				System.window.width * posX + SMath.lerp( scaleOffsetXRatio, xOffset, xOffset * System.screen.scale),
				System.window.height * posY + SMath.lerp( scaleOffsetYRatio, yOffset, yOffset * System.screen.scale),
				0
			) );
			
			if ( owner.name == 'closeButton') {
				trace( targetPos );
			}
			
			owner.transform.position.x = targetPos.x;
			owner.transform.position.y = targetPos.y;
			
		}
		
		
		owner.transform.scale.set( 
			SMath.lerp( scaleXRatio, 1, System.screen.scale ),
			SMath.lerp( scaleYRatio, 1, System.screen.scale ),
			1
			);
			
		return this;
	}
	
	public function setScaleRatio( x:Float, y:Float )
	{
		scaleXRatio = x;
		scaleYRatio = y;
		reoverlay();
		return this;
	}
	
	public function setOffsetScaleRatio( x:Float, y:Float ) 
	{
		scaleOffsetXRatio = x;
		scaleOffsetYRatio = y;
		reoverlay();
		return this;
	}
	
	public function setOffsets(x:Float, y:Float )
	{
		xOffset = x;
		yOffset = y;
		reoverlay();
		return this;
	}
	
	
	public function left()
	{
		posX = 0;
		reoverlay();
		return this;
	}
	
	public function right()
	{
		posX = 1;
		reoverlay();
		return this;
	}
	
	public function top()
	{
		posY = 1;
		reoverlay();
		return this;
	}
	
	public function bottom()
	{
		posY = 0;
		reoverlay();
		return this;
	}
	
	public function centerX()
	{
		posX = 0.5;
		reoverlay();
		return this;
	}
	
	public function centerY()
	{
		posY = 0.5;
		reoverlay();
		return this;
	}
	
	public function setAsOnScreenContainer()
	{
		setPos( 0, 0 );
		setScaleRatio( 0, 0 );
		return this;
	}
	
	public function setPos( posX:Float, posY:Float, xOffset:Float = 0, yOffset:Float = 0 )
	{
		this.posX = posX;
		this.posY = posY;
		this.xOffset = xOffset;
		this.yOffset = yOffset;
		reoverlay();
		return this;
	}
	
	public static function container()
	{
		return new AutoPosition().setAsOnScreenContainer();
	}
	
}

enum Position
{
	Left;
	Right;
	Top;
	Bottom;
	Center;
}