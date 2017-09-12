'use strict';

const apiKey = process.env.MAILGUN_SECRET;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey, domain});
const mailgunAdminEmail = process.env.MAILGUN_ADMIN_EMAIL;

exports.sendText = function(to, from, subject, message, callback) {
  const data = {
    to: to && String(to),
    from: from && String(from),
    subject: subject && String(subject),
    text: message && String(message)
  };
  mailgun.messages().send(data, callback);
};

exports.ADMIN_EMAIL = mailgunAdminEmail;
