package shoe3d.core.game;
#if macro
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type.ClassType;
using haxe.macro.ExprTools;
#else
import three.Euler;
import three.Object3D;
#end

import shoe3d.core.game.Component;
/**
 * ...
 * @author as
 */

//typedef Transform = Object3D;

@:allow(shoe3d)
#if debug
@:keep
#end
@:final
class GameObject implements ComponentContainer implements GameObjectContainer
{
	
	public var components(default,null):Array<Component>;
	public var children(default,null):Array<GameObject>;
	public var name:String;
	#if !macro
	public var transform(default, null):Object3D;	
	public var layer:Layer;
	#else
	public var transform:Dynamic;
	public var layer:Dynamic;
	#end
	public var parent:GameObject;
	private var _compMap:Map<String,Component>;
	
	public static function with ( comp:Component, name:String = '') {
		return new GameObject(name).add( comp );
	}
	
	
	public static function find( name:String, maxDepth:Int = -1 ) {
		//#if !macro
		if ( System.screen._currentScreen != null ) {
			for ( i in System.screen._currentScreen.layers )
			{
				var t = i.find( name, maxDepth );
				if ( t != null ) return t;
			}
		}
		
		return null;
		//#end
	}
	
	
	public function new( name:String = '' ) 
	{
		this.name = name;
		components = [];
		children = [];
		_compMap = new Map();
		#if !macro
		transform = new Object3D();
		#end
		
	}	

	public function add (component :Component) :GameObject
    {
        if (component.owner != null) {
            component.owner.remove(component);
        }

        var name = component.name;
        var prev = getComponent(name);
        if (prev != null) {
            remove(prev);
        }
		
        untyped _compMap[name] = component;

        components.push( component );

        component.owner = this;
        component.onAdded();

        return this;
    }


#if (display || dox)
    public function has<A:Component> (componentClass :Class<A>) :Bool return false;
#else
    macro public function has<A> (self :Expr, componentClass :ExprOf<Class<A>>) :ExprOf<Bool>
    {
        return macro $self.get($componentClass) != null;
    }
#end

    public function remove (component :Component) :Bool
    {
		
		var i = components.indexOf( component );
		if ( i >= 0 ) {
			components.splice( i , 1 );
			if ( component._started ) {
				component.onStop();
				component._started = false;
			}
			component.onRemoved();
			component.owner = null;
			
#if flash
                //untyped __delete__(_compMap, p.name);
#elseif js
                //untyped __js__("delete")(_compMap[p.name]);
				_compMap.remove(component.name);
#end
			
			return true;
		}		
		return false; 
    }

#if (display || dox)
	public function get<T:Component>(componentClass:Class<T>):T return null;
#else
   /* macro public function get<A:Component> (self :Expr, componentClass :ExprOf<Class<A>>) :ExprOf<A>
    {
        var type = requireComponentType(componentClass);
        var name = macro $componentClass.NAME;
        return needSafeCast(type)
            ? macro Std.instance($self.getComponent($name), $componentClass)
            : macro $self._internal_unsafeCast($self.getComponent($name), $componentClass);
    }*/
	public function get<T:Component>(componentClass:Class<T>):T {
		
		for ( tt in _compMap ) 
			if ( Std.is( tt, componentClass ) )
				return cast tt;
		return null;
	}
#end

    inline public function getComponent (name :String) :Component
    {
        return untyped _compMap[name];
    }

#if !display
    @:extern // Inline even in debug builds
    inline public function _internal_unsafeCast<A:Component> (component :Component, cl :Class<A>) :A
    {
        return cast component;
    }
 
#end

#if macro
	private static function requireComponentClass( componentClass:Expr ):ClassType
	{
		var path = getClassName(componentClass);
        if (path != null) {
            var type = Context.getType(path.join("."));
            switch (type) {
            case TInst(ref,_):
                var cl = ref.get();
                if (Context.unify(type, Context.getType("flambe.Component")) && cl.superClass != null) {
                    return cl;
                }
            default:
            }
        }

        Context.error("Expected a class that extends Component, got " + componentClass.toString(),
            componentClass.pos);
        return null;
	}
	
    private static function getClassName<A> (componentClass :Expr) :Array<String>
    {
        switch (componentClass.expr) {
        case EConst(CIdent(name)):
            return [name];
        case EField(expr, name):
            var path = getClassName(expr);
            if (path != null) {
                path.push(name);
            }
            return path;
        default:
            return null;
        }
    }
	
    private static function needSafeCast (componentClass :ClassType) :Bool
    {
        return !componentClass.superClass.t.get().meta.has(":componentBase");
    }
#end
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
	
	#if !macro
	private function setLayerReferenceRecursive( l:Layer ) 
	#else	
	private function setLayerReferenceRecursive( l:Dynamic ) 
	#end
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