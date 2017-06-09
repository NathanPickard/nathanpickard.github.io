'use strict';

exports.renderIndex = function(req, res) {
  res.render('core/server/views/index', {
    user: req.user || null
  });
};

exports.renderServerError = function(req, res) {
  res.status(500).render('core/server/views/500', {
    error: 'Oops! Something went wrong'
  });
};

exports.renderNotFound = function(req, res) {
  res.status(404).render('core/server/views/404', {
    url: req.originalUrl
  });
};

exports.sendMail = function(req, res) {
  
  });
};