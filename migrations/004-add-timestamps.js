'use strict';

const useTimestampType = true;
const defaultToNow = false;

const addTimestamps = (table) => {
  table.timestamps(useTimestampType, defaultToNow);
};

const dropTimestamps = (table) => {
  table.dropTimestamps();
};

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.alterTable('contacts', addTimestamps),
    knex.schema.alterTable('posts', addTimestamps),
    knex.schema.alterTable('pages', addTimestamps)
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.alterTable('contacts', dropTimestamps),
    knex.schema.alterTable('posts', dropTimestamps),
    knex.schema.alterTable('pages', dropTimestamps)
  ]);
};
