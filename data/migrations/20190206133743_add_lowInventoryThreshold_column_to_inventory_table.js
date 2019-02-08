exports.up = function(knex, Promise) {
	return knex.schema.table("inventory", tbl => {
		tbl.integer("lowInventoryThreshold").defaultTo(1);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table("inventory", tbl => {
		tbl.dropColumn("lowInventoryThreshold");
	});
};
