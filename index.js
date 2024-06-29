//importPakages------------------------------------
const express = require("express");
const envData = require("./config/env.controller");
const userRout = require("./lib/routes/user.rout");
const appRout = require("./lib/routes/app.rout");
const {
  errorHandler,
  PageNotFound,
} = require("./lib/middleware/error.handeler");
const app = express();

//midelware------------------------------------

app.use(express.json());
app.use("/assets", express.static("./assets"));
//route------------------------------------
app.use("/user", userRout);
app.use("/app", appRout);

//errorHandeler------------------------------------

app.use(PageNotFound);
app.use(errorHandler);

//startApp------------------------------------
app.listen(envData.configdata.port, () => {
  console.log("server run... " + envData.configdata.url);
  require("./lib/db");
});
