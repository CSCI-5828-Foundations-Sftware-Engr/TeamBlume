const db = require('../models');

const { User: User, RefreshToken: RefreshToken } = db;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  User.create({
    userName: req.body.username,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (user) {
        // send message as json
        res.status(200).send({ message: 'User was registered successfully!' });
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

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      console.log(user.toJSON());
      console.log(process.env.JWT_SECRET);
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400, // 24 hours
        },
      );

      let refreshToken = await RefreshToken.createToken(user);

      res.status(200).send({
        id: user.id,
        username: user.userName,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
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
    let refreshToken = await RefreshToken.findOne({
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
    let newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
