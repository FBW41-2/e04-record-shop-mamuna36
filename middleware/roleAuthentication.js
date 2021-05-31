module.exports = (req, res, next) => {
  try {
    if (req.user.role == "Admin") {
      next();
    } else {
      next({ message: "you do not have admin rights." });
    }
  } catch (e) {
    next(e);
  }
};
