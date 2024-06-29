//importPakages------------------------------------
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //makeAssetsFolder------------------------------------
    fs.mkdirSync("assets/", { recursive: true });
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    //changeNameTheImage------------------------------------
    const ext = path.extname(file.originalname);
    const whiteListFormat = [".png", ".jpg", ".jpeg"];
    if (whiteListFormat.includes(ext)) {
      const filename = req.body.appName + Date.now() + ext;
      cb(null, filename);
    } else cb(new Error("only image suported"));
  },
});
const _300k = 307200;
const fileStorage = multer({ storage: storage, limits: { fileSize: _300k } });
//exportValueToAllFile------------------------------------
module.exports = fileStorage;
