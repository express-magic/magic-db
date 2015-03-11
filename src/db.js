import {map} from 'async';
import {join} from 'path';
import {warn, error} from 'magic-log';
import {mergeObjects} from 'magic-utils';
import levelup from 'levelup';

export function init (req, res, next) {
  var opts = req.app.get('dbOpts')
    , dbs  = opts.dbs && opts.dbs.length ? opts.dbs : []
  ;

  if ( dbs.length <= 0 && opts.name && typeof opts.name === 'string' ) {
    dbs.push(opts.name);
  }

  if ( ! dbs.length ) { //dbs is not an array or empty
    warn('magic-db', 'no databases found to add in options', opts); 
    return next();
  }

  map(dbs, 
    function (name, cb) {
      createDb(req, name, cb);
    },
    function (err, dbs) {
      dbCreateCallback(err, req, dbs, next)
    }
  );
}

function createDb(req, name, cb) {
  var app        = req.app
    , appOpts    = app.get('dbOpts')
    , defaultDir = join(process.cwd(), 'magic-db', req.hostname)
    , dir        = appOpts.dir || defaultDir
    , dbPath     = join(dir, name + '.db')
    , opts       = {
        cacheSize: 8 * 1024 * 4096 //4mb cacheSize
      , valueEncoding: 'json'
    }    
    , curDb
  ;

  mergeObjects(opts, appOpts);

  if ( typeof name !== 'string' ) {
    error('magic-db', 'app.get(\'dbOpts\').dbs', 'name missing', opts);
    cb(null, null);
  } else {
    curDb = levelup(dbPath, opts);
    cb(null, curDb);
  }
}

function dbCreateCallback(err, req, db, next) {
  if ( err ) { throw err; }
  req.app.set('db', db);
  next();
}
