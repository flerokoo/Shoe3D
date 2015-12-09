package com;
import shoe3d.core.Component;
import shoe3d.core.GameObject;
import shoe3d.System;

/**
 * ...
 * @author as
 */
class Main
{

	public static function main() 
	{
		System;
		trace("START");
		var g1 = new GameObject();		
		var c1 = new Component();
		var g2 = new GameObject() ;
		
		
		g1.add( new Component() );
		g1.add( new Component() );
		g1.addChild( new GameObject() );
		g1.addChild( new GameObject() );
		g1.addChild( g2 );
		
		trace(g1.numChildren );
		
		g1.removeChild( g2 );
	}
	
	public function new() 
	{
		
	}
	
}