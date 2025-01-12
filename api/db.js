const mongoose = require("mongoose");
const error = require("mongoose/lib/error");

const connectionString = `mongodb://127.0.0.1:27017/masterDb`;

let connection;
async function connectToDb() {
  try {
    if (!connection) {
      connection = await mongoose.connect(connectionString);
      process.env.masterDbReady = "true";
    }
    return connection;
  } catch (error) {
    throw Error(error);
  }
}

function getDb() {
  return connection.connection;
}

module.exports = { connectToDb, getDb };
