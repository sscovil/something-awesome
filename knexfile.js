'use strict';

module.exports = {
  client: 'pg',
  connection: {
    database : 'blog'
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds/test'
  }
};
