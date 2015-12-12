package shoe3d.util;

/**
 * ...
 * @author as
 */
class ZeroSignal extends Signal
{

	public function new() 
	{
		super();
	}
	
	public function connect( highPriority:Bool = false )
	{
		return connectInner( null, highPriority );
	}
	
	public function emit(  )
	{
		if ( isDispatching() )
			throw 'Can\'t emit when dispatching';
			
		var last = _head;
		while ( last != null )
		{
			last._fn( );
			if ( last.isOnce ) last.dispose();
			last = last._next;
		}
	}
	
}