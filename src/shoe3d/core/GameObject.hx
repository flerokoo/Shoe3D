package shoe3d.core;
import three.Object3D;

/**
 * ...
 * @author as
 */
@:final
@:allow(shoe3d)
class GameObject implements ComponentContainer
{
	public var components(default,null):Array<Component>;
	public var children(default,null):Array<GameObject>;
	public var transform(default, null):Object3D;
	public var name:String;
	
	public function new( ?name:String ) 
	{
		this.name = name;
		components = [];
		children = [];
		transform = new Object3D();
		
	}	
	
	public function addComponent( component:Component ):GameObject
	{
		components.push( component );
		component.owner = this;
		component.onAdded();		
		return this;
	}
	
	public function hasComponent<T>( cl:Class<T> ):Bool
	{
		for ( i in components )
			if ( Std.is( i, cl ) ) return true;
		return false;
	}
	
	public function removeComponent( component:Component ):GameObject
	{
		var i = components.indexOf( component );
		if ( i >= 0 ) {
			components.splice( i , 1 );
			component.onRemoved();
		}		
		return this;	
	}
	
	public function addChild( child:GameObject ) 
	{
		children.push( child );
		transform.add( child.transform );
	}
	
	public function removeChild( child:GameObject ) 
	{
		children.remove( child );
		transform.remove( child.transform );
	}
	
	private function onAdded() 
	{
		// TODO Make onAddedToStage()
		//for ( i in components ) i.onAdded();
		//for ( i in _children ) i.onAdded();
	}
	
	private function onRemoved() 
	{
		//for ( i in components ) i.onRemoved();
		//for ( i in _children ) i.onRemoved();
	}
	
	
	
	public var numComponents(get, null):Int;	function get_numComponents() return components.length;
	
}