'use strict';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          title: 'My First Blog Post',
          content: `<p>This is an example blog post that can be deleted.</p>`
        }
      ]);
    });
};
