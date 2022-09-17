const user = require('./api/user');
// const authLocal = require('./auth/local');

const routes = (app) => {
  app.use('/api/user', user);
//   app.use('/auth/local', authLocal);
};

module.exports = routes;
