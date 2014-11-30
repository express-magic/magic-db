'use strict';
var path     = require('path')
  , tungus   = require('tungus')
  , mongoose = require('mongoose')
  , log      = require('magic-log')
  , Schema   = mongoose.Schema
;

module.exports = function init (settings, next) {
  if ( ! next ) {
    return log.error('magic-db', 'called without next callback, this breaks the middleware flow.');
  }

  if ( ! settings.database) {
    log.error('magic-db', 'called without a valid settings object.', settings);
    return next('magic-db init called without a valid settings object');
  }

  mongoose.connect(settings.database, function (err) {
    //log('mongoose connected');
    next(err, mongoose);
  });
}

