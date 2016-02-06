var _ = require('underscore');
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
