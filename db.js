'use strict';
var path    = require('path')
  , caminte = require('caminte')
  , Schema  = caminte.Schema
  , log     = require('magic-log')
;

module.exports = function init (settings) {
  if ( ! settings || ! settings.driver) {
    log('magic-db called without a valid settings object.', 'error');
    return;
  }
  return new Schema(settings.driver, settings);
}

