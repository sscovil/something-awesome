'use strict';

const api_key = process.env.MAILGUN_SECRET;
const domain = 'sandbox6eddd0f1d9eb4fddbcccea158cc97fd6.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const mailgun_admin_email = process.env.MAILGUN_ADMIN_EMAIL;

exports.sendText = function(to, from, subject, message, callback) {
  const data = {
    to: to && String(to),
   from: from && String(from),
   subject: subject && String(subject),
   text: message && String(message)
  };
  mailgun.messages().send(data, callback);
};

exports.mailgun_admin_email = mailgun_admin_email;
