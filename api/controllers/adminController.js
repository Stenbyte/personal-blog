import { ObjectId } from "mongodb";
import { getDb } from "../db.js";
import { customError } from "../middleware/errorHandler.js";
import AuditLog from "../services/AuditLog.js";
import Constants from "../Constants.js";
import Article from "../models/ArticleModel.js";
import User from "../models/UserModel.js";

export async function createArticle(req) {
  const newArticleToAdd = req.body;
  const auditLogService = new AuditLog();
  throwIfArticleHasMissingFields(newArticleToAdd);

  const articleService = new Article({
    title: newArticleToAdd.title,
    content: newArticleToAdd.content,
    created: new Date(),
  });

  await articleService.save();
  await auditLogService.log(Constants.CREATE, undefined, articleService);
  return articleService;
}

export async function getArticles() {
  const auditLog = new AuditLog();
  const getAllArticles = await Article.find({});
  await auditLog.log(Constants.VIEWV_ARTICLES, undefined, undefined);
  return getAllArticles;
}

export async function getArticle(req) {
  const articleId = req.params.articleId;
  const auditLog = new AuditLog();
  if (!ObjectId.isValid(articleId)) {
    throw Error("Article id must be type of ObjectId");
  }
  const getArticleById = await Article.findOne({
    _id: ObjectId.createFromHexString(articleId),
  });
  await auditLog.log(Constants.VIEWV_ARTICLE, undefined, undefined);
  return getArticleById;
}

function throwIfArticleHasMissingFields(article) {
  if (!article || article.title.length === 0 || article.content.length === 0) {
    const error = customError("Article fields must be filled up", 400);
    throw error;
  }
}

export async function createUser(req) {
  const email = req.body.email;
  const password = req.body.password;
  const auditLog = new AuditLog();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = customError("Invalid email format", 400);
    throw error;
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    const error = customError(
      "Password must be at least 8 characters long and contain at least one letter and one number",
      400
    );
    throw error;
  }
  const createdUser = new User({
    email: email,
    password: password,
    created: new Date(),
  });
  await createdUser.save();
  await auditLog.log(Constants.CREATE_USER, createdUser._id);
  //   needs validation if user already exist or password
  return createdUser;
}
