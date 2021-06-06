"use strict";

class gswaDrumsScheduler {
	constructor( ctx ) {
		const sch = new gswaScheduler();

		this.scheduler = sch;
		this._drumrows = null;
		this._startedDrums = new Map();
		Object.seal( this );

		sch.currentTime = () => ctx.currentTime;
		sch.ondatastart = this._onstartDrum.bind( this );
		sch.ondatastop = this._onstopDrum.bind( this );
		sch.ondatapropchange = this._onchangeDrum.bind( this );
		sch.enableStreaming( !( ctx instanceof OfflineAudioContext ) );
	}

	setDrumrows( drumrows ) {
		this._drumrows = drumrows;
	}
	change( obj ) {
		const cpy = GSUtils.deepCopy( obj );

		Object.values( cpy ).forEach( drum => {
			if ( drum && "when" in drum ) { // 1.
				drum.duration = this._drumrows.getPatternDurationByRowId( drum.row );
			}
		} );
		this.scheduler.change( cpy );
	}
	start( when, off, dur ) {
		this.scheduler.start( when, off, dur );
	}
	stop() {
		this.scheduler.stop();
	}

	_onstartDrum( startedId, [ [ , drum ] ], when, off, _dur ) {
		if ( "gain" in drum ) {
			this._startedDrums.set( startedId,
				this._drumrows.startDrum( drum, when, off, drum.duration ) );
		} else {
			this._drumrows.startDrumcut( drum, when );
		}
	}
	_onstopDrum( startedId ) {
		this._drumrows.stopDrum( this._startedDrums.get( startedId ) );
		this._startedDrums.delete( startedId );
	}
	_onchangeDrum( startedId, prop, val ) {
		this._drumrows.changeDrumProp( startedId, prop, val );
	}
}

/*
1. The `if` check if the `drum` is new and not updating.
*/
