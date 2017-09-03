var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

router.get('/', function (req, res) {
  delete req.session.token;

  var viewData = { success: req.session.success };
  delete req.session.success;

  res.render('login/index', viewData);
});

router.post('/', function (req, res) {
  userService.authentication(req.body.username, req.body.password)
    .then(function (token) {
      if (token) {
        req.session.token = token;

        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/admin';
        return res.redirect(returnUrl);
      } else {
        return res.render('login/index', { error: 'Username or password is incorrect', username: req.body.username });
      }
    })
    .catch(function (err) {
      console.log('error on login', err);
      return res.render('login/index', { error: err });
    });
});

module.exports = router;