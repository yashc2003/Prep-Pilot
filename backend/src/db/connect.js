const mongoose = require("mongoose");

async function connectToDatabase(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    autoIndex: true
  });
  return mongoose.connection;
}

module.exports = { connectToDatabase };

