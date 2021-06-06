"use strict";

GSUtils.deepAssign = ( a, b ) => {
	if ( b ) {
		Object.entries( b ).forEach( ( [ k, val ] ) => {
			if ( !GSUtils.isObject( val ) ) {
				a[ k ] = val;
			} else if ( !GSUtils.isObject( a[ k ] ) ) {
				a[ k ] = GSUtils.deepCopy( val );
			} else {
				GSUtils.deepAssign( a[ k ], val );
			}
		} );
	}
	return a;
};
