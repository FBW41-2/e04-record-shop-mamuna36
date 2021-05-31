const User = require("../models/User");
//const createError;
var jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const token = await req.headers["x-auth"];
  try {
    const tokenData = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = tokenData;
    next();
  } catch (error) {
    next(error);
  }
};
