const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { recordsList, createRecords } = require("../controllers/api");

const adapter = new FileSync("./data/db.json");
const db = low(adapter);
router.route("/records").get(recordsList).post(createRecords);

module.exports = router;
