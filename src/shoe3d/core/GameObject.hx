package shoe3d.core;
import three.Object3D;

/**
 * ...
 * @author as
 */
@:final
@:allow(shoe3d)
class GameObject extends Object3D implements GameObjectContainer
{
	public var components:Array<Component>;
	public var gameObjectList:Array<Object3D>;
	
	public function new( ?name:String ) 
	{
		super();
		this.name = name;
		components = [];
		
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