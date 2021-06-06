"use strict";

GSUtils.addIfNotEmpty = ( obj, attr, valObj ) => {
	if ( GSUtils.isntEmpty( valObj ) ) {
		if ( attr in obj ) {
			GSUtils.deepAssign( obj[ attr ], valObj );
		} else {
			obj[ attr ] = valObj;
		}
	}
	return obj;
};
