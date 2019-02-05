exports.up = function(knex, Promise) {
	return knex.schema.table("locations", tbl => {
		tbl.boolean("volunteersNeeded").defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table("locations", tbl => {
		tbl.dropColumn("volunteersNeeded");
	});
};
