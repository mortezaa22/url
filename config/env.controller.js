//importPakages------------------------------------
const dotenv = require("dotenv");
const path = require("path");
class ENVController {
  configdata = {};
  constructor() {
    //forGetServerMoodIsLocalOrServer------------------------------------
    const pathENV = path.join(__dirname + "/.env");
    dotenv.config({ path: pathENV });
    const envMood = process.env.NODEMOOD;
    //forGetAcualValue------------------------------------
    dotenv.config({
      path: pathENV + "." + envMood,
    });
    this.configdata = {
      url: process.env.URL,
      port: process.env.PORT,
      urlDB: process.env.URLDB,
    };
  }
}
//exportClassToAllFile------------------------------------
module.exports = new ENVController();
