const { Router } = require("express");
const appController = require("../controllers/app.controller");
const fileStorage = require("../middleware/multerc");
const { checkLoginToken } = require("../models/user.model");
const router = new Router();

//------------------------------------
router.post("/new_app", fileStorage.array("image", 2), appController.addApp);
//------------------------------------
router.get("/:id", appController.getApp);
//------------------------------------
router.put("/update_expire/:id", appController.updateExpire);
//------------------------------------
router.delete("/:id", appController.deleteApp);

module.exports = router;
