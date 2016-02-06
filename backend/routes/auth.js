var _ = require('underscore');
var db = require('../db');
var passport = require('passport');

exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err || !user) {
      return res.json({err: {msg: 'Auth error.'}});
    }
    res.json({res: {user: _.omit(user, 'password')}});
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  res.json({});
};

exports.register = function (req, res) {
  db.tables.User.create({
    username: req.body.username,
    passwordHash: req.body.password,
  }).then(function (user) {
    res.json({res: _.omit(user, 'passwordHash')});
  }).catch(function () {
    res.json({err: {msg: 'Failed to register.'}});
  });
};
