import { ObjectId } from "mongodb";
import { client } from "../db.js";

export async function createArticle(req) {
  const newArticleToAdd = req.body;
  const db = client;
  const newArticle = await db
    .db("admin")
    .collection("articles")
    .insertOne(newArticleToAdd);
  return newArticle;
}

export async function getArticles() {
  const db = client;

  const adminDb = await db.db("admin");

  const getAllArticles = await adminDb
    .collection("articles")
    .find({})
    .toArray();

  if (getAllArticles) {
    return getAllArticles;
  }
}

export async function getArticle(req, res) {
  const articleId = req.params.articleId;
  const db = client.db("admin");

  const getArticleById = await db
    .collection("articles")
    .findOne({ _id: ObjectId.createFromHexString(articleId) });
  return getArticleById;
}
