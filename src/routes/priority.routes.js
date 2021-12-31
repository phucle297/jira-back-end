const express = require("express");
const priorityRouter = express.Router();
const PriorityControllers = require("../controllers/priority.controllers");
const { authenticate } = require("../middlewares/authentication");
priorityRouter.get("/", authenticate, PriorityControllers.getAll);
module.exports = priorityRouter;
