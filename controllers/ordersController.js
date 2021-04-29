const Order = require("../models/Order");
// get all orders
exports.getOrders = (req, res, next) => {
  // access db from global object   // select all records
  Order.find((err, records) => {
    if (err) return console.error(err);
    res.json(records);
  });
};

// get specific order
exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  Order.findById(id, (err, entry) => {
    if (err) return res.json({ error: err });
    res.json(entry);
  });
};

// delete one order
exports.deleteOrder = (req, res, next) => {
  const { id } = req.params;
  Order.findByIdAndRemove(id, (err, entry) => {
    if (err) return res.json({ error: err });
    res.json({ deleted: entry });
  });
};

// update one order
exports.updateOrder = (req, res, next) => {
  const { id } = req.params;
  Order.findByIdAndUpdate(id, req.body, { new: true }, (err, entry) => {
    if (err) return res.json({ error: err });
    res.json(entry);
  });
};

// create new order
exports.addOrder = (req, res, next) => {
  Order.create(req.body, (err, entry) => {
    if (err) return console.error(err);
    res.json(entry);
  });
};
