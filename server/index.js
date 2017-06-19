const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
// var port = Number(process.env.PORT || 3000);

// const sgTransport = require('nodemailer-sendgrid-transport');
// const cors = require('cors');

// app.use(cors());
app.use(express.static(__dirname + '/nathanpickard.github.io'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//   res.sendFile('../components/contact.html');
//   console.log('nodemailer reading console log...' + req.url);
// });

app.post('/send', function (req, res) {
  if (req.body.email == "" || req.body.subject == "") {
    res.send("Error: Email and subject should not be blank");
    return false;
  }


  var smtpTransport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com", // hostname
    secureConnection: true,
    port: 465,
    auth: {
      user: 'nathan.pickard87@gmail.com',
      pass: ''
    }
  });

  var mailOptions = {
    from: "Node Emailer ✔ <yourgmail@gmail.com>", // sender address
    to: req.body.email, // list of receivers
    subject: req.body.subject + " ✔", // Subject line
    //text: "Hello world ✔", // plaintext body
    html: "<b>" + req.body.description + "</b>" // html body
  }

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.send("Email could not sent due to error: " + error);
    } else {
      res.send("Email has been sent successfully");
    }
  });
});

var port = Number( process.env.PORT || 3000 ), ip = "127.0.0.1";
app.listen(port, function() {
  console.log('Express server listening on http://localhost:%d', port);
});

// var server = http.createServer(app).listen(port, function () {
//   console.log("Server is Running on 127.0.0.1:" + port);
// });



  // var mailer = nodemailer.createTransport(sgTransport(options));
  // mailer.sendMail(req.body, function(error, info){
  //   if(error) {
  //     res.status('401').json({err: info});
  //   }
  //   else {
  //     res.status('200').json({success: true});
  //   }
  // });



// var port = Number( process.env.PORT || 3000 ), ip = "127.0.0.1";
// app.listen(port, function() {
//   console.log('Express server listening on http://localhost:%d', port);
// });

// module.exports = app;