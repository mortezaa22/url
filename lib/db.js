const mongoose = require("mongoose");
const envController = require("../config/env.controller");

mongoose.set("strictQuery", true);
mongoose
  .connect(envController.configdata.urlDB)
  .then(() => console.log("connected to db"))
  .catch((error) => console.error(error));

module.exports = mongoose;
