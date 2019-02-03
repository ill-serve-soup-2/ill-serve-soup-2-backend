exports.up = function(knex, Promise) {
	return knex.schema.createTable("locations", tbl => {
		tbl.increments();

		tbl.string("name", 255)
			.unique()
			.notNullable();

		tbl.text("streetAddress");

		tbl.string("city", 255);

		tbl.string("state", 128);

		tbl.string("zipCode", 128);

		tbl.string("email", 255);

		tbl.string("phone", 128);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("locations");
};
