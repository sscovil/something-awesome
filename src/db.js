'use strict';

exports.knex = require('knex')({
  client: 'pg',
  connection: {
    database : 'blog'
  }
});
