const jwt = require('jsonwebtoken');
const db = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    console.log(decoded);
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
