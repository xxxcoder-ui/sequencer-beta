"use strict";

GSUtils.diffAssign = ( a, b ) => {
	if ( b ) {
		Object.entries( b ).forEach( ( [ k, val ] ) => {
			if ( a[ k ] !== val ) {
				if ( val === undefined ) {
					delete a[ k ];
				} else if ( !GSUtils.isObject( val ) ) {
					a[ k ] = val;
				} else if ( !GSUtils.isObject( a[ k ] ) ) {
					a[ k ] = GSUtils.jsonCopy( val );
				} else {
					GSUtils.diffAssign( a[ k ], val );
				}
			}
		} );
	}
	return a;
};
