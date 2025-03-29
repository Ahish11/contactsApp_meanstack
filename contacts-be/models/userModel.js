const mongoose = require("mongoose");

const userSchema =new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the user name"],
    },
    email: {
      type: String,
      required: [true, "please add email address"],
    },
    password: {
      type: String,
      required: [true, "please add user password"],
    },
  },
  {
    timesStamps: true,
  }
);
//User -> denotes schema name
module.exports = mongoose.model("User", userSchema);
