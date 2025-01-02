const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 4000;
const connectionString = `mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=myRs`;
app.use(cors());
app.use(express.json());

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const articles = [
  {
    id: 1,
    title: "First article",
    content:
      "Some article text here.Some article text here.Some article text here",
  },
  {
    id: 2,
    title: "Second article",
    content: "Working on a project",
  },
];

async function run() {
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

app.get("/articles", (req, res) => {
  res.send(articles);
});

app.get("/articles/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  const article = articles.find((art) => art.id === Number(articleId));
  res.send(article);
});

app.post("/create", (req, res) => {
  const newArticle = req.body;
  if (newArticle) {
    articles.push(newArticle);
    res.status(200).json(newArticle);
  } else {
    console.log("Oooooops");
  }
});

async function startServer() {
  try {
    await run();

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}
startServer();
