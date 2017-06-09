'use strict';

module.exports = function(app) {
  var core = require('./core.server.controller');

  app.route('/server-error').get(core.renderServerError);
  app.route('/not-found').get(core.renderNotFound);

  app.route('/*').get(core.renderIndex);

  app.route('/contact-form').post(core.sendMail);
};