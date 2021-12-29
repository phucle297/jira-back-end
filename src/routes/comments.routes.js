const express = require("express");
const commentsRouter = express.Router();
commentsRouter.get("/getAll");
module.exports = commentsRouter;
