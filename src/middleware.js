'use strict';

const db = require('./db');

exports.saveContactFormData = function(req, res, next) {
  const { name, email, subject, message } = req.body;

  db.knex
    .table('contacts')
    .insert({ name, email, subject, message })
    .then((result) => {
      console.log(result);
    next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
