const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const { connectToDb } = require("./db.js");
const errorHandler = require("./middleware/errorHandler.js");

const articleRoutes = require("./resources/articleResources.js");

app.use(cors());
app.use(express.json());

app.use("/", articleRoutes);
app.use(errorHandler);

async function startServer() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}
startServer();
