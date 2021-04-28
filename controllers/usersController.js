const User = require("../models/User");
// get all users
exports.getUsers = (req, res, next) => {
  // access db from global object   // select all records
  User.find((err, records) => {
    if (err) return console.error(err);
    res.json(records);
  });
};

// get specific user
exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id, (err, entry) => {
    if (err) return res.json({ error: err });
    res.json(entry);
  });
};

// delete one user
exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, entry) => {
    if (err) return res.json({ error: err });
    res.json({ deleted: entry });
  });
};

// update one user
exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(
    id,
    { lastName: "Smith" },
    { new: true },
    (err, entry) => {
      if (err) return res.json({ error: err });
      res.json(entry);
    }
  );
};

// create new user
exports.addUser = (req, res, next) => {
  // create new record
  User.create(req.body, (err, entry) => {
    if (err) return console.error(err);
    res.json(entry);
  });
};
