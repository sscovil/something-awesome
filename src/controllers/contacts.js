'use strict';

const { contacts, mailer } = require('../services');

exports.saveAndNotifyAdmin = async function(req, res) {
  const { name, email, subject, message } = req.body;
  const to = mailer.ADMIN_EMAIL;
  const from = `${name} <${email}>`;

  try {
    await contacts.saveContactFormSubmission(name, email, subject, message);
  } catch(err) {
    console.warn(`Error saving contact form submission data from ${from}`, subject, message, err);
    return res.status(400).send(`Unable to submit contact form. Please try again.`);
  }

  try {
    await mailer.sendPlainTextEmail(to, from, subject, message);
  } catch(err) {
    console.warn(`Error notifying admin of contact form submission from ${from}`, subject, message, err);
    // As long as the data has been saved to the DB, we should consider the form submission successful.
  }

  return res.sendStatus(204);
};
