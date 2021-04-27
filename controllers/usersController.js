// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('data/db.json');
// const db = low(adapter);
const mongodb = require("mongodb");
// get all users
exports.getUsers = (req, res, next) => {
  // access db from global object
  req.app.locals.db
    .collection("users")
    .find()
    .toArray((err, docs) => {
      res.json(docs);
    });
};
// get one user
exports.getUser = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("users")
    .findOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      res.json(result);
    });
};
// delete one user
exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("users")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      console.log("del result", result);
      res.json({ deleted: result.deletedCount });
    });
};
// update one user
exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.collection("users").updateOne(
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
// adding one user
exports.addUser = (req, res, next) => {
  const order = req.body;
  db.get("users")
    .push(order)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(order);
};
