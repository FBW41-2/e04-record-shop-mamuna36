exports.recordsList = function (req, res) {
  res.json(db);
};
exports.createRecords = function (req, res) {
  db.push({
    name: req.body.name,
    title: req.body.title,
    year: req.body.year,
  }).write();
  res.redirect("/api/records");
};
