package shoe3d.asset;
import shoe3d.asset.AssetPack.TexDef;

/**
 * ...
 * @author as
 */
class Font
{
	
	var _pack:AssetPack;
	var _file:String;
	var _image:TexDef;
	
	public function new( desciptorName:String, pack:AssetPack) {
		this._pack = pack;
		_file = pack.getFile(desciptorName).content;
		
	}
	
}

class Glyph
{
	public var charCode (default, null) :Int;

    // Location and dimensions of this glyph on the sprite sheet
    public var x :Int = 0;
    public var y :Int = 0;
    public var width :Int = 0;
    public var height :Int = 0;


    public var page:TexDef = null;

    public var xOffset :Int = 0;
    public var yOffset :Int = 0;

    public var xAdvance :Int = 0;

    @:allow(flambe) function new (charCode :Int)
    {
        this.charCode = charCode;
    }

    public function getKerning (nextCharCode :Int) :Int
    {
        return (_kernings != null) ? Std.int(_kernings.get(nextCharCode)) : 0;
    }

    @:allow(shoe3d) function setKerning (nextCharCode :Int, amount :Int)
    {
        if (_kernings == null) {
            _kernings = new Map();
        }
        _kernings.set(nextCharCode, amount);
    }

    private var _kernings :Map<Int,Int> = null;
}

class FntParser
{
	
}

enum TexAlign 
{
	Left;
	Right;
	Center;
}