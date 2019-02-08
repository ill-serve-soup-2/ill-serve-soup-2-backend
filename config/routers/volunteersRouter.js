const express = require("express");
const knex = require("knex");
// const router = express.Router();
const server = express();
const bcrypt = require("bcryptjs");
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);
const middleware = require("../middleware.js");
const generateToken = middleware.generateToken;
const authenticate = middleware.authenticate;

server.post("/register", (req, res) => {
	const userInfo = req.body;

	userInfo.password = bcrypt.hashSync(userInfo.password, 14);
	if (userInfo.id) {
		res.status(400).json({
			error:
				"Please do not include the ID number in the registration. The system auto-generates them",
		});
	} else {
		userInfo.role = "volunteer";
		db("users")
			.insert(userInfo)
			.then(ids => {
				if (!ids) {
					res.status(400).json({
						message: `There has been some sort of error. Perhaps ${
							userInfo.username
						} is already in use?`,
					});
				} else {
					res.status(201).json({
						message: `Volunteer ${
							userInfo.username
						} has been successfully registered`,
						userID: ids[0],
					});
				}
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

server.post("/login", (req, res) => {
	const userInfo = req.body;

	db("users")
		.where({ username: userInfo.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(userInfo.password, user.password)) {
				const token = generateToken(user);
				res.status(201).json({
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

server.get("/locations", (req, res) => {
	db("locations")
		.select(
			"id",
			"name",
			"streetAddress",
			"city",
			"state",
			"zipCode",
			"email",
			"phone"
		)
		.where("volunteersNeeded", 1)
		// .first()
		.then(locations => {
			res.status(200).json(locations);
		})
		.catch(err =>
			res.status(500).json({
				err,
				message:
					"There has been an error on the Volunteer Locations GET endpoint",
			})
		);
});

// router.route("/signup").post((req, res) => {
// 	const userInfo = req.body;

// 	userInfo.password = bcrypt.hashSync(userInfo.password, 14);
// 	if (userInfo.id) {
// 		res.status(400).json({
// 			error:
// 				"Please do not include the ID number in the registration. The system auto-generates them",
// 		});
// 	} else {
// 		userInfo.role = "volunteer";
// 		db("users")
// 			.insert(userInfo)
// 			.then(ids => {
// 				res.status(201).json({
// 					message: `Volunteer ${
// 						userInfo.username
// 					} has been successfully registered`,
// 					userID: ids[0],
// 				});
// 			})
// 			.catch(err =>
// 				res.status(500).json({
// 					err,
// 					message:
// 						"There has been an error on the Register POST endpoint",
// 				})
// 			);
// 	}
// }).post((req, res) => { //
// 	const userInfo = req.body;

// 	db("users")
// 		.where({ username: userInfo.username })
// 		.first()
// 		.then(user => {
// 			console.log("uAR", user);
// 			if (user && bcrypt.compareSync(userInfo.password, user.password)) {
// 				const token = generateToken(user);
// 				res.status(200).json({
// 					message: user.username,
// 					token: token,
// 				});
// 			} else {
// 				res.status(401).json({
// 					message: "Incorrect username and/or password.",
// 				});
// 			}
// 		})
// 		.catch(err =>
// 			res.status(500).json({
// 				err,
// 				message: "There has been an error on the Login POST endpoint",
// 			})
// 		);
// })

// .get( (req, res) => {
// 	.use(authenticate)
// 	.route("/")
// 	.get((req, res) => {
// 		db("users")
// 			.then(users => {
// 				res.status(200).json(users);
// 			})
// 			.catch(err =>
// 				res.status(500).json({
// 					error: "There has been a server error on the GET route",
// 					err,
// 				})
// 			);
// 	});
// })

module.exports = server;
