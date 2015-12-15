package shoe3d.asset;
import js.Browser;
import shoe3d.asset.AssetEntry.AssetFormat;
import shoe3d.util.Assert;
import shoe3d.util.Log;
import shoe3d.util.StringHelp;
import shoe3d.util.Value;
import three.Loader;
import three.LoadingManager;
import three.Texture;
import three.TextureLoader;
import three.XHRLoader;

/**
 * ...
 * @author as
 */
using Lambda;
using shoe3d.util.StringHelp;
 
class AssetPackLoader
{
	private static var _supportedFormats:Array<AssetFormat>;
	private var _entries:Array<AssetEntry>;
	private var _pack:AssetPack;
	private var _loading:Bool = false;
	private var _entriesToLoad:Array<AssetEntry>;
	private var _entriesToPick:Value<Int>;
	private var _manager:LoadingManager;

	public function new() 
	{
		_pack = new AssetPack();
		_entries = [];	
	}
	
	public function add( name:String, url:String, bytes:Int, ?format:AssetFormat )
	{
		if ( format == null ) format = getFormat( url );
		
		_entries.push( new AssetEntry( name, url, format, bytes ) );
	}
	
	function getFormat( url:String ):AssetFormat
	{
		var extension = url.getUrlExtension();
        if (extension != null) {
            switch (extension.toLowerCase()) {
                case "jpg", "jpeg": return JPG;
                case "png": return PNG;

                case "m4a": return M4A;
                case "mp3": return MP3;
                case "ogg": return OGG;
                case "opus": return OPUS;
                case "wav": return WAV;
            }
        } else {
            throw 'No asset format: $url';
        }
        return RAW;
	}

	public function start()
	{
		if ( _loading ) throw 'This asset pack is already loading';
		
		_loading = true;
		var groups:Map<String,Array<AssetEntry>> = new Map();
		
		for ( i in _entries ) {
			if ( ! groups.exists( i.name ) ) groups.set( i.name, [] );
			groups.get(i.name).push( i );
		}
		
		_entriesToLoad = [];
		_entriesToPick = new Value( groups.count() );
		
		_entriesToPick.change.connect( function( cur:Int, prev:Int ) {
			if ( cur <= 0 ) load();
		});
		
		for ( group in groups ) {
			pickBestEntry( group, function( e:AssetEntry ) {
				if ( e == null ) throw 'Asset format is not supported: ${e.name} @ ${e.url}';
				_entriesToLoad.push( e );				
				_entriesToPick._ --;
			});
		}
	}
	
	private static function detectImageFormats ( ret:Array<AssetFormat>->Void)
    {
        var formats = [PNG, JPG, GIF];

        var formatTests = 2;
        var checkRemaining = function () {
            // Called when an image test completes
            --formatTests;
            if (formatTests == 0) {
                ret( formats );
            }
        };

        // Detect WebP-lossless support (and assume that lossy works where lossless does)
        // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/img/webp-lossless.js
        var webp = Browser.document.createImageElement();
        webp.onload = webp.onerror = function (_) {
            if (webp.width == 1) {
                formats.unshift(WEBP);
            }
            checkRemaining();
        };
        webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";

        // Detect JPEG XR support
        var jxr = Browser.document.createImageElement();
        jxr.onload = jxr.onerror = function (_) {
            if (jxr.width == 1) {
                formats.unshift(JXR);
            }
            checkRemaining();
        };
        // The smallest JXR I could generate (where pixel.tif is a 1x1 black image)
        // ./jpegxr pixel.tif -c -o pixel.jxr -f YOnly -q 255 -b DCONLY -a 0 -w
        jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
    }
	
	private static function detectAudioFormats () :Array<AssetFormat>
	{
        // Detect basic support for HTML5 audio
        var audio = Browser.document.createAudioElement();
        if (audio == null || audio.canPlayType == null) {
            Log.warn("Audio is not supported at all in this browser!");
            return [];
        }

        // Reject browsers that claim to support audio, but are too buggy or incomplete
        var blacklist = ~/\b(iPhone|iPod|iPad|Windows Phone)\b/;

        var userAgent = Browser.navigator.userAgent;
		// TODO Add webaudio support check
        if (/*!WebAudioSound.supported &&*/ blacklist.match(userAgent)) {
            Log.warn("HTML5 audio is blacklisted for this browser " + userAgent);
            return [];
        }

        // Select what formats the browser supports
        var types = [
            { format: M4A,  mimeType: "audio/mp4; codecs=mp4a" },
            { format: MP3,  mimeType: "audio/mpeg" },
            { format: OPUS, mimeType: "audio/ogg; codecs=opus" },
            { format: OGG,  mimeType: "audio/ogg; codecs=vorbis" },
            { format: WAV,  mimeType: "audio/wav" },
        ];

        var result = [];
        for (type in types) {
            // IE9's canPlayType() will throw an error in some rare cases:
            // https://github.com/Modernizr/Modernizr/issues/224
            var canPlayType = "";
            try canPlayType = audio.canPlayType(type.mimeType)
            catch (_ :Dynamic) {}

            if (canPlayType != "") {
                result.push(type.format);
            }
        }
        return result;
    }
	
	private static function getSupportedFormatsAsync( fn:Array<AssetFormat>->Void ) 
	{
		if ( _supportedFormats == null )
			detectImageFormats( function ( imgFormats:Array<AssetFormat> ) {
				_supportedFormats = imgFormats.concat( detectAudioFormats() ).concat( [ RAW ] );
				fn( _supportedFormats );
			} )
		else
			fn( _supportedFormats );
	}
	
	private static function pickBestEntry( entries:Array<AssetEntry>, handler:AssetEntry->Void )
	{
		getSupportedFormatsAsync(
			function( formats:Array<AssetFormat> ) {
				for ( format in formats) 
					for( entry in entries )
						if ( entry.format == format ) {
							handler( entry );
							return;
						}				
				handler(null);
			}		
		);
	}
	
	private function load() 
	{
		_manager = new LoadingManager( onCompletePack, onProgress );
		for ( e in _entriesToLoad ) {
			switch( e.format ) {
				case JPG, PNG, GIF:
					new TextureLoader( _manager ).load( e.url, onLoadTexture );
				case MP3, M4A, OPUS, OGG, WAV:
					new XHRLoader( _manager ).load( e.url, onLoadSound );
				default:
					new XHRLoader( _manager ).load( e.url, onLoadData );
					
			}
		}
	}
	
	
	
	function onProgress( nm:String, a:Float, b:Float ) 
	{
		trace("PROGRESS");
	}
	
	function onCompletePack() 
	{
		trace("CMPL");
	}
	
	function onLoadTexture( tex:Texture ) 
	{
		trace("TEX LOAD");
	}
	
	function onLoadSound( data:String ) 
	{
		trace( "SND LOAD");
	}
	
	function onLoadData( data:String ) 
	{
		trace( "DATA LOAD");
	}
}