const {
  createArticle,
  getArticle,
  getArticles,
} = require("../controllers/adminController");

const express = require("express");

const router = express.Router();

router.get("/articles", getArticles);
router.get("/articles/:articleId", getArticle);
router.post("/create", createArticle);

module.exports = router;
