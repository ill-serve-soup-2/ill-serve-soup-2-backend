const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);
const helperFunctions = require("../helperFunctions.js");
const authenticate = helperFunctions.authenticate; // Checks for token
const permissionCheck = helperFunctions.permissionCheck;

// I know I did not need to use router for this, but I figured I should be consistent

router
	.use(permissionCheck, authenticate)
	.route("/")
	.get((req, res) => {
		db("users")
			.select("id", "username", "name", "role", "email", "phone") // Basically, everything but password
			.then(users => {
				res.status(200).json(users);
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the GET route",
					err,
				})
			);
	});

router
	.use(authenticate)
	.route("/:id")
	.get((req, res) => {
		db("users")
			.select("id", "username", "name", "role", "email", "phone") // Basically, everything but password
			.where({ id: req.params.id })
			.first() // makes it return an object, rather than an array with an object in it
			.then(user => {
				res.status(200).json(user);
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the GET route",
					err,
				})
			);
	})
	.put((req, res) => {
		if (req.body.id) {
			// Passing an id here will throw off the auto-incrementing system, so I am blocking it with this if/else
			res.status(400).json({
				error:
					"Please do not include the ID number in the update request body. The system auto-generates them",
			});
		} else {
			db("users")
				.where({ id: req.params.id })
				.update(req.body)
				.then(count => {
					if (count > 0) {
						res.status(201).json({
							message: `Updated ${count} record(s)`,
						});
					} else {
						res.status(404).json({
							error: `The requested ID does not exist`,
						});
					}
				})
				.catch(err =>
					res.status(500).json({
						error:
							"There has been a server error on the User PUT route",
						err,
					})
				);
		}
	})
	.delete((req, res) => {
		db("users")
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
