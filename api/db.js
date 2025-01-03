const { MongoClient, ServerApiVersion } = require("mongodb");

const connectionString = `mongodb://localhost:27017`;

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDb() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    await client.close();
    throw Error(error);
  }
}

module.exports = { client, connectToDb };
