
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1,
        title: 'My First Post',
        content: `<p>
          Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud Bud</p>`}
      ]);
    });
};
