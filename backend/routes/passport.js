var Strategy = require('passport-local').Strategy;
var db = require('../db');

exports.serializeUser = function (user, cb) {
  cb(null, user.id);
};

exports.deserializeUser = function (id, cb) {
  db.tables.User.findOne({where: {id: id}}).then(function (user) {
    cb(null, user);
  }).catch(cb);
};

exports.checkUser = function (username, password, cb) {
  db.tables.User.findOne({where: {username: username}}).then(function (user) {
    if (user.passwordHash !== password) { return cb(null, false); }
    cb(null, user);
  }).catch(cb);
};

exports.strategy = new Strategy(exports.checkUser);
