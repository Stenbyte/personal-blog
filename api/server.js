const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
