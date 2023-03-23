const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  RefreshToken.init(
    {
      token: DataTypes.STRING,
      expiryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
    },
  );

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(
      expiredAt.getSeconds() + process.env.REFRESH_TOKEN_EXPIRY,
    );

    let _token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
      },
    );

    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return RefreshToken;
};
