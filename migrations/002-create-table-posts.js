'use strict';

exports.up = (knex) => {
<<<<<<< HEAD
<<<<<<< HEAD
  return knex.schema.createTableIfNotExists('posts', function (table) {
    table.increments('id', 1);
    table.text('title', 'My First Post');
    table.text('content', `<p>
      Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud</p>`
    );
=======
=======
>>>>>>> cb06cebaf5f020b9ca9d1b4fab42e3618864fca5
  return knex.schema.createTableIfNotExists('posts', (table) => {
    table.increments('id');
    table.text('title');
    table.text('content');
>>>>>>> cb06cebaf5f020b9ca9d1b4fab42e3618864fca5
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('posts');
};
