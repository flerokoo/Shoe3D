package shoe3d.util;
#if !macro
import js.Browser;
#end

/**
 * ...
 * @author as
 */

class HtmlUtils
{
	public static var HIDE_MOBILE_BROWSER = Browser.window.top == Browser.window &&
        ~/Mobile(\/.*)? Safari/.match(Browser.navigator.userAgent);
	public static var VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
	
	public static function loadExtension ( name :String, ?obj :Dynamic) :{ prefix :String, field :String, value :Dynamic }
    {
        if (obj == null) {
            obj = Browser.window;
        }

        var extension = Reflect.field(obj, name);
        if (extension != null) {
            return {prefix: "", field: name, value: extension};
        }

        var capitalized = name.charAt(0).toUpperCase() + name.substr(1);
        for (prefix in VENDOR_PREFIXES) {
            var field = prefix + capitalized;
            var extension = Reflect.field(obj, field);
            if (extension != null) {
                return {prefix: prefix, field: field, value: extension};
            }
        }

        return {prefix: null, field: null, value: null};
    }
	
	public static function hideMobileBrowser()
	{
		Browser.window.scrollTo(1, 0);
	}
	
    public static function polyfill (name :String, ?obj :Dynamic) :Bool
    {
        if (obj == null) {
            obj = Browser.window;
        }

        var value = loadExtension(name, obj).value;
        if (value == null) {
            return false;
        }
        Reflect.setField(obj, name, value);
        return true;
    }
}