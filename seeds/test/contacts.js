
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        {id: 1, name: 'Bob TesterTon', email: 'test@testmail.test', subject: 'Walla walla walla walla', message: 'Wallachameleonnnnnnnnnnnnnnnnn'}
      ]);
    });
};
