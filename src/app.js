'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mailer = require('./mailer');
const middleware = require('./middleware');
const path = require('path');

const app = express();

const port = process.env.PORT;

app.post('/api/forms/contact', bodyParser.urlencoded({ extended: true }), middleware.saveContactFormData, function(req, res) {
  try {
    const to = mailer.ADMIN_EMAIL;
    const from = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    mailer.sendText(to, from, subject, message, function(err, body) {
      if (err) {
        console.log(err);
        return res.status(400).send(err.message);
      }
      console.log(body);
      return res.sendStatus(204);
    });
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
  console.log(`Server is listening on port ${port}!`);
});
