const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET;

const helperFunctions = {
	register: (req, res) => {
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
	},
	generateToken: user => {
		console.log("in generateToken");
		const payload = {
			username: user.username,
		};

		const secret = process.env.JWT_SECRET;

		const options = {
			expiresIn: "120m",
		};
		console.log(payload, secret, options);
		return jwt.sign(payload, secret, options);
	},
	authenticate: (req, res, next) => {
		const token = req.get("Authorization");

		if (token) {
			jwt.verify(token, jwtKey, (err, decoded) => {
				if (err) return res.status(401).json(err);

				req.decoded = decoded;

				next();
			});
		} else {
			console.error(
				"401 - Not Authorized - Perhaps you forgot to include the token on the Authorization header? Just a guess..."
			);
			return res.status(401).json({
				message: "401 - Not Authorized",
				error:
					"No token provided, must be set on the Authorization Header",
			});
		}
	},
};

module.exports = helperFunctions;
