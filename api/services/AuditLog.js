import { customError } from "../middleware/errorHandler.js";
import AuditLog from "../models/AuditLogModel.js";

export default class Audit {
  async log(action, userId, details) {
    try {
      const audit = new AuditLog({
        action,
        userId,
        details,
        created: new Date(),
      });
      await audit.save();
    } catch (error) {
      customError(error.message, error.statusCode);
    }
  }
}
