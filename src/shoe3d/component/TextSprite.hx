package shoe3d.component;
import com.Main;
import js.Browser;
import js.html.Float32Array;
import js.html.svg.Color;
import shoe3d.asset.Font;
import shoe3d.component.Element2D;
import shoe3d.util.Log;
import shoe3d.util.math.Rectangle;
import shoe3d.util.SMath;
import three.Face3;
import three.Geometry;
import three.ImmediateRenderObject;
import three.Mesh;
import three.MeshBasicMaterial;
import three.RawShaderMaterial;
import three.Side;
import three.Vector2;
import three.Vector3;

using StringTools;
/**
 * ...
 * @author as
 */

private typedef Pair = { mesh:Mesh, mat:MeshBasicMaterial, num:Int };
private typedef Line = { width:Float, text:String, num:Int }; 

class TextSprite extends Element2D
{

	var _font:Font;
	var _pairs:Array<Pair>;
	var _text:String;
	var _align:TextAlign;
	var _glyphs:Array<Glyph>;
	var _lines:Array<Line>;
	
	var _textDirty:Bool;
	var _layoutDirty:Bool;
	var _lineSpacing:Float;
	var _letterSpacing:Float;
	var _wrapWidth:Float;
	var _bounds:Rectangle;
	
	public var align(get, set):TextAlign;
	public var text(get, set):String;
	public var wrapWidth(get, set):Float;


	
	
	public function new( font:Font, ?text:String ) {
		super();
		this.text = text;
		
		_font = font;
		_pairs = [];
		_align = Left;
		_lineSpacing = 0;
		_letterSpacing = 0;
		_wrapWidth = 0;		
		_textDirty = _layoutDirty = true;
	}
	
