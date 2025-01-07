import { ObjectId } from "mongodb";
import { getDb } from "../db.js";
import { CustomError } from "../middleware/errorHandler.js";

let db;

(async () => {
  db = await getDb();
})();

export async function createArticle(req) {
  const newArticleToAdd = req.body;
  throwIfArticleHasMissingFields(newArticleToAdd);
  const newArticle = await db.collection("articles").insertOne(newArticleToAdd);
  return newArticle;
}

export async function getArticles() {
  const getAllArticles = await db.collection("articles").find({}).toArray();

  return getAllArticles;
}

export async function getArticle(req) {
  const articleId = req.params.articleId;
  if (!ObjectId.isValid(articleId)) {
    throw Error("Article id must be type of ObjectId");
  }

  const getArticleById = await db.collection("articles").findOne({
    _id: ObjectId.createFromHexString(articleId),
  });
  return getArticleById;
}

function throwIfArticleHasMissingFields(article) {
  if (!article || article.title.length === 0 || article.content.length === 0) {
    const error = new CustomError("Article fields must be filled up");
    error.statusCode = 400;
    throw error;
  }
}

export async function createUser(req) {
  const email = req.body.email;
  const password = req.body.password;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new CustomError("Invalid email format");
    error.statusCode = 400;
    throw error;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    const error = new CustomError(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
    error.statusCode = 400;
    throw error;
  }
  const createdUser = await db.createCollection("users").insertOne({
    email: email,
    password: password,
  });

  // needs validation if user already exist or password
  return createdUser;
}
