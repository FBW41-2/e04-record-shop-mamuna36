const express = require("express");
const router = express.Router();
const lowdb = require("lowdb");
const records = [
  {
    name: "Ali Zafer",
    title: "Tu hi hai",
    year: "2003",
  },
  {
    name: "Atif",
    title: "Tera honay laga hun",
    year: "2008",
  },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index", { title: "Express" });
});
router.get("/api/records", function (req, res, next) {
  res.json(records);
});
router.post("/api/records", function (req, res, next) {
  records.push({
    name: req.body.name,
    title: req.body.title,
    year: req.body.year,
  });
  res.redirect("/api/records");
});
module.exports = router;
