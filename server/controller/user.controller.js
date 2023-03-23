const db = require('../models');

const { User: User } = db;

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.me = (req, res) => {
  User.findOne({ where: { id: req.userId } })
    .then((user) => {
      res.status(200).send({
        id: user.id,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
