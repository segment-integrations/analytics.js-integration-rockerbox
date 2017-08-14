'use strict';

var integration = require('@segment/analytics.js-integration');
// var Batch = require('batch');

/**
 * Expose `rockerbox`
 *
 * https://github.com/segmentio/analytics.js-private/issues/79
 */

var Rockerbox = module.exports = integration('Rockerbox')
  .global('RB')
  .option('pixel_code','')
  .tag('<script src="//getrockerbox.com/assets/xyz.js">');


Rockerbox.prototype.initialize = function() {
  window.RB = {};
  window.RB.disablePushState = true;
  window.RB.queue = [];
  window.RB.track = window.RB.track || function() {
    window.RB.queue.push(Array.prototype.slice.call(arguments));
  };
  window.RB.source = this.options.pixel_code;

  this.load(this.ready);
};

Rockerbox.prototype.loaded = function() {
  return !!window.RB && !!window.RB.track;
};

Rockerbox.prototype.page = function() {
  window.RB.track('view');
};

Rockerbox.prototype.track = function(track) {
  var event = track.event();
  var payload = track.properties();
  window.RB.track(event, payload);
};

