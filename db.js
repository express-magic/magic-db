'use strict';
var path     = require('path')
  , log      = require('magic-log')
  , mongoose = require('mongoose')
;

module.exports = function init (settings, next) {
  log('magic-db', 'connecting to db', settings.name);
  mongoose.connect('mongodb://db/' + settings.name, next);
}
