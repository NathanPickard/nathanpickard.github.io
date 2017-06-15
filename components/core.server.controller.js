'use strict';

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

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

  var data = req.body;
  
  transporter.sendMail({
    from: 'data.contactEmail',
    to: 'nathan.pickard87@gmail.com',
    subject: 'Message from ' + data.contactName,
    text: data.contactMsg
   });

   res.json(data);
  });
};