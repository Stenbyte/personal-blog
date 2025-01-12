const mongoose = require("mongoose");
const error = require("mongoose/lib/error");
const { customError } = require("./middleware/errorHandler");

const connectionString = `mongodb://127.0.0.1:27017`;

let connection;
async function connectToDb() {
  try {
    if (!connection) {
      mongoose.connection.on("connected", () =>
        console.log("✅ Connected to MongoDB")
      );

      mongoose.connection.on("disconnected", async () => {
        console.warn("⚠️ MongoDB Disconnected. Reconnecting...");
        await connectToDb();
      });

      mongoose.connection.on("error", (error) =>
        console.error("❌ MongoDB Connection Error:", error)
      );

      mongoose.connection.on("close", () =>
        console.log("🔌 Connection to MongoDB closed")
      );
      connection = await mongoose.connect(connectionString, {
        dbName: "masterDb",
      });
      process.env.masterDbReady = "true";
    }

    return connection;
  } catch (error) {
    mongoose.connection.close();
    throw customError(error);
  }
}

function getDb() {
  return connection.connection;
}

module.exports = { connectToDb, getDb };
