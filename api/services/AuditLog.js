import { customError } from "../middleware/errorHandler.js";

export default class AuditLog {
  constructor(db) {
    this.db = db;
    this.collection = db.collection("audit_logs");
  }

  async log(action, userId, details) {
    try {
      const logEntry = {
        action,
        userId,
        details,
        created: new Date(),
      };

      await this.collection.insertOne(logEntry);
    } catch (error) {
      customError(error.message, error.statusCode);
    }
  }
}
