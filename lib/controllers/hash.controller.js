const crypto = require("crypto");
const jwt = require("jsonwebtoken");
class HashController {
  hashPass(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha256")
      .toString("hex");
    return `${crypto.randomBytes(16).toString("hex")}.${salt}.${hash}`;
  }
  verifyHashPass(password, hashPass) {
    const salt = hashPass.split(".")?.[1];
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha256")
      .toString("hex");
    return `${hash}` === hashPass.split(".")?.[2];
  }
  #secret = "#%Yh1rR3#rQHrHjIFK3cmiDr^*o";
  signToken(user) {
    return jwt.sign(user, this.#secret, { expiresIn: "1h" });
  }
  verifyToken(token) {
    return jwt.verify(token, this.#secret);
  }
}

module.exports = new HashController();
