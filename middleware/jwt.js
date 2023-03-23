const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  // get token from Authorization header
  console.log(req.headers);
  let token = req.headers.authorization;
  // remove 'Bearer ' from token
  const tokenParts = token.split(' ');
  // use array destructuring to get the second element
  [, token] = tokenParts;

  console.log(token);

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
  verifyToken,
};

module.exports = authJwt;
