"use strict";

class gswaFxFilter {
	constructor() {
		this.ctx =
		this.input =
		this.output =
		this._filter =
		this.responseHzIn =
		this.responseMagOut =
		this.responsePhaseOut = null;
		this._respSize = -1;
		this._enable = false;
		this._ctrl = new DAWCore.controllersFx.filter( {
			dataCallbacks: {
				type: this._changeType.bind( this ),
				Q: this._changeProp.bind( this, "Q" ),
				gain: this._changeProp.bind( this, "gain" ),
				detune: this._changeProp.bind( this, "detune" ),
				frequency: this._changeProp.bind( this, "frequency" ),
			},
		} );
		Object.seal( this );
	}

	// .........................................................................
	setContext( ctx ) {
		if ( this.ctx ) {
			this.input.disconnect();
			this.output.disconnect();
			this._filter.disconnect();
		}
		this.ctx = ctx;
		this.input = ctx.createGain();
		this.output = ctx.createGain();
		this._filter = ctx.createBiquadFilter();
		this._ctrl.recall();
		this.toggle( this._enable );
	}
	toggle( b ) {
		this._enable = b;
		if ( this.ctx ) {
			if ( b ) {
				this.input.disconnect();
				this.input.connect( this._filter );
				this._filter.connect( this.output );
			} else {
				this._filter.disconnect();
				this.input.connect( this.output );
			}
		}
	}
	change( obj ) {
		this._ctrl.change( obj );
	}
	liveChange( prop, val ) {
		this._changeProp( prop, val );
	}
	clear() {
		this._ctrl.clear();
		this._respSize = -1;
		this.responseHzIn =
		this.responseMagOut =
		this.responsePhaseOut = null;
	}
	updateResponse( size ) {
		this._createResponseArrays( size );
		this._filter.getFrequencyResponse(
			this.responseHzIn,
			this.responseMagOut,
			this.responsePhaseOut );
		return this.responseMagOut;
	}

	// .........................................................................
	_changeType( type ) {
		this._filter.type = type;
	}
	_changeProp( prop, val ) {
		this._filter[ prop ].setValueAtTime( val, this.ctx.currentTime );
	}
	_createResponseArrays( w ) {
		if ( w !== this._respSize ) {
			const nyquist = this.ctx.sampleRate / 2,
				Hz = new Float32Array( w );

			this._respSize = w;
			this.responseHzIn = Hz;
			this.responseMagOut = new Float32Array( w );
			this.responsePhaseOut = new Float32Array( w );
			for ( let i = 0; i < w; ++i ) {
				Hz[ i ] = nyquist * ( 2 ** ( i / w * 11 - 11 ) );
			}
		}
	}
}

Object.freeze( gswaFxFilter );

if ( typeof gswaEffects !== "undefined" ) {
	gswaEffects.fxsMap.set( "filter", gswaFxFilter );
}
