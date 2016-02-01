package shoe3d.util;

/**
 * ...
 * @author as
 */
class Tools
{

	public static function getRandomFromArray<T>(a:Array<T>):T
	{
		return a[ Math.floor( Math.random() * a.length ) ];
	}
	
}