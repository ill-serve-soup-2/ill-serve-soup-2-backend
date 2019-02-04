const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const inventoryRouter = require("../config/routers/inventoryRouter.js");
const usersRouter = require("../config/routers/usersRouter.js");
const locationsRouter = require("../config/routers/locationsRouter.js");
const userAccountsRouter = require("../config/routers/userAccountsRouter.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).send("Server alive");
});

server.use("/api/inventory", inventoryRouter);
server.use("/api/users", usersRouter);
server.use("/api/locations", locationsRouter);
server.use("/api/useraccounts", userAccountsRouter);

module.exports = server;