	var ir:ImmediateRenderObject;	
	public function updateText() {
		_glyphs = [];		
		var line:Line = { width: 0, text: '', num: 0 };
		_lines = [line];
		var len = text.length;
		for ( gi in 0...len ) {
			var glyph = _font.getGlyph( _text.fastCodeAt(gi) );
			
			
			
			if ( glyph != null ) {
				if ( glyph.charCode == '\n'.fastCodeAt(0) ) {
					line = { width: 0, text: '', num: 0 };
					_lines.push( line );
					continue;
				}
				_glyphs.push(glyph);
				line.width += glyph.xAdvance + _letterSpacing;
				line.text += glyph.char;
				if ( gi + 1 < len ) {
					var nextgl = _font.getGlyph( _text.fastCodeAt(gi + 1) );
					if( nextgl != null )
						line.width += glyph.getKerning( nextgl.charCode );					
				}
			} else {
				Log.warn('No character in font: ${_text.charCodeAt(gi)}' );
			}				
		}
		Log.log( _lines );
		// EXP START
		// extract required glyphs and calculating lines
		/*var len = _text.length, gi = 0;
		var line:Line = null;
		var newline = _font.getGlyph("\n".fastCodeAt(0));
		var lastSpaceIndex = -1;
		var widthSinceLastSpace:Float = 0;
		while(gi < len) {
			var glyph = _font.getGlyph( _text.fastCodeAt(gi) );
			if ( glyph != null ) {
				// wrap line if needed
				if( line != null ) trace(glyph.char, line.width, _wrapWidth);
				
				if ( line == null || (_wrapWidth > 0 && line.width > _wrapWidth) || glyph == newline ) {	
					trace("WRAP");
					if ( glyph.char == ' ') lastSpaceIndex = gi;
					if ( lastSpaceIndex > -1 ) {
						_glyphs[lastSpaceIndex] = newline;
						line.width -= widthSinceLastSpace;
						gi = lastSpaceIndex;
					} else if( line != null ) {
						_glyphs.insert( gi, newline );
					}
					line = { width: 0, text: '', num: 0 };
					_lines.push( line ); 
					lastSpaceIndex = -1;
					widthSinceLastSpace = 0;
				}
				
				if ( glyph.charCode == ' '.fastCodeAt(0) ) {
					lastSpaceIndex = gi;
					widthSinceLastSpace = 0;
				} else {
					widthSinceLastSpace += glyph.xAdvance;
				}
				line.width += glyph.xAdvance;
				line.text += glyph.char;
				//TODO add kerning
				_glyphs.push(glyph);
				
			} else {
				Log.warn('No character in font: ${_text.charCodeAt(gi)}' );
			}
			gi++;
		}
		Log.log( _lines );
		var kkk = 0;
		for ( i in _lines ) {
			var str = '';
			for ( t in 0...i.text.length ) {
				str += _glyphs[kkk].char;
				kkk++;
			}
			
			Log.log(str.replace('\n', '—') );
		}*/
		
	/*	var b = "precision mediump float;\nprecision mediump int;\n";		
		var mat = new RawShaderMaterial( {
			uniforms: {
				map: {
					type: "t",
					value: _glyphs[0].page.texture
				}
			},
			//attributes: {},
			vertexShader: b + "	uniform mat4 modelViewMatrix;	uniform mat4 projectionMatrix;	attribute vec2 position;	attribute vec4 color;	attribute vec2 uv;	varying vec4 vColor;	varying vec2 vUv;	void main() {		vColor = color;		vUv = uv;		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);	}",
			fragmentShader: b + "	varying vec4 vColor; varying vec2 vUv; uniform sampler2D map;		void main() {		gl_FragColor = vColor * texture2D(map, vUv);	}",
			depthTest: false,
			depthWrite: false,
			transparent: true,
			side : Side.DoubleSide
		});
		
		ir = new ImmediateRenderObject();
		ir.material = mat;
		ir.render = function(callback) {
			ir.positionArray = new Float32Array( [ 
				-100, -100, 0, 
				0, 100, 0, 
				100, 100, 100 
				] );
			ir.uvArray = new Float32Array( [ 
				0, 0, 0, 
				0, 1, 0, 
				1, 1, 1 
				] );
			untyped ir.hasPositions = true;
			untyped ir.hasUvs = true;
			untyped ir.count = 1;
			callback(ir);
		}
		untyped mat.map = Main.pack.getTexDef("texture_street_1" ).texture;*/
		
		
		// EXP END
		// create mesh-material pairs (+vertices, uvs, faces)
		var lastPairIndex:Int = 0;
		var pair:Pair = null;
		var lastUUID:String = null;
		var vi = 0;
		for ( gi in 0..._glyphs.length ) {
			var gl = _glyphs[gi];
			// do not include whitespace in meshes
			if ( gl.width <= 0) continue;
			
			//select next pair(mesh-material) in array or create new 
			if ( lastUUID == null || lastUUID != gl.page.texture.uuid ) {
				

				if ( lastPairIndex >= _pairs.length ) {
					var mat = new MeshBasicMaterial( { map: gl.page.texture, transparent: true, side: Side.DoubleSide, wireframe: false  } );
					pair = { 
						mesh: new Mesh(new Geometry(), mat ), 
						mat: mat,
						num: 0
						};
					pair.mesh.name = "PAIR" + lastPairIndex;
					if ( owner != null ) {
						owner.transform.add( pair.mesh );
					}
					_pairs.push( pair );
					lastPairIndex ++; //for removing extra meshes after this loop
				} else {
					pair = _pairs[lastPairIndex++];
					pair.mat.map = gl.page.texture;
				}
				pair.num = 0;
				var geom = pair.mesh.geometry;
				geom.vertices = [];
				geom.faceVertexUvs = [[]];
				geom.faces = [];
				lastUUID = gl.page.texture.uuid;
				geom.verticesNeedUpdate = geom.uvsNeedUpdate = true;
				vi = 0;
			}
				
			var geom = pair.mesh.geometry;
			
			// create vertices, faces and uvs
			// face scheme
			//  |0 1|
			//	| / |
			//  |2 3|
			//	
			//  |i   i+1|
			//	|   /   |
			//  |i+2 i+3|		
			// faces 0-1-2 1-3-2			
			
			// 4 new vertices
			for ( i in 0...4 ) geom.vertices.push( new Vector3() );
			
			// create two faces according to the scheme
			geom.faces.push( new Face3(4*vi, 4*vi + 1, 4*vi + 2, new Vector3(0, 0, 1)) );
			geom.faces.push( new Face3(4*vi + 1, 4*vi + 3, 4*vi + 2, new Vector3(0, 0, 1)));
			
			// push two uv sets for two faces
			var guv = _glyphs[gi].uv;
			geom.faceVertexUvs[0].push([
						new Vector2(guv.umin, guv.vmin),
						new Vector2(guv.umax, guv.vmin),
						new Vector2(guv.umin, guv.vmax)
					]);
			geom.faceVertexUvs[0].push([
						new Vector2(guv.umax, guv.vmin),
						new Vector2(guv.umax, guv.vmax),
						new Vector2(guv.umin, guv.vmax)
					]);
			
			
			pair.num ++;
			vi++;
		}
		
		
		
		// remove extra meshes
		if( owner != null ) {
			lastPairIndex++;
			for ( i in lastPairIndex..._pairs.length )
				owner.transform.remove( _pairs[i].mesh );
		}		
		
		_textDirty = false;
		_layoutDirty = true;
		
	}
	
