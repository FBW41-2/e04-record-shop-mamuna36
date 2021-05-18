const User = require("../models/User");
const createError = require("http-errors");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password -__v")
      .sort("lastName")
      .limit(5);
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  const userData = req.body;
  //encrypt password
  userData.password = await bcrypt.hash(userData.password, 10);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = new User(req.body);
    //encrypt password
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};
exports.loginUser = async (req, res, next) => {
  const userCredentials = req.body;
  const email = req.body.email;
  const password = req.body.password;
  // get user from database
  const foundUser = await User.findOne({ email: email }).select("+password");
  console.log(foundUser);
  if (!foundUser) {
    res.json({ error: "User not found" });
  } else if (await bcrypt.compare(password, foundUser.password)) {
    res.json({ status: "logged in", user: foundUser });
  } else {
    res.json({ error: "Wrong password" });
  }
};
