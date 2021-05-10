const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userValidators = [body("email").isEmail()];

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/usersController");

router.route("/").get(getUsers).post(userValidators, addUser);

router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
