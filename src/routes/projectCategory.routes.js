const express = require("express");
const projectCategoryRouter = express.Router();
const ProjectCategoryController = require("../controllers/projectCategory.controllers");
const { authenticate } = require("../middlewares/authentication");
projectCategoryRouter.get("/", authenticate, ProjectCategoryController.getAll);

module.exports = projectCategoryRouter;
