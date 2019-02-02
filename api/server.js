const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("../config/routes.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan);

routes(server);

server.get("/", (req, res) => {
	res.status(200).send("Server alive");
});

module.exports = {
	server,
};
