'use strict';

const apiKey = process.env.MAILGUN_SECRET;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({apiKey, domain});
const mailgunAdminEmail = process.env.MAILGUN_ADMIN_EMAIL;
const Promise = require('bluebird');

const messages = mailgun.messages();
const sendEmail = messages.send;
const sendEmailAsync = Promise.promisify(sendEmail, { context: messages });

exports.ADMIN_EMAIL = mailgunAdminEmail;

exports.sendPlainTextEmail = function(to, from, subject, message) {
  const data = {
    to: to && String(to),
    from: from && String(from),
    subject: subject && String(subject),
    text: message && String(message)
  };

  return sendEmailAsync(data);
};
