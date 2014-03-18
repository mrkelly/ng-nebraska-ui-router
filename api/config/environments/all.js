var express = require('express'),
  passport = require('passport'),
  util = require('util'),
  properties = require('../properties'),
  NedbStore = require('connect-nedb-session')(express),
  proxy = require('../proxy');

module.exports = function() {
  console.log(" * Applying base configurations");

  this.set('views', __dirname + '/../../src/views');

  // Setup jade templates
  this.set('view engine', 'jade');
  this.engine('jade', require('jade').__express);

  this.use(express.cookieParser(properties.security.cookieSecret));
  this.use(express.compress());
  this.use(express.bodyParser());

  this.use(express.session({
    secret: properties.session.secret,
    key: properties.session.key,
    store: new NedbStore({filename: 'api/data/db/session.json'}),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 3600 * 1000
    }
  }));

  this.use(passport.initialize());
  this.use(passport.session());

};
