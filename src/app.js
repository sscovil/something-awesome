'use strict';

require('dotenv').config();
const mailer = require('./mailer');

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const mailgun_recipient = process.env.MAILGUN_RECIPIENT;

app.post('/api/forms/contact', bodyParser.urlencoded({extended: true}), function(req, res) {
  let data = {
    to: mailgun_recipient,
    from: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  }

//  mailer.sendText(to, from, subject, message, function (err, body)){
//    if(err) {
//      return res.status(400).send(err.messge);
//    }
//    else {
//      return res.sendStatus(204);
//      console.log(req.body);
//    }
//  }

  }
);

  mailer.sendText(data, function(err,body) {


    mailgun.messages().send(data, function (error, body) {
    if(err) {
      return res.status(400).send(err.message);
      }
    else {
    console.log(res.body);}
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
  console.log(`Server is listening on port ${port}!`);
});
