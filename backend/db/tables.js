var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  return {
    User: sequelize.define('user', {
      username: Sequelize.STRING,
      passwordHash: Sequelize.STRING,
    }),
  };
};
