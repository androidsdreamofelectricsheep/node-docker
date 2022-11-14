const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

const User = mongoose.model("User", userScheme);

module.exports = User;