	public function updateLayout() {
		/*var l = 0;
		var gi = 0;
		for ( pair in _pairs ) {
			var geom = pair.mesh.geometry;
			
			for ( n in 0...pair.num ) {
				var gl = _glyphs[gi];
				
				//trace( "------" + String.fromCharCode( gl.charCode ) + " " + gl.charCode );
				//trace( gl.y );
				//trace( gl.yOffset );
				
				geom.vertices[4*n].set( l, gl.height , 0 );
				geom.vertices[4*n + 1].set( l + gl.width, gl.height, 0 );
				geom.vertices[4*n + 2].set( l, 0, 0 );
				geom.vertices[4*n + 3].set( l + gl.width, 0, 0 );
				l += gl.width + gl.getKerning( _glyphs[gi+1] != null? _glyphs[gi+1].charCode : 0 ) + 5;
				gi++;
			}
			geom.verticesNeedUpdate = true;
			
		}*/
		
		/*_bounds = new Rectangle();
		var lines:Array<Line> = [];
		var curLine:Line = null;
		var glyphIndex = 0;
		var newline = _font.getGlyph("\n".fastCodeAt(0));
		var lastSpaceIndex = -1;
		for ( pair in _pairs ) {
			var geom = pair.mesh.geometry;
			geom.verticesNeedUpdate = true;
			var nn = 0, n = 0;
			while ( n < nn ) {
				var glyph = _glyphs[glyphIndex];
				if ( curLine == null || glyph == newline || (_wrapWidth > 0 && curLine.width > _wrapWidth) ) {
					curLine = { width: 0 };
					lines.push( curLine );
					if ( lastSpaceIndex > 0 ) {
						_glyphs[lastSpaceIndex] = newline;
						glyphIndex = lastSpaceIndex;
					} else {
						_glyphs.insert( );
					}
					lastSpaceIndex = -1;
				} else {
					
				}
				glyphIndex ++;
				n ++;
			}
		}*/
		
		/*var lines:Array<Line> = [];
		var curLine:Line = null;
		var newline = _font.getGlyph("\n".fastCodeAt(0));
		var lastSpaceIndex = -1;
		var curPairIndex = 0;
		var curPair:Pair = _pairs[0];
		var curPairUntil = _pairs[0].num;
		var nn = _glyphs.length;
		var n = 0;
		
		while ( n < nn ) {
			
			var g = _glyphs[n];
			
			if ( n == curPairUntil - 1 ) {
				//switch to next mesh 
				curPairIndex++;
				curPair = _pairs[curPairIndex];
				curPairUntil += curPair.num;
			}
			
			if ( curLine == null || g == newline || (_wrapWidth > 0 && curLine.width >= _wrapWidth) ) {
				curLine = { width: 0, height: 0, y: curLine != null ? curLine.y + curLine.height : 0};
				lines.push( curLine );
				if ( lastSpaceIndex > -1 ) {
					_glyphs[lastSpaceIndex] = newline;
					n = lastSpaceIndex;
					//find mesh corresponding to new n
					var newn = 0; // temp n
					var curi = 0; // cur pair index
					while ( newn + _pairs[curi].num < n) {
						newn += _pairs[curi].num;
						curi++;
					}
					curPairIndex = curi;
					curPair = _pairs[curPairIndex];
					curPairUntil = newn + curPair.num;
				} else {
					_glyphs.insert( n, newline );
				}				
				lastSpaceIndex = -1;
			} else {
				if ( g.charCode == " ".fastCodeAt(0) ) {
					lastSpaceIndex = n;
				}
				curLine.width += g.xAdvance + _letterSpacing;
				curLine.height = Math.max( curLine.height, g.height + g.yOffset );
				if ( n + 1 < nn ) {
					var ng = _glyphs[n + 1];
					curLine.width += g.getKerning( ng.charCode );
				}
			}
						
			n++;
		}
		
		var lineIndex = 0;
		var lastY = 0;
		var lineOffset = _lineSpacing + _font.lineHeight;
		curLine = lines[0];
		n = 0;
		while ( n < nn ) {
			var g = _glyphs[n];
			if ( g.charCode == newline.charCode ) {
				lastY += lineOffset;
				lineIndex ++;
				curLine = lines[lineIndex];
			}
		}*/
		
		/*var lastX = 0.0;
		var line = 0;
		var gi = 0;
		for ( pair in _pairs ) {
			var geom = pair.mesh.geometry;
			
			for ( n in 0...pair.num ) {
				var gl = _glyphs[gi];
				
				//trace( "------" + String.fromCharCode( gl.charCode ) + " " + gl.charCode );
				//trace( gl.y );
				//trace( gl.yOffset );
				
				if ( gl.char == '\n' ) {
					line++;
					lastX = 0;
				}
				
				var rx = lastX + 
				
				geom.vertices[4*n].set( l, gl.height , 0 );
				geom.vertices[4*n + 1].set( l + gl.width, gl.height, 0 );
				geom.vertices[4*n + 2].set( l, 0, 0 );
				geom.vertices[4*n + 3].set( l + gl.width, 0, 0 );
				l += gl.width + gl.getKerning( _glyphs[gi+1] != null? _glyphs[gi+1].charCode : 0 ) + 5;
				gi++;
			}
			geom.verticesNeedUpdate = true;
			
		}*/
		
		if ( _pairs == null || _pairs.length <= 0 ) return;
		
		var gi = 0;
		var linei= 0;
		var pairi = 0;
		var pair:Pair = _pairs[pairi];
		var pairn = pair.num;
		var vi = 0;
		var lastX = 0.0;
		var len = _text.length;
		var newline = _font.getGlyph( '\n'.fastCodeAt(0) );
		var geom:Geometry = pair.mesh.geometry;
		for ( line in _lines ) {
			
			
			for ( i in 0...line.text.length ) {
				if ( _glyphs[gi] == newline || _glyphs[gi].width <= 0 ) {
					gi++;
					continue;
				}
				
				var gl = _glyphs[gi];
				
				if ( pairn == 0 ) {
					
					for ( i in geom.vertices )
						if ( i ==  untyped __js__("undefined") )
							throw "BAD";
					trace(geom.vertices.length);
					pairi++;
					pair = _pairs[pairi];
					pairn = pair.num ;
					vi = 0;
					geom = pair.mesh.geometry;
					geom.verticesNeedUpdate = true;
				}
				
							
				var yy = linei * (_lineSpacing + _font.lineHeight ) + gl.yOffset;
				var xx = lastX + gl.xOffset;
				
				trace( vi + "/" + geom.vertices.length/4, _glyphs[gi].char, "lastx" + lastX, "line" + linei, gl.width + 'x' + gl.height );
				
				
				geom.vertices[4*vi].set( xx, gl.height + yy , 0 );
				geom.vertices[4*vi + 1].set( xx + gl.width, gl.height + yy, 0 );
				geom.vertices[4*vi + 2].set( xx, yy, 0 );
				geom.vertices[4*vi + 3].set( xx + gl.width, yy, 0 );
				
				lastX += gl.xAdvance + _letterSpacing;
				if ( gi + 1 < len ) {
					var nextgl = _font.getGlyph( _text.fastCodeAt(gi + 1) );
					if( nextgl != null )
						lastX += gl.getKerning( nextgl.charCode );					
				}
				vi++;
				gi++;
				pairn--;
			}
			linei++;
			lastX = 0;
			
			
		}
		
		_layoutDirty = false;
	}
	
