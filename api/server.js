const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());

app.get("/articles", (req, res) => {
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
  res.send(articles);
});

app.post("/create", (req, res) => {
  console.log("create request");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
