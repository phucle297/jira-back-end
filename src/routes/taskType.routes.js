const express = require("express");
const taskTypeRouter = express.Router();
const TaskTypeController = require("../controllers/taskType.controllers");
const { authenticate } = require("../middlewares/authentication");

taskTypeRouter.get("/", authenticate, TaskTypeController.getAll);

module.exports = taskTypeRouter;
