
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('foods', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('calories');
      table.timestamps(true,true);
    }),
    knex.schema.createTable('meals', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true,true);
    }),
    knex.schema.createTable('food_meals', function(table) {
      table.increments('id').primary();
      table.integer('food_id').unsigned().index().references('id').inTable('foods');
      table.integer('meal_id').unsigned().index().references('id').inTable('meals');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('food_meals'),
    knex.schema.dropTable('foods'),
    knex.schema.dropTable('meals')
  ])
};
