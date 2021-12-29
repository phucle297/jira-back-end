const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes");
const reponseInterceptor = require("./middlewares/interceptors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(reponseInterceptor);
app.use("/api", rootRouter);

app.listen(8080);
// ? Setup sequelize
const { sequelize } = require("./models");
sequelize.sync({ alter: true });
