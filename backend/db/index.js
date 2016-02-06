var Sequelize = require('sequelize');

exports.seq = null;
exports.tables = null;

exports.init = function (connectionString, cb) {
  var seq = exports.seq = new Sequelize(connectionString);
  exports.tables = require('./tables')(seq);
  seq.sync().then(function () {
    cb();
  }).catch(function (err) {
    cb(err);
  });
};