	public function setText( text:String ) {
		this.text = text;
		return this;
	}
	
	public function setAlign( align:TextAlign ) {
		this.align = align;
		return this;
	}
	
	public function setWrapWidth( width:Float ) {
		wrapWidth = width;
		return this;
	}
	
	override public function onAdded() {
		//owner.transform.add( ir );
		for ( i in _pairs ) {
			owner.transform.add( i.mesh );
		}
	}
	
	override public function onRemoved() {
		super.onRemoved();
		for ( i in _pairs )
			owner.transform.remove( i.mesh );
	}
	
	override public function onUpdate() 	{
		super.onUpdate();
		if ( _textDirty ) updateText();
		if ( _layoutDirty ) updateLayout();
		
	}
	
	override function setLevel(level:Float):Element2D 	{
		return super.setLevel(level);
	}
	
	override function setPremultipliedAlpha(alpha:Float):Element2D 	{
		for ( i in _pairs ) i.mat.opacity = alpha;
		return this;
	}
	
	function get_text():String 	{
		return _text;
	}
	
	function set_text(value:String):String 	{
		if ( _text != value ) _textDirty = true;
		return _text = value;
	}

	function get_align():TextAlign 	{
		return _align;
	}
	
	function set_align(value:TextAlign):TextAlign 	{
		if ( value != _align ) _layoutDirty = true;
		return _align = value;
	}
		
	function get_wrapWidth():Float {
		return _wrapWidth;
	}
	
	function set_wrapWidth(value:Float):Float {
		if ( _wrapWidth != value ) _layoutDirty = true;
		return _wrapWidth = value;
	}
	
}