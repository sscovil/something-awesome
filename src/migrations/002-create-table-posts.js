'use strict';

exports.up = (knex) => {
  return knex.schema.createTableIfNotExists('posts', function (table) {
    table.increments('id');
    table.text('title');
    table.text('content');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('posts');
};
