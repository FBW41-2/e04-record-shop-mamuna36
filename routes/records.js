const express = require("express");
const router = express.Router();
const checkAdmin = require("../middleware/roleAuthentication");
const auth = require("../middleware/checkLogin");

const {
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  addRecord,
} = require("../controllers/recordsController");

router.route("/").get(auth, getRecords).post(auth, checkAdmin, addRecord);

router
  .route("/:id")
  .get(auth, getRecord)
  .delete(auth, checkAdmin, deleteRecord)
  .put(auth, checkAdmin, updateRecord);

module.exports = router;
