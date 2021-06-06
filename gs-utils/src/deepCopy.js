"use strict";

GSUtils.deepCopy = obj => {
	if ( GSUtils.isObject( obj ) ) {
		return Object.entries( obj ).reduce( ( cpy, [ k, v ] ) => {
			cpy[ k ] = GSUtils.deepCopy( v );
			return cpy;
		}, {} );
	}
	return obj;
};
