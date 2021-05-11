const { body } = require("express-validator");
const { passwordStrength } = require("check-password-strength");
module.exports = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("This is not a valid email address"),
  body("password")
    .isStrongPassword()
    .withMessage(passwordStrength("A@2asdF2020!!*").value),
  body("firstName")
    .exists()
    .trim()
    .withMessage("Please provide your first name"),
];
