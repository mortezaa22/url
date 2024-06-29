const appModel = require("../models/app.model");

class AppController {
  addApp(req, res, nex) {
    console.log(req.files);
    appModel.addApp(req.body, req.files).then((value) => res.json(value));
  }
  getApp(req, res, nex) {
    appModel.getApp(req.params).then((value) => {
      res.json(value);
    });
  }
  updateExpire(req, res, nex) {
    appModel
      .updateExpire(req.body, req.params)
      .then((value) => res.json(value));
  }
  deleteApp(req, res, nex) {
    appModel.deleteApp(req.params).then((value) => res.json(value));
  }
}
module.exports = new AppController();
