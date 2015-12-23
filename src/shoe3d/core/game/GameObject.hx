package shoe3d.core.game;
import shoe3d.core.game.Component;
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
	public var layer:Layer;
	public var parent:GameObject;
	
	public function new( ?name:String ) 
	{
		this.name = name;
		components = [];
		children = [];
		transform = new Object3D();
		
	}	
	
	public function add( component:Component ):GameObject
	{
		components.push( component );
		component.owner = this;
		component.onAdded();		
		return this;
	}
	
	public function has<T>( cl:Class<T> ):Bool
	{
		for ( i in components )
			if ( Std.is( i, cl ) ) return true;
		return false;
	}
	
	public function remove( component:Component ):GameObject
	{
		var i = components.indexOf( component );
		if ( i >= 0 ) {
			components.splice( i , 1 );
			component.onRemoved();
			component.owner = null;
		}		
		return this;	
	}
	
	public function get<T>( cl:Class<T> ):T
	{
		var ret:T = null;
		for ( i in components )
			if ( Std.is( i, cl) ) ret = cast i;
		return ret;
	}
	
	public function addChild( child:GameObject ) 
	{
		children.push( child );
		child.parent = this;
		child.setLayerReferenceRecursive( layer );
		
		transform.add( child.transform );
	}
	
	public function removeChild( child:GameObject ) 
	{
		children.remove( child );
		child.parent = null;
		child.setLayerReferenceRecursive( null );
		transform.remove( child.transform );
	}
	
	public function getChild( i:Int )
	{
		if ( children[i] == null ) throw 'No child at specified index i=' + i;
		return children[i];
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
	
	private function setLayerReferenceRecursive( l:Layer ) 
	{
		layer = l;
		for ( i in children )
			i.setLayerReferenceRecursive( l );
	}

	
	public var numComponents(get, null):Int;	function get_numComponents() return components.length;
	
}