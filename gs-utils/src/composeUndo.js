"use strict";

GSUtils.composeUndo = ( data, redo ) => {
	if ( GSUtils.isObject( data ) && GSUtils.isObject( redo ) ) {
		return Object.freeze( Object.entries( redo ).reduce( ( undo, [ k, val ] ) => {
			if ( data[ k ] !== val ) {
				undo[ k ] = GSUtils.composeUndo( data[ k ], val );
			}
			return undo;
		}, {} ) );
	}
	return data;
};
