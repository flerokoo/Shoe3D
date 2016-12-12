package shoe3d.component.particle;
import haxe.Json;
import shoe3d.asset.AssetPack;
import shoe3d.asset.Res;
import shoe3d.core.game.Component;
import shoe3d.core.Time;
import shoe3d.util.Assert;
import shoe3d.util.Log;
import spe.Emitter;
import spe.EmitterParameters;
import spe.Group;
import spe.GroupParameters;
import three.Color;
import three.Euler;
import three.Vector2;
import three.Vector3;

/**
 * ...
 * @author as
 */
class ParticleSystem extends Component
{
	static var _scratch:Vector3 = new Vector3();
	
	public var group(default, null):Group;
	public var emitters(default, null):Map<String, Emitter>;
	public var startData(default, null):Map<String, {v:Vector3, p:Vector3}>;
	public var rememberStartPositionsAndVelocities:Bool = false;
	
	public function new( groupParams:GroupParameters, rememberStartPositionsAndVelocities:Bool = false ) 
	{
		super();
		
		// fix scale for mobile
		if ( groupParams.scale != null )
			groupParams.scale *= js.Browser.window.devicePixelRatio;
		else
			groupParams.scale = 300 * js.Browser.window.devicePixelRatio;
		
		
		group = new Group( groupParams );
		emitters = new Map();
		
		
		this.rememberStartPositionsAndVelocities = rememberStartPositionsAndVelocities;
		if ( rememberStartPositionsAndVelocities ) {
			startData = new Map();
		}		
		group.mesh.frustumCulled = false;			

	}
	
	public function addEmitter( name:String, emitter:Emitter ):ParticleSystem
	{
		Assert.that( emitter != null );
		emitters[name] = emitter;
		group.addEmitter( emitter );
		if ( startData != null ) 
			startData.set( name, {
				p:  untyped emitter.position.value.clone(),
				v:  untyped emitter.velocity.value.clone()
			});
		return this;
	}
	
	public function getEmitter( name:String ):Emitter 
	{
		Assert.that(emitters.exists(name));
		return emitters[name];
	}
	
	public static function fromJSON( json:String, rememberStartPositionsAndVelocities:Bool = false ):ParticleSystem
	{
		var out = null;		
		try {			
			out = Json.parse( json );
		} catch (e:Dynamic) {
			throw e;
		}
		
		out.group.texture.value = Res.getTexDef( out.meta.assetName ).texture;
		
		var createRealVectorsAndColors = null;
		createRealVectorsAndColors = function( o:Dynamic ) 
		{
			for ( i in Reflect.fields( o ) ) 
			{
				var fields = Reflect.fields( Reflect.field(o, i) );
				if ( fields.length == 3 ) 
				{
					if ( fields.indexOf("x") > -1 && fields.indexOf("y") > -1 )
						if( fields.indexOf("z") > -1 )
							Reflect.setField( o, i, new Vector3(
								Reflect.field( Reflect.field( o, i ), "x" ), 
								Reflect.field( Reflect.field( o, i ), "y" ), 
								Reflect.field( Reflect.field( o, i ), "z" )
								));
						else
							Reflect.setField( o, i, new Vector2(
								Reflect.field( Reflect.field( o, i ), "x" ), 
								Reflect.field( Reflect.field( o, i ), "y" )
								));
								
					if ( fields.indexOf("r") > -1 && fields.indexOf("g") > -1 && fields.indexOf("b") > -1 ) 
						Reflect.setField( o, i, new Color(
							Reflect.field( Reflect.field(o, i), "r" ),
							Reflect.field( Reflect.field(o, i), "g" ),
							Reflect.field( Reflect.field(o, i), "b" )
							));
						
				}
				else if ( fields.length > 0 && i.length > 1 && i != "texture" )
				{
					createRealVectorsAndColors( Reflect.field( o, i ) );
				}
			}
		}	
		
		
		createRealVectorsAndColors( out.group );
		createRealVectorsAndColors( out.emitters );
			
		var ps = new ParticleSystem( out.group, rememberStartPositionsAndVelocities );
		
		for ( i in Reflect.fields(out.emitters) ) {
			var em = new Emitter( Reflect.field( out.emitters, i ) );
			ps.addEmitter( i, em );
		}
			
		return ps;
	}
	
	public static function fromPack( pack:AssetPack, filename:String, rememberStartPositionsAndVelocities:Bool = false ):ParticleSystem 
	{
		return ParticleSystem.fromJSON( pack.getFile( filename ).content, rememberStartPositionsAndVelocities );
	}
	
	override public function onAdded() 
	{
		owner.transform.add( group.mesh );
	}
	
	override public function onRemoved() 
	{
		owner.transform.remove( group.mesh );
	}
	
	override public function onUpdate() 
	{
		group.tick( Time.dt );
	}
	
	public function setOffset( offset:Vector3 ) 
	{
		if ( startData == null ) throw 'Cant offset emitters without start positions';
		
		for ( i in emitters.keys() ) {
			var dat = startData[i];
			var em = emitters[i];
			em.position.value.x = dat.p.x + offset.x;
			em.position.value.y = dat.p.y + offset.y;
			em.position.value.z = dat.p.z + offset.z;
			em.position.value = em.position.value;		
		}
		return this;
	}
	
	public function setRotationFromEuler( e:Euler ) 
	{
		if ( startData == null ) throw 'Cant offset emitters without start positions';
		
		for ( i in emitters.keys() ) {
			var dat = startData[i];
			var em = emitters[i];
			( untyped _scratch.copy(dat.v) ).applyEuler( e );
			em.velocity.value.x = _scratch.x;
			em.velocity.value.y = _scratch.y;
			em.velocity.value.z = _scratch.z;
			em.velocity.value = em.velocity.value;		
		}
		return this;
	}
	
	
	override public function dispose() 
	{
		super.dispose();
		group.dispose();
	}
}