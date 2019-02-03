exports.seed = function(knex, Promise) {
	return knex("inventory")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("inventory").insert([
				{
					id: 1,
					name: "Lamb - Bones",
					quantity: 56,
					units: "cans",
				},
				{
					id: 2,
					name: "Longos - Chicken Caeser Salad",
					quantity: 31,
					units: "cans",
				},
				{
					id: 3,
					name: "Veal Inside - Provimi",
					quantity: 54,
					units: "cans",
				},
				{
					id: 4,
					name: "Pastry - Key Limepoppy Seed Tea",
					quantity: null,
					units: "cans",
				},
				{
					id: 5,
					name: "Tortillas - Flour, 10",
					quantity: 77,
					units: null,
				},
				{
					id: 6,
					name: "Beef - Top Butt Aaa",
					quantity: 75,
					units: "lbs",
				},
				{
					id: 7,
					name: "Wakami Seaweed",
					quantity: 92,
					units: "bags",
				},
				{
					id: 8,
					name: "Lady Fingers",
					quantity: 9,
					units: "lbs",
				},
				{
					id: 9,
					name: "Ice Cream Bar - Oreo Sandwich",
					quantity: null,
					units: "cartons",
				},
				{
					id: 10,
					name: "Bread - Olive Dinner Roll",
					quantity: 27,
					units: "ounces",
				},
				{
					id: 11,
					name: "Otomegusa Dashi Konbu",
					quantity: 81,
					units: "ounces",
				},
				{
					id: 12,
					name: "Water - Spring Water, 355 Ml",
					quantity: 12,
					units: "bags",
				},
				{
					id: 13,
					name: "Eggplant - Asian",
					quantity: null,
					units: "ounces",
				},
				{
					id: 14,
					name: "Fish - Soup Base, Bouillon",
					quantity: 59,
					units: "ounces",
				},
				{
					id: 15,
					name: "Skirt - 29 Foot",
					quantity: 57,
					units: "cans",
				},
				{
					id: 16,
					name: "Beef - Bones, Marrow",
					quantity: 50,
					units: "bags",
				},
				{
					id: 17,
					name: "Water Chestnut - Canned",
					quantity: 57,
					units: null,
				},
				{
					id: 18,
					name: "Corn - On The Cob",
					quantity: 38,
					units: "bags",
				},
				{
					id: 19,
					name: "Brocolinni - Gaylan, Chinese",
					quantity: 14,
					units: "ounces",
				},
				{
					id: 20,
					name: "Seedlings - Clamshell",
					quantity: 58,
					units: "cans",
				},
				{
					id: 21,
					name: "Onions - Green",
					quantity: 14,
					units: null,
				},
				{
					id: 22,
					name: "Laundry - Bag Cloth",
					quantity: null,
					units: "lbs",
				},
				{
					id: 23,
					name: "Soup - Clam Chowder, Dry Mix",
					quantity: 29,
					units: "bags",
				},
				{
					id: 24,
					name: "Lumpfish Black",
					quantity: 6,
					units: "lbs",
				},
				{
					id: 25,
					name: "Coffee - Espresso",
					quantity: 11,
					units: "bags",
				},
				{
					id: 26,
					name: "Wine - Fino Tio Pepe Gonzalez",
					quantity: 9,
					units: "cartons",
				},
				{
					id: 27,
					name: "Bacardi Raspberry",
					quantity: null,
					units: "lbs",
				},
				{
					id: 28,
					name: "Cheese - Bakers Cream Cheese",
					quantity: 23,
					units: null,
				},
				{
					id: 29,
					name: "Wine - Magnotta - Pinot Gris Sr",
					quantity: 50,
					units: "cartons",
				},
				{
					id: 30,
					name: "Wine - Harrow Estates, Vidal",
					quantity: 43,
					units: "bags",
				},
				{
					id: 31,
					name: "Chick Peas - Canned",
					quantity: 67,
					units: "bags",
				},
				{
					id: 32,
					name: "Cabbage - Savoy",
					quantity: 40,
					units: "lbs",
				},
				{
					id: 33,
					name: "Tuna - Salad Premix",
					quantity: 89,
					units: "ounces",
				},
				{
					id: 34,
					name: "Wine - Muscadet Sur Lie",
					quantity: 54,
					units: null,
				},
				{
					id: 35,
					name: "Coffee - Cafe Moreno",
					quantity: 7,
					units: "cans",
				},
				{
					id: 36,
					name: "Beer - Blue",
					quantity: 84,
					units: null,
				},
				{
					id: 37,
					name: "Cake - Mini Potato Pancake",
					quantity: 19,
					units: "cartons",
				},
				{
					id: 38,
					name: "Maple Syrup",
					quantity: 35,
					units: "cartons",
				},
				{
					id: 39,
					name: "Wine - Maipo Valle Cabernet",
					quantity: 94,
					units: null,
				},
				{
					id: 40,
					name: "Muffin Orange Individual",
					quantity: 64,
					units: "bags",
				},
			]);
		});
};
