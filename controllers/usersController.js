const User = require("../models/User");
const createError = require("http-errors");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: "mamuna_anwar@hotmail.com",
//   from: "mamuna.anwar@gmail.com", // Use the email address or domain you verified above
//   subject: "Sending my first email",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// //ES6
// sgMail.send(msg).then(
//   () => {},
//   (error) => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// );
// //ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body);
//     }
//   }
// })();
// get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -__v").sort("lastName");
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

// get one specific user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

// delete one specific user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

// updating one user
exports.updateUser = async (req, res, next) => {
  const token = req.headers.key;
  const userData = req.body;
  // is the request coming from a logged in user?
  // Find the user with provided key, the convention is send the key in the header
  const loggedInUser = await User.findOne({ token: token });
  console.log("loggedInUser", loggedInUser);
  if (!token || !loggedInUser) {
    return next({ message: "Permission denied. You have to log in." });
  }
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

// adding a new user
exports.addUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = new User(req.body);
    //encrypt password
    user.password = await bcrypt.hash(user.password, 10);
    // generate token
    const emailToken = crypto.randomBytes(20).toString("hex");

    // store token
    user.emailToken = emailToken;
    const email = user.email;

    await user.save();
    // define email
    const msg = {
      to: email,
      from: "mamuna.anwar@gmail.com", // Use the email address or domain you verified above
      subject: "Greetings",
      text: `Please click this link to verify your email address: ${process.env.SERVER_URL}/users/verify/${emailToken}`,
    };

    // send email
    await sgMail.send(msg);
    res.set({ "x-auth": emailToken }).status(200).send(user);
  } catch (e) {
    next(e);
  }
};
//controller to verify email
exports.verifyEmail = async (req, res) => {
  //here use the same variable that is used in the verify route
  const { emailToken } = req.params;
  console.log("verify email");
  try {
    // find user that has this token
    const user = await User.findOne({ emailToken: emailToken });
    user.emailVerified = true;
    await user.save();
    res.send("Your email address has been verified.");
  } catch (err) {
    console.error(err);
  }
};
// login user
exports.loginUser = async (req, res, next) => {
  const userCredentials = req.body;
  const inputPassword = userCredentials.password;
  // get user from database
  const foundUser = await User.findOne({ email: userCredentials.email }).select(
    "+password"
  );
  const password = foundUser.password;
  const isCorrectPassword = await bcrypt.compare(inputPassword, password);
  console.log(foundUser);
  if (!foundUser) {
    res.json({ error: "User not found" });
  } else if (isCorrectPassword) {
    //generate random string using built in library crypto
    const token = crypto.randomBytes(30).toString("hex");
    // store key in our db entry
    await User.findByIdAndUpdate(foundUser.id, { token });
    res.json({ status: "logged in", token }).header("x-auth", token);
    //.send(foundUser);
  } else {
    res.json({ error: "Wrong password" });
  }
  next();
};
//verify email
// exports.verifyEmail = (req, res) => {
//   const { token } = req.params
//   try {
//     //find the user with given token
//     User.find
//   }
//  }
