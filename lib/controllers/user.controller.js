const userModel = require("../models/user.model");

class UserController {
  userRegister(req, res, nex) {
    userModel.addUser(req.body).then((result) => res.json(result));
  }
  userLogin(req, res, nex) {
    userModel.checkLoginUser(req.body).then((result) => res.json(result));
  }
}

module.exports = new UserController();
