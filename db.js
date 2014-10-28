'use strict';

var sqlite3 = require('sqlite3')
  , caminte = require('caminte')
  , Schema = caminte.Schema
  , db = {
         driver     : "sqlite",
         database   : "/db/sqlite.db"
    }
  , schema = new Schema(db.driver, db)
;

module.exports = schema;
