const { Schema, model } = require("mongoose");
const responde = require("./responde");
const userController = require("../controllers/user.controller");
const fs = require("fs");
const AppSchema = new Schema(
  {
    urlSite: { type: String },
    assetsUrl: { type: Array },
    color: { type: String },
    appName: { type: String },
    langudge: { type: String },
    ownerId: { type: String },
    dateExpire: { type: Date },
  },
  { timeseries: true, _id: true }
);

const AppModel = model("app", AppSchema);

class App {
  async addApp(reqBody, reqFiles) {
    const { urlSite, color, appName, langudge, ownerId } = reqBody;
    console.log(reqFiles);
    const assetsUrl = [reqFiles[0]?.path, reqFiles[1]?.path];
    const dateExpire = new Date(reqBody.dateExpire); //2022-02-25
    let app;
    try {
      app = new AppModel({
        urlSite,
        assetsUrl,
        color,
        appName,
        langudge,
        ownerId,
        dateExpire,
      });
      const appSave = await app.save();
      return responde(201, appSave, "app created");
    } catch (error) {
      console.log(error);
    }
  }
  async getApp(reqparams) {
    const { id } = reqparams;
    try {
      const app = await AppModel.findById(id);
      if (app.dateExpire > Date.now()) {
        const { ownerId, _id, ...others } = app._doc;
        return responde(200, others, "app data");
      }
      return responde(200, {}, "date expired");
    } catch (error) {
      return responde(404, {}, error.message, error.path);
    }
  }
  async updateExpire(reqBody, reqparams) {
    try {
      const { id } = reqparams;
      const dateExpire = new Date(reqBody.dateExpire);
      const result = await AppModel.findByIdAndUpdate(id, {
        dateExpire: dateExpire,
      });
      return responde(200, result, "updated successfully");
    } catch (error) {
      return responde(404, {}, error.message, error.path);
    }
  }
  async deleteApp(reqparams) {
    try {
      const { id } = reqparams;
      const app = await AppModel.findByIdAndDelete(id);
      fs.unlinkSync(`${app.assetsUrl[0]}`);
      fs.unlinkSync(`${app.assetsUrl[1]}`);

      return responde(200, "deleted successfully");
    } catch (error) {
      return responde(404, {}, error.message, error.path);
    }
  }
}
module.exports = new App();
