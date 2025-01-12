const { default: mongoose } = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  created: Date,
});

const Article = mongoose.model("Articles", articleSchema);

module.exports = Article;
