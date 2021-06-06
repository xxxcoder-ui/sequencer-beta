"use strict";

GSUtils.parseBeatsToBeats = ( beats, stepsPerBeat ) => {
	const steps = beats % 1 * stepsPerBeat;

	return [
		`${ beats + 1 | 0 }`,
		`${ steps + 1 | 0 }`.padStart( 2, "0" ),
		`${ steps * 1000 % 1000 | 0 }`.padStart( 3, "0" ),
	];
};
