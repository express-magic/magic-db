'use strict';
var path    = require('path')
  , caminte = require('caminte')
  , Schema  = caminte.schema
  , schema  = false
  , log     = require('magic-log')
;

exports.init = function init (settings) {
  if ( schema ) { return schema; }

  if ( ! settings || typeof settings !== 'object' ) {
    settings = {
      driver: 'sqlite3'
    , database: path.join(process.cwd(), 'gs.db')
    };
    log('magic-db init called without a valid settings object. defaults:');
    log(settings);
  }

  schema = new Schema(settings);
  return schema;
}
