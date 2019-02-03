const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);

router
	.route("/")
	.get((req, res) => {
		console.log("usersRouter");
		db("users")
			.then(users => {
				res.status(201).json(users);
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the GET route",
					err,
				})
			);
	})
	.post((req, res) => {
		if (req.body.username && req.body.password) {
			db("users")
				.insert(req.body)
				.then(users => {
					res.status(201).json(users);
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
				error: "You must include a name and a password",
			});
		}
	});

router
	.route("/:id")
	.get((req, res) => {
		db("users")
			.where({ id: req.params.id })
			.then(user => {
				res.status(201).json(user);
			})
			.catch(err =>
				res.status(500).json({
					error: "There has been a server error on the GET route",
					err,
				})
			);
	})
	.put((req, res) => {
		// if (req.body) {
		db("users")
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
		// } else {
		// 	res.status(400).json({
		// 		error: "You must include information to update",
		// 	});
		// }
	})
	.delete((req, res) => {
		db("users")
			.where({ id: req.params.id })
			.del()
			.then(count => {
				if (count > 0) {
					res.status(201).json({
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
