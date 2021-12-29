const express = require("express");
const statusRouter = express.Router();
const StatusController = require("../controllers/status.controllers");
const { authenticate } = require("../middlewares/authentication");

statusRouter.get("/", authenticate, StatusController.getAll);

module.exports = statusRouter;
