const express = require("express");
const projectRoutes = express.Router();
const ProjectControllers = require("../controllers/projects.controllers");

projectRoutes.get("/admin", ProjectControllers.getAllAdmin);
projectRoutes.get("/:id", ProjectControllers.getById);
projectRoutes.get("/", ProjectControllers.getAll);
projectRoutes.post("/", ProjectControllers.create);
projectRoutes.put("/", ProjectControllers.update);
projectRoutes.delete("/:id", ProjectControllers.remove);
module.exports = projectRoutes;
