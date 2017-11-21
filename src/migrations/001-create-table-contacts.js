'use strict';

exports.up = (knex) => {
  return knex.schema.createTableIfNotExists('contacts', function (table) {
    table.increments('id');
    table.text('name');
    table.text('email');
    table.text('subject');
    table.text('message');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('contacts');
};
