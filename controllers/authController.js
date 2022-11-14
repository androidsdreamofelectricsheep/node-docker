const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassowrd = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassowrd,
    });

    req.session.user = newUser;

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(666).json({
      status: "failed",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(666).json({
        status: "failed",
        message: "user not found",
      });
    }

    const isValidPwd = await bcrypt.compare(password, user.password);

    if (isValidPwd) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(666).json({
        status: "failed",
        message: "incorrect username or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(666).json({
      status: "failed",
    });
  }
};
