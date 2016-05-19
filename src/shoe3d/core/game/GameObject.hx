package shoe3d.core.game;
import shoe3d.core.game.Component;
import three.Euler;
import three.Object3D;

/**
 * ...
 * @author as
 */
@:final
@:allow(shoe3d)

//typedef Transform = Object3D;

@:access(shoe3d)
@:keep
@:final
class GameObject implements ComponentContainer implements GameObjectContainer
{
	public var components(default,null):Array<Component>;
	public var children(default,null):Array<GameObject>;
	public var transform(default, null):Object3D;
	public var name:String;
	public var layer:Layer;
	public var parent:GameObject;
	
	public static function with ( comp:Component, name:String = '') {
		return new GameObject(name).add( comp );
	}
	
	public static function find( name:String, maxDepth:Int = -1 ) {
		if ( System.screen._currentScreen != null ) {
			for ( i in System.screen._currentScreen.layers )
			{
				var t = i.find( name, maxDepth );
				if ( t != null ) return t;
			}
		}
		
		return null;
	}
	
	public function new( name:String = '' ) 
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
	
	public function setPos( x:Float, y:Float, z:Float ) 
	{
		transform.position.set(x, y, z);
		return this;
	}
	
	public function setX( x:Float )
	{
		transform.position.x = x;
		return this;
	}
	
	public function setY( y:Float )
	{
		transform.position.y = y;
		return this;
	}
	
	public function setZ( x:Float )
	{
		transform.position.z = x;
		return this;
	}
	
	public function setScale( x:Float = 1 )
	{
		transform.scale.set(x, x, x);
		return this;
	}
	
	public function setScaleXYZ( x:Float = 1, y:Float = 1, z:Float = 1 )
	{
		transform.scale.set(x, y, z);
		return this;
	}	

	public function setRotation( x:Float = 0, y:Float = 0, z:Float = 0 )
	{
		transform.setRotationFromEuler( new Euler( x, y, z ) );
		return this;
	}
	
	public function rotateX( a:Float )
	{
		transform.rotateX( a );
		return this;
	}
	
	public function rotateY( a:Float )
	{
		transform.rotateY( a );
		return this;
	}
	
	public function rotateZ( a:Float )
	{
		transform.rotateZ( a );
		return this;
	}
	
	public var numComponents(get, null):Int;	function get_numComponents() return components.length;
	
}