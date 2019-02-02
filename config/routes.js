const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig.js");
const jwt = require("jsonwebtoken");

// const authenticate = require("../auth/authenticate");

module.exports = server => {
	server.post("/api/register", register);
	server.post("/api/login", login);
};

function register(req, res) {
	const userInfo = req.body;

	userInfo.password = bcrypt.hashSync(userInfo.password, 12); //set higher for production

	db("users")
		.insert(userInfo)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err =>
			res.status(500).json({
				err,
				message:
					"There has been an error on the Register POST endpoint",
			})
		);
}

function generateToken(user) {
	console.log("in generateToken");
	const payload = {
		username: user.username,
	};

	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: "120m",
	};
	return jwt.sign(payload, secret, options);
}

function login(req, res) {
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
}
