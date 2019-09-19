exports.seed = function(knex) {
      return knex('users').insert([
        {id: 1, username: 'eleasah'},
        {id: 2, username: 'lucy'},
        {id: 3, username: 'emily'}
      ]);
};
