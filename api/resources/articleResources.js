const {
  createArticle,
  getArticle,
  getArticles,
} = require("../controllers/adminController");

const express = require("express");
const defaultController = require("../middleware/defaultController");

const router = express.Router();

router.get("/articles", defaultController(getArticles));
router.get("/articles/:articleId", getArticle);
router.post("/create", createArticle);

module.exports = router;
