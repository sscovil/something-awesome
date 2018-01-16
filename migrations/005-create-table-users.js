'use strict';

const useTimestampType = true;
const defaultToNow = false;

exports.up = (knex) => {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id');
    table.text('key');
    table.text('secret');
    table.text('email');
    table.boolean('is_email_verified');
    table.timestamps(useTimestampType, defaultToNow);
    table.unique('key');
    table.unique('email');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
