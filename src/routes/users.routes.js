const express = require("express");
const userRoutes = express.Router();
const UsersController = require("../controllers/users.controllers");
const { authenticate, authorize } = require("../middlewares/authentication");
const multer = require("multer");
const aws = require("aws-sdk");
const storage = multer.memoryStorage();
const upload = multer({ storage });

userRoutes.post(
  "/upload",
  upload.single("file"),
  authenticate,
  UsersController.uploadAvatar
);
userRoutes.get(
  "/get-all",
  authenticate,
  authorize("Admin"),
  UsersController.getAll
);
userRoutes.get(
  "/get-by-id/:id",
  authenticate,
  authorize("Admin"),
  UsersController.getById
);
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
