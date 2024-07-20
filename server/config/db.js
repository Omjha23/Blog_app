const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://omojtb:ApT14XEbhOyMfXrU@cluster0.juoujsc.mongodb.net/FrokerDb";

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => console.log(`DB Connection Success`))
    .catch((err) => {
      console.log(`DB Connection Failed`);
      console.log(err);
      process.exit(1);
    });
};
