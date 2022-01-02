const express = require("express");
const projectRoutes = express.Router();
const ProjectControllers = require("../controllers/projects.controllers");
const { authenticate } = require("../middlewares/authentication");
projectRoutes.get("/admin", authenticate, ProjectControllers.getAllAdmin);
projectRoutes.get("/:id", authenticate, ProjectControllers.getById);
projectRoutes.get("/", authenticate, ProjectControllers.getAll);
projectRoutes.post("/", authenticate, ProjectControllers.create);
projectRoutes.put("/", authenticate, ProjectControllers.update);
projectRoutes.delete("/:id", authenticate, ProjectControllers.remove);

projectRoutes.post(
  "/assign-user-project",
  ProjectControllers.assignUserProject
);
module.exports = projectRoutes;
