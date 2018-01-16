'use strict';

const { Contact } = require('../models');

exports.saveContactFormSubmission = function(name, email, subject, message) {
  return Contact.create({ name, email, subject, message });
};
