"use strict";

GSUtils.parseBeatsToSeconds = ( beats, bpm ) => {
	const seconds = beats / ( bpm / 60 );

	return [
		`${ seconds / 60 | 0 }`,
		`${ seconds % 60 | 0 }`.padStart( 2, "0" ),
		`${ seconds * 1000 % 1000 | 0 }`.padStart( 3, "0" ),
	];
};
