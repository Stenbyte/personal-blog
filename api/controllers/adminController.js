import { ObjectId } from "mongodb";
import { getDb } from "../db.js";

export async function createArticle(req) {
  const newArticleToAdd = req.body;
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
  const articlesCollection = await getDb("articles");

  const getArticleById = await articlesCollection.findOne({
    _id: ObjectId.createFromHexString(articleId),
  });
  return getArticleById;
}
