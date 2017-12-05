'use strict';

exports.up = (knex) => {
  return knex.schema.createTableIfNotExists('posts', function (table) {
    table.increments('id', 1);
    table.text('title', 'My First Post');
    table.text('content', `<p>
      Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud</p>`
    );
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('posts');
};
