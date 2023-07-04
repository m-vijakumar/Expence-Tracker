const mongoose = require("mongoose");

const DB_URI = require("../keys/connect-db.js").monogodbURI;

console.log(DB_URI);
const dbConnect = async () => {
  await mongoose
    .connect(DB_URI)
    .then(() => console.log("Mongodb connected.."))
    .catch((err) => console.log(err));
};

module.exports = { dbConnect };
