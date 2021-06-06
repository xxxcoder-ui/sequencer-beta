"use strict";

GSUtils.mapCallbacks = ( names, fns ) => {
	const on = {};

	names.forEach( n => on[ n ] = GSUtils.noop );
	Object.assign( Object.seal( on ), fns );
	return Object.freeze( on );
};
