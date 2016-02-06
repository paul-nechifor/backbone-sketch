var Strategy = require('passport-local').Strategy;
var db = require('../db');

exports.serializeUser = function (user, cb) {
  cb(null, user.id);
};

exports.deserializeUser = function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
};

exports.strategy = new Strategy(function (username, password, cb) {
  db.users.findByUsername(username, function (err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false); }
    if (user.password !== password) { return cb(null, false); }
    return cb(null, user);
  });
});
