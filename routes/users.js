const express = require("express");
const router = express.Router();
const userValidators = require("../lib/validation/userRules");
const validator = require("../middleware/validator");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/usersController");

router.route("/").get(getUsers).post(userValidators, validator, addUser);

router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
