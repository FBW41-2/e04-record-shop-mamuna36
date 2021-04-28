const Record = require("../models/recordsModel");
// get all records
exports.getRecords = (req, res, next) => {
  // access db from global object   // select all records
  Record.find((err, records) => {
    if (err) return console.error(err);
    res.json(records);
  });
};

// get specific record
exports.getRecord = (req, res, next) => {
  const { id } = req.params;
  Record.findById(id, (err, entry) => {
    if (err) return res.json({ error: err });
    res.json(entry);
  });
};

// delete one record
exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;
  Record.findByIdAndRemove(id, (err, entry) => {
    if (err) return res.json({ error: err });
    res.json({ deleted: entry });
  });
};

// update one record
exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  Record.findByIdAndUpdate(
    id,
    { year: "2010" },
    { new: true },
    (err, entry) => {
      if (err) return res.json({ error: err });
      res.json(entry);
    }
  );
};

// create new record
exports.addRecord = (req, res, next) => {
  // create new record

  // const newRecord = new Record(req.body);
  // newRecord.save((err, entry) => {
  //   if (err) return console.error(err);
  //   res.json(entry);
  Record.create(req.body, (err, entry) => {
    if (err) return console.error(err);
    res.json(entry);
  });
};
