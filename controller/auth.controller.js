const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');

const { User, RefreshToken } = db;

exports.signup = (req, res) => {
  User.create({
    userName: req.body.username,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(async (user) => {
      if (user) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: 54000, // 24 hours
          },
        );

        const refreshToken = await RefreshToken.createToken(user);
        // send message as json
        res.status(200).send({
          token,
          refreshToken,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({ where: { userName: req.body.username } })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: 'Invalid Password!',
        });
      }

      console.log(user.toJSON());
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 54000, // 24 hours
        },
      );

      const refreshToken = await RefreshToken.createToken(user);

      res.status(200).send({
        id: user.id,
        username: user.userName,
        email: user.email,
        token,
        refreshToken,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: 'Refresh Token is required!' });
  }

  try {
    const refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    console.log(refreshToken);

    if (!refreshToken) {
      res.status(403).json({ message: 'Refresh token is not in database!' });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: 'Refresh token was expired. Please make a new signin request',
      });
      return;
    }

    const user = await refreshToken.getUser();
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 54000,
      },
    );

    return res.status(200).json({
      token: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.logout = async (req, res) => {
  const { userId } = req;
  User.findOne({ where: { id: userId } })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      await RefreshToken.destroy({ where: { userId } });

      res.status(200).send({
        message: 'User logged out successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
