const express = require("express");
const rootRouter = express.Router();
rootRouter.use("/comments", require("./comments.routes"));
rootRouter.use("/users", require("./users.routes"));
rootRouter.use("/task-types", require("./taskType.routes"));
rootRouter.use("/status", require("./status.routes"));
rootRouter.use("/priority", require("./priority.routes"));
rootRouter.use("/project-category", require("./projectCategory.routes"));
rootRouter.use("/projects", require("./projects.routes"));

module.exports = rootRouter;
