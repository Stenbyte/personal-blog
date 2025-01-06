import { ObjectId } from "mongodb";
import { client, getDb } from "../db.js";

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

export async function createUser(req) {
  const email = req.body.email;
  const password = req.body.password;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
  }
  const articlesCollection = await client
    .db("masterDb")
    .createCollection("users");

  const createdUser = await articlesCollection.insertOne({
    email: email,
    password: password,
  });
  // needs validation if user already exist or password
  return createdUser;
}
