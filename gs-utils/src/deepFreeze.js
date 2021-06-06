"use strict";

GSUtils.deepFreeze = obj => {
	if ( GSUtils.isObject( obj ) ) {
		Object.freeze( obj );
		Object.values( obj ).forEach( GSUtils.deepFreeze );
	}
	return obj;
};
