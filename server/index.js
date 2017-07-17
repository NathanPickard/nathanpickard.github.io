require('rootpath')();
var express = require('express');
var ejs = require('ejs');
var app = express();
var compression = require('compression');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var config = require('config.json');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.set('views', __dirname + '/../client');

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  store: new MongoStore({ url: config.connectionString }),
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  if (!config.installed && req.path !== 'install') {
    return res.redirect('/install');
  }
  next();
});

app.use('/api/contact', require())