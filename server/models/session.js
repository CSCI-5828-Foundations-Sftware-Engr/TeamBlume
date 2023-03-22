const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {}
  Session.init(
    {
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Session',
    },
  );
  return Session;
};
