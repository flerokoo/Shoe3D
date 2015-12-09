package shoe3d.core;

/**
 * ...
 * @author as
 */
@:final
@:allow(shoe3d)
class GameObject
{
	public var parent(default, null):GameObject;
	public var transform(default, null):Transform;
	public var firstChild(default, null):GameObject;
	public var firstComponent(default, null):Component;
	

	private var _next:GameObject;
	
	public function new() 
	{
		transform = new Transform();
	}
	
	private function update() 
	{
		
	}
	
	public function addChild( child:GameObject ):GameObject
	{
		var k:shoe3d.core.GameObject = null;
		if ( firstChild != null ) 
		{
			k = firstChild;
			while ( k._next != null )
				k = k._next;
			k._next = child;
		} 
		else 
		firstChild = child;	
		child.setParent( this );
		
		return this;
	}
	
	public function removeChild( child:GameObject ):GameObject 
	{
		if ( child == firstChild ) 
			firstChild = firstChild._next
		else {
			var k = firstChild._next;
			var p = firstChild;
			
			while ( k != child ) 
			{
				p = k;
				k = k._next;
			}
			
			p._next = k._next;				
		}
		
		child.parent = null;
		
		return this;		
	}
	
	public function add( component:Component ):GameObject
	{
		if ( firstComponent != null ) 
		{
			var k = firstComponent;
			while ( k._next != null )
				k = k._next;
			k._next = component;
		} 
		else 
		firstComponent = component;	
		
		component.owner = this;
		
		return this;
	}
	
	public function has<T>( cl:Class<T> ):Bool
	{
		var k = firstComponent;
		
		while ( k != null ) {
			if ( Std.is(k, cl) ) return true;
			k = k._next;
		}
		
		return false;
	}
	
	public function remove( component:Component ):GameObject
	{
		if ( component == firstComponent ) 
			firstComponent = firstComponent._next
		else {
			var k = firstComponent._next;
			var p = firstComponent;
			
			while ( k != component ) 
			{
				p = k;
				k = k._next;
			}
			
			p._next = k._next;				
		}
		
		component.owner = null;
		component.onRemoved();
		
		return this;	
	}
	
	
	
	public function setParent( go:GameObject, append:Bool = true ):GameObject {
		if ( go != null )
			go.addChild( this )
		else if ( this.parent != null ) 
			this.parent.removeChild( this );
			
		return this;
	}
	
	
	public var numChildren(get, null):Int;
	function get_numChildren() return { var n = 0; var k = firstChild; while ( k != null ) { n++; k = k._next; }; return n; }
	
}