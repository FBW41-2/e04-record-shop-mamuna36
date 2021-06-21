var faker = require("faker");
const mongoose = require("mongoose");
const User = require("../models/User");

console.log("I shall purge all users");
/** ENV VARIABLES **/
const dBURL = process.env.DB_URL;
const dBPassword = process.env.DB_PASSWORD;
const dBUser = process.env.DB_USER;

(async function () {
  /**CONNECT TO DB */
  mongoose.connect(`mongodb+srv://${dBUser}:${dBPassword}@${dBURL}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", console.error);
  mongoose.connection.on("open", function () {
    console.log("Database connection established...");
  });

  console.log("I will purge all the old users...");

  try {
    await User.deleteMany({});
    console.log("Users purged");
  } catch (err) {
    console.error(err);
  }
  mongoose.connection.close();
})();
