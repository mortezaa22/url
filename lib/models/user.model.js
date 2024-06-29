//importPakages------------------------------------
const { Schema, model } = require("mongoose");
const responde = require("./responde");
const hashController = require("../controllers/hash.controller");

//createModelForDataBase------------------------------------
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minLenght: 3,
      maxLenght: 10,
    },
    password: { type: String, required: true },
    //userApp: { type: , default:  },

    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, _id: true }
);

const UserModel = model("user", UserSchema);

//add-remove-get-update-Model------------------------------------
class User {
  async checkLoginUser(reqBody) {
    const user = await UserModel.findOne({ userName: reqBody.userName })
      .then((value) => {
        console.log(value);
        const verify = hashController.verifyHashPass(
          reqBody.password,
          value.password
        );
        const { password, ...others } = value._doc;
        others.token = hashController.signToken({
          userid: others._id,
          userName: others.userName,
        });
        return verify
          ? responde(200, others, "login successfully")
          : responde(404, {}, "user or password not curect");
      })
      .catch((error) => responde(404, {}, "user or password not curect"));
    return user;
  }

  async checkLoginToken(reqBody) {
    const { token } = reqBody;
    return hashController.verifyToken(token);
  }

  async addUser(reqBody) {
    let newUser;
    try {
      newUser = new UserModel({
        userName: reqBody.userName,
        password: hashController.hashPass(reqBody.password),
        dateExpire: reqBody.dateExpire,
        userData: reqBody.userData,
      });
      const saveUser = await newUser.save();
      const { password, ...others } = saveUser._doc;
      others.token = hashController.signToken({
        userid: others._id,
        userName: others.userName,
      });
      return responde(201, others, "created successfully");
    } catch (error) {
      return responde(500, error.message, error.path);
    }
  }
  async getUserById(id) {
    return UserModel.findById(id);
  }

  getUser() {  

    UserModel.findOneAndUpdate({});
  }
  deleteUser() {}
  updateUser() {}
}
module.exports = new User();
