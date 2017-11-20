'use strict';

exports.up = (knex) => {
  return knex.schema.createTableIfNotExists('pages', function (table) {
    table.text('id').primary;
    table.text('title');
    table.text('path');
    table.text('linkText');
    table.text('content');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('pages');
};
