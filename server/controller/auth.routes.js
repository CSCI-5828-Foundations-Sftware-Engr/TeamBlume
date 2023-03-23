const { verifySignup } = require('../middleware');
const { authJwt } = require('../middleware');
const controller = require('./auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [verifySignup.checkDuplicateUsernameOrEmail],
    controller.signup,
  );

  app.post('/api/auth/signin', controller.signin);

  app.post('/api/auth/refreshToken', controller.refreshToken);

  app.get('/api/auth/signout', [authJwt.verifyToken], controller.logout);
};
