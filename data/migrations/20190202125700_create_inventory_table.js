exports.up = function(knex, Promise) {
	return knex.schema.createTable("inventory", tbl => {
		tbl.increments();

		tbl.string("name", 255)
			.unique()
			.notNullable();

		tbl.integer("quantity").defaultTo(0);

		tbl.string("units", 128);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("inventory");
};
