import { ObjectId } from "mongodb";
import { getDb } from "../db.js";

export async function createArticle(req) {
  const newArticleToAdd = req.body;
  throwIfArticleHasMissingFields(newArticleToAdd);
  const articlesCollection = await getDb("articles");

  const newArticle = await articlesCollection.insertOne(newArticleToAdd);
  return newArticle;
}

export async function getArticles() {
  const articlesCollection = await getDb("articles");

  const getAllArticles = await articlesCollection.find({}).toArray();

  return getAllArticles;
}

export async function getArticle(req) {
  const articleId = req.params.articleId;
  if (!ObjectId.isValid(articleId)) {
    throw Error("Article id must be type of ObjectId");
  }
  const articlesCollection = await getDb("articles");

  const getArticleById = await articlesCollection.findOne({
    _id: ObjectId.createFromHexString(articleId),
  });
  return getArticleById;
}

function throwIfArticleHasMissingFields(article) {
  if (!article || article.title.length === 0 || article.content.length === 0) {
    throw Error("Article fields must be filled up");
  }
}
