'use strict';

const useTimestampType = true;
const defaultToNow = false;

exports.up = (knex) => {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id');
    table.text('key').notNullable();
    table.text('secret').notNullable();
    table.text('email').notNullable();
    table.boolean('is_email_verified').notNullable().defaultTo(false);
    table.timestamps(useTimestampType, defaultToNow);
    table.unique('key');
    table.unique('email');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
