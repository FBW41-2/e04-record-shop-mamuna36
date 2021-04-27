// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('data/db.json');
// const db = low(adapter);
const mongodb = require("mongodb");
// get all orders
exports.getOrders = (req, res, next) => {
  // access db from global object   // select all records
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray((err, docs) => {
      res.json(docs);
    });
};
// get one specific order
exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("orders")
    .findOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      res.json(result);
    });
};
// delete one order
exports.deleteOrder = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("orders")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      console.log("del result", result);
      res.json({ deleted: result.deletedCount });
    });
};
// update one order
exports.updateOrder = (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  const order = db.get("orders").find({ id }).assign(dt).write();
  res.status(200).send(order);
};
// adding one order
exports.addOrder = (req, res, next) => {
  const order = req.body;
  db.get("orders")
    .push(order)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(order);
};
