const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET;

const helperFunctions = {
	register: (req, res) => {
		const userInfo = req.body;

		userInfo.password = bcrypt.hashSync(userInfo.password, 14);

		db("users")
			.insert(userInfo)
			.then(ids => {
				res.status(201).json(ids);
			})
			.catch(err =>
				res.status(500).json({
					err,
					message: "There has been an error on the Register function",
				})
			);
	},

	generateToken: user => {
		// console.log("in generateToken", user);
		const payload = {
			username: user.username,
			role: user.role,
		};

		const secret = process.env.JWT_SECRET;

		const options = {
			expiresIn: "120m",
		};
		return jwt.sign(payload, secret, options);
	},
	authenticate: (req, res, next) => {
		console.log("in authenticate");
		const token = req.get("Authorization");
		if (token) {
			jwt.verify(token, jwtKey, (err, decoded) => {
				if (err) {
					return res.status(401).json(err);
				}
				req.decoded = decoded;
				this.userRole = () => req.decoded.role;

				next();
			});
		} else {
			console.error(
				"401 - Not Authorized - Perhaps you forgot to include the token on the Authorization header? Just a guess..."
			);
			return res.status(401).json({
				message: "401 - Not Authorized",
				error:
					"401 - Not Authorized - Perhaps you forgot to include the token on the Authorization header? Just a guess...",
			});
		}
	},
	permissionCheck: (req, res, next) => {
		const token = req.get("Authorization");
		console.log("in permissionCheck");
		if (token) {
			jwt.verify(token, jwtKey, (err, decoded) => {
				req.decoded = decoded;
				userRole = req.decoded.role;
				console.log("role is", userRole);
				if (err) {
					return res.status(401).json(err);
				}
				if (userRole === "volunteer" || userRole === null) {
					return res.status(401).json({
						status: 401,
						message:
							"Only staff members are permitted to complete that action.",
					});
				} else {
					next();
				}
			});
		}
	},
};

module.exports = helperFunctions;
