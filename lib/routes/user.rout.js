const { Router } = require("express");
const userController = require("../controllers/user.controller");
const router = new Router();

//------------------------------------
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
//------------------------------------

//------------------------------------

//------------------------------------

module.exports = router;
