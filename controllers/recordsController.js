const mongodb = require("mongodb");

// get all records
exports.getRecords = (req, res, next) => {
  // access db from global object   // select all records
  req.app.locals.db
    .collection("records")
    .find()
    .toArray((err, docs) => {
      res.json(docs);
    });
};

// get specific record
exports.getRecord = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("records")
    .findOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      res.json(result);
    });
};

// delete one record
exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("records")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      console.log("del result", result);
      res.json({ deleted: result.deletedCount });
    });
};

// update one record
exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.collection("records").updateOne(
    // filter
    { _id: new mongodb.ObjectID(id) },
    // new data
    {
      $set: req.body,
    },
    // callback function
    (err, entry) => {
      res.json(entry);
    }
  );
};

// create new record
exports.addRecord = (req, res, next) => {
  const record = req.body;
  // access db from global object
  req.app.locals.db.collection("records").insertOne(record, (err, entry) => {
    res.json(entry);
  });
};
