const express = require("express");
const userRoutes = express.Router();
const UsersController = require("../controllers/users.controllers");
const { authenticate, authorize } = require("../middlewares/authentication");
userRoutes.get(
  "/getAll",
  authenticate,
  authorize("Admin"),
  UsersController.getAll
);
userRoutes.get(
  "/getById/:id",
  authenticate,
  authorize("Admin"),
  UsersController.getById
);
// userRoutes.get("/getUserProjectId");
userRoutes.post("/signup", UsersController.signup);
userRoutes.post("/login", UsersController.login);
userRoutes.put("/edit", authenticate, UsersController.edit);
userRoutes.delete(
  "/delete",
  authenticate,
  authorize("Admin"),
  UsersController.remove
);
module.exports = userRoutes;
