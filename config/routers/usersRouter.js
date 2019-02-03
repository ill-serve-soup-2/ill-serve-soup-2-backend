const express = require("express");
const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);
const helperFunctions = require("../helperFunctions.js");
const generateToken = helperFunctions.generateToken;
const authenticate = helperFunctions.authenticate;

router
	.use(authenticate)
	.route("/")
	.get((req, res) => {
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
	});

router.route("/register").post((req, res) => {
	const userInfo = req.body;

	userInfo.password = bcrypt.hashSync(userInfo.password, 12); //set higher for production

	db("users")
		.insert(userInfo)
		.then(ids => {
			res.status(201).json({
				message: `User ${
					userInfo.username
				} has been successfully registered`,
				userID: ids[0],
			});
		})
		.catch(err =>
			res.status(500).json({
				err,
				message:
					"There has been an error on the Register POST endpoint",
			})
		);
});

router.route("/login").post((req, res) => {
	const userInfo = req.body;

	db("users")
		.where({ username: userInfo.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(userInfo.password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message: user.username,
					token: token,
				});
			} else {
				res.status(401).json({
					message: "Incorrect username and/or password.",
				});
			}
		})
		.catch(err =>
			res.status(500).json({
				err,
				message: "There has been an error on the Login POST endpoint",
			})
		);
});

router
	.use(authenticate)
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
