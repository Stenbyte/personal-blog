import { ObjectId } from "mongodb";
import { client } from "../db.js";

export async function createArticle(req, res) {
  const newArticle = req.body;
  const db = client;
  if (newArticle) {
    await db.db("admin").collection("articles").insertOne(newArticle);
    res.status(200).json(newArticle);
  } else {
    console.log("Oooooops");
    res.status(400);
  }
}

export async function getArticles() {
  const db = client;

  const adminDb = await db.db("admin");

  const getAllArticles = await adminDb
    .collection("articless")
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
  res.status(200).json(getArticleById);
}
