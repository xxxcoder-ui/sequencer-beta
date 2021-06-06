"use strict";

GSUtils.noop = () => {};
GSUtils.isNoop = fn => !fn || fn === GSUtils.noop;
