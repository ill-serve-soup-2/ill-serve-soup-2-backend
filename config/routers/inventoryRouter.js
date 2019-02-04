const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);
const helperFunctions = require("../helperFunctions.js");
const generateToken = helperFunctions.generateToken;
const authenticate = helperFunctions.authenticate;

router
	.use(authenticate)
	.route("/")
	.get((req, res) => {
		console.log("inventoryRouter");
		db("inventory")
			.then(inventory => {
				res.status(200).json(inventory);
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the GET route",
					err,
				})
			);
	})
	.post((req, res) => {
		if (req.body.name) {
			db("inventory")
				.insert(req.body)
				.then(ids => {
					res.status(201).json({
						message: `${
							req.body.name
						} has been added to the inventory`,
						itemId: ids,
					});
				})
				.catch(err =>
					res.status(500).json({
						error:
							"There has been a server error on the POST route",
						err,
					})
				);
		} else {
			res.status(400).json({
				error: "You must include a name, at minimum",
			});
		}
	});

router
	.use(authenticate)
	.route("/:id")
	.get((req, res) => {
		db("inventory")
			.where({ id: req.params.id })
			.then(item => {
				res.status(200).json(item);
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the GET route",
					err,
				})
			);
	})
	.put((req, res) => {
		db("inventory")
			.where({ id: req.params.id })
			.update(req.body)
			.then(count => {
				if (count > 0) {
					res.status(201).json({
						message: `${count} record has been updated.`,
					});
				} else {
					res.status(404).json({
						error: `The requested ID does not exist`,
					});
				}
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the PUT route",
					err,
				})
			);
	})
	.delete((req, res) => {
		db("inventory")
			.where({ id: req.params.id })
			.del()
			.then(count => {
				if (count > 0) {
					res.status(200).json({
						message: `${count} record has been deleted.`,
					});
				} else {
					res.status(404).json({
						error: `The requested ID does not exist`,
					});
				}
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the DELETE route",
					err,
				})
			);
	});

module.exports = router;
