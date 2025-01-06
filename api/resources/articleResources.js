const {
  createArticle,
  getArticle,
  getArticles,
  createUser,
} = require("../controllers/adminController");

const express = require("express");
const defaultController = require("../middleware/defaultController");

const router = express.Router();

router.get("/articles", defaultController(getArticles));
router.get("/articles/:articleId", defaultController(getArticle));
router.post("/create", defaultController(createArticle));
router.post("/create-user", defaultController(createUser));

module.exports = router;
