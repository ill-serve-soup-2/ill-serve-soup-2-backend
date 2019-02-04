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

router.route("/register").post((req, res) => {
	const userInfo = req.body;

	userInfo.password = bcrypt.hashSync(userInfo.password, 12); //set higher for production
	console.log(userInfo);
	if (userInfo.id) {
		res.status(400).json({
			error:
				"Please do not include the ID number in the registration. The system auto-generates them",
		});
	} else {
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
	}
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

module.exports = router;
