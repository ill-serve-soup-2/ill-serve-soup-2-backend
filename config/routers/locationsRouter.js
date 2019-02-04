const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);
const helperFunctions = require("../helperFunctions.js");
const authenticate = helperFunctions.authenticate;

router
	.use(authenticate)
	.route("/")
	.get((req, res) => {
		console.log("locationsRouter");
		db("locations")
			.then(locations => {
				res.status(200).json(locations);
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
			db("locations")
				.insert(req.body)
				.then(ids => {
					res.status(201).json({
						message: `${
							req.body.name
						} has been added to the locations directory`,
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
			res.status(400).json({ error: "You must include a name" });
		}
	});

router
	.use(authenticate)
	.route("/:id")
	.get((req, res) => {
		db("locations")
			.where({ id: req.params.id })
			.first()
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
		db("locations")
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
						"There has been a server error on the locations PUT route",
					err,
				})
			);
	})
	.delete((req, res) => {
		db("locations")
			.where({ id: req.params.id })
			.del()
			.then(count => {
				if (count > 0) {
					res.status(200).json({
						message: `Deleted ${count} record(s)`,
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
						"There has been a server error on the locations DELETE route",
					err,
				})
			);
	});

module.exports = router;
