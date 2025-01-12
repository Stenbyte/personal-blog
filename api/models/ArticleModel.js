const { default: mongoose } = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const Article = mongoose.model("Articles", articleSchema);

module.exports = Article;
