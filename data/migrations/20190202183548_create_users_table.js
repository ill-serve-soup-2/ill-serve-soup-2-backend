exports.up = function(knex, Promise) {
	return knex.schema.createTable("users", tbl => {
		tbl.increments();

		tbl.string("username", 255)
			.unique()
			.notNullable();

		tbl.string("password", 255).notNullable();

		tbl.string("name", 255);

		tbl.string("role", 128);

		tbl.string("email", 255);

		tbl.string("phone", 128);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("users");
};
