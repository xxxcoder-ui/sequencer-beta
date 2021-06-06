"use strict";

GSUtils.isEmpty = obj => {
	for ( const a in obj ) {
		return false;
	}
	return true;
};
