const crypto = require("crypto");
const db = [];
const salt = `helloCodeCrackers`;
const encryptedPassword = (password) => {
  return (
    crypto
      //define encryption strength
      .createHash("sha256")
      //give the password
      .update(password + salt)
      .digest("hex")
  );
};
const register = (username, password) => {
  const hashedPassword = encryptedPassword(password);
  db.push({ username, hashedPassword });
  console.log("register store in DB", username, hashedPassword);
};
register("Mamuna", "Mash123");
const login = (username, password) => {
  //find user in DB
  const DBUser = db.find((u) => u.username === username);
  //compare password
  const hashedPassword = encryptedPassword(password);
  console.log("login", DBUser.hashedPassword, "==", hashedPassword);
  if (DBUser.hashedPassword === hashedPassword) {
    console.log("login", username, hashedPassword);
  }
};
login("Mamuna", "Mash123");
