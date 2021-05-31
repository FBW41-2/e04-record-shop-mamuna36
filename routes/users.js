const express = require("express");
const router = express.Router();
const { validateInputs } = require("../middleware/validator");
const checkAdmin = require("../middleware/roleAuthentication");
const auth = require("../middleware/checkLogin");
const { userValidationRules } = require("../lib/validation/userRules");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
  loginUser,
} = require("../controllers/usersController");

router
  .route("/")
  .get(auth, checkAdmin, getUsers)
  .post(auth, validateInputs(userValidationRules), addUser);

router.route("/login").post(auth, loginUser);
router
  .route("/:id")
  .get(auth, getUser)
  .delete(auth, deleteUser)
  .put(auth, updateUser, getUsers);

module.exports = router;
